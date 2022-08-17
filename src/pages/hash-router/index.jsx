import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { HashRouter, Routes, Route, Link, useParams, Outlet } from 'react-router-dom'
import './index.scss'
import { AtButton, AtToast, AtDivider, AtNoticebar } from 'taro-ui'

import Home from '../../components/home'
import View1 from '../../components/view1'
import View2 from '../../components/view2'
import View3 from '../../components/view3'

export default function Index() {
  const [_, setCount] = useState(0)
  const [isOpenToast, setOpenToast] = useState(false)
  const [toastText, setToastText] = useState('')

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      console.log('hashchange event fired!', window.location.href)
      // setToastText('hashchange event triggered!')
      // setOpenToast(true)
      setCount(c => c+1)
    })
  }, [])

  return (
    <HashRouter>
      <AtNoticebar>location.href: {window.location.href}</AtNoticebar>

      <AtDivider content="前进回退" />
      <View className="at-article__p">说明：点击 back / forward 按钮，观察 history 前进回退</View>

      {/* <View className='btn-group'>
        <AtButton
          type="primary"
          size="small"
          onClick={() => {
            console.log(window.history)
          }}
        >
          打印 history
        </AtButton>
        <AtButton
          type="secondary"
          size="small"
          onClick={() => {
            console.log(window.location)
          }}
        >
          打印 location
        </AtButton>
      </View> */}

      <View className='btn-group'>
        <AtButton
          type="primary"
          size="small"
          onClick={() => {
            window.history.back()
          }}
        >
          {'<- back'}
        </AtButton>
        <AtButton
          type="primary"
          size="small"
          onClick={() => {
            window.history.forward()
          }}
        >
          {'forward ->'}
        </AtButton>
      </View>

      <AtDivider content="Hash" />
      <View className="at-article__p">说明：点击不同 view ， 页面 href 会发生变化，同时也会触发 hashchange 事件。</View>
      <View className="drawer-box">
        <View className="box-item">
          <Link to="/view1?a=1&b=2">view1</Link>
        </View>
        <View className="box-item">
          <Link to="/view2#a=3&b=4">view2</Link>
        </View>
        <View className="box-item">
          <Link to="/2?a=1&b=2#a=3&b=4">view3</Link>
        </View>
      </View>

      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/view1" element={<View1 />}></Route>
        <Route path="/view2" element={<View2 />}></Route>
        <Route path="/:id" element={<View3 />}></Route>
      </Routes>

      <AtDivider content="嵌套路由" />

      <View className="drawer-box">
        <View className="box-item">
          <Link to="invoices">Invoices</Link>
        </View>
        <View className="box-item">
          <Link to="invoices/1234">Invoice1234</Link>
        </View>
        <View className="box-item">
          <Link to="invoices/sent">Sent</Link>
        </View>
        <View className="box-item">
          <Link to="invoices/sent/B">Sent B</Link>
        </View>
      </View>
      <Routes>
        <Route path="invoices" element={<Invoices />}>
          <Route index element={<InvoiceIndex />} />
          <Route path=":invoiceId" element={<Invoice />} />
          <Route path="sent/*" element={<SentInvoices />} />
        </Route>
      </Routes>

      <AtToast isOpened={isOpenToast} text={toastText} onClose={() => setOpenToast(false)}></AtToast>
    </HashRouter>
  )
}

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />
    </div>
  )
}

function Invoice() {
  let { invoiceId } = useParams()
  return <h1>Invoice ID: {invoiceId}</h1>
}

// 级联路由
function SentInvoices() {
  return (
    <Routes>
      <Route element={<SentInvoicesBox />}>
        <Route path="/" element={<SentInvoicesA />} />
        <Route path="/B" element={<SentInvoicesB />} />
      </Route>
    </Routes>
  )
}
function SentInvoicesBox() {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <Text>SentInvoicesBox</Text>
      <Outlet />
    </div>
  )
}
function SentInvoicesA() {
  return <h1>Descendant in SentInvoices A</h1>
}
function SentInvoicesB() {
  return <h1>Descendant in SentInvoices B</h1>
}

function InvoiceIndex() {
  return <h1>InvoiceIndex</h1>
}
