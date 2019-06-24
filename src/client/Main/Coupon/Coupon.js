import React, { Component } from 'react'
import './Coupon.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'

class Coupon extends Component {

  render() {
    const { get}  = this.props;
    const newCoupon = (get) => {
      if(get == 1){ 
        return( <img class="couponlist__item" src="src/coupon.png"></img> )
      }
    }
    return (
        <div>
            <div class="couponbody">
            <Navigationbar handleBack={null} header={'優惠卷'} cart={0} template={0}/>
            <div class="couponlist">
              {newCoupon(get)}
            </div>
            <Tabbar coupon ={1} main={0} profile={0}/>
            </div>
        </div>
    )
  }
}

export default Coupon
