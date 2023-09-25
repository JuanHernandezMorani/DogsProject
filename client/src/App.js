import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from './pages/land/land.jsx'
import Dog from './components/dog/dog.jsx'
import Home from './pages/home/home.jsx'
import DogsCreate from './components/form/form.jsx'

function App() {
  return (
<BrowserRouter>
<div className='App'>
  <Switch>
      <Route exact path="/detail/:id" component={Dog}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/Create" component={DogsCreate} />
  </Switch>
</div>
</BrowserRouter>
  );
}

export default App;
