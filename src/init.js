import OuterComponent from './components/outer-component.jsx!';
import ReactDom from 'react-dom';
import React from 'react';

ReactDom.render(
  React.createElement(OuterComponent)
  , document.getElementById('container'));
