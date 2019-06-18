import React, { Component } from 'react'
import './Pay.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'

class Pay extends Component {

  componentDidMount() {
    const mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      direction: "horizontal",
      pagination: {},
      on: {
          // slideChangeTransitionStart: function() {
          //     if ((this.activeIndex) == 1) {
          //         $("#button").show("slow");
          //     }
          // },
      },
    });
  }

  render() {
    return (
      <div>
        <div class="main">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                  <div class="swiper-slide post-content">
                      <div id="credit">
                          <img src="src/16@3x.png" style={{width: '280px', height: '175px'}} />
                          <div class="shape"> </div>
                      </div>
                  </div>
                  <div class="swiper-slide post-content">
                      <div id="visa">
                          <img src="src/20@3x.png" style={{width: '280px', height: '175px'}} />
                          <div class="shape"></div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div class="data">
            <div class="total">總金額
                <div class="howmuch">$ 160</div>
            </div>
            <div class="cardno">輸入卡號<br />
                <div class="box">
                    <div class="input-border">
                        <input class="inputs" type="text" maxlength="4" />
                    </div>
                    <div class="input-border">
                        <input class="inputs" type="text" maxlength="4" />
                    </div>
                    <div class="input-border">
                        <input class="inputs" type="text" maxlength="4" />
                    </div>
                    <div class="input-border">
                        <input class="inputs" type="text" maxlength="4" />
                    </div>
                </div>
            </div>

            <div class="carddate">有效期限<br />
                <div class="box">
                    <div class="input-border">
                        <input class="month" type="text" maxlength="2" />
                        <p>月</p>
                    </div>
                    <div class="input-border">
                        <input class="year" type="text" maxlength="2" />
                        <p>年</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-border">付款
            <div class="button">付款</div>
        </div>
      </div>
    )
  }
}

export default Pay
