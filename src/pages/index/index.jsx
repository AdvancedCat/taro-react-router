import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Empty, NavBar, Button } from 'tard'

export default class Index extends Component {
  textRef = React.createRef()

  state = {
    count: 1
  }

  componentWillMount() {}

  componentDidMount() {
    console.log('window:', window)
    console.log('getCurrentPages:', Taro.getCurrentPages())
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <NavBar title="React Router 测试" />

        <Button
          full
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '../history/index?name=history&age=30' })
          }}
        >
          Go to "history" page
        </Button>

        <Button
          full
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '../browser-router/index?name=webrouter&age=30' })
          }}
        >
          Go to "browser-router" page
        </Button>

        <Button
          full
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '../hash-router/index?name=hashrouter&age=30' })
          }}
        >
          Go to "hash-router" page
        </Button>

        <Button
          full
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '../router-object/index?name=hashrouter&age=30' })
          }}
        >
          Go to "router-object" page
        </Button>


      </View>
    )
  }
}
