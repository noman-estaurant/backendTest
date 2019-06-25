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
      groupid: 0
    }
  }
  
  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    const { setUser } = this.props
    const { userData } = this.props
    const { socket } = this.props
    const { getUserData } = this.props
    return (
      <div>
        <Navigationbar handleBack={this.props.handleBack} header={'跟團'} cart={0} template={1}/>
        <input class="input" type="text" maxlength="6" />
          <div class="input">
            <div class="input__line"></div>
          </div>
        <div class="button"onClick={() => {
            userData['id']= document.getElementsByClassName("input")[0].value;
            userData['name']=localStorage.getItem('name');
            console.log( userData['id']);
            socket.emit('open room',userData);
            setUser(false,id,localStorage.getItem('name'))
            console.log('gg',userData)
            socket.emit('state_1',userData)
            console.log('ff',getUserData().user)
            window.location.href = `#/main/order/${id}/menu`
          }}>完成</div>
      </div>
    )
  }
}

export default Follow
