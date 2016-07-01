import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

import Bar from './bar.jsx!'

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      links: [],
      selectionX1: 0,
      selectionY1: 0,
      selectionX2: 0,
      selectionY2: 0,
    }

    this.selectionActivated = false
    this.selectionOngoing = false

    var appStyle = this.props.app.state.style

    this.defaultStyle = {
      "stroke": '#fff',
      "strokeWidth": '0px',
      "fill": '#15c',
      "opacity": 0.5
    }

    var defaultStyleClone = _.clone(this.defaultStyle)
    this.overStyle = _.clone(_.assign(defaultStyleClone, {
      "opacity": .3,
      "strokeWidth": '6px',
      "stroke": appStyle.overLinks.fillColor,
      "strokeLocation": 'outside'
    }))
    this.selectedStyle = _.clone(_.assign(defaultStyleClone, {
      "opacity": 1,
      "stroke": '#000',
      "strokeWidth": '0px',
    }))

  }

  barStyle(bar) {
    var style = _.clone(this.defaultStyle)
    if (bar.selected){ style = _.clone(this.selectedStyle)}
    return style
  }

  onBarOut (e) {
    e.stopPropagation();
    this.props.app.deOver(true)
  }

  onBarOver (time, e) {
    e.stopPropagation();
    var linksData = this.props.app.getData().links
    var filteredLinks = _.filter(linksData, function(l) { return l.timeInterval == time})
    var timeIds = _.map(filteredLinks, 'id')
    this.props.app.setOver(timeIds, false)
  }

  drawBars () {
    let that = this
    let th = this.props.h()
    let tw = this.props.w()
    let lm = 80
    let rm = 40
    let bm = 50
    let um = 30
    let h = th - bm - um
    let g = this.props.app.state.config.timeGranularity
    let w = tw - lm - rm
    let bw = w/g - 15
    let border = 3

    let linksData = this.props.app.getData().links
    let linksGroups = _.groupBy(linksData, 'timeInterval')
    let timeValues = _.map(_.keys(linksGroups), function(g){return linksGroups[g].length})

    let x = d3.scale.linear().domain([0, g]).range([0, w]);
    let y = d3.scale.linear().domain([0, _.max(timeValues)]).range([h, 0]);

    let bars = []
    this.barXs = []

    _.forOwn(linksGroups, function(links, tgroup) {
      var overDriven = false
      links.map(function(link){
        if (link.over && !overDriven){
          overDriven = true
          var freq = links.length
          var barOpts = {over: true}
          bars.push(<Bar
            time={tgroup}
            x={x(tgroup) + lm - border}
            width={bw + 2*border}
            y={y(freq) + um - border}
            height={h - y(freq) + border}
            style={that.overStyle}
            />)
          }
      })
    })

    _.forOwn(linksGroups, function(links, tgroup) {
      let bx = x(tgroup) + lm
      that.barXs.push({x: [bx, bx + bw], group: parseInt(tgroup)})

      let freq = links.length
      bars.push(<Bar
        time={tgroup}
        x={bx}
        width={bw}
        y={y(freq) + um}
        height={h - y(freq)}
        onmouseover={that.onBarOver.bind(that, tgroup)}
        style={that.barStyle({})}
      />)
    })

    _.forOwn(linksGroups, function(links, tgroup) {
      var selectedFreq = 0
      links.map(function(link){
        if (link.selected){selectedFreq++}
      })

      bars.push(<Bar
        time={tgroup}
        x={x(tgroup) + lm}
        width={bw}
        y={y(selectedFreq) + um}
        height={h - y(selectedFreq)}
        onmouseover={that.onBarOver.bind(that, tgroup)}
        style={that.selectedStyle}
      />)
    })

    return bars
  }

  activateSelection() {
    this.selectionActivated = !this.selecting
  }

  handleMouseDown (e) {
    var eClone = _.clone(e)
    if (this.selectionOngoing) {
      this.selectionOngoing = false
      this.selectionActivated = false
      this.confirmSelection()
    }
    if (this.selectionActivated){
      var that = this
      setTimeout(function(){
        that.selectionOngoing = true
        that.startSelection(eClone)
      }, 300)
    }
  }

  handleMouseMove (e) {
    var that = this

    if (this.selectionOngoing) {
      this.updateSelection(e)
    }
  }

  selectionY () {
    if (this.state.selectionY1 < this.state.selectionY2){
      return this.state.selectionY1
    }else{
      return this.state.selectionY2
    }
  }

  selectionX () {
    if (this.state.selectionX1 < this.state.selectionX2){
      return this.state.selectionX1
    }else{
      return this.state.selectionX2
    }
  }

  selectionW () {
    return Math.abs(this.state.selectionX1 - this.state.selectionX2)
  }

  selectionH () {
    return Math.abs(this.state.selectionY1 - this.state.selectionY2)
  }


  selectionRectStyle () {
    return {
      'stroke': this.props.app.state.style.selectionRectangle.strokeColor,
      'strokeOpacity': this.props.app.state.style.selectionRectangle.strokeOpacity,
      'strokeWidth': this.props.app.state.style.selectionRectangle.strokeWidth,
      'fill': this.props.app.state.style.selectionRectangle.fillColor,
      'fillOpacity': this.props.app.state.style.selectionRectangle.fillOpacity
    }
  }

  svgOriginPosition () {
    let graphElBounds = this.refs.timeline.getBoundingClientRect()
    return [graphElBounds.left, graphElBounds.top]
  }

  startSelection (e) {
    let elPosition = this.svgOriginPosition()

    console.log(e.clientY)
    console.log(elPosition[1])

    this.setState({
      selectionX1: e.clientX - elPosition[0],
      selectionY1: e.clientY - elPosition[1],
      selectionX2: e.clientX - elPosition[0],
      selectionY2: e.clientY - elPosition[1],
    })
  }

  confirmSelection () {
    console.log('selection confirmed')
    this.doSelection()
    this.hideSelectingRectangle()
  }

  updateSelection (e) {
    console.log('selection updated')
    let elPosition = this.svgOriginPosition()
    this.setState({
      selectionX2: e.clientX - elPosition[0],
      selectionY2: e.clientY - elPosition[1]
    })
  }

  doSelection () {
    let minX = this.selectionX()
    let maxX = minX + this.selectionW()

    let selectedTimeIntervals = []

    this.barXs.map(function(bar, b){
      if (bar.x[0] > minX && bar.x[1] < maxX){
        selectedTimeIntervals.push(bar.group)
      }
    })

    let linksInRectangle = []
    this.props.app.getData().links.map(function (link, l) {
      if (_.includes(selectedTimeIntervals, link.timeInterval)) {
        linksInRectangle.push(link.id)
      }
    })

    console.log(linksInRectangle)
    this.props.app.setSelect(linksInRectangle, false)
  }

  render() {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()
    return (
      <div className="component component-graph">
        <div
          className="selection-button-graph selection-button fa fa-hand-o-down fa-2x leaflet-bar leaflet-control leaflet-control-custom"
          onClick={this.activateSelection.bind(that)}>
        </div>
        <svg
          ref="timeline"
          width={this.width}
          height={this.height}
          onMouseDown={that.handleMouseDown.bind(that)}
          onMouseMove={that.handleMouseMove.bind(that)}
          >
          <rect style={this.selectionRectStyle()}
            x={this.selectionX()} y={this.selectionY()} width={this.selectionW()} height={this.selectionH()}
          />
          <g onMouseOver={that.onBarOut.bind(that)} >
            {this.drawBars()}
          </g>
        </svg>
      </div>
    );
  }
}

export default Timeline;
