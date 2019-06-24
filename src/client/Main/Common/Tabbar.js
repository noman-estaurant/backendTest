import React, { Component } from 'react'
import './Tabbar.css'
class Order extends Component {

  
  toggleHomeImage = () => {
    console.log("ff")
    window.location.href = '#'+localStorage.getItem('main')
  }
  toggleCouponImage = () => {
    window.location.href = '#/main/coupon'
  }
  toggleProfileImage = () => {
    window.location.href = '#/main/profile'
  }


  render() {
    const { main, profile,coupon } = this.props;
    return (
      <div class="tabbar">
          <div class="container">
              {
                coupon === 1 ? 
                  <div class="coupon" onClick={this.toggleCouponImage }>
                    <img src="src/couponclick.png" />
                    <p>個人</p>
                  </div>
                :
                  <div class="coupon" onClick={this.toggleCouponImage }>
                    <img src={"src/coupon@3x.png"} />
                    <p>個人</p>
                  </div>
              }
              {
                main === 1 ? 
                  <div class="home" onClick={this.toggleHomeImage }>
                    <img src="src/homeclick.png" />
                    <p>個人</p>
                  </div>
                :
                  <div class="home" onClick={this.toggleHomeImage }>
                    <img src="src/home_2@3x.png"/>
                    <p>個人</p>
                  </div>
              }
              {
                profile === 1 ? 
                  <div class="profile" onClick={this.toggleProfileImage }>
                    <img src="src/profileclick.png" />
                    <p>個人</p>
                  </div>
                :
                  <div class="profile" onClick={this.toggleProfileImage }>
                    <img src="src/group@3x.png" />
                    <p>個人</p>
                  </div>
              }
              
          </div>
      </div>
    )
  }
}

export default Order
