import React, { Component } from 'react'
import './Game.css'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'

var temperate_selection

class Game extends Component {

    constructor(props) {
        super(props)
        this.state = {
            row_number: 0,
            column_number: 0
        }
    }

    

    componentDidMount () {
        var selected_box_row=['cabinet_box_row1','cabinet_box_row2','cabinet_box_row3','cabinet_box_row4']
        var selected_box_column=['cabinet_box_column1','cabinet_box_column2','cabinet_box_column3','cabinet_box_column4']
        var condition_number=0
        $('.game_body').on('click', function () {
            $('.first_welcome').fadeOut(500); 
      
            $('.cabinet_numbers').on('click', function() {
              if (condition_number==0){
                  $(this).addClass('selected');
                  $(this).removeClass('cabinet_numbers');
                  condition_number=1;
                  temperate_selection=this;
                          $('#cabinet_ok').fadeTo("100",1);
              }
              if (condition_number==1){
                  $(temperate_selection).removeClass('selected');
                  $(temperate_selection).addClass('cabinet_numbers');
                  $(this).addClass('selected'); 
                  $(this).removeClass('cabinet_numbers');
                  temperate_selection=this;
            }
            });
      
            $('#cabinet_ok').on('click', function() {
                 temperate_selection=(($(temperate_selection).attr('id')));
      
                   if (condition_number==1){ 
                      for(var i = 0, j = selected_box_row.length; i < j; i++) {
                              console.log("hihihi");
                          if($(temperate_selection).hasClass(selected_box_row[i])) {
                                this.setState(state => ({ row_number:i+1 }))
                                      break;
                          }
                      }
                      
                      for(var i = selected_box_column.length, j = 0; i > j; i--) {
                          if($(temperate_selection).hasClass(selected_box_column[i])) {
                            this.setState(state => ({ column_number:i-1 }))
                            break;
                          }
                      }

           
                      console.log(temperate_selection);
                      var str = temperate_selection;
                      var res = str.split("cabinet_number");
                      var str = res.join("");
                      console.log(str);
                      $("#game_finish2").html("您的取餐格是"+str+"號！")
                      $('#game_finish_back, .game_finish').show(1); 
                      $('#game_finish1, #game_finish2').delay(1500).fadeOut(800);
                      $('#game_finish_coupon, #game_finish_coupon_get').delay(3000).show(800);              
                    }
            })
          })
    }

