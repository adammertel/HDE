import React from 'react';

class Bar extends React.Component {

  render () {
    var that = this
    return (
      <rect
        x={this.props.x}
        width={this.props.width}
        y={this.props.y}
        height={this.props.height}
        style={this.props.style}
      />
    )
  }
}

export default Bar
