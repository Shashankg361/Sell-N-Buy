import { client } from '@/database/handleDatabase';
import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connect', socket => {

        try{
            const db = client.db('MobileDets');
            const collection = db.collection('Details');
            const changestream = collection.watch();
        
            changestream.on('change',(newData)=>{
                console.log("type",newData.operationType);
                if(newData.operationType === 'insert'){
                    //console.log("newData",newData);
                    // wss.clients.forEach((client)=>{
                    //     if(client.readyState === websocket.OPEN){
                    //         client.send(JSON.stringify(newData));
                    //     }
                    // });

                    socket.broadcast.emit('updated-document',JSON.stringify(newData));

                };
            });
        }catch(error){
            console.log(error);
        };

    //   socket.on('input-change', msg => {
    //     socket.broadcast.emit('update-input', msg)
    //   })
    })
  }
  res.end()
}

export default SocketHandler