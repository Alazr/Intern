import Login from "./components/login"
import Register from "./components/register"
import Home from "./components/home"
import "./styles/style.scss"
import 'react-toastify/dist/ReactToastify.css'
import {Route,Switch,Redirect} from 'react-router-dom'
import NotFound from './components/notFound'
import auth from './services/authService'
import Logout from "./components/logout"

function App() {
  const user = auth.currentUser()

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/register">
            <Register/>
        </Route>
        <Route path="/logout">
            <Logout/>
        </Route>
        <Route path="/">
        {
         user ? <Home user={user}/> : <Redirect to="/login"/>
        }
        </Route>
        <Route path="/notfound">
       <NotFound/> 
      </Route>
      <Redirect from="/" to="/register"/>
      <Redirect to="/notfound"/>
      </Switch>
    </div>
  );
}

export default App;
