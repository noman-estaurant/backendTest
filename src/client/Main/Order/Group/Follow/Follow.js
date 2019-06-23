import React, { Component } from 'react'
import Tabbar from '../../../Common/Tabbar'
import Navigationbar from '../../../Common/Navigationbar'
import './Follow.css'

class Follow extends Component {
  
  constructor(props) {
    localStorage.setItem('type', 'follow');
    super(props)
  }
  
  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    return (
      <div>
        <Navigationbar handleBack={this.props.handleBack} header={'跟團'} cart={0} template={1}/>
        <input class="input" type="text" maxlength="6" />
          <div class="input">
            <div class="input__line"></div>
          </div>
        <div class="button"onClick={() => {
              window.location.href = `#/main/order/${id}/menu`
          }}>完成</div>
        
      </div>
    )
  }
}

export default Follow
