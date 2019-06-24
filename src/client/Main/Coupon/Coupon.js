import React, { Component } from 'react'
import './Coupon.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'

class Coupon extends Component {
  componentDidMount() {

    
    }

  render() {
    const { showCoupon } = this.props
    const num = showCoupon().coupon
    console.log(num)
    const newCoupon = (num) => {
      var i;
      let table = []
      for(i=0;i< num ;i++){
        table.push(<img class="couponlist__item" src="src/coupon.png"></img>)
      }
      return(table)
    }

    return (
        <div>
            <div class="couponbody">
            <Navigationbar handleBack={null} header={'優惠卷'} cart={0} template={0}/>
            <div class="couponlist">
              {newCoupon(num)}
            </div>
            <Tabbar coupon ={1} main={0} profile={0}/>
            </div>
        </div>
    )
  }
}

export default Coupon
