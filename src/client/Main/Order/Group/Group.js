import React, { Component } from 'react'
import Tabbar from '../../Common/Tabbar'
import Navigationbar from '../../Common/Navigationbar'
import './Group.css'

class Group extends Component {

  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    return (
      <div>
        <Navigationbar handleBack={this.props.handleBack} header={'揪團點餐'} cart={0} template={1}/>
        <div id="group">
          <div id="host" onClick={() => {
            window.location.href = `#/main/order/${id}/many/host`
          }}>
            <img src="src/host.png" />
            <p>開團</p>
          </div>
          <div id="follow" onClick={() => {
            window.location.href = `#/main/order/${id}/many/follow`
          }}>
            <img src="src/follow.png" />
            <p>跟團</p>
          </div>
        </div>
        <Tabbar coupon ={0} main={1} profile={0}/>
      </div>
    )
  }
}

export default Group
