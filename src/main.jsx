import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./Redux/reducers/reducers.js"
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
      <Toaster limit={2} />
    </Router>
  </Provider>,
)
