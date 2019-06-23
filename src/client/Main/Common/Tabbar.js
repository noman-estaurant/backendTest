import React, { Component } from 'react'
import './Tabbar.css'
const couponImage = {
  coupon: "src/coupon@3x.png",
  couponClick: "src/couponclick.png"
}
const homeImage = {
  home:"src/home_2@3x.png",
  homeClick:"src/homeclick.png"
}
const profileImage = {
  profile:"src/group@3x.png",
  profileClick:"src/profileclick.png"
}
class Order extends Component {

  state = {
    home: true,
    coupon:false,
    profile:false
  }
  toggleHomeImage = () => {
    console.log("ff")
    if(this.state.home === false){
      this.setState(state => ({ home: true,coupon: false,profile: false }))
    }
  }
  toggleCouponImage = () => {
    window.location.href = '#/main/coupon'
    if(this.state.coupon === false){
      this.setState(state => ({ home: false,coupon: true,profile: false }))
    }
  }
  toggleProfileImage = () => {
    if(this.state.profile === false){
      window.location.href = '#/main/profile'
      this.setState(state => ({ home: false,coupon: false,profile: true }))
    }
  }

  getHomeImage = () => this.state.home ? 'homeClick' : 'home'
  getCouponImage = () => this.state.coupon ? 'couponClick' : 'coupon'
  getProfileImage = () => this.state.profile ? 'profileClick' : 'profile'

  render() {
    const homeImg = this.getHomeImage();
    const profileImg = this.getProfileImage();
    const couponImg = this.getCouponImage();

    return (
      <div class="tabbar">
          <div class="container">
              <div class="coupon" onClick={
                this.toggleCouponImage }>
                  <img src={couponImage[couponImg]}/>
                  <p>優惠卷</p>
              </div>
              <div class="home" onClick={
                this.toggleHomeImage }>
                  <img src={homeImage[homeImg]} />
                  <p>首頁</p>
              </div>
              <div class="profile" onClick={
                this.toggleProfileImage }>
                  <img src={profileImage[profileImg]} />
                  <p>個人</p>
              </div>
          </div>
      </div>
    )
  }
}

export default Order
