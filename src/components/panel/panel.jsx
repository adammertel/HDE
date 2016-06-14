import React from 'react'

class Panel extends React.Component {

  styleBody() {
    return {
      backgroundColor: 'white'

    }
  }

  render() {
    var that = this
    return (
      <div
        className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.label}</h3>
        </div>
        <div className="panel-body" style={this.styleBody()}>
          {
            React.cloneElement(this.props.children, {app: that.props.app})
          }
        </div>
      </div>
    );
  }
}

export default Panel;
