import React from 'react';
import d3 from 'd3'
import _ from 'lodash'

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      links: [],
      width: 300,
      height: 100
    }

    this.overStyle = {
      opacity: 1
    }

    this.selectedStyle = {
      strokeWidth: 2
    }
  }

  style() {
    return {
      'backgroundColor': 'white'
    }
  }

  getBars () {
    var th = this.props.h()
    var tw = this.props.w()
    var that = this
    var lm = 40
    var rm = 40
    var bm = 50
    var um = 10
    var h = this.height - bm - um
    var w = this.width - lm - rm
    var g = this.props.app.state.config.timeGranularity
    var bw = w/g

    var timeLinksGroups = _.groupBy(this.props.app.getData().links, 'timeInterval')
    var timeValues = _.map(_.keys(timeLinksGroups), function(g){return parseInt(g)})
    var x = d3.scale.linear().domain([0, g]).range([0, w]);
    var y = d3.scale.linear().domain([0, _.max(timeValues)]).range([h, 0]);

    var bars = []
    _.forOwn(timeLinksGroups, function(links, tgroup) {
      var freq = links.length
      bars.push(<rect
        x={x(tgroup) + lm}
        width={bw}
        y={y(freq) + um}
        height={h - y(freq)}
        style={{
          stroke: '#fff',
          strokeWidth: '3px',
          fill: '#15c',
          opacity: 0.5
        }}
      />)
    })

    return bars
  }

  render() {
    this.width = this.props.w()
    this.height = this.props.h()
    return (
      <div className="component component-graph" style={this.style()}>
        <svg
          width={this.width}
          height={this.height}>
          {this.getBars()}
        </svg>
      </div>
    );
  }
}

export default Timeline;
