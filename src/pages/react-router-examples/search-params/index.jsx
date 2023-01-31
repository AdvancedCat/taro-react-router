import * as React from 'react'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import {Link} from '../../../components'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

export default function App() {
  return (
    <BrowserRouter  basename='pages/react-router-examples/search-params/index'>
      <h1>Search Params Example</h1>

      <p>
        This example demonstrates a simple search page that makes a request for user data to the GitHub API and displays
        information for that user on the page. The example uses the <code>useSearchParams()</code> hook to read and
        write the URL query string.
      </p>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

function randomUser() {
  let users = ['chaance', 'jacob-ebey', 'mcansh', 'mjackson', 'ryanflorence', 'advancedcat']
  return users[Math.floor(Math.random() * users.length)]
}

function Home() {
  let [searchParams, setSearchParams] = useSearchParams()

  // searchParams is a URLSearchParams object.
  // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  let user = searchParams.get('user')

  let [userData, setUserData] = React.useState(null)

  React.useEffect(() => {
    async function getGitHubUser() {
      let response = await Taro.request({ url: `https://api.github.com/users/${user}` })
      let data = response.data
      setUserData(data)
    }

    if (user) {
      getGitHubUser()
    }

    return () => {}
  }, [user])

  function handleRandomSubmit(event) {
    event.preventDefault()
    let newUser = randomUser()
    // our new random user is the same as our current one, let's try again
    if (newUser === user) {
      handleRandomSubmit(event)
    } else {
      setSearchParams({ user: newUser })
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <form onSubmit={handleRandomSubmit}>
          <button type="submit">Random</button>
        </form>
      </div>

      <div>页面链接：{window.location.href}</div>

      {userData && (
        <div
          style={{
            padding: '24px',
            margin: '24px 0',
            borderTop: '1px solid #eaeaea',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <View>
            <img
              key={userData.avatar_url}
              style={{ borderRadius: '50%' }}
              width={200}
              height={200}
              src={userData.avatar_url}
              alt={userData.login}
            />
          </View>

          <View>
            <h2>{userData.name}({userData.login}), from {userData.location}</h2>
            <p>{userData.bio}</p>
          </View>
        </div>
      )}
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
