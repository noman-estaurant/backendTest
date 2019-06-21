import React, { Component } from 'react'
import Tabbar from '../../../Common/Tabbar'
import Navigationbar from '../../../Common/Navigationbar'
import './Host.css'

class Host extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      seconds: 60,
      groupid: 503929
    }
  }
  clock = () => {
    this.setState({seconds: this.state.seconds-1});
    if(this.state.seconds==0)
        console.log("times up");
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
    return (
      <div>
        <Navigationbar handleBack={handleBack} header={'開團'} cart={0} template={1}/>
        <div class="num">{this.state.groupid }</div>
        <div class="info">請在60秒內<br />輸入有效金鑰進行揪團配對</div>
        <div class="time" data-seconds="60">
            <div class="time-content">{this.state.seconds }</div>
        </div>
        <div class="finish"onClick={() => {
              window.location.href = `#/main/order/${id}/groupmenu`
            }}>完成</div>

      </div>
    )
  }
}

export default Host
