import React from 'react';
import _ from 'lodash'

class Detail extends React.Component {
  constructor (props) {
    super(props)
    var that = this


    // this is not such a dynamical solution, but...
    this.headerColsNames = {
      'app': that.props.app,
      'nodes': {
        'id': function(el) {
          return el.id
        },
        'name': function (el) {
          return el.name()
        },
        'gender': function (el) {
          return that.props.app.getLegendValue('nodes', 'gender', el.group())
        },
        'family group': function (el) {
          return that.props.app.getLegendValue('nodes', 'family_group', el.props.group)
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
        },
        'type of interaction': function (el) {
          return that.props.app.getLegendValue('links', 'type', el.type())
        }
      }
    }

    this.state = {
      elMode: that.props.component.mode,
      evMode: 'over',
      displayMode: 'table',
    }

  }
  componentDidMount () {
    if (this.state.displayMode == 'charts'){
      this.drawCharts()
    }
  }

  componentDidUpdate () {
    if (this.state.displayMode == 'charts'){
      this.drawCharts()
    }
  }

  wrapperStyle () {
    return (
      {
        width: '100%',
        padding: '10px',
        overflowY: 'scroll'
      }
    )
  }

  detailTableStyle () {
    return (
      {
        fontSize: '7px'
      }
    )
  }

  detailPieStyle () {
    return (
      {

      }
    )
  }

  formStyle () {
    return (
      {
        margin: '0px',
        padding: '0px',
        color: 'black !important'
      }
    )
  }

  formDefinitionStyle () {
    return (
      {
        textAlign: 'webkit-right'
      }
    )
  }

  changeElMode (newMode) {
    this.setState({
      elMode: newMode
    })
  }

  changeDisplayMode (newMode) {
    this.setState({
      displayMode: newMode
    })
  }

  changeEvMode (newMode) {
    this.setState({
      evMode: newMode
    })
  }

  renderTableHeader () {
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

  renderRow (el) {
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

  renderTableRows (eventMode) {
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

  drawTable () {
    return (
      <div className="detail-table" style={this.detailTableStyle()}>
        <table className="table table-condensed">
          {this.renderTableHeader()}
          {this.renderTableRows(this.state.evMode)}
        </table>
      </div>
    )
  }

  drawChartCanvas () {
    return (
      <div className="detail-table" style={this.detailPieStyle()}>
        <canvas ref="charts-canvas" height="500" width="500">
        </canvas>
      </div>
    )
  }


  drawCharts () {
    var that = this
    let canvas = this.refs['charts-canvas']
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var filtered = _.filter(this.props.app.getData()[that.state.elMode], function(el){return el[that.state.evMode]})

    var data = []
    if (that.state.elMode == 'nodes') {
      var groups = _.groupBy(filtered, 'props.gender')
      _.forOwn(groups, function(group, label){
        data.push(
          {
            value: group.length,
            label: that.props.app.getLegendValue('nodes', 'gender', label),
            els: group
          }
        )
      })
    }else{
      var groups = _.groupBy(filtered, 'props.type')
      _.forOwn(groups, function(group, label){
        data.push(
          {
            value: group.length,
            label: that.props.app.getLegendValue('links', 'type', label),
            els: group
          }
        )
      })
    }

    var colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999']

    var pieX = 75;
    var pieY = 75;
    var pieSize = 50;

    var sum = 0;

    for (var di = 0; di != data.length; di++){
      var segment = data[di];
      sum += segment.value;
    };

    var cumulative = 0

    for (var di = 0; di != data.length; di++){
      var segment = data[di];

      var startSegment = cumulative/sum * 2 * Math.PI;
      var endSegment = (cumulative + segment.value)/sum * 2 * Math.PI;

      // drawing segments
      if (that.state.elMode == 'nodes') {
        ctx.fillStyle = that.props.app.getGroupColor(segment.els);
      }else{
        ctx.fillStyle = that.props.app.getTypeColor(segment.els);
      }

      ctx.beginPath();
      ctx.moveTo(pieX, pieY);
      ctx.arc(pieX, pieY, pieSize, startSegment, endSegment, false);
      ctx.lineTo(pieX, pieY);
      ctx.closePath();
      ctx.fill();

      // writing labels
      let diffArc = endSegment - startSegment
      var labelX = pieX + Math.sin(startSegment + Math.PI/2 + diffArc/2) * pieSize * 0.6;
      var labelY = pieY - Math.cos(startSegment + Math.PI/2 + diffArc/2) * pieSize * 0.6;

      ctx.textAlign = 'center';
      ctx.font = 'bold 13pt Calibri';

      ctx.fillStyle = 'black';
      ctx.fillText(segment.label, labelX, labelY);

      cumulative += segment.value;
    }
  }

  drawDisplay () {
    if (this.state.displayMode == 'table'){
      return this.drawTable()
    }else{
      return this.drawChartCanvas()
    }
  }

  render () {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()

    return (
      <div style={this.wrapperStyle()}>
        <div className="form-group" style={this.formStyle()}>
          <b className="col-sm-4" style={this.formDefinitionStyle()}>Mode</b>
          <div class="col-sm-10">
            <label className="radio-inline">
              <input type="radio" checked={this.state.elMode == 'nodes'} onClick={this.changeElMode.bind(that, 'nodes')} />Nodes
            </label>
            <label className="radio-inline">
              <input type="radio" checked={this.state.elMode == 'links'} onClick={this.changeElMode.bind(that, 'links')} />Links
            </label>
          </div>
        </div>
        <div className="form-group" style={this.formStyle()}>
          <b className="col-sm-4" style={this.formDefinitionStyle()}>Mouse event</b>
          <div class="col-sm-10">
            <label className="radio-inline">
              <input type="radio" checked={this.state.evMode == 'over'} onClick={this.changeEvMode.bind(that, 'over')} />Over
            </label>
            <label className="radio-inline">
              <input type="radio" checked={this.state.evMode == 'selected'} onClick={this.changeEvMode.bind(that, 'selected')} />Selection
            </label>
          </div>
        </div>
        <div className="form-group" style={this.formStyle()}>
          <b className="col-sm-4" style={this.formDefinitionStyle()}>Display mode</b>
          <div class="col-sm-10">
            <label className="radio-inline">
              <input type="radio" checked={this.state.displayMode == 'table'} onClick={this.changeDisplayMode.bind(that, 'table')} />Table
            </label>
            <label className="radio-inline">
              <input type="radio" checked={this.state.displayMode == 'charts'} onClick={this.changeDisplayMode.bind(that, 'charts')} />Pie chart
            </label>
          </div>
        </div>

        <div>
          <h4>{this.state.evMode + ' ' + this.state.elMode}</h4>
          {this.drawDisplay()}
        </div>

      </div>
    );
  }
}

export default Detail;
