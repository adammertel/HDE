import App from './components/app.jsx!';

import ReactDom from 'react-dom';
import React from 'react';
import $ from 'jquery';
import material from 'bootstrap-material';

$.material.init()

ReactDom.render(React.createElement(App), document.getElementById('container'))
