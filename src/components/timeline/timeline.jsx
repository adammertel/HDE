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
      width: 300,
      height: 100
    }

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

  getBars () {
    var that = this
    var th = this.props.h()
    var tw = this.props.w()
    var lm = 40
    var rm = 40
    var bm = 50
    var um = 10
    var h = this.height - bm - um
    var g = this.props.app.state.config.timeGranularity
    var w = this.width - lm - rm
    var bw = w/g - 15
    var border = 3

    var linksData = this.props.app.getData().links
    var linksGroups = _.groupBy(linksData, 'timeInterval')
    var timeValues = _.map(_.keys(linksGroups), function(g){return parseInt(g)})
    var x = d3.scale.linear().domain([0, g]).range([0, w]);
    var y = d3.scale.linear().domain([0, _.max(timeValues)]).range([h, 0]);

    var bars = []

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
            height={h - y(freq) + 2*border}
            style={that.overStyle}
            />)
          }
      })
    })

    _.forOwn(linksGroups, function(links, tgroup) {
      var freq = links.length
      bars.push(<Bar
        time={tgroup}
        x={x(tgroup) + lm}
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

  render() {
    var that = this
    this.width = this.props.w()
    this.height = this.props.h()
    return (
      <div className="component component-graph">
        <svg
          width={this.width}
          height={this.height}>
          <g onMouseOver={that.onBarOut.bind(that)} >
            {this.getBars()}
          </g>
        </svg>
      </div>
    );
  }
}

export default Timeline;
