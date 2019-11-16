import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import ScrollToTop from './pageComponents/scrollToTop'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(

    <BrowserRouter>
      <ScrollToTop>
          <App />
          <style> @import url('https://fonts.googleapis.com/css?family=Patua+One|Lexend+Giga|Martel&display=swap'); </style>
        </ScrollToTop>
    </BrowserRouter>,

document.getElementById('root'));
