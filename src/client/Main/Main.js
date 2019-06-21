import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Home from './Home/Home'
import Tabbar from './Common/Tabbar'
import Order from './Order/Order'
import Menu from './Order/Menu/Menu'
import GroupMenu from './Order/Menu/GroupMenu'
import Group from './Order/Group/Group'
import Host from './Order/Group/Host/Host'
import Follow from './Order/Group/Follow/Follow'
import Navigationbar from './Common/Navigationbar'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import Pay from './Pay/Pay'
import Checkout from './Checkout/Checkout'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      main: [],
      side: [],
      drink: [],
      store: null
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

  deleteOrder = (type, value, position) => {
    const temp = value.filter((element, index) => {
      return index !== position
    })
    this.setState({
      [type]: temp
    })

  }

  componentWillMount() {
<<<<<<< HEAD
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
=======
		//const isLogin = localStorage.getItem('token')
    //if (!isLogin) window.location.href = '#/'
>>>>>>> 99423cb4ba16e1b325c1d8433191645722a9207a
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/main' render={
            props => 
              <Home {...props} 
              handleStore={this.handleStore}
             />}/>
          <Route exact path='/main/order/:id' render={
            props =>
              <Order
                {...props}
                handleBack={() => window.location.href = '#/main'}
              />} />
          <Route exact path='/main/order/:id/one' render={
            props =>
              <Menu
                {...props}
                handleMain={this.handleMain}
                handleSide={this.handleSide}
                handleDrink={this.handleDrink}
                sum={this.state.main.length + this.state.side.length + this.state.drink.length}
              />
            }
          />
          <Route exact path='/main/order/:id/groupmenu' render={
            props =>
              <GroupMenu
                {...props}
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
              />
            }
          />
          <Route exact path='/main/order/:id/many/host' render={
            props =>
              <Host
                {...props}
              />
            }
          />
          <Route exact path='/main/order/:id/many/follow' render={
            props =>
              <Follow
                {...props}
              />
            }
          /> 
          <Route path='/main/shoppingcart' render={props =>
          <ShoppingCart
            {...props}
            handleBack={() => window.location.href = `#/main/order/${this.state.store}`}
            showOrder={this.showOrder}
            deleteOrder={this.deleteOrder}
            sum={this.state.main.length + this.state.side.length + this.state.drink.length}
            />}
          />
          <Route path='/main/checkout' render={props =>
          <Checkout
            {...props}
            handleBack={() => window.location.href = `#/main/order/${this.state.store}`}
            showOrder={this.showOrder}
            />}
          />
          <Route path='/main/pay' component={Pay} />
        </div>
      </HashRouter>
    )
  }
}

export default Main
