// import { client } from '@/database/handleDatabase';
// import { Server } from 'socket.io';
//Socket
// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     console.log('Socket is already running')
//   } else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io

//     io.on('connect', socket => {

//         try{
//             const db = client.db('MobileDets');
//             const collection = db.collection('Details');
//             const changestream = collection.watch();
        
//             changestream.on('change',(newData)=>{
//                 console.log("type",newData.operationType);
//                 if(newData.operationType === 'insert'){
//                     socket.broadcast.emit('updated-document',JSON.stringify(newData));
//                 };
//             });
//         }catch(error){
//             console.log(error);
//         };

//     })
//   }
//   res.end()
// }

// export default SocketHandler