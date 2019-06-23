import React, { Component } from 'react'
import './Coupon.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'

class Coupon extends Component {

  render() {
    return (
        <div>
            <div class="couponbody">
            <Navigationbar handleBack={null} header={'優惠卷'} cart={0} template={0}/>
            <div class="couponlist">
                <img class="couponlist__item" src="src/coupon.png"></img>
                <img class="couponlist__item" src="src/coupon.png"></img>
                <img class="couponlist__item" src="src/coupon.png"></img>
                <img class="couponlist__item" src="src/coupon.png"></img>
            </div>
            <Tabbar profileImg ={"src/profileclick.png"}/>
            </div>
        </div>
    )
  }
}

export default Coupon
