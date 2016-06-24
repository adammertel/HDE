import React from 'react'

class Panel extends React.Component {

  width () {
    return this.props.w
  }

  height () {
    return this.props.h
  }


  render() {
    var that = this
    return (
      <div
        className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.label}</h3>
        </div>
        <div className="panel-body" >
          {
            React.cloneElement(this.props.children, {
              app: that.props.app,
              w: that.width.bind(that),
              h: that.height.bind(that)
            })
          }
        </div>
      </div>
    );
  }
}

export default Panel;
