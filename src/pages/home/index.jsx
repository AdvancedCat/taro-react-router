import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default function Index() {
  const [open, setOpen] = useState(false)

  const handleNavigate = (url) => {
    Taro.navigateTo({
      url,
    })
  }

  return (
    <View>
      <View className="at-article__h1">Taro + ReactRouter</View>
      <View className="at-article__info">2022-08-01&nbsp;&nbsp;&nbsp; @advancedcat</View>
      <View className="at-article__content">
        <View className="at-article__section">
          <View className="at-article__h2">说明</View>
          <View className="at-article__p">
            这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本落。这是文本段落。1234567890123456789012345678901234567890
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </View>

          <View className="at-article__h3">跨域三要素</View>
          <View className="at-article__p">
            1111
          </View>

          <View className="at-article__h2">DEMO</View>
          <AtListItem
            title="Basic"
            arrow="right"
            onClick={() => {
              handleNavigate('/pages/browser-router/index')
            }}
          />
          <AtListItem
            title="BrowerRouter"
            arrow="right"
            onClick={() => {
              handleNavigate('/pages/react-router-examples/basic/index')
            }}
          />
          <AtListItem
            title="HashRouter"
            arrow="right"
            onClick={() => {
              handleNavigate('/pages/hash-router/index')
            }}
          />
          <AtListItem
            title="嵌套路由"
            arrow="right"
            onClick={() => {
              handleNavigate('/pages/nested-route/index')
            }}
          />
          <AtAccordion
            open={open}
            onClick={() => {
              setOpen(!open)
            }}
            title="ReactRouter v6 官方示例"
          >
            <AtList>
              <AtListItem
                title="Basic"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/basic/index')
                }}
              />
              <AtListItem
                title="Authentication"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/auth/index')
                }}
              />
              <AtListItem
                title="Custom Filter Link"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/custom-filter-link/index')
                }}
              />
              <AtListItem
                title="Custom Active Link"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/custom-active-link/index')
                }}
              />
              <AtListItem
                title="Route Objects"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/route-objects/index')
                }}
              />
              <AtListItem
                title="Search Params"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/search-params/index')
                }}
              />
              <AtListItem
                title="Background Location"
                arrow="right"
                onClick={() => {
                  handleNavigate('/pages/react-router-examples/background-location/index')
                }}
                // disabled
              />
            </AtList>
          </AtAccordion>

          <View className="at-article__h2">缺陷</View>
          <View className="at-article__p">哈哈哈</View>
        </View>
      </View>
    </View>
  )
}
