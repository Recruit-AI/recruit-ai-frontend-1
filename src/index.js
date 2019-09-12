import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './redux/reducer'
import axios from 'axios'

import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import ScrollToTop from './pageComponents/scrollToTop'

import symbols from './db/symbolsDb';
import kinds from './db/kindsDb';
import connections from './db/connectionsDb';
import pantheons from './db/pantheonsDb';
import {users} from './db/miscDb'
import categories from './db/categoriesDb';



const store = createStore(reducer);

ReactDOM.render(

<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        {/* react-bootstrap does not include css for the components; css imported here: */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous" />
          <style>
@import url('https://fonts.googleapis.com/css?family=Patua+One|Lexend+Giga|Martel&display=swap');
</style>

        <App />
        </ScrollToTop>
    </BrowserRouter>
</Provider>,

document.getElementById('root'));
