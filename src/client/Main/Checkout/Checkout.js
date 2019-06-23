import React, { Component } from 'react'
import Navigationbar from '../Common/Navigationbar'
import './Checkout.css'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalon: false
    }
  }

  componentDidMount() {
    $("#pay").hide();
    $("#check").hide();
    $("#game").hide()
  }

  modal = (type) => {
    const { showOrder } = this.props
    const mainMoney = showOrder().main.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    switch(type){
      case "one": {
        console.log("one  ")
      return(
        <div>
          <div class="checkout__button" onClick={() => {
            $("#pay").show()
            $(".checkout__button").hide()
            $(".sum").hide()
            this.setState({
              modalon: true
            }) }}>結帳 </div>
          <div class="sum">
            <p style={{margin: 0}}>總金額</p>
            <p class="money" style={{margin: 0}}>{`$ ${mainMoney}`}</p>
          </div>
        </div>
      )};
      case "follow":{
        console.log("follow")
        return( 
          <div>
            <div class="checkout__button" style={{width: 132+ 'px'}} onClick={() => {
              $("#check").show()
              $(".checkout__button").hide();
              $(".sum").hide();
              this.setState({
                modalon: true
              }) }}>準備結帳 </div>
            <div class="sum">
              <p style={{margin: 0}}>總金額</p>
              <p class="money"style={{margin: 0}}>{`$ ${mainMoney}`}</p>
            </div> 
          </div>
        );
      }  
      case "host":{
        console.log("host")
        return( 
          <div>
            <div class="checkout__button" style={{width: 132+ 'px'}} onClick={() => {
              $("#check").show()
              $(".checkout__button").hide();
              $(".sum").hide();
              this.setState({
                modalon: true
              }) }}>準備結帳 </div>
            <div class="sum">
              <p style={{margin: 0}}>總金額</p>
              <p class="money"style={{margin: 0}}>{`$ ${mainMoney}`}</p>
            </div> 
          </div>
        );
      }  
    }
  }

  render() {
    const type = localStorage.getItem('type')
    const { showOrder } = this.props
    const mainMoney = showOrder().main.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: 'rgb(255, 123, 159)', height: '100vh'}}>
        <Navigationbar handleBack={() => {window.location.href = '/#/main/shoppingcart'}} header={' 結帳 '} cart={0} template={0} fav={1}/>
        <div class="checklist" style={this.state.modalon ? {filter: 'blur(10px)'} : null}>
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
          </div>
        {this.modal(type)}
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
                $(".checkout__button").show()
                $(".sum").show()
                this.setState({
                  modalon: false
                })
              }}>取消</div>
          </div>
        </div>
        <div id="check" class="check is-hidden">
          <div class="modal">
            <div class="title">準備結帳</div>
            <div class="content">按下準備結帳後將無法再更改餐點<br />並且在所有人都已準備結帳後進行結帳</div>
            <div class="cancel" onClick={() => {
                  $("#check").hide()
                  $(".checkout__button").show()
                  $(".sum").show()
                  this.setState({
                    modalon: false
                  })
            }}>取消</div>
            <div class="finish" onClick={() => {  
                  $("#check").hide()
                  $("#game").show()  
                  }}>完成</div>
          </div>
        </div>
        <div id="game" class="check is-hidden">
          <div class="modal">
            <div class="title">領取優惠</div>
            <div class="content">您可以通過遊戲取得優惠</div>
            <div class="cancel" onClick={() => {
                  $("#game").hide()
                  $(".checkout__button").hide()
                  $(".sum").show()
                  this.setState({
                    modalon: false
                  })
            }}>取消</div>
            <div class="finish" onClick={() => {  
              console.log("gg")
              window.location.href = '#/main/game'
                  }}>領取</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout
