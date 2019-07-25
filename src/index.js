import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/cssReset.css';
import { Switch, Router, Route } from 'react-router';
import { createHashHistory } from 'history';
import App from './App';
import Game from './components/gameIndex/gameIndex';
import * as serviceWorker from './serviceWorker';

const history = createHashHistory();

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/game" component={Game}/>
    </Switch>
  </Router>
  ), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
