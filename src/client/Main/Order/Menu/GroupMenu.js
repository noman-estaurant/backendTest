import React, { Component } from 'react'
import MainMeal from './MainMeal/MainMeal'
import Tabbar from '../../Common/Tabbar'
import Navigationbar from '../../Common/Navigationbar'
import './GroupMenu.css'

class GroupMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      header: '揪團點餐',
      handleBack: () => {
        const id = window.location.hash.split('/')[3]
        window.location.href = `#/main/order/${id}`
      }
    }
  }

  detailBack = () => {
    this.setState({
      page: 0,
      header: '點餐',
      handleBack: () => {
        const id = window.location.hash.split('/')[3]
        window.location.href = `#/main/order/${id}`
      }
    })
  }

  render() {
    const { handleMain, handleSide, handleDrink, sum } = this.props
    const GetPage = () => {
      const ChangePage = (page, header, handleBack) => {
        this.setState({
          page,
          header,
          handleBack
        })
      }
      switch(this.state.page) {
        case 0:
          return (
            <div id="big-menu">
              <div id="main-meal" onClick={() => {
                ChangePage(1, '主餐', this.detailBack)
              }}>
                  <img src="src/unmannedRestaurant07@2x.png" />
                  <p>主餐</p>
              </div>
              <div id="side-meal">
                  <img src="src/unmannedRestaurant08@2x.png" />
                  <p>副餐</p>
              </div>
              <div id="drinks">
                  <img src="src/unmannedRestaurant09@2x.png" />
                  <p>飲料</p>
              </div>
            </div>
          )
          break
        case 1:
          return (
            <MainMeal handleMain={handleMain}/>
          )
          break
      }
    }
    return (
      <div>
        <Navigationbar handleBack={this.state.handleBack} header={this.state.header} cart={1} template={1} sum={sum}/>
          {
            GetPage()
          }
        <Tabbar />
      </div>
    )
  }
}

export default GroupMenu
