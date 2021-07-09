import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Genel, Login, Register,Navbars } from './components'
import {MainPage,Student,Teacher,Admin,Error,Grades,Settings} from "./pages"
import "./App.css"
function App() {
  return (
    <Router>
      <Genel>
          <Navbars/>
          <Switch>
        
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/student" exact component={Student} />
          <Route path="/teacher" exact component={Teacher} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/grades" exact component={Grades} />
          <Route path="/settings" exact component={Settings} />

          <Route component={Error} />
          
        
          </Switch>
      </Genel>
    </Router>
    
  );
}

export default App;
