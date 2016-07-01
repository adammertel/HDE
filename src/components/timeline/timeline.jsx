import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

import SelectingRectangle from './../general/selectingrectangle.jsx!'
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

  onBarOut (active, e) {
    if (active) {
      this.props.app.deOver(true)
    }
  }

  onBarOver (time, active, e) {
    if (active) {
      e.stopPropagation();
      let linksData = this.props.app.getData().links
      let filteredLinks = _.filter(linksData, function(l) { return l.timeInterval == time})
      let timeIds = _.map(filteredLinks, 'id')
      this.props.app.setOver(timeIds, false)
    }
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

    const buildBar = function(style = _.clone(this.defaultStyle), usedBorder = 0, freq = 0, tgroup = 0, mouseEvents = false) {
      return (<Bar
        time={tgroup}
        x={x(tgroup) + lm - usedBorder}
        width={bw + 2*usedBorder}
        y={y(freq) + um - usedBorder}
        height={h - y(freq) + usedBorder}
        onmouseover={that.onBarOver.bind(that, tgroup, mouseEvents)}
        onmouseout={that.onBarOut.bind(that, false)}
        style={_.clone(style)}
      />)
    }

    _.forOwn(linksGroups, function(links, tgroup) {
      var overDriven = false
      links.map(function(link){
        if (link.over && !overDriven){
          overDriven = true
          bars.push(buildBar(that.overStyle, border, links.length, tgroup, false))
          }
      })
    })

    _.forOwn(linksGroups, function(links, tgroup) {
      let bx = x(tgroup) + lm
      that.barXs.push({x: [bx, bx + bw], group: parseInt(tgroup)})
      bars.push(buildBar(that.defaultStyle, 0, links.length, tgroup, true))
    })

    _.forOwn(linksGroups, function(links, tgroup) {
      var selectedFreq = 0
      links.map(function(link){
        if (link.selected){selectedFreq++}
      })
      bars.push(buildBar(that.selectedStyle, 0, selectedFreq, tgroup, false))
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

  svgOriginPosition () {
    let graphElBounds = this.refs.timeline.getBoundingClientRect()
    return [graphElBounds.left, graphElBounds.top]
  }

  startSelection (e) {
    let elPosition = this.svgOriginPosition()

    this.setState({
      selectionX1: e.clientX - elPosition[0],
      selectionY1: e.clientY - elPosition[1],
      selectionX2: e.clientX - elPosition[0],
      selectionY2: e.clientY - elPosition[1],
    })
  }

  confirmSelection () {
    this.doSelection()
    this.hideSelectingRectangle()
  }

  updateSelection (e) {
    let elPosition = this.svgOriginPosition()
    this.setState({
      selectionX2: e.clientX - elPosition[0],
      selectionY2: e.clientY - elPosition[1]
    })
  }

  doSelection () {
    let minX = _.min([this.state.selectionX1, this.state.selectionX2])
    let maxX = _.max([this.state.selectionX1, this.state.selectionX2])

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

    this.props.app.setSelect(linksInRectangle, false)
  }

  hideSelectingRectangle () {
    this.setState({
      selectionX1: 0,
      selectionX2: 0,
      selectionY1: 0,
      selectionY2: 0.
    })
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
          <SelectingRectangle
            app={this.props.app}
            x1={this.state.selectionX1}
            x2={this.state.selectionX2}
            y1={this.state.selectionY1}
            y2={this.state.selectionY2}
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
