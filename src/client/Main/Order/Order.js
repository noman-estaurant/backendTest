import React, { Component } from 'react'
import Tabbar from '../Common/Tabbar'
import Navigationbar from '../Common/Navigationbar'
import './Order.css'

class Order extends Component {

  componentDidMount (){
    $("#needloginin").hide();
    localStorage.setItem('done',false);
  }
  render() {
    const { id } = this.props.match.params
    const { handleBack } = this.props
    return (
      <div>
        <Navigationbar handleBack={handleBack} header={'點餐'} cart={0} template={1}/>
        <div id="people">
          <div id="one" onClick={() => {
            localStorage.setItem('type', 'one');
            window.location.href = `#/main/order/${id}/menu`
          }}>
            <img src="src/Unmanned restaurant-05@2x.png" />
            <p>個人</p>
          </div>
          <div id="many" onClick={() => {
            if(localStorage.getItem('name').indexOf('unknown user')!=-1){
              $("#needloginin").show();
              console.log("hfffi")
            }
            else
              window.location.href = `#/main/order/${id}/many`
          }}>
            <img src="src/Unmanned restaurant-06@2x.png" />
            <p>揪團</p>
          </div>
        </div>
        <Tabbar coupon ={0} main={1} profile={0}/>
        <div id="needloginin"  onClick={() => {
            $("#needloginin").hide();
            console.log("hi")
          }} >
          <div class="needloginin__title">請先登入</div>
          <div class="needloginin__content">揪團功能僅限登入客戶使用</div>         
        </div>
      </div>
    )
  }
}

export default Order
