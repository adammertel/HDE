import App from './components/app.jsx!';
import state from './state';

import ReactDom from 'react-dom';
import React from 'react';
import $ from 'jquery';
import material from 'bootstrap-material';

var initState = function(){
  state.window.height = window.innerHeight
  state.window.width = window.innerWidth
}

initState()
$.material.init()

ReactDom.render(React.createElement(App), document.getElementById('container'));
