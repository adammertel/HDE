import React from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import _ from 'lodash'

import Graph from './components/graph/graph.jsx!'
import Map from './components/map/map.jsx!'
import Timeline from './components/timeline/timeline.jsx!'
import Menu from './components/menu/menu.jsx!'
import Detail from './components/detail/detail.jsx!'

import Base from './base'
import Panel from './components/panel/panel.jsx!'
import AppHeader from './appheader.jsx!'

import Components from './enums/components'

class App extends React.Component {

  loadData (callback) {
    Base.getJSON('../data.json', (data) => {
      callback(JSON.parse(data))
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }

    this.colors = {
      1: '#2B3A42',
      2: '#3F5765',
      3: '#BDD4DE',
      4: '#EFEFEF',
      5: '#FF530D',
    }

    this.loadData((inputData) => {
      let that = this

      this.layout = {
        breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        colw: 0,
        colh: 50
      }

      this.setState({
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
            w: 5,
            h: 3,
            x: 0,
            y: 7
          },
          // {
          //   id: 4,
          //   type: 'MENU',
          //   w: 2,
          //   h: 5,
          //   x: 10,
          //   y: 0
          // },
          {
            id: 5,
            type: 'DETAIL',
            w: 5,
            h: 3,
            x: 0,
            y: 7,
            mode: 'links'
          },
          {
            id: 6,
            type: 'DETAIL',
            w: 5,
            h: 7,
            x: 10,
            y: 4,
            mode: 'nodes'
          }
        ],
        'config': {
          groupColors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],
          typeColors: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'],
          timeGranularity: 10,
          timeUnit: 'year',
        },
        'style': {
          overColor: that.colors['5'],
          timeline: {
            fillColor: that.colors['2'],
            overStrokeWidth: '6px',
            strokeLocation: 'outside',
            labelSize: '9px',
            labelAnchor: 'middle',
            labelColor: 'black',
            labelFamily: 'arial'
          },

          selectionRectangle: {
            fillOpacity: .3,
            strokeOpacity: .7,
            fillColor: 'red',
            strokeColor: 'black',
            strokeWidth: 1
          },

          defaultNodes: {
            strokeColor: '#000',
            strokeWidth: '1px',
            strokeOpacity: .5,
            fillOpacity: .5,
            radius: 5
          },
          overNodes: {
            strokeWidth: 0,
            fillOpacity: .3,
            strokeOpacity: .3,
            radius: 10
          },
          selectedNodes: {
            strokeWidth: '2px',
            strokeOpacity: 1,
            fillOpacity: 1
          },
          defaultLinks: {
            strokeWidth: '2px',
            strokeOpacity: .5
          },
          overLinks: {
            strokeWidth: '6px',
            strokeOpacity: .4,
          },
          selectedLinks: {
            strokeWidth: '3px',
            strokeOpacity: .8
          }
        },
        'window': {
          width: window.innerWidth,
          height: window.innerHeight
        }
      })

      this.setState({
        'props': inputData.defaultProps
      })

      this.setState(
        {
        'data': {
          "nodes": that.prepareNodes(inputData.nodes),
          "links": that.prepareLinks(inputData.links)
          }
        }
      )
      this.setState({'loading': false})
    })
  }

  nodeName (node) {
    return node.props[this.state.props.nodes.name]
  }

  nodeGroup (node) {
    return node.props[this.state.props.nodes.group]
  }

  linkTime (link) {
    return link.props[this.state.props.links.time]
  }

  linkType (link) {
    return link.props[this.state.props.links.type]
  }

  prepareNodes(nodes){
    let that = this
    nodes.map(function(node, n){
      node.name = that.nodeName.bind(that, node)
      node.group = that.nodeGroup.bind(that, node)
    })
    return nodes
  }

  prepareLinks(links){
    let that = this
    links.map(function(link, l){
      link.time = that.linkTime.bind(that, link)
      link.type = that.linkType.bind(that, link)
    })

    var timeValues = []
    _.forEach(links, function(l) {
      timeValues.push(l.time())
    })

    const min = _.min(timeValues)
    const max = _.max(timeValues)
    const range = max - min

    const cellValue = _.ceil(range/this.state.config.timeGranularity)

    this.timeIntervals = {}

    _.forEach(links, function(l){
      let value = _.floor((l.time() - min)/cellValue)
      l.timeInterval = value
      that.timeIntervals[value] = [min + value * cellValue, min + value * (cellValue + 1)]
    })
    return links
  }

  getComponentById (id) {
    var foundComponent = false
    this.state.components.map( function(comp, ci){
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

  deOver (refresh) {
    this.deOverNodes()
    this.deOverLinks()
    if (refresh){
      this.refreshData()
    }
  }

  deSelect (refresh) {
    this.deSelectNodes()
    this.deSelectLinks()
    if (refresh){
      this.refreshData()
    }
  }

  deOverNodes () {
    _.forEach(this.getData().nodes, function(n){n.over = false})
  }

  deOverLinks () {
    _.forEach(this.getData().links, function(l){l.over = false})
  }

  deSelectNodes () {
    _.forEach(this.getData().nodes, function(n){n.selected = false})
  }

  deSelectLinks () {
    _.forEach(this.getData().links, function(l){l.selected = false})
  }

  // nodesMod true -> setting nodes primary
  // nodesMod false -> setting links primary
  setOver (ids, nodesMode) {
    var that = this
    this.deOver(false)

    if (nodesMode){
      _.forEach(this.getData().nodes, function(n){
        if (ids.indexOf(n.id) > -1){
          n.over = true
          that.getLinksForNodeId(n.id).map(function(link){
            link.over = true
          })
        }
      })
    }else{
      _.forEach(this.getData().links, function(l){
        if (_.includes(ids, l.id)){
          l.over = true
          that.getNodeById(l.source.id).over = true
          that.getNodeById(l.target.id).over = true
        }
      })
    }
    this.refreshData()
  }

  setSelect (ids, nodesMode) {
    var that = this
    this.deSelect(false)

    if (nodesMode){
      _.forEach(this.getData().nodes, function(n){
        if (_.includes(ids, n.id)){
          n.selected = true
          that.getLinksForNodeId(n.id).map(function(link){
            link.selected = true
          })
        }
      })
    }else{
      _.forEach(this.getData().links, function(l){
        if (_.includes(ids, l.id)){
          l.selected = true
          that.getNodeById(l.source.id).selected = true
          that.getNodeById(l.target.id).selected = true
        }
      })
    }
    this.refreshData()
  }

  deSelectNodes () {
    _.forEach(this.getData().nodes, function(n){n.selected = false})
    this.refreshData()
  }

  // LINKS
  deSelectLinks () {
    _.forEach(this.getData().links, function(l){l.selected = false})
  }

  getData () {
    return this.state.data
  }

  getGroupColor (nodes) {
    if (_.isArray(nodes)){
      let groups = _.map(nodes, function(node){return node.group()})
      let mostFrequent = Base.mode(groups)
      return this.state.config.groupColors[groups[0]]
    }else{
      let group = nodes.group()
      return this.state.config.groupColors[group]
    }
  }

  getTypeColor (links) {
    if (_.isArray(links)){
      let types = _.map(links, function(link){return link.type()})
      let mostFrequent = Base.mode(types)
      return this.state.config.typeColors[types[0]]
    }else{
      let type = links[0].type()
      return this.state.config.typeColors[type]
    }
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
    if (!this.state.loading) {
      let that = this
      this.layout.colw = this.colWidth()

      return (
        <div>
          <AppHeader />
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
                component: component,
                w: grid.w * that.layout.colw,
                h: grid.h * that.layout.colh
              }

              let componentEl = React.createElement(componentType.component)
              let panel = React.createElement(Panel, componentState, componentEl)

              return <div className="panel-wrapper" key={component.id} _grid={grid} >{panel}</div>
            })
          }
          </ResponsiveReactGridLayout>
        </div>
      )
    }else{
      return (<div />)
    }

    }

}


export default App;
