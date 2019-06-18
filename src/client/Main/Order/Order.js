import React, { Component } from 'react'
import Tabbar from '../Common/Tabbar'
import Navigationbar from '../Common/Navigationbar'
import './Order.css'

class Order extends Component {

  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    return (
      <div>
        <Navigationbar handleBack={handleBack} header={'點餐'} cart={0} template={1}/>
        <div id="people">
          <div id="one" onClick={() => {
            window.location.href = `#/main/order/${id}/one`
          }}>
            <img src="src/Unmanned restaurant-05@2x.png" />
            <p>個人</p>
          </div>
          <div id="many">
            <div class="button">
              <img src="src/Unmanned restaurant-06@2x.png" />
              <p>揪團</p>
            </div>
          </div>
        </div>
        <Tabbar />
      </div>
    )
  }
}

export default Order
