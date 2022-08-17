import React, { Component } from 'react'
// import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import HistoryTest from '../../components/HistoryTest'

export default class Index extends Component {

  componentDidMount(){
    console.log(Taro.getCurrentPages())
  }

  render () {
    return (
      <HistoryTest {...this.props}/>
    )
  }
}
