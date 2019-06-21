import React, { Component } from 'react'
import './Navigationbar.css'

class Navigationbar extends Component {
  render() {
    const { handleBack, header, cart, template, sum } = this.props
    let number = 0
    if (sum) {
      number = sum
    }
    const style = () => {
      if (template === 0)
        return {
          background: 'rgb(255,123,159)',
          color: '#ffffff'
        }
      return null
    }
    return (
      <div class="navigationbar" style={style()}>
        {
          handleBack !== null ? <img class="back" src="src/left-arrow-chevron.svg" onClick={
            () => {this.props.handleBack()}}/>
          : null
        }
        <p class="title">{header}</p>
        {
          cart === 1 ?
          <img class="cart" src="src/shoppingCart@3x.png" onClick={() => {
            window.location.href = '#/main/shoppingcart'
          }} />
          : null
        }
        {
          cart === 1 ?
          <div class="added">{number}</div>
          : null
        }
      </div>
    )
  }
}

export default Navigationbar
