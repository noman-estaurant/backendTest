import React, { Component } from 'react'
import Navigationbar from '../Common/Navigationbar'
import './Checkout.css'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payPage: false
    }
  }

  componentDidMount() {
    $("#pay").hide()
  }

  render() {
    const { showOrder } = this.props
    const mainMoney = showOrder().main.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: 'rgb(255, 123, 159)', height: '100vh'}}>
        <Navigationbar handleBack={() => {window.location.href = '/#/main/shoppingcart'}} header={' 結帳 '} cart={0} template={0}/>
        <div class="checklist" style={this.state.payPage ? {filter: 'blur(5px'} : null}>
          <div class="container">
            <div class="list">
              <p class="title">我的主餐</p>
              {
                showOrder().main.map(element => (
                  <div class="item">
                    <p class="name">{element.name}</p>
                    <p class="detail"></p>
                    <p class="howmuch">{`$ ${element.money}`}</p>
                  </div>
                ))
              }
            </div>
            <div class="checkout" onClick={() => {
              $("#pay").show()
              this.setState({
                payPage: true
              })
            }}>結帳 </div>
            <div class="total">
              <p style={{margin: 0}}>總金額</p>
              <p class="money">{`$ ${mainMoney}`}</p>
            </div>
          </div>
        </div>
        <div id="pay" class="pay is-hidden">
        <div class="modal">
          <div class="bycredit"><img src="src/credit.png" onClick={() => window.location.href = '#/main/pay'}/></div>
          <div class="byphone"><img src="src/phone.png" onClick={() => {
            fetch('https://luffy.ee.ncku.edu.tw:17785/api/pay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "amount": `${mainMoney}`,
                // TODO: confirmUrl填入訂單完成的網址，我做一次在main page裡面，你們之後在依樣畫葫蘆即可
                "confirmUrl": "https://luffy.ee.ncku.edu.tw:17785/#/main",
                "productName": "訂單",
                "currency": "TWD",
                "token": `${localStorage.getItem('token')}`
              })
            })
            .then(res => res.json())
            .then(data => window.location.href = `${data.url}`)
          }}/></div>
          <div class="cancel" onClick={() => {
            $("#pay").hide()
            this.setState({
              payPage: false
            })
          }}>取消</div>
        </div>
    </div>
      </div>
    )
  }
}

export default Checkout
