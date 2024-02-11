const websocket = require('ws');
const http = require('http');
const { client } = require('./database/handleDatabase');
//const { client } = require('@/database/handleDatabase');

const server = http.createServer();
const wss = new websocket.Server({server});

wss.on('connection',(ws)=>{
    console.log("Connected",);
});

try{
    const db = client.db('User_Details');
    const collection = db.collection('Registration');
    const changestream = collection.watch();

    changestream.on('change',(newData)=>{
        console.log("type",newData.operationType);
        if(newData.operationType === 'insert' || newData.operationType === 'update'){
            //console.log("newData",newData);
            wss.clients.forEach((client)=>{
                if(client.readyState === websocket.OPEN){
                    client.send(JSON.stringify(newData));
                }
            });
        };
    });
}catch(error){
    console.log(error);
}


const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`websocket is running on port:${PORT}`);
})