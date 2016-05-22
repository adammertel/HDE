import React from 'react';

class Graph extends React.Component {
  style() {
    return {
      'backgroundColor': 'lightblue',
      'width': this.props.width,
      'height': this.props.height,
    }
  }

  render() {
    return (
      <div className="component component-graph" style={this.style()}>
        GRAPH
      </div>
    );
  }
}

export default Graph;
