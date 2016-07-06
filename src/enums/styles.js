import _ from 'lodash'

var Styles = {
  graph: {
    nodes: {
      default: function(appStyle) {
        return _.clone({
          "stroke-width": appStyle.defaultNodes.strokeWidth,
          "opacity": appStyle.defaultNodes.strokeOpacity,
          "stroke": appStyle.defaultNodes.strokeColor,
        })
      },
      over: function(appStyle) {
        let defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "stroke-width": appStyle.overNodes.strokeWidth,
          "fill": appStyle.overColor,
          "opacity": appStyle.overNodes.fillOpacity
        }))
      },
      selected: function(appStyle) {
        let defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "stroke-width": appStyle.selectedNodes.strokeWidth,
          "opacity": appStyle.selectedNodes.strokeOpacity
        }))
      }
    },
    links: {
      default: function(appStyle) {
        return _.clone({
          "strokeWidth": appStyle.defaultLinks.strokeWidth,
          "opacity": appStyle.defaultLinks.strokeOpacity
        })
      },
      over: function(appStyle) {
        const defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "opacity": appStyle.overLinks.strokeOpacity,
          "strokeWidth": appStyle.overLinks.strokeWidth,
          "stroke": appStyle.overColor
        }))
      },
      selected: function(appStyle) {
        const defaultStyle = this.default(appStyle)
        return _.clone(_.assign(defaultStyle, {
          "strokeWidth": appStyle.selectedLinks.strokeWidth,
          "opacity": appStyle.selectedLinks.strokeOpacity
        }))
      }
    }
  },
  map: {
    default: function(appStyle) {
      return _.clone({
        color: appStyle.defaultNodes.strokeColor,
        opacity: appStyle.defaultNodes.strokeOpacity,
        fillOpacity: appStyle.defaultNodes.fillOpacity,
        weight: appStyle.defaultNodes.strokeWidth
      })
    },
    over: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        fillOpacity: appStyle.overNodes.fillOpacity,
        fillColor: appStyle.overColor,
        weight: appStyle.overNodes.fillOpacity,
      }))
    },
    selected: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        fillOpacity: appStyle.selectedNodes.fillOpacity,
        opacity: appStyle.selectedNodes.strokeOpacity,
        weight: appStyle.selectedNodes.strokeWidth
      }))
    }
  },
  timeline: {
    default: function(appStyle) {
      return _.clone({
        "strokeWidth": '0px',
        "fill": appStyle.timeline.fillColor,
        "opacity": appStyle.defaultNodes.strokeOpacity
      })
    },
    over: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        "opacity": appStyle.overNodes.fillOpacity,
        "strokeWidth": appStyle.timeline.overStrokeWidth,
        "fill": appStyle.overColor,
        "stroke": appStyle.overColor,
        "strokeLocation": appStyle.timeline.strokeLocation
      }))
    },
    selected: function(appStyle) {
      let defaultStyle = this.default(appStyle)
      return _.clone(_.assign(defaultStyle, {
        "opacity": appStyle.selectedNodes.strokeOpacity
      }))
    },
    text: function(appStyle) {
      return _.clone({
        "fontSize": appStyle.timeline.labelSize,
        "textAnchor": appStyle.timeline.labelAnchor,
        "fill": appStyle.timeline.labelColor,
        "fontFamily": appStyle.timeline.labelFamily
      })
    }
  }
}

export default Styles;
