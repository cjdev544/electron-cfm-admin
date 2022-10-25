import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import AuthState from './context/auth/AuthState'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthState>
    <App />
  </AuthState>
)
