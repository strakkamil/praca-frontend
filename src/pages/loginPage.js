import React, { Component } from 'react'
import '../styles/loginPage.css'

class loginPage extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className={this.props.closeClass ? "login-modal modalClose" : "login-modal"}>
          <h1>Zaloguj się do systemu</h1>
          <div className="form">
            <div className="login">
              <input type="text" name="login-input" value={this.props.login} required autoComplete="off" onChange={this.props.onChangeLogin} />
              <label htmlFor="login-input" className="login-label">
                <span className="login-content">login</span>
              </label>
            </div>
            <div className="password">
              <input type="password" value={this.props.password} name="password-input" required autoComplete="off" onChange={this.props.onChangePassword} />
              <label htmlFor="password-input" className="password-label">
                <span className="password-content">hasło</span>
              </label>
            </div>
          </div>
          <div className="button">
            <button type="submit">Login</button>
            <button onClick={this.props.closeModalFn}>Zamknij</button>
          </div>
        </div>
      </form>
    )
  }
}

export default loginPage