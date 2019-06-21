import React, { Component } from 'react'
import geolocation from './geolocation.js'
import Navigationbar from '../Common/Navigationbar'
import Tabbar from '../Common/Tabbar'
import './Home.css'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Data: [],
      lat: 120.221929,
      lng: 22.99662
    }
  }

  componentDidMount() {
    geolocation.getLocation().then(position => {
      const userPosition_lat=position.coords.latitude
      const userPosition_lng=position.coords.longitude
      this.setState({
        lat: userPosition_lat,
        lng: userPosition_lng
      })
      $.ajax({
        url:"https://luffy.ee.ncku.edu.tw:17785/api/restaurant",
        method:"POST",
        data:{"userPosition_lat":position.coords.latitude,"userPosition_lng":position.coords.longitude},
        dataType:"json",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", `bearer ${localStorage.getItem('token')}`)
        },
        success: response => {
          this.setState({
            Data: response.restaurant
          })
          console.log(this.state.Data)
        },
        error:() => {console.log("Error...")}
      })
    }).catch(() => {
      $.ajax({
        url:"https://luffy.ee.ncku.edu.tw:17787/api/restaurant",
        method:"POST",
        data:{"userPosition_lat": this.state.lat,"userPosition_lng": this.state.lng},
        dataType:"json",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", `bearer ${localStorage.getItem('token')}`)
        },
        success: response => {
          this.setState({
            Data: response.restaurant
          })
          console.log(this.state.Data)
        },
        error:() => {console.log("Error...")}
      })
    })
  }

  render() {
    const { handleStore } = this.props
    const initDirection = (restaurantId, restaurantLat, restaurantLng) => {
      const directionsService = new google.maps.DirectionsService()
      const directionsDisplay = new google.maps.DirectionsRenderer()
      const direction = new google.maps.Map(document.getElementById('direction'),{
        center: {lat:this.state.lat, lng:this.state.lng},
        zoom: 15,
        mapTypeControl:false,
        zoomControl:false,
        streetViewControl:false,
        fullscreenControl:false
      });
      directionsDisplay.setMap(direction);
      const request={
        origin:{lat:this.state.lat, lng:this.state.lng},
        destination:{lat:restaurantLat, lng:restaurantLng},
        travelMode: 'DRIVING'
      }
      directionsService.route(request,function(result,status){
        if(status=='OK'){
          console.log(result.routes[0].legs[0].steps);
          directionsDisplay.setDirections(result);
        }
        else{
          console.log(status);
        }
      })
    }
    return (
      <div class="main_body">
        <Navigationbar handleBack={null} header={'LOGO'} cart={0} template={0}/>
        <div class="index" id="app">
          {
            this.state.Data.map((data, index) => {
              return (
                <div class="namecard">
                  <img src="src/ClipMap.png" alt="" class="clip_map" id="No.1" onClick={() => initDirection(index, data.lat, data.lng)}/>
                  <div class="info">
                    <div class="storedata">
                        <p class="Store">{data.name}</p>
                        <p class="adress">{data.address}</p>
                    </div>
                    <div class="nc">
                        <p class="waitTime">等待{data.wait}分鐘</p>
                        <p class="distance">m</p>
                    </div>
                  </div>
                  <img class="fork" src="src/fork.png" alt="" onClick={() => {
                    handleStore(index)
                    window.location.href = `#/main/order/${index}`
                  }}/>
                </div>
              )
            })
          }
        </div>
        <div id="direction" />
        <div class="dir_card" id="dir_app">
          <div class="dir_info">
            <div class="name">
              <p></p>
              <p class="dir_dis"> m</p>
            </div>
            <p class="other"></p>
            <p class="other"></p>
          </div>
          <div class="dir_waitTime">
            <img src="src/clock.png" style={{height: '13px', width: '13px'}} />
            <p>等待分鐘</p>
          </div>
          <img class="pngfork"src="src/cutlery.png" alt="" />
        </div>
        <div class="foo" id="foo" />
        <Tabbar />
      </div>
    )
  }
}

export default Home
