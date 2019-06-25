const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const config = require('../../setting/config')

const api = require('../../api/index')

var app = require('express')();
var http = require('http').Server(app);

var userState={};//存當前使用者是誰
var peopleinroom={};//存有幾個人在房間
var finishcouter={};//存有幾個人完成第三步走
var roomIdList=[];//存server所有房間ID
var id;

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

const server = https.createServer(options, app).listen(17787, () => {
  console.log(`listen on port:17785`)
})

var io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('Hello!');//打個招呼
  socket.on('open room',(Data)=>{//加入房間
      if (roomIdList.indexOf(Data.id)===-1){
          socket.emit('donotexist')//判斷房間ID是否存在
      }
      else//將使用者加入房間，這邊會回傳什麼使用者加入的資料給前端
      {
          socket.join(Data.id);
          peopleinroom[Data.id]++;
          io.to(Data.id).emit('inroom',Data);
          console.log(Data.name+" is in "+Data.id);
          //userData constructor
          userState['name']=Data.name;
          userState['id']=Data.id;
          console.log(peopleinroom[Data.id]);
      }
  });
  //判斷到第幾部分，這邊會回傳一個"state_(第幾步)_res"的事件給前端
  socket.on('state_1',(userData)=>{
      console.log(userData)
      console.log(userData.name+" is in 111"+userData.id);
      io.to(userData.id).emit('state_1_res',userData);
  });
  socket.on('state_2',(userData)=>{
      io.to(userData.id).emit('state_2_res',userData);
  });
  socket.on('state_3',(userData)=>{
      finishcouter[userData.id]++;
      io.to(userData.id).emit('state_3_res',userData);
  });
  //室長創建房間，這邊會回傳ID資訊給前端
  socket.on('Master',(Data)=>{
      id=Math.floor(Math.random()*899999+100000);
      roomIdList.push(id.toString());
      socket.join(id);
      peopleinroom[id]=1;
      finishcouter[id]=0;
      socket.emit('id_info',id.toString());
      userState['name']=Data.name;
      userState['id']=id.toString();
      console.log(userState.name+' creates '+roomIdList)
  })
  //準備送出訂單
  socket.on('send',(Data)=>{
      if(finishcouter[Data.id]>=peopleinroom[Data.id] && Data.Master){
          //跳到結帳頁面
          console.log("Success!");
      }
      else{
          socket.emit('not ok',Data);
      }
  });
  
  socket.on('disconnect', () => {
      peopleinroom[id]--;
      console.log('Bye~'); 
  });
});