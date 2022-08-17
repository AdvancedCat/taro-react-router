import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { BrowserRouter, Routes, Route, Link, useParams, Outlet } from 'react-router-dom'
import './index.scss'
import { AtButton, AtToast, AtDivider, AtNoticebar } from 'taro-ui'

const invoiceList = new Array(10)
  .fill(0)
  .map((_, idx) => idx)
  .map((v) => ({ id: v, name: `发票${v}`, created: Date.now() - Math.floor(Math.random() * 100000000) }))

export default function Index() {
  const [_, setCount] = useState(0)
  const [isOpenToast, setOpenToast] = useState(false)
  const [toastText, setToastText] = useState('')

  useEffect(() => {
    window.addEventListener('popstate', () => {
      console.log('popstate event fired!', window.location.href)
      // setToastText('hashchange event triggered!')
      // setOpenToast(true)
      setCount((c) => c + 1)
    })
  }, [])

  return (
    <BrowserRouter>
      <AtNoticebar>location.href: {window.location.href}</AtNoticebar>

      <AtDivider content="嵌套路由" />

      <View className="drawer-box">
        <View className="box-item">
          <Link to="invoices">Invoices</Link>
        </View>
        <View className="box-item">
          <Link to="invoices/sent">送达发票</Link>
        </View>
      </View>
      <Routes>
        <Route path="invoices" element={<Invoices />}>
          <Route path=":invoiceId" element={<Invoice />} />
          <Route path="sent/*" element={<SentInvoices />} />
        </Route>
      </Routes>

      <AtToast isOpened={isOpenToast} text={toastText} onClose={() => setOpenToast(false)}></AtToast>
    </BrowserRouter>
  )
}

function Invoices() {
  return (
    <div>
      <AtDivider content="" />

      <View className="at-article__h2">发票列表</View>
      <ul>
        {invoiceList.map((invoice) => {
          return (
            <li>
              <Link to={`${invoice.id}`}>{invoice.name}</Link>
            </li>
          )
        })}
      </ul>
      <Outlet />
    </div>
  )
}

function Invoice() {
  let { invoiceId } = useParams()
  return (
    <View>
      <AtDivider content="" />
      <View className="at-article__h2">发票详情</View>
      <View className="at-article__p">使用 hook useParams() 可以获取到路由参数 /:invoiceId</View>
      <p>Invoice ID: {invoiceId}</p>
      <p>Invoice name: {invoiceList[invoiceId].name}</p>
      <p>Invoice created time: {new Date(invoiceList[+invoiceId].created).toString()}</p>
    </View>
  )
}

// 级联路由
function SentInvoices() {
  return (
    <div>
      <AtDivider content="" />
      <View className="at-article__h2">送达发票</View>
      <Routes>
        <Route path="/" element={<SentInvoicesBox />}>
          <Route path="/A" element={<SentInvoicesA />} />
          <Route path="/B" element={<SentInvoicesB />} />
        </Route>
      </Routes>
    </div>
  )
}
function SentInvoicesBox() {
  return (
    <div>
      <Text>SentInvoicesBox</Text>
      <Link to="A">Sent to A</Link>
      <Link to="B">Sent to B</Link>
      <AtDivider content="" />
      <Outlet />
    </div>
  )
}
function SentInvoicesA() {
  return <h1>送达发票给 A 公司</h1>
}
function SentInvoicesB() {
  return <h1>送达发票给 B 公司</h1>
}
