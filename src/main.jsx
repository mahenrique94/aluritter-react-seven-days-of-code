import React from 'react'
import ReactDOM from 'react-dom/client'
import Pages from './pages'
import { connect } from './utils/firebase'

import './assets/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pages app={connect()}/>
  </React.StrictMode>
)
