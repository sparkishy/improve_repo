import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore , applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import todoApp from './reducers'
import App from './components/App'

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
  return createStore(
    todoApp,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}

let store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

