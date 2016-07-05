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
      var markerId = e.layer.options.id
      that.onMarkerOver(markerId)
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
    }

    var map = this.map = L.map(mapEl, {layers: osm}).setView([49, 17], 8);
    L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(this.map);

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
      that.onMarkerOut()
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
    var minX = bounds[0][0]
    var maxX = bounds[1][0]
    if (minX > maxX){
      minX = bounds[1][0]
      maxX = bounds[0][0]
    }

    var minY = bounds[0][1]
    var maxY = bounds[1][1]
    if (minY > maxY){
      minY = bounds[1][1]
      maxY = bounds[0][1]
    }

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

  onMarkerOver (id) {
    this.props.app.setOver([id], true)
  }

  onMarkerOut () {
    this.props.app.deOver(true)
  }

  onMarkerClick (marker, e) {
    console.log('map click')
    console.log(e)
  }

  loadData () {
    this.markers.clearLayers()
    var that = this
    this.props.app.getData().nodes.map(function (node) {
      if (node.over){
        that.markers.addLayer(L.circleMarker(node.coords, Styles.map.over(that.appStyle)))
      }

      var style = Styles.map.default(that.appStyle)
      if (node.selected){ style = Styles.map.selected(that.appStyle)}
      style.fillColor = that.props.app.getGroupColor(node)
      style.id = node.id

      var marker = L.circleMarker(node.coords, style)
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
