import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Home from './Home'
import NotFound from './NotFound'
import SignIn from './SignIn'
import SignUp from './SignUp'

const PrivateRoute = ({ children }) => {
  if (!localStorage.getItem('access-token')) {
    return <Navigate to="/sign-in" />
  }
  return children
}

const PublicRoute = ({ children }) => {
  if (localStorage.getItem('access-token')) {
    return <Navigate to="/" />
  }
  return children
}

const Pages = ({ app }) => (
  <Router>
    <Routes>
      <Route path='/' element={<PrivateRoute><Home app={app} /></PrivateRoute>} />
      <Route path='/sign-in' element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path='/sign-up' element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
)

export default Pages
