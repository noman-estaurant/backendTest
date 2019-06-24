import React, { Component } from 'react'
import './Profile.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'
import Flag from '../Common/Flag'

class Profile extends Component {

  render() {
    const showFlag = () => {
        if(localStorage.getItem('type')!="one"){ 
          console.log("dsfeweq");
          return( <Flag /> )
        }
      }
    return (
        <div>
            {showFlag()}
            <div class="profilebody">
            <Navigationbar handleBack={null} header={'我'} cart={0} template={0}/>
            <div class="main_profile">
                <div class="head">
                    <div class="head__img"></div>
                    <div class="head__name">Name</div>
                </div>
                <div class="list">
                        <div class="list__item">
                            <img class="item__img" src="src/star@2x.png"></img>
                            <div class="item__text">我的最愛</div>
                            <img class="item__svg" src="src/rigth-arrow.svg"></img>
                        </div>
                        <div class="list__item">
                            <img class="item__img" src="src/history (2).png"></img>
                            <div class="item__text">支付方式</div>
                            <img class="item__svg" src="src/rigth-arrow.svg"></img>
                        </div>
                        <div class="list__item">
                            <img class="item__img" src="src/history (1).png"></img>
                            <div class="item__text">交易歷史紀錄</div>
                            <img class="item__svg" src="src/rigth-arrow.svg"></img>
                        </div>
                        <div class="list__item">
                            <img class="item__img" src="src/settings@2x.png"></img>
                            <div class="item__text">設定</div>
                            <img class="item__svg" src="src/rigth-arrow.svg"></img>
                        </div>
                </div>
                </div>

        </div>
        <Tabbar coupon ={0} main={0} profile={1}/>
    </div>
    )
  }
}

export default Profile
