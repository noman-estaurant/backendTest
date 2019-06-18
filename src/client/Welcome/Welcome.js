import React, { Component } from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'

class Welcome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submit: false
		}
	}


	componentWillMount() {
		//const isLogin = localStorage.getItem('token')
		//if (isLogin) window.location.href = '#/main'
	}

	componentDidMount() {
		const changeState = () => {
			this.setState({
				submit: !this.state.submit
			})
		}
		const mySwiper = new Swiper('.swiper-container', {
			// Optional parameters
			direction: 'horizontal',
			on: {
				slideChangeTransitionStart: function() {
					changeState()
				}
			}
		})
	}
	render() {
		return (
			<div class='container'>
				<div class='swiper-container'>
					<div class='swiper-wrapper'>
						<div class='swiper-slide post-content'>
							<div id='topic'>
								<img src='src/first.png' />
							</div>
							<div id='text'>
								<p class='title'>優質餐點</p>
								<p class='content'>
									我們提供優質的餐點及充滿樂趣的點餐
									<br />
									方式，參與歡樂共同分享。
								</p>
							</div>
						</div>
						<div class='swiper-slide post-content'>
							<div id='topic'>
								<img src='src/second.png' />
							</div>
							<div id='text'>
								<p class='title'>智慧點餐</p>
								<p class='content'>
									我們提供最符合無人餐廳的服務模式，
									<br />
									與好友、同事、家人體驗點餐樂趣。
								</p>
							</div>
							{this.state.submit === true && (
								<Link id='button' to="/login">完成</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Welcome
