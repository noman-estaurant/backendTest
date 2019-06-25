import React, { Component } from 'react'
import './Flag.css'

class Flag extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            ok: false,
            peopleinroom:[],
            peopleinstate1:[],
            peopleinstate2:[],
            peopleinstate3:[],
            finishcouter:{},
            userState:{},
            open:0
        }
    }

  componentDidMount() {        
    var that = this;
    var startX, startY, dX, dY, top0, left0, defaultX, defaultY
    var start_time, duration
    var item = document.getElementById("FlagButton")
    var block = document.getElementById('StatusBlock')
    var check = false;
    var isClose = true
    defaultX = 1
    defaultY = 70
    
    function touchStart(event){
        event.preventDefault()
        if (check || event.touches.length == 0) return
        var d = new Date();
        start_time = d.getTime()
        var touch = event.touches[0]
        startX = touch.pageX
        startY = touch.pageY
        check = true
        dX, dY = 0
        top0 = parseFloat(item.style.top)
        left0 = parseFloat(item.style.left)
    }
    
    function touchMove(event) {
            event.preventDefault();
            if (!check || event.touches.length == 0) return;
            var touch = event.touches[0]
            dX = touch.pageX - startX 
            dY = touch.pageY - startY 
            item.style.webkitTransform = 'translate(' + dX + 'px, ' + dY + 'px)';
    }
    
    function touchEnd(event) {
        event.preventDefault();
        if (!check) return;
        var d = new Date();
        duration = d.getTime() - start_time
        item.style.top = top0 + dY + "px"
    
        if (left0 + dX > document.body.clientWidth / 2) item.style.left = 10 + "px"
        else item.style.left = defaultX + "px"
    
        item.style.webkitTransform = 'translate(' +  0 + 'px, ' + 0 + 'px)';
        check = false
    }
    
    function touchExpand(event){
        if (duration > 100) return;
        item.style.top = defaultY + "px"
        item.style.left = defaultX + "px"
        if (isClose){
            isClose = false;
            console.log(block.style.top)
            block.style.display = 'block'
            that.setState({open: 1 })
        }
        else{
            isClose = true;
            block.style.display = 'none'
            that.setState({open: 0 })
        }
    }
    var item = document.getElementById("FlagButton")
    item.addEventListener("touchstart", touchStart, false)
    item.addEventListener("touchmove", touchMove, false)
    item.addEventListener("touchend", touchEnd, false)
    item.addEventListener("touchend", touchExpand, false)
  }

  render() {

    const { userData } = this.props
    const { socket } = this.props
    const { getUserData } = this.props

    if(this.state.open==1){
        console.log(socket);
        socket.on('inroom',(Data)=>{
            console.log('inroom',Data)
             this.setState({
                peopleinroom: [...this.state.peopleinroom,Data.name]
            })
        });
        socket.on('state_1_res',(Data)=>{
            console.log('inroom',Data)
            this.setState({
                peopleinstate2: [...this.state.peopleinstate2,Data.name]
            })
        });
        socket.on('state_2_res',(Data)=>{
            console.log('inroom',Data)
            this.setState({
                peopleinstate2: [...this.state.peopleinstate2,Data.name]
            })
        });
        socket.on('state_3_res',(Data)=>{
            console.log('inroom',Data)
            this.setState({
                peopleinstate3: [...this.state.peopleinstate3,Data.name]
            })
            if(this.state.peopleinstate3.length==this.state.peopleinroom.length)
                this.setState({ ok:true})
        });
    }     
    console.log("??");
    console.log(this.state.open);
    console.log(getUserData().user);
    
      return(
        <div>
            <div id="FlagButton" style={{top: 70+'px', left: 1+'px'}}>
                <img src="src/host.png" style={{width: 52+'px',position:'absolute',left: 14+'px',top: 16+'px'}}/></div>
            <div id="StatusBlock" style={{display: 'none'}}>
                <div class="host mem">
                    <img class="pic" src="src/man.png" ></img>
                    <p>name</p>
                    <div class="loadbar">
                        <div class="checkpoint_circle"></div>
                        <div class="checkpoint_stick"></div>
                        <div class="checkpoint_circle"></div>
                        <div class="checkpoint_stick"></div>
                        <div class="checkpoint_circle"></div>
                    </div>
                    <div style={{display:'inline-flex',position: 'relative', left:98+'px', top:-20+'px'}}>
                        <div style={{fontSize:8+'px', fontWeight:300}}>跟團</div>
                        <div style={{fontSize:8+'px', fontWeight:300,position: 'relative', left:56+'px'}}>點餐</div>
                        <div style={{fontSize:8+'px', fontWeight:300,position: 'relative', left:103+'px'}}>準備付款</div>
                    </div>
                </div>
                <div class="follower_list">
                    {
                         this.state.peopleinstate1.map(element => {
                            return(
                                <div class="follower mem">
                                    <img class="pic" src="src/man.png" ></img>
                                    <p> {element} </p>
                                    <div class="loadbar">
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle"></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle"></div>
                                    </div>
                                </div>
                            )
                          })
                    }
                     {
                         this.state.peopleinstate2.map(element => {
                            return(
                                <div class="follower mem">
                                    <img class="pic" src="src/man.png" ></img>
                                    <p> {element} </p>
                                    <div class="loadbar">
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle"></div>
                                    </div>
                                </div>
                            )
                          })
                    }
                     {
                         this.state.peopleinstate3.map(element => {
                            return(
                                <div class="follower mem">
                                    <img class="pic" src="src/man.png" ></img>
                                    <p> {element} </p>
                                    <div class="loadbar">
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                        <div class="checkpoint_stick"></div>
                                        <div class="checkpoint_circle" style={{background:'rgb(255,123,159)'}}></div>
                                    </div>
                                </div>
                            )
                          })
                    }
                </div>

                {
                    this.state.ok ?
                    (
                        <div class="send"  onClick={() => {
                            socket.emit('send',userData);
                            window.location.href = `#/main/pay`
                        }}>送出訂單 </div>
                    )
                    :
                    (
                        <div class="send" style={{background: 'rgb(224,224,224)'}}>送出訂單 </div>
                    )
                }
                
            </div>
        </div>
      )
  }
}

export default Flag
