import { client } from "@/database/handleDatabase";
import { Server } from "ws";

const wss = new Server({noServer:true});

wss.on('connection',(ws)=>{
    console.log('connect in mobileDets');
});
try{
    const db = client.db('MobileDets');
    const collction = db.collection('Details');
    const changestream = collction.watch();

    changestream.on('change',newData=>{
        if(newData.operationType === 'insert'){
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(newData));
                }
            })
        }
    })

}catch(err){
    console.log(`Error occured at new mobileDets ${err}`)
};

ws.on('close', () => {
    // Handle WebSocket connection close
    console.log('WebSocket connection closed');
});

export default async function handler(req, res) {
    if (!res.socket.server.websocketServer) {
      res.socket.server.websocketServer = wss;
  
      // Upgrade the HTTP request to a WebSocket connection
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  
    res.end();
  }

