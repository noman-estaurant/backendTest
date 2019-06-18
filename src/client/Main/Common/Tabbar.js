import React, { Component } from 'react'
import './Tabbar.css'

class Order extends Component {
  render() {
    return (
      <div class="tabbar">
          <div class="container">
              <div class="coupon">
                  <img src="src/coupon@3x.png" />
                  <p>優惠卷</p>
              </div>
              <div class="home">
                  <img src="src//home_2@3x.png" />
                  <p>首頁</p>
              </div>
              <div class="profile">
                  <img src="src/group@3x.png" />
                  <p>個人</p>
              </div>
          </div>
      </div>
    )
  }
}

export default Order
