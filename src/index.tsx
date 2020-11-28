import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from 'base/components/scroll-to-top'
import { RouteProvider } from 'base/components/routing/routing.hook'
import * as serviceWorker from './serviceWorker'

function render() {
  import('app/App').then(({ default: App }) => {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <RouteProvider>
            <App />
          </RouteProvider>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
