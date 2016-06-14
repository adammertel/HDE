import React from 'react';

class Link extends React.Component {
  render () {
    return (
      <line
        x1={this.props.source.x}
        y1={this.props.source.y}
        x2={this.props.target.x}
        y2={this.props.target.y}
        style={{
          "stroke": this.props.color,
          "strokeOpacity":".6",
          "strokeWidth": Math.sqrt(this.props.value)
        }}/>
    );
  }
}

export default Link
