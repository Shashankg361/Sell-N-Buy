import { client } from "@/database/handleDatabase";
import { ChangeStream } from "mongodb";
import { Server } from "ws";

export default async function socket(req, res){
    let newData;
    console.log("called");
    const wss = new Server({noServer: true});

    wss.on('connection',(ws)=>{
        console.log("Connected");
    })
    // const db = client.db('User_Details');
    // const collection = db.collection('Registration');

    // const changeStream  = collection.watch();

    // changeStream.on('change',(change)=>{
    //     if(change.operationType == "insert"){
    //         newData = change.fullDocument;
    //         console.log("I'm from ws backend",newData);
    //     }
    //     wss.clients.forEach((client)=>{
    //         if(client.readyState === WebSocket.OPEN){
    //             client.send(JSON.stringify(newData));
    //         }
    //     });
    // });    

    req.wss = wss;
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0),(ws)=>{
        wss.emit('connection',we,req);
    });

    res.end('WebSocket server initiated');
}