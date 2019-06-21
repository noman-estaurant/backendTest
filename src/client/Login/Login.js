import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import './Login.css'

class Login extends Component {

	componentWillMount() {
		const isLogin = localStorage.getItem('token')
		if (isLogin) window.location.href = '#/main'
	}

	componentDidMount() {
		const d = document
		const s = 'script'
		const id = 'facebook-jssdk'
		let js
		const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
		js = d.createElement(s);
		js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
	}

	render() {
		const fbLogin = () => {
			FB.login(
				response => {
					if (response.status === 'connected') {
						FB.api(
							'/me',
							'GET',
							{
								fields: 'id,name'
							},
							response => {
								//FB登入視窗點擊登入後，會將資訊回傳到此處。
								//資訊傳到這裡：
								$.post(
									'https://luffy.ee.ncku.edu.tw:17785/api/login/facebook',
									{
										name: response.name,
										ID: response.id
									},
									result => {
										localStorage.setItem('token', result.token)
										console.log(localStorage.getItem('token'))
										window.location.href = '#/main'
									}
								)
							}
						)
					}
				},
				{
					scope: 'public_profile,email,user_birthday',
					return_scopes: true
				}
			)
		}
		return (
			<div id='flexbox'>
				<div class='logo'>
					<h1 class='header'>歡迎！</h1>
					<h1 class='subtitle'>黑膠漢堡的愛好者</h1>
				</div>
				<div class='text'>
					<h1 class='header'>建立帳戶</h1>
					<h1 class='subtitle'>註冊帳戶以便我們為您做好最好的服務！</h1>
				</div>
				<button class='login-button login-button--facebook' onClick={fbLogin}>
					使用 Facebook 註冊
				</button>
				<button class='login-button'>
					免註冊使用
				</button>
				<h1 style={{fontSize: '12pt'}}>或</h1>
				<div class='button-box'>
					<GoogleLogin
						clientId="886865227848-iei3i8t1n5arbur2khuvfdjr3jkd2985.apps.googleusercontent.com"
						render={renderProps => (
							<img class='circular-button' src='src/googlePlusLogoButton@3x.png' onClick={renderProps.onClick} disabled={renderProps.disabled} />
						)}
						buttonText="Login"
						onSuccess={result => {
							localStorage.setItem('token', result.token)
							window.location.href = '#/main'
						}}
						onFailure={() => {console.log('Failure')}}
						cookiePolicy={'single_host_origin'}
					/>
					<img class='circular-button' src='src/twitterLogoButton@3x.png' />
				</div>
				<p id='id' />
				<p id='name' />
			</div>
		)
	}
}

export default Login
