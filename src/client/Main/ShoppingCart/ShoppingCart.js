import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigationbar from '../Common/Navigationbar'
import Flag from '../Common/Flag'

import './ShoppingCart.css'

class ShoppingCart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showMain: false,
    }
  }


  handleMain = () => {
    this.setState({
      showMain: !this.state.showMain
    })
  }

  render() {
    const { handleBack, showOrder, deleteOrder, sum } = this.props
    const mainMoney = showOrder().main.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    const sideMoney = showOrder().side.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    const drinkMoney = showOrder().drink.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0)
    let modal
    const showFlag = () => {
      if(localStorage.getItem('type')!="one"){ 
        console.log("dsfeweq");
        return( <Flag /> )
      }
    }
    return (
      <div style={{height: '100vh'}}>
        {showFlag()}
        <Navigationbar handleBack={handleBack} header={' 購物車 '} cart={0} template={0}/>
        <div class='cartPage'>
          {
            sum === 0 ?
            (
              <div class='cartPage__empty empty'>
                <img class='empty__img' src="src/unmannedRestaurant03@3x.png" />
                <div>
                  <p class='empty__title' >購物車內尚無餐點</p>
                  <p class='empty__subtitle' >快點餐，讓購物車多點東西吧！</p>
                </div>
              </div>
            )
            :
            (
            <div class='cartPage__notempty notempty'>
              <div class='notempty__meal meal' style={{marginTop: '83px'}} onClick={this.handleMain} >
                <img class='meal__img' src='src/unmannedRestaurant07@2x.png' />
                <div class='meal__info'>
                  <p class='info__type'>我的主餐</p>
                  <div class='info__money'>
                    <p>{`X ${showOrder().main.length}`}</p>
                    <p class='money__hownuch'>{`$ ${mainMoney}`}</p>
                  </div>
                </div>
              </div>
              {
                this.state.showMain ?
                showOrder().main.map((element, index) => {
                  return (
                    <div class='notempty__meal meal' style={{marginTop: '11px'}}>
                      <img class='meal__cancel' src='src/cross.png' onClick={() => deleteOrder('main', showOrder().main, index)}/>
                      <div class='meal__detail detail'>
                        <p class='detail__name'>{element.name}</p>
                        <div class='detail__checkbox checkbox'>
                          <input class='checkbox__input' type='checkbox' name='customized' value='onion' />
                          <p class='checkbox__text'>不要洋蔥</p>
                        </div>
                        <div class='detail__checkbox checkbox'>
                          <input class='checkbox__input' type='checkbox' name='customized' value='cucumber' />
                          <p class='checkbox__text'>不要酸黃瓜</p>
                        </div>
                      </div>
                      <p class='meal__price'>{`$ ${element.money}`}</p>
                    </div>
                  )
                })
                :
                null
              }
              <div class='notempty__meal meal'>
                <img class='meal__img meal__img--side' src="src/unmannedRestaurant08@2x.png" />
                <div class='meal__info'>
                  <p class='info__type'>我的副餐</p>
                  <div class='info__money money'>
                    <p>{`X ${showOrder().side.length}`}</p>
                    <p class='money__hownuch'>{`$ ${sideMoney}`}</p>
                  </div>
                </div>
              </div>
              <div class='notempty__meal meal'>
                <img class='meal__img meal__img--drink' src="src/unmannedRestaurant09@2x.png" />
                <div class='meal__info'>
                  <p class='info__type'>我的飲料</p>
                  <div class='info__money'>
                    <p>{`X ${showOrder().drink.length}`}</p>
                    <p class='money__hownuch'>{`$ ${drinkMoney}`}</p>
                  </div>
                </div>
              </div>
            </div>
            )
          }
        </div>
        {
          sum === 0
          ?
            null
          :
           (
           <div class='checkout'>
           <Link class='checkout__button' to='/main/checkout'>結帳</Link>
           <div class='checkout__info'>
             <p class='info__money'>總金額</p>
             <p class='info__number'>{`$ ${mainMoney + sideMoney + drinkMoney}`}</p>
           </div>
         </div>
           )
        }
      </div>
    )
  }
}

export default ShoppingCart
