import React from 'react';

var Base = {
  renderChildren (props) {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, props)
    })
  },

  getJSON (url, callback) {
    console.log(url)
    let xhr = new XMLHttpRequest()
    xhr.onload = function () {
      callback(this.responseText)
    }
    xhr.open("GET", url, true)
    xhr.send();
  }


}

export default Base;
