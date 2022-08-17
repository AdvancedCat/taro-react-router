export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/hash-router/index',
    'pages/history/index',
    'pages/browser-router/index',
    'pages/nested-route/index',
    'pages/react-router-examples/search-params/index',
    'pages/react-router-examples/route-objects/index',
    'pages/react-router-examples/background-location/index',
    'pages/react-router-examples/custom-active-link/index',
    'pages/react-router-examples/custom-filter-link/index',
    'pages/react-router-examples/auth/index',
    'pages/react-router-examples/basic/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
