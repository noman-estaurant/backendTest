import React, { Component } from 'react'
import './MainMeal.css'

class MainMeal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: []
    }
  }

  componentDidMount() {
    const { handleMain } = this.props
    const addShow = add => {
      this.setState({
        show: [...this.state.show, add]
      })
    }
    const getMenu = (id, img, name, money) => {
      return (
        <div class="menu">
          <div class="card">
            <img src={img} />
            <div class="content">
              <p class="title">{name}</p>
              <p class="howmuch">{`$ ${money}`}</p>
            </div>
          </div>
          <div class="add" onClick={a => {
            handleMain({
              id,
              name,
              money
            })
            $(".navigationbar .added").animate({width: "25px", height: "25px", fontSize: "14px"}, 'fast');
            $(".navigationbar .added").animate({width: "15px", height: "15px", fontSize: "8px"}, 'fast');
          }}>+</div>
        </div>
      );
    }
    $.ajax({
      async: true,
      crossDomain: true,
      url: "https://luffy.ee.ncku.edu.tw:17785/api/menu",
      method: "GET",
      dataType: "json",
      success: function(data) {
          console.log(data);
          var i;
          for (i = 0; i < data.result.length; i++) {
              console.log(data.result[i]);
              addShow(getMenu(data.result[i].id, data.result[i].photo, data.result[i].name, data.result[i].price))
          }
      },
      error: function(result) {
          console.log(result);
      }
    })
  }
  render() {
    
    return (
      <div id="main-dish">
        { this.state.show.map(element => {
          return element
        }) }
      </div>
    )
  }
}

export default MainMeal
