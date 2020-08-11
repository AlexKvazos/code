import React, {Component} from 'react'

import Marketing from './marketing'
import Login from './login'

const styles = {
  container: {
    display: 'flex'
  },
  left: {
    border: '1px solid black',
    flex: 1
  },
  right: {
    border: '1px solid black',
    flex: 2
  }
};

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Unknown User'
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <Login name={this.state.name}
          />
        </div>
        <div style={styles.right}>
          <Marketing
            name={this.state.name}/>
        </div>
      </div>
    )
  }
}
