import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'

import Checkbox from 'material-ui/Checkbox'

interface stateProps {
  email: string
  password: string
  needEmailVerification: boolean
  remember: boolean
}

interface ComponentProps {
  navigate: any
  saveToken: any
  setUser: any
}

export class LoginForm extends React.Component <ComponentProps> {
  state: stateProps = {
    email: '',
    password: '',
    remember: true,
    needEmailVerification: false
  }

  pwordChange(event: any) {
    this.setState({
      password: event.target.value
    })
  }

  emailChange(event: any) {
    this.setState({
      email: event.target.value
    })
  }

  navigate() {
    this.props.navigate('signup')
  }

  updateCheck() {
    this.setState((oldState: stateProps) => {
      return {
        remember: !oldState.remember,
      };
    });
  }

  login() {
    const {password, email} = this.state
    axios.post('http://localhost:3000/api/v1/auth/login', {
      email, password
    })
    .then((response) => {
      const {user, token} = response.data
      const {phone, country, company} = user
      this.props.setUser(user)
      this.props.saveToken(token)
      if (user.disabled) {
        this.props.navigate('emailVerification')
      } else if (phone && country && company) {
        this.props.navigate('dashboard')
      } else {
        this.props.navigate('userDetails')
      }
    })
    .catch((e) => {
      if (e.response) {
        // error originated from server
        if (e.response.data.error){
          const {error} = e.response.data
          switch (error) {
            case "Unauthorized": 
              this.setState({error})
              break
            case "EMAIL_NOT_VERIFIED": 
              this.props.navigate('emailVerification')
              break
          }
        }
      } else if (e.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }

  loginGoogle() {
    axios.get('http://localhost:3000/api/v1/auth/google')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  loginLI() {
    axios.get('http://localhost:3000/api/v1/auth/linkedin')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div className="loginForm">
        <div className="login_containers">
          <div className="login_header"> Login.</div>
          <div className="external_login_container">
            <div> <RaisedButton variant="raised" onClick={this.loginLI.bind(this)} color="primary"> LinkedIn </RaisedButton> </div>
            <div> <RaisedButton variant="raised" onClick={this.loginGoogle.bind(this)} color="primary"> Google </RaisedButton> </div>
          </div>
          <div className="localLogin">
            <form className="localLoginForm"
              onSubmit={(e) => {
                this.login()
                e.preventDefault()
                e.stopPropagation()
              }} >
              <div> Or enter your details. </div>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  fullWidth={true}
                  className="emailField"
                  value={this.state.email}
                  onChange={this.emailChange.bind(this)}
                  margin="normal" />
              </div>
              <div>
                <TextField
                  id="password"
                  label="Password"
                  fullWidth={true}
                  className="pwordField"
                  value={this.state.password}
                  onChange={this.pwordChange.bind(this)}
                  type="password"
                  margin="normal" />
              </div>
              <div className="flexed login_helpers">
                <div className="remember_me">
                  <Checkbox
                    label="Simple with controlled value"
                    checked={this.state.remember}
                    onChange={this.updateCheck.bind(this)}
                  />
                  <span> Remember me? </span>
                </div>
                <div className=""> Forgot your password? </div>
              </div>
              <div className="alignRight">
                <RaisedButton type="submit" variant="raised" color="primary">
                  Login
                </RaisedButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
