const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const config = require('../../setting/config')

const api = require('../../api/index')

const app = express()

const options = {
  ca : fs.readFileSync(config.ssl.ca),
  key: fs.readFileSync(config.ssl.key),
  cert:fs.readFileSync(config.ssl.cert)
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.sendFile(`${config.root}/dist/index.html`)
})

app.use(express.static('dist'))

app.use('/api', api)

const server = https.createServer(options, app)

const io = require('socket.io')(server);
var userState={}
var peopleinroom={}
var NumInRoom = {}
var finishcouter={}
var roomIdList=[]
var WhoisIn = []
var anymousID = 0



io.on('connection', (socket) => {
    console.log('Hello!');
    socket.on('Mkroom',(Data)=>{
        roomIdList.push(Data.id.toString());
        socket.join(Data.id);
        peopleinroom[Data.id] = []
        NumInRoom[Data.id] = 1
        finishcouter[Data.id]=0

        userState['name']=Data.name;
        userState['id']=Data.id.toString();

        if (Data.name == null) Data.name = "anymous" + (++anymousID).toString()
        peopleinroom[Data.id].push(Data.name)
        io.to(Data.id).emit('change',peopleinroom[Data.id]);

        console.log(userState.name+' creates '+roomIdList)
        console.log(peopleinroom[Data.id])
    })
    

    socket.on('Inroom',(Data)=>{
        if (roomIdList.indexOf(Data.id)===-1){
            socket.emit('donotexist')
            console.log("no room")
        }
        else
        {   
            var room_index = roomIdList.indexOf(Data.id.toString())
            socket.join(Data.id);

            if (Data.name == null) Data.name = "anymous" + (++anymousID).toString()
            peopleinroom[Data.id].push(Data.name)

            io.to(Data.id).emit('isFollow',Data);
            console.log(Data.name+" is in "+Data.id);
            //userData constructor
            NumInRoom[Data.id] ++
            userState['name']=Data.name;
            userState['id']=Data.id;

            io.to(Data.id).emit('change',peopleinroom[Data.id]);
            console.log(peopleinroom[Data.id]);
        }
    });
    
    socket.on('state_1',(userData)=>{
        if (userData.name == null) userData.name = "anymous" 
        console.log(userData.name + " is in state 1")
        io.to(userData.id).emit('state_1_res',userData.name);
    });
    
    socket.on('state_2',(userData)=>{
        if (userData.name == null) userData.name = "anymous" 
        console.log(userData.name + " is in state 2")
        io.to(userData.id).emit('state_2_res',userData);
    });
    socket.on('state_3',(userData)=>{
        if (userData.name == null) userData.name = "anymous" 
        finishcouter[userData.id]++;
        console.log(userData.name + " is in state 3")
        io.to(userData.id).emit('state_3_res',userData.name);
    });
    
    socket.on('send',(Data)=>{
        if(finishcouter[Data.id]>= NumInRoom[Data.id] && Data.Master){
            console.log("Success!");
        }
        else{
            socket.emit('not ok',Data);
        }
    });
    socket.on('disconnect', () => {
        console.log('Bye~'); 
    });
    
});
 


server.listen(17785, () => {
  console.log(`listen on port:17785`)
})

