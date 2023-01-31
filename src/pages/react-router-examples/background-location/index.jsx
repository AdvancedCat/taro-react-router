import * as React from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import {Link} from '../../../components'
import { Dialog } from '@reach/dialog'
import { AtNoticebar } from 'taro-ui'
import '@reach/dialog/styles.css'

let IMAGES = [
  {
    id: 0,
    title: 'Enjoying a cup of coffee',
    src: 'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2Mzg4Ng&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    id: 1,
    title: 'Magical winter sunrise',
    src: 'https://images.unsplash.com/photo-1618824834718-92f8469a4dd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDAzMw&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    id: 2,
    title: 'Dalmatian and pumpkins',
    src: 'https://images.unsplash.com/photo-1633289944756-6295be214e16?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDA3Nw&ixlib=rb-1.2.1&q=80&w=400',
  },
  {
    id: 3,
    title: 'Fall into Autumn 🍂🐶',
    src: 'https://images.unsplash.com/photo-1633172905740-2eb6730c95b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDEwMg&ixlib=rb-1.2.1&q=80&w=400',
  },
]

function getImageById(id) {
  return IMAGES.find((image) => image.id === id)
}

export default function App() {
  return (
    <BrowserRouter>
      <MyPage></MyPage>
    </BrowserRouter>
  )
}

function MyPage() {
  let location = useLocation()

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  let state = location.state

  return (
    <div>
      <AtNoticebar>该功能暂不支持</AtNoticebar>

      <h1>Modal Example</h1>

      <p>
        This is an example of how to create a contextual modal navigation with React Router where the navigation path
        the user takes determines if the page is rendered in the modal or not (popularized by pinterest, instagram, and
        others in the 2010s). This type of modal is typically used as a kind of "detail" view to focus on a particular
        object in a collection (like a pinterest board) while not taking you completely out of context of the parent
        page. But, when the same URL is visited directly (rather than from the collection page) it renders as it's own
        full page instead of in a modal.
      </p>

      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/img/:id" element={<ImageView />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      {/* Show the modal when a `backgroundLocation` is set */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/img/:id" element={<Modal />} />
        </Routes>
      )}
    </div>
  )
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>

      <h3>Featured Images</h3>
      <ul>
        <li>
          <Link to="/img/1">Image 1</Link>
        </li>
        <li>
          <Link to="/img/2">Image 2</Link>
        </li>
      </ul>
    </div>
  )
}

function Gallery() {
  let location = useLocation()

  return (
    <div style={{ padding: '0 24px' }}>
      <h2>Gallery</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}
      >
        {IMAGES.map((image) => (
          <Link
            key={image.id}
            to={`/img/${image.id}`}
            // This is the trick! Set the `backgroundLocation` in location state
            // so that when we open the modal we still see the current page in
            // the background.
            state={{ backgroundLocation: location }}
          >
            <img
              width={200}
              height={200}
              style={{
                maxWidth: '100%',
                aspectRatio: '1 / 1',

                borderRadius: '8px',
              }}
              src={image.src}
              alt={image.title}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

function ImageView() {
  let { id } = useParams()
  let image = getImageById(Number(id))

  if (!image) return <div>Image not found</div>

  return (
    <div>
      <h1>{image.title}</h1>
      <img width={400} height={400} src={image.src} alt="" />
      {window.location.href}
    </div>
  )
}

function Modal() {
  let navigate = useNavigate()
  let { id } = useParams()
  let image = getImageById(Number(id))
  let buttonRef = React.useRef(null)

  function onDismiss() {
    navigate(-1)
  }

  if (!image) return null

  return (
    <Dialog aria-labelledby="label" onDismiss={onDismiss} initialFocusRef={buttonRef}>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          padding: '8px 8px',
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {image.title}
        </h1>
        <img
          style={{
            margin: '16px 0',
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
          }}
          width={400}
          height={400}
          src={image.src}
          alt=""
        />
        {window.location.href}
        <button style={{ display: 'block' }} ref={buttonRef} onClick={onDismiss}>
          Close
        </button>
      </div>
    </Dialog>
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
