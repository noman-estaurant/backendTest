import React, { Component } from 'react'
import Tabbar from '../../../Common/Tabbar'
import Navigationbar from '../../../Common/Navigationbar'
import Flag from '../../../Common/Flag'

import './Host.css'

class Host extends Component {
  
  constructor(props) {
    localStorage.setItem('type', 'host');
    super(props)
    this.state = {
      seconds: 60,
      groupid: 0
    }
  }

  clock = () => {
    this.setState({seconds: this.state.seconds-1});
    if(this.state.seconds==0)
      window.location.href = '#/main/order/:id/'
  }
  componentDidMount () {
    this.timer = setInterval(this.clock, 1000);
    
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    const { setUser } = this.props
    const { userData } = this.props
    const { socket } = this.props
    const { getUserData } = this.props

    if(this.state.groupid==0){
      userData['name']=localStorage.getItem('name')
      socket.emit('Master',localStorage.getItem('name'));
      socket.on('id_info',(id)=>{
        userData['id']=id;
        userData['Master']=true;
        setUser(true,id,localStorage.getItem('name'))
        this.setState({groupid: id});
      });
      socket.emit('state_1',userData);
    }
    return (
      <div>
        <Navigationbar handleBack={this.props.handleBack} header={'開團'} cart={0} template={1}/>
        <div class="num">{this.state.groupid }</div>
        <div class="info">請在60秒內<br />輸入有效金鑰進行揪團配對</div>
        <div class="time" data-seconds="60">
            <div class="time-content">{this.state.seconds }</div>
        </div>
        <div class="finish"onClick={() => {
              window.location.href = `#/main/order/${id}/menu`
            }}>完成</div>
      </div>
    )
  }
}

export default Host
