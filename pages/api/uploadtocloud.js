//import nextConnect from 'next-connect';
import { BlobServiceClient } from '@azure/storage-blob';
import multer from 'multer';
import nextConnect from 'next-connect';

const containerName = 'images';

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// const apiRoute = nextConnect({
//     // Handle errors
//     onError(error, req, res) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     },
//   });

const apiRoute = async(req,res)=>{
    console.log('files',req.body.files)
    try{
        for(const file of req.body.files){
            const blobName = `${Date.now()}_${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(file.buffer, file.size);
        }
        res.json({message:'files uploaded successfully'});
    }catch(error){
        console.error('Error occured while storing the files at azure could',error);
        res.status(500).json({error:'Internal server error'});
    }
};

export default apiRoute;