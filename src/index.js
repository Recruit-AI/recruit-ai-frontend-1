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


const store = createStore(reducer);

ReactDOM.render(

<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        {/* react-bootstrap does not include css for the components; css imported here: */}
        

          <App />


          <style> @import url('https://fonts.googleapis.com/css?family=Patua+One|Lexend+Giga|Martel&display=swap'); </style>
        </ScrollToTop>
    </BrowserRouter>
</Provider>,

document.getElementById('root'));
