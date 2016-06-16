import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import _ from 'lodash'

import Graph from '../components/graph/graph.jsx!';
import Map from '../components/map/map.jsx!';
import Timeline from '../components/timeline/timeline.jsx!';
import Menu from '../components/menu/menu.jsx!';
import Detail from '../components/detail/detail.jsx!';

import Panel from '../components/panel/panel.jsx!';

import Components from '../enums/components';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.layout = {
      breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
      colw: 0,
      colh: 50
    }

    this.state = {
      'components': [
        {
          id: 1,
          type: 'MAP',
          w: 6,
          h: 5,
          x: 0,
          y: 0
        },
        {
          id: 2,
          type: 'GRAPH',
          w: 4,
          h: 5,
          x: 6,
          y: 0
        },
        {
          id: 3,
          type: 'TIMELINE',
          w: 7,
          h: 3,
          x: 0,
          y: 7
        },
        {
          id: 4,
          type: 'MENU',
          w: 2,
          h: 5,
          x: 10,
          y: 0
        },
        {
          id: 5,
          type: 'DETAIL',
          w: 5,
          h: 3,
          x: 8,
          y: 7
        }
      ],
      'config': {
        groupColors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],
        typeColors: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'],
        timeGranularity: 10,
        timeUnit: 'year'
      },
      'window': {
        width: window.innerWidth,
        height: window.innerHeight
      },
      'data': {
        "nodes":[
          {"id": 0, "name":"A", "group":1, "coords": [49.1, 17.2], "selected": false, "over": false},
          {"id": 1, "name":"B", "group":2, "coords": [49.2, 17.3], "selected": false, "over": false},
          {"id": 2, "name":"C", "group":3, "coords": [49.3, 17.8], "selected": false, "over": false},
          {"id": 3, "name":"D", "group":4, "coords": [49.7, 17.3], "selected": false, "over": false},
          {"id": 4, "name":"D", "group":5, "coords": [49.3, 17.5], "selected": false, "over": false},
          {"id": 5, "name":"E", "group":3, "coords": [49.5, 17.1], "selected": false, "over": false},
          {"id": 6, "name":"F", "group":2, "coords": [49.1, 17.4], "selected": false, "over": false}
        ],
        "links":[
          {"id": 0, "source":1, "target":0, "value":6, "type": 0, "time": [{year: 1451}] },
          {"id": 1, "source":1, "target":3, "value":9, "type": 2, "time": [{year: 1454}] },
          {"id": 2, "source":2, "target":4, "value":8, "type": 1, "time": [{year: 1454}] },
          {"id": 2, "source":5, "target":4, "value":8, "type": 1, "time": [{year: 1454}] },
          {"id": 3, "source":2, "target":6, "value":8, "type": 2, "time": [{year: 1452}] },
          {"id": 4, "source":0, "target":6, "value":8, "type": 3, "time": [{year: 1453}] },
          {"id": 5, "source":0, "target":5, "value":4, "type": 0, "time": [{year: 1452}] }
        ]
      }
    }

    this.intervalizeLinks()
  }

  getComponentById (id) {
    var foundComponent = false
    this.state.components.map(function(comp, ci){
      if (id == comp.id) {
        foundComponent = comp
      }
    })
    return foundComponent
  }

  colWidth () {
    var w = window.innerWidth - 40
    var breakpoints = this.layout.breakpoints
    var cols = this.layout.cols
    if (w > breakpoints['lg']){
      return w / cols['lg']
    }
    if (w > breakpoints['md']){
      return w / cols['md']
    }
    if (w > breakpoints['sm']){
      return w / cols['sm']
    }
    if (w > breakpoints['xs']){
      return w / cols['xs']
    }
    if (w > breakpoints['xxs']){
      return w / cols['xxs']
    }
  }

  intervalizeLinks () {
    var timeValues = []
    _.forEach(this.getData().links, function(l){
      timeValues.push(l.time[0]['year'])
    })

    var min = _.min(timeValues)
    var max = _.max(timeValues)
    var range = max - min
    var cellValue = _.ceil(range/this.state.config.timeGranularity)

    _.forEach(this.getData().links, function(l){
      l.timeInterval = (l.time[0]['year'] - min)/cellValue
    })

    this.refreshData()
  }

  refreshData () {
    this.setState({data: this.state.data})
  }

  getOverNode () {
    return _.find(this.getData().nodes, function(o) { return o.over == true })
  }

  getNodeById (id) {
    return _.find(this.getData().nodes, function(o) { return o.id == id })
  }

  getLinkById (id) {
    return _.find(this.getData().links, function(o) { return o.id == id })
  }

  getLinksForNodeId (id) {
    return _.filter(this.getData().links, function(o) { return o.source.id == id || o.target.id == id})
  }

  deOver () {
    this.deOverNodes()
    this.deOverLinks()
    this.refreshData()
  }

  setOver (id) {
    this.deOverNodes()
    this.deOverLinks()

    this.getNodeById(id).over = true
    this.overLinks(this.getLinksForNodeId(id))

    this.refreshData()
  }

  // NODES
  deOverNodes () {
    _.forEach(this.getData().nodes, function(n){n.over = false})
  }

  deSelectNodes () {
    _.forEach(this.getData().nodes, function(n){n.selected = false})
    this.refreshData()
  }

  toggleNode (id) {
    this.getNodeById(id).selected = !this.getNodeById(id).selected
    this.refreshData()
  }

  selectNode (id) {
    this.getNodeById(id).selected = true
    this.refreshData()
  }

  unselectNode (id) {
    this.getNodeById(id).selected = false
    this.refreshData()
  }

  // LINKS

  getOverLinks () {
    var overNode = this.getOverNode()
    if (overNode){
      return this.getLinksForNodeId(overNode.id)
    } else {
      return []
    }
  }

  overLinks (links) {
    links.map(function(link){
      link.over = true
    })
  }


  deOverLinks () {
    _.forEach(this.getData().links, function(l){l.over = false})
  }

  deSelectLinks () {
    _.forEach(this.getData().links, function(l){l.selected = false})
  }



  getData () {
    return this.state.data
  }

  getGroupColor (groupNo) {
    return this.state.config.groupColors[groupNo]
  }

  getTypeColor (typeNo) {
    return this.state.config.typeColors[typeNo]
  }

  findComponent (componentId) {
    var foundComponent = false

    this.state.components.map(function(component){
      if (component.id == componentId) {
        foundComponent = component
      }
    })

    return foundComponent
  }

  moveComponent (componentId, dX, dY) {
    let component = this.findComponent(componentId)

    if (component){
      component.x += dX
      component.y += dY
      this.setState({'components': this.state.components})
    }
  }

  resizeComponent (componentId, dX, dY) {
    let component = this.findComponent(componentId)

    if (component){
      component.width += dX
      component.height += dY
      this.setState({'components': this.state.components})
    }
  }

  handleLayoutResize (newLayout) {
    var that = this
    newLayout.map(function(lcomp, ci){
      var comp = that.getComponentById(lcomp.i)

      if (comp){
        comp.w = lcomp.w
        comp.h = lcomp.h
      }
    })
    this.forceUpdate()
  }


  render() {
    let that = this
    this.layout.colw = this.colWidth()

    return (
      <ResponsiveReactGridLayout
        onResizeStop={this.handleLayoutResize.bind(this)}
        className="layout"
        cols={12} rowHeight={this.layout.colh}
        draggableHandle={'div.panel-heading'}
        breakpoints={this.layout.breakpoints}
        cols={this.layout.cols}
        >
        {
          this.state.components.map(function(component){
            let componentType = Components[component.type]
            let grid = {
              x: component.x,
              y: component.y,
              w: component.w,
              h: component.h,
              i: component.id
            }
            let componentState = {
              id: component.id,
              label: componentType.label,
              app: that,
              w: grid.w * that.layout.colw,
              h: grid.h * that.layout.colh
            }

            let componentEl = React.createElement(componentType.component)
            let panel = React.createElement(Panel, componentState, componentEl)

            return <div className="panel-wrapper" key={component.id} _grid={grid} >{panel}</div>
          })
        }
      </ResponsiveReactGridLayout>
    )
  }

}


export default App;
