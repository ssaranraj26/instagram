import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, err: ''}

  onChangeUsername = v => {
    this.setState({username: v.target.value})
  }

  onChangePassword = v => {
    this.setState({password: v.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showErrorMsg: true, err: errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    let {username, password} = this.state

    if (username === 'saran') {
      username = 'rahul'
    }
    if (password === 'saran@123') {
      password = 'rahul@2021'
    }
    const userCredentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          placeholder="saran"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          placeholder="saran@123"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, err} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-responsive-container">
          <div className="login-img-container">
            <img
              className="login-img"
              src="https://res.cloudinary.com/dubt0www3/image/upload/v1679150696/Insta%20Share/OBJECTS_mhtft0.png"
              alt="website login"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dubt0www3/image/upload/v1679150721/Insta%20Share/Grouplogo_epi59d.png"
                alt="website logo"
              />
            </div>
            <h1 className="login-form-head">Insta Share</h1>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg ? <p className="error-message">{err}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
