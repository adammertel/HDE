import React from 'react';

class Node extends React.Component {
  render () {
    var that = this
    return (
      <circle
        r={5}
        id={this.props.id}
        cx={this.props.x}
        cy={this.props.y}
        style={this.props.style}
        onMouseOver={this.props.onmouseover}
        onMouseOut={this.props.onmouseout}
      />
    )
  }
}

export default Node
