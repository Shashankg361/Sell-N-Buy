import { client } from '@/database/handleDatabase';
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

      //console.log("Body",req.body);
      form.parse(req, async (err, fields, filess) => {
        if (err) {
          console.error('Error parsing form data', err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
        
        //const fieldsArray = Object.values(fields);
        console.log("fields",JSON.parse(fields.details));

        const {Mname,Cname,RearC,FrontC,Ram,Rom,Processor,UsedFor,files} = JSON.parse(fields.details);

          try {
            const fileArray = Object.values(filess);

            // Check if files are present in the form data
            if (!fileArray || fileArray.length === 0) {
              return res.status(400).json({ message: 'No files uploaded' });
            }

            console.log('fileArray',fileArray);
            
            // Handle file uploads at azure blob storage
            for (const file of fileArray) {
              const blobName = `${Date.now()}_${file[0].originalFilename}`;
              const fileBuffer = fs.readFileSync(file[0].filepath);
              const blockBlobClient = containerClient.getBlockBlobClient(blobName);
              await blockBlobClient.upload(fileBuffer,file[0].size,undefined,{blobHTTPHeaders: { blobContentType: file[0].mimetype }});
              const storageAccountUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`;
              const blobUrl = `${storageAccountUrl}/${containerName}/${blobName}`;
              ImagesUrl = [...ImagesUrl,blobUrl];
            }
            //storing detail to mongodb
            const data = {Mname,Cname,RearC,FrontC,Ram,Rom,Processor,UsedFor,ImagesUrl};
            const db = client.db('MobileDets');
            const collctionRef = db.collection('Details');
            await collctionRef.insertOne(data);

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
