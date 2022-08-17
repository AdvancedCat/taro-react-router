import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { BrowserRouter, Routes, Route, Link, useParams, Outlet, NavLink } from 'react-router-dom'
import './index.scss'


import Home from '../../components/home'
import View1 from '../../components/view1'
import View2 from '../../components/view2'
import View3 from '../../components/view3'

export default class Index extends Component {
  state = {
    tabCur: 0
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      console.log('URL changed!')
    })
  }

  componentDidUpdate() {
    console.log(window.location.href)
  }

  onLoad(options) {
    // console.log('onLoad', options)
  }

  render() {
    let activeStyle = {
      textDecoration: "underline",
      color: 'red'
    };

    return (
      <BrowserRouter>

        <Button
          size="normal"
          type="danger"
          onClick={() => {
            console.log(window.history)
          }}
        >
          打印 history
        </Button>
        <Button
          size="small"
          type="warning"
          onClick={() => {
            window.history.back()
          }}
        >
          {'<- back'}
        </Button>
        <Button
          size="small"
          type="warning"
          onClick={() => {
            window.history.forward()
          }}
        >
          {'forward ->'}
        </Button>

        <Button
          size="normal"
          type="danger"
          onClick={() => {
            console.log(window.location)
          }}
        >
          打印 location
        </Button>

        <Button
          type="primary"
          onClick={() => {
            Taro.navigateTo({ url: '../hash-router/index?name=hashrouter&age=30' })
          }}
        >
          Go to "hash-router" page
        </Button>


        <View className="drawer-box">
          <View className="box-item">
            <NavLink
              to="/pages/router/index/view1?a=1&b=2"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              view1
            </NavLink>
          </View>
          <View className="box-item">
            <NavLink to="/pages/router/index/view2#a=3&b=4" style={({ isActive }) => (isActive ? activeStyle : undefined)}>view2</NavLink>
          </View>
          <View className="box-item">
            <NavLink to="/pages/router/index/2?a=1&b=2#a=3&b=4" style={({ isActive }) => (isActive ? activeStyle : undefined)}>view3</NavLink>
          </View>
        </View>

        <View className="line"></View>

        <Routes>
          <Route path="/pages/browser-router/index" element={<Home />}></Route>
          <Route path="/pages/router/index/view1" element={<View1 />}></Route>
          <Route path="/pages/router/index/view2" element={<View2 />}></Route>
          <Route path="/pages/router/index/:id" element={<View3 />}></Route>
        </Routes>

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
      </BrowserRouter>
    )
  }
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
