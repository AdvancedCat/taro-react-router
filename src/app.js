import { Component, Fragment } from 'react'
import 'tard/dist/styles/index.less'
import './app.scss'

class App extends Component {
  componentDidMount() {}

  onLaunch(options) {
    // console.log('options', options)
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Fragment>
        <a></a>
        {this.props.children}
      </Fragment>
    )
  }
}

export default App
