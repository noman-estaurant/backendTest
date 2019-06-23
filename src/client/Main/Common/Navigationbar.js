import React, { Component } from 'react'
import './Navigationbar.css'

class Navigationbar extends Component {
  
  state = {
    fav:false
  }
  starImage = () => this.state.fav ? 'src/star.png' : 'src/nullstar.png'

  componentDidMount() {
    $("#hint").hide();
  }

  render() {
    const { handleBack, header, cart, template, sum ,fav} = this.props
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
        {
          fav === 1 ? 
          <img class="cart" src={this.starImage()} onClick={() => {
            $("#hint").show();
//            window.location.href = '#/main/shoppingcart'
            this.setState({
              fav: true
            })  
          }} />
          : null
        }
        <div id="hint" onClick={() => {
            $("#hint").hide();
          }} >
          <div class="hint__title">我的最愛</div>
          <div class="hint__content">您可將喜愛的餐點加入我的最愛<br/>提供您下次點餐</div>         
        </div>
      </div>
    )
  }
}

export default Navigationbar
