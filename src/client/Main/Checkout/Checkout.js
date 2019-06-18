import React, { Component } from 'react'
import './Checkout.css'

class Checkout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const getDetail = (title, item, name, detail, money) => {
      let s = ""
      s = s + '   <p class="title">' + title + '</p>'
      let i
      for (i = 0; i < item; i++) {
          s = s + '<div class="item">'
          s = s + '   <p class="name">' + name + ' </p>'
          s = s + '   <p class="detail">' + detail + '</p>'
          s = s + '   <p class="howmuch">$ ' + money + '</p>'
          s = s + '</div>'
      }
      return s;
    }
    $("#pay").hide()
    $(".list").append(getDetail("我的主餐", 2, "黑膠鮮檸鮭魚堡", "不要洋蔥，正常", "80"))
  }

  render() {
    return (
      <div >
        <div class="checklist">
            <div class="container">
                <div class="list" />
                <div class="checkout" onClick={() => $("#pay").show()}>結帳 </div>
                <div class="total">
                    <p>總金額</p>
                    <p class="money">$ 160</p>
                </div>
            </div>
        </div>
        <div id="pay" class="pay is-hidden">
        <div class="modal">
            <div class="bycredit"><img src="src/credit.png" onClick={() => window.location.href = '#/main/pay'}/></div>
            <div class="byphone"><img src="src/phone.png" /></div>
            <div class="cancel-border" onClick={() => $("#pay").hide()}>取消 </div>
            <div class="cancel">取消</div>

        </div>
    </div>
      </div>
    )
  }
}

export default Checkout
