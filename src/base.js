import React from 'react';

var Base = {
  renderChildren (props) {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, props)
    })
  }

}

export default Base;
