import React, { Component } from 'react'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'
import './Final.css'

class Final extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { showOrder } = this.props
    const mainMoney = showOrder().main.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    return (
      <div style={{display: 'flex', justifyContent: 'center', background: 'rgb(255, 123, 159)', height: '100vh',overflowY:'hidden'}}>
        <Navigationbar handleBack={null} header={' 黑膠漢堡 '} cart={0} template={0}/>
        <div class="checklist">
            <div class="fcontainer">
                <div class="prograss__title">等待 10 分鐘，請 02 號取餐</div>
                <div class="prograss__bar">
                    <div class="bar__status1">
                        <div class="circle"></div>
                        <div class="content">接訂單</div>
                    </div>        
                    <div class="bar__status2">
                        <div class="circle"></div>
                        <div class="content">準備中</div>
                        </div>
                    <div class="bar__status3">
                        <div class="circle"></div>
                        <div class="content">已完成</div>
                    </div>
                </div>
                <p class="list__title">購物籃</p>

                <div class="list">
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
                <div class="total">
                    <p>總金額</p>
                    <p class="money">{`$ ${mainMoney}`}</p>
                </div>
            </div>
        </div>
        <Tabbar />
    </div>
    )
  }
}

export default Final
