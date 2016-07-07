import React from 'react';
import _ from 'lodash'

class Detail extends React.Component {
  constructor (props) {
    super(props)
    var that = this

    this.headerColsNames = {
      'nodes': {
        'id': function(el) {
          return el.id
        },
        'name': function (el) {
          return el.name()
        },
        'group': function (el) {
          return el.group()
        }
      },
      'links': {
        'id': function(el) {
          return el.id
        },
        'source': function (el) {
          return el.source.name()
        },
        'target': function (el) {
          return el.target.name()
        }
      }
    }

    this.state = {
      elMode: that.props.component.mode,
      evMode: 'over'
    }

  }

  wrapperStyle () {
    return (
      {
        width: '100%',
        padding: '10px',
      }
    )
  }

  detailTableStyle() {
    return (
      {
        fontSize: '7px'
      }
    )
  }

  changeElMode(newMode) {
    this.setState({
      elMode: newMode
    })
  }

  changeEvMode(newMode) {
    this.setState({
      evMode: newMode
    })
  }

  renderTableHeader() {
    var that = this
    return(
      <thead>
        {
          _.keys(that.headerColsNames[that.state.elMode]).map(function(label, data){
            return (<th>{label}</th>)
          })
        }
      </thead>
    )
  }

  renderRow(el) {
    var that = this

    return (
      <tr>
        {
          _.values(that.headerColsNames[that.state.elMode]).map(function(col){
            return (<td>{col(el)}</td>)
          })
        }
      </tr>
    )
  }

  renderTableRows(eventMode) {
    var that = this
    var filtered = _.filter(this.props.app.getData()[that.state.elMode], function(el){return el[eventMode]})

    return (
      <tbody>
        {
          filtered.map(function(el){
            return(that.renderRow(el))
          })
        }
      </tbody>
    )
  }

  drawTable() {
    return (
      <table className="table table-condensed">
        {this.renderTableHeader()}
        {this.renderTableRows(this.state.evMode)}
      </table>
    )
  }

  drawSelectedPart(){
    <div />
  }

  render() {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()

    return (
      <div style={this.wrapperStyle()}>
        <p>
          <b>mode</b>
          <label className="radio-inline">
            <input type="radio" checked={this.state.elMode == 'nodes'} onClick={this.changeElMode.bind(that, 'nodes')} />Nodes
          </label>
          <label className="radio-inline">
            <input type="radio" checked={this.state.elMode == 'links'} onClick={this.changeElMode.bind(that, 'links')} />Links
          </label>
        </p>
        <p>
          <b>mouse event type</b>
          <label className="radio-inline">
            <input type="radio" checked={this.state.evMode == 'over'} onClick={this.changeEvMode.bind(that, 'over')} />Over
          </label>
          <label className="radio-inline">
            <input type="radio" checked={this.state.evMode == 'selected'} onClick={this.changeEvMode.bind(that, 'selected')} />Selection
          </label>
        </p>

        <div>
          <h4>{this.state.evMode + ' ' + this.state.elMode}</h4>
          <div className="detail-table" style={this.detailTableStyle()}>
            {this.drawTable()}
          </div>
        </div>



      </div>
    );
  }
}

export default Detail;
