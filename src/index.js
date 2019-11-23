import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css'
import './index.css';

import App from './App';
import ScrollToTop from './pageComponents/scrollToTop'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(

    <BrowserRouter>
      <ScrollToTop>
          <App />
          <style>@import url('https://fonts.googleapis.com/css?family=Lexend+Giga|Martel|Patua+One&display=swap');</style>
        </ScrollToTop>
    </BrowserRouter>,

document.getElementById('root'));
