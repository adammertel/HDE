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
  },

 // returns array of most frequent elements
  mode (array) {
    if (array.length == 0)
        return null;
    var modeMap = {},
        maxCount = 1,
        modes = [array[0]];

    for(var i = 0; i < array.length; i++){
        var el = array[i];

        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;

        if (modeMap[el] > maxCount){
            modes = [el];
            maxCount = modeMap[el];
        }else if (modeMap[el] == maxCount){
            modes.push(el);
            maxCount = modeMap[el];
        }
    }
    return modes;
  }


}

export default Base;
