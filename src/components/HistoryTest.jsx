import React, { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const LocationBus = {
  protocol(){
    window.location.protocol = 'http:'
  },
  host(){
    window.location.host = 'taro2.cn'
  },
  hostname(){
    window.location.hostname = 'taro2.cn'
  },
  port(){
    window.location.port = '443'
  },
  pathname(){
    window.location.pathname = '../index/index?name=hongxin&age=23'
  },
  search(){
    window.location.search = '?name=hongxin&age=23'
  },
  hash(){
    let num = Math.floor(Math.random()*100)
    window.location.hash = `#a=${num}&b=${num * 2}`
  },
  href(){
    window.location.href = 'https://taro.com/pages/index/index?name=hongxin&age=23'
  },
  origin(){
    window.location.origin = 'https://taro.com'
  },
}

let count = 0

export default function Normal(){

  const [tiktok, setTicktok] = useState(0)

  useEffect(()=>{
    window.addEventListener('popstate', popstateEventCb)
    let timer = window.setTimeout(()=>{
      setTicktok(t => t + 1)
    }, 1000)
    return ()=>{
      try {
        window.removeEventListener('popstate', popstateEventCb)
        window.clearTimeout(timer)
      } catch (error) {
        console.error('timer:', timer,error)
      }

    }
  })

  return(
    <View>
      <View><Text>--------------------------------------</Text></View>
      <View><Text>{tiktok}</Text></View>
      <Button onClick={()=>{console.log('getCurrentPages:', Taro.getCurrentPages())}}>getCurrentPages</Button>
      <Button onClick={()=>{Taro.navigateBack()}}>返回上一页</Button>

      <View><Text>--------------------------------------</Text></View>

      <View onClick={()=>{console.log(window.history)}}><Text>History</Text></View>
      <Button onClick={clickBtnBack}>back</Button>
      <Button onClick={clickBtnForward}>forward</Button>
      <Button onClick={clickBtnPush}>pushState</Button>
      <Button onClick={clickBtnReplace}>replaceState</Button>

      <View onClick={()=>{console.log(window.location)}}><Text>Location</Text></View>
      <Button onClick={LocationBus.href}>href: {window.location.href}</Button>
      <Button onClick={LocationBus.origin}>origin: {window.location.origin}</Button>
      <Button onClick={LocationBus.protocol}>protocol: {window.location.protocol}</Button>
      <Button onClick={LocationBus.host}>host: {window.location.host}</Button>
      <Button onClick={LocationBus.hostname}>hostname: {window.location.hostname}</Button>
      <Button onClick={LocationBus.port}>port: {window.location.port}</Button>
      <Button onClick={LocationBus.pathname}>pathname: {window.location.pathname}</Button>
      <Button onClick={LocationBus.search}>search: {window.location.search}</Button>
      <Button onClick={LocationBus.hash}>hash: {window.location.hash}</Button>

    </View>
  )
}

function popstateEventCb(event){
  console.log('触发popstate - ', 'event:', event, window.history.__stack)
}

function clickBtnBack(){
  window.history.back()
}

function clickBtnForward(){
  window.history.forward()
}

function clickBtnPush(){
  window.history.pushState({count: count++},`hello-${count}`,window.location.href)
}

function clickBtnReplace(){
  window.history.replaceState({count: count++},`hello-${count}`,window.location.href)
}
