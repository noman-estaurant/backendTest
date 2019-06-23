import React, { Component } from 'react'
import './Flag.css'

class Flag extends Component {
  
  componentDidMount() {
    var startX, startY, dX, dY, top0, left0, defaultX, defaultY
    var start_time, duration
    var item = document.getElementById("FlagButton")
    var block = document.getElementById('StatusBlock')
    var check = false;
    var isClose = true
    defaultX = 10
    defaultY = 250
    
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
        else item.style.left = 10 + "px"
    
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
        }
        else{
            isClose = true;
            block.style.display = 'none'
        }
    
    }
    
    var item = document.getElementById("FlagButton")
    item.addEventListener("touchstart", touchStart, false)
    item.addEventListener("touchmove", touchMove, false)
    item.addEventListener("touchend", touchEnd, false)
    item.addEventListener("touchend", touchExpand, false)
  }

  render() {
      return(
        <div>
            <div id="FlagButton" style={{top: 250+'px', left: 10+'px'}}></div>
            <div id="StatusBlock" style={{display: 'none'}}>
                <div class="host mem">
                    <img class="pic"></img>
                    <p>name</p>
                    <div class="loadbar"></div>
                </div>
                <div class="follower mem">
                    <img class="pic"></img>
                    <p>name</p>
                    <div class="loadbar"></div>
                </div>
            </div>
        </div>
      )
  }
}

export default Flag
