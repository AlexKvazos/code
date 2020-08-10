import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          Enter user name
          <input type="text" />
          <button type="submit">&rarr;</button>
        </form>
      </div>
    )
  }
}
