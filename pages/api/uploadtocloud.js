import { BlobServiceClient } from '@azure/storage-blob';
import { IncomingForm } from 'formidable';
import fs from 'fs';
const containerName = 'images';
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);
let ImagesUrl=[];

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function uploadToCloud(req, res) {
  try {
    if (req.method === 'POST') {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data', err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        try {
          const fileArray = Object.values(files);

          // Check if files are present in the form data
          if (!fileArray || fileArray.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
          }

          console.log('fileArray',fileArray);
          
          // Handle file uploads+
          for (const file of fileArray) {
            const blobName = `${Date.now()}_${file[0].originalFilename}`;
            console.log("loook",file[0].filepath,file[0].size);
            const fileBuffer = fs.readFileSync(file[0].filepath);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const response = await blockBlobClient.upload(fileBuffer,file[0].size,undefined,{blobHTTPHeaders: { blobContentType: file[0].mimetype }});
            const storageAccountUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`;
            const blobUrl = `${storageAccountUrl}/${containerName}/${blobName}`;
            ImagesUrl = [...ImagesUrl,blobUrl];
            console.log(response);
          }

          return res.status(200).json({ message: 'Files uploaded successfully',URL:{ImagesUrl}});
        } catch (error) {
          console.error('Error occurred while storing the files at Azure Blob Storage', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });
    }
  } catch (error) {
    console.error('Unhandled error in API route', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
