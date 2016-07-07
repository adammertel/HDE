import React from 'react';
import L from 'leaflet';
import _ from 'lodash'
import Styles from '../../enums/styles'

class Map extends React.Component {

  constructor (props) {
    super(props)
    var that = this

    this.markers = new L.featureGroup()
    this.selecting = false

    this.markers.on('mouseover', function (e) {
      const overNodes = that.groupNodes()[e.layer.options.id]

      let ids = _.map(overNodes, 'id')
      that.props.app.setOver(ids, true)
    })

    this.markers.on('mouseclick', function (e) {
      that.onMarkerClick(this, e)
    })

    this.appStyle = this.props.app.state.style

    this.selectedRectangleStyle = {
      'color': this.appStyle.selectionRectangle.strokeColor,
      'weight': this.appStyle.selectionRectangle.strokeWidth,
      'fillColor': this.appStyle.selectionRectangle.fillColor,
      'fill-opacity': this.appStyle.selectionRectangle.fillOpacity,
      'opacity': this.appStyle.selectionRectangle.strokeOpacity,
    }
  }

  componentWillReceiveProps () {
    this.loadData()
    this.map.invalidateSize(true)
  }

  componentDidMount () {
    this.setMap()
    this.loadData()
  }

  groupNodes () {
    return _.groupBy(this.props.app.getData().nodes, 'coords[0]')
  }

  setMap() {
    var that = this

    var wms = function(url, layer) {
      return L.tileLayer.wms(url, {layers: layer, format: 'image/png', transparent: true, version: '1.3.0', opacity: 0.2})
    }

    var mapEl = this.refs.map
    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors', opacity: 0.2})

    var baseMaps = {
      'OSM': osm,
      'Satellite': wms('http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?', 'GR_ORTFOTORGB'),
      'Base map 1:10 000': wms('http://geoportal.cuzk.cz/WMS_ZM10_PUB/WMService.aspx?', 'GR_ZM10'),
      'LIDAR': wms('http://geoportal.cuzk.cz/WMS_TEREN/WMService.aspx', 'GR_TEREN'),
      '3vm': wms('http://geoportal.gov.cz/ArcGIS/services/CENIA/cenia_rt_III_vojenske_mapovani/MapServer/WMSServer?', '3VM'),
    }

    var map = this.map = L.map(mapEl, {layers: osm, zoomControl: false}).setView([49, 17], 8);
    L.control.zoom({position:'topright'}).addTo(map);
    L.control.layers(baseMaps, null, {position: 'topright'}).addTo(this.map);

    var controlSelect = L.Control.extend({
      options: { position: 'topleft' },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'selection-button fa fa-hand-o-down fa-2x leaflet-bar leaflet-control leaflet-control-custom');

        container.onclick = function(){
          setTimeout(function(){
            that.startSelecting()
          },300)
        }
        return container;
      },
    });

    this.map.addControl(new controlSelect());

    this.map.on('mouseover', function (e) {
      that.props.app.deOver(true)
    })

    this.markers.addTo(this.map)
    this.selectingRectangle = L.rectangle([[0,0], [0,0]], this.selectedRectangleStyle).addTo(this.map);
  }

  startSelecting() {
    var that = this
    var bounds = [[],[]]
    this.selecting = true

    var changeSelectingRectangle = function (e) {
      bounds[1][0] = e.latlng.lat
      bounds[1][1] = e.latlng.lng
      that.selectingRectangle.setBounds(bounds)
    }

    this.map.once('click', function (e) {
      bounds[0][0] = e.latlng.lat
      bounds[0][1] = e.latlng.lng

      that.map.on('mousemove', changeSelectingRectangle)

      that.map.once('click', function (e) {
        that.map.off('mousemove', changeSelectingRectangle)
        that.selectNodes(that.getSelectedNodesByRectangle(bounds))
        that.selectingRectangle.setBounds([[0,0], [0,0]])
      })
    })
  }

  getSelectedNodesByRectangle (bounds) {
    var minX = _.min([bounds[0][0], bounds[1][0]])
    var maxX = _.max([bounds[0][0], bounds[1][0]])
    var minY = _.min([bounds[0][1], bounds[1][1]])
    var maxY = _.max([bounds[0][1], bounds[1][1]])

    var nodesInRectangle = []
    this.props.app.getData().nodes.map(function (node, index) {
      var x = node['coords'][0]
      var y = node['coords'][1]
      if (x > minX && x < maxX && y > minY && y < maxY) {
        nodesInRectangle.push(node.id)
      }
    })
    return nodesInRectangle
  }

  selectNodes (ids) {
    this.props.app.setSelect(ids, true)
  }

  onMarkerClick (marker, e) {
    console.log('map click')
    console.log(e)
  }

  loadData () {
    this.markers.clearLayers()
    var that = this
    let mapGroups = this.groupNodes()

    _.forOwn(mapGroups, function(mapGroup, coord) {
      const radius = 1500 + mapGroup.length * 50

      let firstNode = mapGroup[0]
      if (_.filter(mapGroup, function(node){ return node.over}).length > 0){
        let overMarker = L.circle(firstNode.coords, radius + 1000, Styles.map.over(that.appStyle))
        that.markers.addLayer(overMarker)
      }

      let style = Styles.map.default(that.appStyle)
      if (_.filter(mapGroup, function(node){ return node.selected}).length > 0){
        style = Styles.map.selected(that.appStyle)
      }

      style.fillColor = that.props.app.getGroupColor(mapGroup)
      style.id = coord

      var marker = L.circle(firstNode.coords, radius, style)
      that.markers.addLayer(marker)
    })

  }

  render() {
    return (
      <div className="component component-map">
        <div ref="map" className="map"/>
      </div>
    );
  }
}

export default Map;
