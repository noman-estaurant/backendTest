import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './Home/Home'
import Tabbar from './Common/Tabbar'
import Order from './Order/Order'
import Menu from './Order/Menu/Menu'
import Group from './Order/Group/Group'
import Host from './Order/Group/Host/Host'
import Follow from './Order/Group/Follow/Follow'
import Navigationbar from './Common/Navigationbar'
import Flag from './Common/Flag'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import Pay from './Pay/Pay'
import Checkout from './Checkout/Checkout'
import Profile from './Profile/Profile'
import Coupon from './Coupon/Coupon'
import Final from './Final/Final'
import Game from './Game/Game'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      main: [],
      side: [],
      drink: [],
      store: null,
      coupon: null
    }
  }

  handleMain = value => {
    this.setState({
      main: [...this.state.main, value]
    })
  }

  handleSide = value => {
    this.setState({
      side: [...this.state.side, value]
    })
  }

  handleDrink = value => {
    this.setState({
      drink: [...this.state.drink, value]
    })
  }

  handleStore = value => {
    this.setState({
      store: value
    })
  }

  showOrder = () => {
    const main = this.state.main
    const side = this.state.side
    const drink = this.state.drink
    const store = this.state.store
    return {
      main,
      side,
      drink,
      store
    }
  }

  getCoupon = (num) => {
    this.setState({
      coupon: num
    })
  }

  showCoupon = () => {
    const coupon = this.state.coupon
    return {
      coupon
    }
  }

  deleteOrder = (type, value, position) => {
    const temp = value.filter((element, index) => {
      return index !== position
    })
    this.setState({
      [type]: temp
    })

  }

  componentWillMount() {
    if (window.location.href.indexOf('?') !== -1) {
      const id = window.location.href.split('=')[2]
      const orderId = window.location.href.split('=')[1].split('&')[0]
      fetch('https://luffy.ee.ncku.edu.tw:17785/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          orderId
        })
      })
    } 
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/main' render={
            props => 
              <Home 
                {...props} 
                {...localStorage.setItem('main', '/main')}
                {...localStorage.setItem('tab', 'main')}
                handleStore={this.handleStore}
             />}/>
          <Route exact path='/main/order/:id' render={
            props =>
              <Order
                {...props}
                {...localStorage.setItem('main', '/main/order/:id')}
                {...localStorage.setItem('tab', 'main')}
                handleBack={() => window.location.href = '#/main'}
              />} />
          <Route exact path='/main/order/:id/menu' render={
            props =>
              <Menu
                {...props}
                {...localStorage.setItem('main', '/main/order/:id/menu')}
                {...localStorage.setItem('tab', 'main')}

                handleMain={this.handleMain}
                handleSide={this.handleSide}
                handleDrink={this.handleDrink}
                sum={this.state.main.length + this.state.side.length + this.state.drink.length}
              />
            }
          />
         
          <Route exact path='/main/order/:id/many' render={
            props =>
              <Group
                {...props}
                {...localStorage.setItem('main', '/main/order/:id/many')}
                {...localStorage.setItem('tab', 'main')}
                handleBack={() => {window.location.href = '#/main/order/:id/'}}

              />
            }
          />
          <Route exact path='/main/order/:id/many/host' render={
            props =>
              <Host
                {...props}
                {...localStorage.setItem('main', '/main/order/:id/many/host')}
                {...localStorage.setItem('tab', 'main')}
                handleBack={() => {window.location.href = '#/main/order/:id/many'}}
              />
            }
          />
          <Route exact path='/main/order/:id/many/follow' render={
            props =>
              <Follow
                {...props}
                {...localStorage.setItem('main', '/main/order/:id/many/follow')}
                {...localStorage.setItem('tab', 'main')}
                handleBack={() => {window.location.href = '#/main/order/:id/many'}}
              />
            }
          /> 
          <Route path='/main/shoppingcart' render={props =>
          <ShoppingCart
            {...props}
            {...localStorage.setItem('main', '/main/shoppingcart')}
            {...localStorage.setItem('tab', 'main')}
            handleBack={() => window.location.href = `#/main/order/${this.state.store}/menu`}
            showOrder={this.showOrder}
            deleteOrder={this.deleteOrder}
            sum={this.state.main.length + this.state.side.length + this.state.drink.length}
            />}
          />
          <Route exact path='/main/profile' render={props =>
          <Profile
            {...props}
            {...localStorage.setItem('tab', 'profile')}
            />}
          />
           <Route exact path='/main/coupon' render={props =>
          <Coupon
            {...props}
            {...localStorage.setItem('tab', 'coupon')}
            showCoupon={this.showCoupon}

            />}
          /> 
          
          <Route path='/main/checkout' render={props =>
          <Checkout
            {...props}
            {...localStorage.setItem('main', '/main/checkout')}
            {...localStorage.setItem('tab', 'main')}
            handleBack={() => window.location.href = `#/main/order/${this.state.store}`}
            showOrder={this.showOrder}
            />}
          />
          <Route path='/main/game' render={props =>
          <Game
            {...localStorage.setItem('main', '/main/final')}
            {...localStorage.setItem('tab', 'main')}
            {...props}
            getCoupon={this.getCoupon}
            />}
          />
          <Route path='/main/pay' component={Pay} />
          <Route exact path='/main/final' render={props =>
          <Final
            {...props}
            {...localStorage.setItem('main', '/main/final')}
            {...localStorage.setItem('tab', 'main')}
            showOrder={this.showOrder}
            />}
          />
        </div>
      </HashRouter>
    )
  }
}

export default Main
