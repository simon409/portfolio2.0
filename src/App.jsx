// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing';
import About from './components/Body/About';
import Work from './components/Body/Work'
import { OutroProvider } from './Provider/OutroProvider';
import Contact from './components/Body/Contact';
import './i18n'

function App() {
  return (
    <Router>
      <OutroProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/work" component={Work} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </OutroProvider>
    </Router>
  );
}

export default App;
