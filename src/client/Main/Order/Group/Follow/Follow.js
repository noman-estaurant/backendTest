import React, { Component } from 'react'
import Tabbar from '../../../Common/Tabbar'
import Navigationbar from '../../../Common/Navigationbar'
import Flag from '../../../Common/Flag'

import './Follow.css'

class Follow extends Component {
  
  constructor(props) {
    localStorage.setItem('type', 'follow');
    super(props)
    this.state = {
      groupid: 0,
      ws:this.props.ws,
      warn:0
    }
  }
  
  inroom = () => {
    var userData = {}
    userData['id']=document.getElementById('room_id').value;
    userData['name']=localStorage.getItem("name");
    this.state.ws.emit('Inroom',userData);
  }

  componentDidMount () {
    this.state.ws.on('donotexist',()=>{
      this.setState({warn:-1})
    })
    this.state.ws.on('isFollow',()=>{
      var userData = {}
      userData['id']=document.getElementById('room_id').value;
      userData['name']=localStorage.getItem("name");
      this.state.ws.emit('state_1',userData);

      localStorage.setItem('room_id', document.getElementById('room_id').value.toString());

      const { id } = this.props.match.params
      window.location.href = `#/main/order/${id}/menu`
    })
  }

  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    const { setUser } = this.props
    const { userData } = this.props
    const { getUserData } = this.props
    return (
      <div>
        <Navigationbar handleBack={this.props.handleBack} header={'跟團'} cart={0} template={1}/>
        <input class="input" type="text" id="room_id" maxlength="6" />
          <div class="input">
            <div class="input__line"></div>
          </div>

        {this.state.warn == -1 ? (<div id="warn">No match room</div>) : null }

        <div class="button"onClick={() => {
            this.inroom()
          }}>完成</div>
      </div>
    )
  }
}

export default Follow