    render() {
    return (
        <div class="game_body">
            <div id="first_welcome_back" class="first_welcome"></div>
            <div id="first_welcome_first" class="first_welcome">猜猜看</div>
            <div id="first_welcome_second1" class="first_welcome">猜猜看您的取餐格將會在幾號？</div>
		    <div id="first_welcome_second2" class="first_welcome">答對即優惠</div>

            <p class="choose_box box_row1 box_column1" id="cabinet_box1"></p>
            <p class="choose_box box_row1 box_column2" id="cabinet_box2"></p>
            <p class="choose_box box_row1 box_column3" id="cabinet_box3"></p>
            <p class="choose_box box_row1 box_column4" id="cabinet_box4"></p>
            <p class="choose_box box_row2 box_column1" id="cabinet_box5"></p>
            <p class="choose_box box_row2 box_column2" id="cabinet_box6"></p>
            <p class="choose_box box_row2 box_column3" id="cabinet_box7"></p>
            <p class="choose_box box_row2 box_column4" id="cabinet_box8"></p>
            <p class="choose_box box_row3 box_column1" id="cabinet_box9"></p>
            <p class="choose_box box_row3 box_column2" id="cabinet_box10"></p>
            <p class="choose_box box_row3 box_column3" id="cabinet_box11"></p>
            <p class="choose_box box_row3 box_column4" id="cabinet_box12"></p>
            <p class="choose_box box_row4 box_column1" id="cabinet_box13"></p>
            <p class="choose_box box_row4 box_column2" id="cabinet_box14"></p>
            <p class="choose_box box_row4 box_column3" id="cabinet_box15"></p>
            <p class="choose_box box_row4 box_column4" id="cabinet_box16"></p>

            <p class="choose_topbox topbox_row1 topbox_column1" id="cabinet_topbox1"></p>
            <p class="choose_topbox topbox_row1 topbox_column2" id="cabinet_topbox2"></p>
            <p class="choose_topbox topbox_row1 topbox_column3" id="cabinet_topbox3"></p>
            <p class="choose_topbox topbox_row1 topbox_column4" id="cabinet_topbox4"></p>
            <p class="choose_topbox topbox_row2 topbox_column1" id="cabinet_topbox5"></p>
            <p class="choose_topbox topbox_row2 topbox_column2" id="cabinet_topbox6"></p>
            <p class="choose_topbox topbox_row2 topbox_column3" id="cabinet_topbox7"></p>
            <p class="choose_topbox topbox_row2 topbox_column4" id="cabinet_topbox8"></p>
            <p class="choose_topbox topbox_row3 topbox_column1" id="cabinet_topbox9"></p>
            <p class="choose_topbox topbox_row3 topbox_column2" id="cabinet_topbox10"></p>
            <p class="choose_topbox topbox_row3 topbox_column3" id="cabinet_topbox11"></p>
            <p class="choose_topbox topbox_row3 topbox_column4" id="cabinet_topbox12"></p>
            <p class="choose_topbox topbox_row4 topbox_column1" id="cabinet_topbox13"></p>
            <p class="choose_topbox topbox_row4 topbox_column2" id="cabinet_topbox14"></p>
            <p class="choose_topbox topbox_row4 topbox_column3" id="cabinet_topbox15"></p>
            <p class="choose_topbox topbox_row4 topbox_column4" id="cabinet_topbox16"></p>
		
            <p class="cabinet_top_rectangle_background" id="cabinet_top_rectangle_background1"></p>
            <p class="cabinet_top_rectangle_background" id="cabinet_top_rectangle_background2"></p>
            <div><img src="https://i.imgur.com/UkpZJmL.png" class="cabinet_top_circle" width="19px" id="cabinet_top_circle1"/></div>
            <div><img src="https://i.imgur.com/UkpZJmL.png" class="cabinet_top_circle" width="19px" id="cabinet_top_circle2"/></div>
            <div><img src="https://i.imgur.com/UkpZJmL.png" class="cabinet_top_circle" width="19px" id="cabinet_top_circle3"/></div>
            <p class="cabinet_top_rectangle" id="cabinet_top_rectangle1"></p>
            <p class="cabinet_top_rectangle" id="cabinet_top_rectangle2"></p>

            <p id="all_cabinet"></p>
    
		    <div><img src="https://i.imgur.com/6KO0Uoa.png" alt="all_shed" width="100%" id="all_shed"/></div>
            <div><img src="https://i.imgur.com/RgjQzqz.png" alt="all_backgrpund" id="all_background" width="100%"/></div>
		    <div><img src="https://i.imgur.com/UphdGf1.png" alt="cabinet_ok" id="cabinet_ok"/></div>

            <div class="cabinet_numbers cabinet_box_row1 cabinet_box_column1" id="cabinet_number1">01</div>
            <div class="cabinet_numbers cabinet_box_row1 cabinet_box_column2" id="cabinet_number2">02</div>
            <div class="cabinet_numbers cabinet_box_row1 cabinet_box_column3" id="cabinet_number3">03</div>
            <div class="cabinet_numbers cabinet_box_row1 cabinet_box_column4" id="cabinet_number4">04</div>
            <div class="cabinet_numbers cabinet_box_row2 cabinet_box_column1" id="cabinet_number5">05</div>
            <div class="cabinet_numbers cabinet_box_row2 cabinet_box_column2" id="cabinet_number6">06</div>
            <div class="cabinet_numbers cabinet_box_row2 cabinet_box_column3" id="cabinet_number7">07</div>
            <div class="cabinet_numbers cabinet_box_row2 cabinet_box_column4" id="cabinet_number8">08</div>
            <div class="cabinet_numbers cabinet_box_row3 cabinet_box_column1" id="cabinet_number9">09</div>
            <div class="cabinet_numbers cabinet_box_row3 cabinet_box_column2" id="cabinet_number10">10</div>
            <div class="cabinet_numbers cabinet_box_row3 cabinet_box_column3" id="cabinet_number11">11</div>
            <div class="cabinet_numbers cabinet_box_row3 cabinet_box_column4" id="cabinet_number12">12</div>
            <div class="cabinet_numbers cabinet_box_row4 cabinet_box_column1" id="cabinet_number13">13</div>
            <div class="cabinet_numbers cabinet_box_row4 cabinet_box_column2" id="cabinet_number14">14</div>
            <div class="cabinet_numbers cabinet_box_row4 cabinet_box_column3" id="cabinet_number15">15</div>
            <div class="cabinet_numbers cabinet_box_row4 cabinet_box_column4" id="cabinet_number16">16</div>

            <div id="game_finish_back"></div>
            <div class="game_finish"> 
                <div id="game_finish1"><b>答對了</b></div>
                <div id="game_finish2"></div>
            </div>
            <img src="https://i.imgur.com/S6CWG3l.png" alt="game_finish_coupon" id="game_finish_coupon"></img>
            <div id="game_finish_coupon_get" onClick={() => {
                window.location.href = '#/main/coupon'
             }} >領取</div>

        </div>
    )
  }
}

export default Game
