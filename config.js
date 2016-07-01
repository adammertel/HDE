System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "sourceMaps": true,
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "app.js": [
      "start.js",
      "src/init.js",
      "github:fezVrasta/bootstrap-material-design@0.5.9.js",
      "github:fezVrasta/bootstrap-material-design@0.5.9/scripts/index.js",
      "github:fezVrasta/bootstrap-material-design@0.5.9/scripts/ripples.js",
      "github:fezVrasta/bootstrap-material-design@0.5.9/scripts/material.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js",
      "npm:react@15.1.0.js",
      "npm:react@15.1.0/react.js",
      "npm:react@15.1.0/lib/React.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:process@0.11.5.js",
      "npm:process@0.11.5/browser.js",
      "npm:fbjs@0.8.3/lib/warning.js",
      "npm:fbjs@0.8.3/lib/emptyFunction.js",
      "npm:react@15.1.0/lib/onlyChild.js",
      "npm:fbjs@0.8.3/lib/invariant.js",
      "npm:react@15.1.0/lib/ReactElement.js",
      "npm:react@15.1.0/lib/canDefineProperty.js",
      "npm:react@15.1.0/lib/ReactCurrentOwner.js",
      "npm:object-assign@4.1.0.js",
      "npm:object-assign@4.1.0/index.js",
      "npm:react@15.1.0/lib/ReactVersion.js",
      "npm:react@15.1.0/lib/ReactPropTypes.js",
      "npm:react@15.1.0/lib/getIteratorFn.js",
      "npm:react@15.1.0/lib/ReactPropTypeLocationNames.js",
      "npm:react@15.1.0/lib/ReactElementValidator.js",
      "npm:react@15.1.0/lib/ReactPropTypeLocations.js",
      "npm:fbjs@0.8.3/lib/keyMirror.js",
      "npm:react@15.1.0/lib/ReactDOMFactories.js",
      "npm:fbjs@0.8.3/lib/mapObject.js",
      "npm:react@15.1.0/lib/ReactClass.js",
      "npm:fbjs@0.8.3/lib/keyOf.js",
      "npm:fbjs@0.8.3/lib/emptyObject.js",
      "npm:react@15.1.0/lib/ReactNoopUpdateQueue.js",
      "npm:react@15.1.0/lib/ReactComponent.js",
      "npm:react@15.1.0/lib/ReactInstrumentation.js",
      "npm:react@15.1.0/lib/ReactDebugTool.js",
      "npm:react@15.1.0/lib/ReactComponentTreeDevtool.js",
      "npm:react@15.1.0/lib/ReactNativeOperationHistoryDevtool.js",
      "npm:react@15.1.0/lib/ReactInvalidSetStateWarningDevTool.js",
      "npm:fbjs@0.8.3/lib/performanceNow.js",
      "npm:fbjs@0.8.3/lib/performance.js",
      "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js",
      "npm:react@15.1.0/lib/ReactChildren.js",
      "npm:react@15.1.0/lib/traverseAllChildren.js",
      "npm:react@15.1.0/lib/KeyEscapeUtils.js",
      "npm:react@15.1.0/lib/PooledClass.js",
      "npm:react-dom@15.1.0.js",
      "npm:react-dom@15.1.0/index.js",
      "npm:react@15.1.0/lib/ReactDOM.js",
      "npm:react@15.1.0/lib/renderSubtreeIntoContainer.js",
      "npm:react@15.1.0/lib/ReactMount.js",
      "npm:react@15.1.0/lib/shouldUpdateReactComponent.js",
      "npm:react@15.1.0/lib/setInnerHTML.js",
      "npm:react@15.1.0/lib/createMicrosoftUnsafeLocalFunction.js",
      "npm:react@15.1.0/lib/instantiateReactComponent.js",
      "npm:react@15.1.0/lib/ReactNativeComponent.js",
      "npm:react@15.1.0/lib/ReactEmptyComponent.js",
      "npm:react@15.1.0/lib/ReactCompositeComponent.js",
      "npm:react@15.1.0/lib/ReactUpdateQueue.js",
      "npm:react@15.1.0/lib/ReactUpdates.js",
      "npm:react@15.1.0/lib/Transaction.js",
      "npm:react@15.1.0/lib/ReactReconciler.js",
      "npm:react@15.1.0/lib/ReactRef.js",
      "npm:react@15.1.0/lib/ReactOwner.js",
      "npm:react@15.1.0/lib/ReactFeatureFlags.js",
      "npm:react@15.1.0/lib/CallbackQueue.js",
      "npm:react@15.1.0/lib/ReactInstanceMap.js",
      "npm:react@15.1.0/lib/ReactNodeTypes.js",
      "npm:react@15.1.0/lib/ReactErrorUtils.js",
      "npm:react@15.1.0/lib/ReactComponentEnvironment.js",
      "npm:react@15.1.0/lib/ReactMarkupChecksum.js",
      "npm:react@15.1.0/lib/adler32.js",
      "npm:react@15.1.0/lib/ReactDOMFeatureFlags.js",
      "npm:react@15.1.0/lib/ReactDOMContainerInfo.js",
      "npm:react@15.1.0/lib/validateDOMNesting.js",
      "npm:react@15.1.0/lib/ReactDOMComponentTree.js",
      "npm:react@15.1.0/lib/ReactDOMComponentFlags.js",
      "npm:react@15.1.0/lib/DOMProperty.js",
      "npm:react@15.1.0/lib/ReactBrowserEventEmitter.js",
      "npm:react@15.1.0/lib/isEventSupported.js",
      "npm:react@15.1.0/lib/getVendorPrefixedEventName.js",
      "npm:react@15.1.0/lib/ViewportMetrics.js",
      "npm:react@15.1.0/lib/ReactEventEmitterMixin.js",
      "npm:react@15.1.0/lib/EventPluginHub.js",
      "npm:react@15.1.0/lib/forEachAccumulated.js",
      "npm:react@15.1.0/lib/accumulateInto.js",
      "npm:react@15.1.0/lib/EventPluginUtils.js",
      "npm:react@15.1.0/lib/EventConstants.js",
      "npm:react@15.1.0/lib/EventPluginRegistry.js",
      "npm:react@15.1.0/lib/DOMLazyTree.js",
      "npm:react@15.1.0/lib/setTextContent.js",
      "npm:react@15.1.0/lib/escapeTextContentForBrowser.js",
      "npm:react@15.1.0/lib/DOMNamespaces.js",
      "npm:react@15.1.0/lib/getNativeComponentFromComposite.js",
      "npm:react@15.1.0/lib/findDOMNode.js",
      "npm:react@15.1.0/lib/ReactDefaultInjection.js",
      "npm:react@15.1.0/lib/SimpleEventPlugin.js",
      "npm:react@15.1.0/lib/getEventCharCode.js",
      "npm:react@15.1.0/lib/SyntheticWheelEvent.js",
      "npm:react@15.1.0/lib/SyntheticMouseEvent.js",
      "npm:react@15.1.0/lib/getEventModifierState.js",
      "npm:react@15.1.0/lib/SyntheticUIEvent.js",
      "npm:react@15.1.0/lib/getEventTarget.js",
      "npm:react@15.1.0/lib/SyntheticEvent.js",
      "npm:react@15.1.0/lib/SyntheticTransitionEvent.js",
      "npm:react@15.1.0/lib/SyntheticTouchEvent.js",
      "npm:react@15.1.0/lib/SyntheticDragEvent.js",
      "npm:react@15.1.0/lib/SyntheticKeyboardEvent.js",
      "npm:react@15.1.0/lib/getEventKey.js",
      "npm:react@15.1.0/lib/SyntheticFocusEvent.js",
      "npm:react@15.1.0/lib/SyntheticClipboardEvent.js",
      "npm:react@15.1.0/lib/SyntheticAnimationEvent.js",
      "npm:react@15.1.0/lib/EventPropagators.js",
      "npm:fbjs@0.8.3/lib/EventListener.js",
      "npm:react@15.1.0/lib/SelectEventPlugin.js",
      "npm:fbjs@0.8.3/lib/shallowEqual.js",
      "npm:react@15.1.0/lib/isTextInputElement.js",
      "npm:fbjs@0.8.3/lib/getActiveElement.js",
      "npm:react@15.1.0/lib/ReactInputSelection.js",
      "npm:fbjs@0.8.3/lib/focusNode.js",
      "npm:fbjs@0.8.3/lib/containsNode.js",
      "npm:fbjs@0.8.3/lib/isTextNode.js",
      "npm:fbjs@0.8.3/lib/isNode.js",
      "npm:react@15.1.0/lib/ReactDOMSelection.js",
      "npm:react@15.1.0/lib/getTextContentAccessor.js",
      "npm:react@15.1.0/lib/getNodeForCharacterOffset.js",
      "npm:react@15.1.0/lib/SVGDOMPropertyConfig.js",
      "npm:react@15.1.0/lib/ReactReconcileTransaction.js",
      "npm:react@15.1.0/lib/ReactInjection.js",
      "npm:react@15.1.0/lib/ReactEventListener.js",
      "npm:fbjs@0.8.3/lib/getUnboundedScrollPosition.js",
      "npm:react@15.1.0/lib/ReactDefaultBatchingStrategy.js",
      "npm:react@15.1.0/lib/ReactDOMTextComponent.js",
      "npm:react@15.1.0/lib/DOMChildrenOperations.js",
      "npm:react@15.1.0/lib/ReactMultiChildUpdateTypes.js",
      "npm:react@15.1.0/lib/Danger.js",
      "npm:fbjs@0.8.3/lib/getMarkupWrap.js",
      "npm:fbjs@0.8.3/lib/createNodesFromMarkup.js",
      "npm:fbjs@0.8.3/lib/createArrayFromMixed.js",
      "npm:react@15.1.0/lib/ReactDOMTreeTraversal.js",
      "npm:react@15.1.0/lib/ReactDOMEmptyComponent.js",
      "npm:react@15.1.0/lib/ReactDOMComponent.js",
      "npm:react@15.1.0/lib/ReactServerRenderingTransaction.js",
      "npm:react@15.1.0/lib/ReactMultiChild.js",
      "npm:react@15.1.0/lib/flattenChildren.js",
      "npm:react@15.1.0/lib/ReactChildReconciler.js",
      "npm:react@15.1.0/lib/ReactDOMTextarea.js",
      "npm:react@15.1.0/lib/LinkedValueUtils.js",
      "npm:react@15.1.0/lib/DOMPropertyOperations.js",
      "npm:react@15.1.0/lib/quoteAttributeValueForBrowser.js",
      "npm:react@15.1.0/lib/ReactDOMInstrumentation.js",
      "npm:react@15.1.0/lib/ReactDOMDebugTool.js",
      "npm:react@15.1.0/lib/ReactDOMUnknownPropertyDevtool.js",
      "npm:react@15.1.0/lib/DisabledInputUtils.js",
      "npm:react@15.1.0/lib/ReactDOMSelect.js",
      "npm:react@15.1.0/lib/ReactDOMOption.js",
      "npm:react@15.1.0/lib/ReactDOMInput.js",
      "npm:react@15.1.0/lib/ReactDOMButton.js",
      "npm:react@15.1.0/lib/ReactComponentBrowserEnvironment.js",
      "npm:react@15.1.0/lib/ReactDOMIDOperations.js",
      "npm:react@15.1.0/lib/CSSPropertyOperations.js",
      "npm:fbjs@0.8.3/lib/memoizeStringOnly.js",
      "npm:fbjs@0.8.3/lib/hyphenateStyleName.js",
      "npm:fbjs@0.8.3/lib/hyphenate.js",
      "npm:react@15.1.0/lib/dangerousStyleValue.js",
      "npm:react@15.1.0/lib/CSSProperty.js",
      "npm:fbjs@0.8.3/lib/camelizeStyleName.js",
      "npm:fbjs@0.8.3/lib/camelize.js",
      "npm:react@15.1.0/lib/AutoFocusUtils.js",
      "npm:react@15.1.0/lib/HTMLDOMPropertyConfig.js",
      "npm:react@15.1.0/lib/EnterLeaveEventPlugin.js",
      "npm:react@15.1.0/lib/DefaultEventPluginOrder.js",
      "npm:react@15.1.0/lib/ChangeEventPlugin.js",
      "npm:react@15.1.0/lib/BeforeInputEventPlugin.js",
      "npm:react@15.1.0/lib/SyntheticInputEvent.js",
      "npm:react@15.1.0/lib/SyntheticCompositionEvent.js",
      "npm:react@15.1.0/lib/FallbackCompositionState.js",
      "src/app.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/enums/components.js",
      "src/components/detail/detail.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "npm:babel-runtime@5.7.0/helpers/class-call-check.js",
      "npm:babel-runtime@5.7.0/helpers/create-class.js",
      "npm:babel-runtime@5.7.0/core-js/object/define-property.js",
      "npm:core-js@0.9.18/library/fn/object/define-property.js",
      "npm:core-js@0.9.18/library/modules/$.js",
      "npm:core-js@0.9.18/library/modules/$.fw.js",
      "npm:babel-runtime@5.7.0/helpers/inherits.js",
      "npm:babel-runtime@5.7.0/core-js/object/create.js",
      "npm:core-js@0.9.18/library/fn/object/create.js",
      "npm:babel-runtime@5.7.0/helpers/get.js",
      "npm:babel-runtime@5.7.0/core-js/object/get-own-property-descriptor.js",
      "npm:core-js@0.9.18/library/fn/object/get-own-property-descriptor.js",
      "npm:core-js@0.9.18/library/modules/es6.object.statics-accept-primitives.js",
      "npm:core-js@0.9.18/library/modules/$.get-names.js",
      "npm:core-js@0.9.18/library/modules/$.def.js",
      "src/components/menu/menu.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/timeline/timeline.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/timeline/bar.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/general/selectingrectangle.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "npm:lodash@3.10.0.js",
      "npm:lodash@3.10.0/index.js",
      "npm:d3@3.5.17.js",
      "npm:d3@3.5.17/d3.js",
      "src/components/map/map.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "github:Leaflet/Leaflet@0.7.7.js",
      "github:Leaflet/Leaflet@0.7.7/dist/leaflet-src.js",
      "src/components/graph/graph.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/graph/link.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/graph/node.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/components/panel/panel.jsx!github:floatdrop/plugin-jsx@1.1.0.js",
      "src/base.js",
      "npm:react-grid-layout@0.12.6.js",
      "npm:react-grid-layout@0.12.6/index.js",
      "npm:react-grid-layout@0.12.6/build/components/WidthProvider.js",
      "npm:react-grid-layout@0.12.6/build/responsiveUtils.js",
      "npm:react-grid-layout@0.12.6/build/utils.js",
      "npm:react-grid-layout@0.12.6/build/ResponsiveReactGridLayout.js",
      "npm:react-grid-layout@0.12.6/build/ReactGridLayout.js",
      "npm:react-grid-layout@0.12.6/build/GridItem.js",
      "npm:react-resizable@1.4.1.js",
      "npm:react-resizable@1.4.1/index.js",
      "npm:react-resizable@1.4.1/build/ResizableBox.js",
      "npm:react-resizable@1.4.1/build/Resizable.js",
      "npm:react-resizable@1.4.1/build/cloneElement.js",
      "npm:react-draggable@2.1.2.js",
      "npm:react-draggable@2.1.2/dist/react-draggable.js",
      "npm:lodash.isequal@4.2.0.js",
      "npm:lodash.isequal@4.2.0/index.js",
      "npm:lodash._root@3.0.1.js",
      "npm:lodash._root@3.0.1/index.js",
      "npm:lodash.keys@4.0.7.js",
      "npm:lodash.keys@4.0.7/index.js",
      "npm:font-awesome@4.6.1/css/font-awesome.min.css!github:systemjs/plugin-css@0.1.21.js"
    ]
  },
  trace: true,

  map: {
    "babel": "npm:babel-core@5.7.4",
    "babel-runtime": "npm:babel-runtime@5.7.0",
    "bootstrap-material": "github:fezVrasta/bootstrap-material-design@0.5.9",
    "clean-css": "npm:clean-css@3.4.12",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.21",
    "d3": "npm:d3@3.5.17",
    "font-awesome": "npm:font-awesome@4.6.1",
    "jquery": "npm:jquery@2.2.4",
    "jsx": "github:floatdrop/plugin-jsx@1.1.0",
    "leaflet": "github:Leaflet/Leaflet@0.7.7",
    "lodash": "npm:lodash@3.10.0",
    "react": "npm:react@15.1.0",
    "react-dom": "npm:react-dom@15.1.0",
    "react-grid-layout": "npm:react-grid-layout@0.12.6",
    "strml/react-grid-layout": "github:strml/react-grid-layout@0.12.6",
    "github:floatdrop/plugin-jsx@1.1.0": {
      "react-tools": "npm:react-tools@0.13.3"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-constants@0.1.0": {
      "constants-browserify": "npm:constants-browserify@0.0.1"
    },
    "github:jspm/nodelibs-crypto@0.1.0": {
      "crypto-browserify": "npm:crypto-browserify@3.9.14"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asap@2.0.4": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:asn1.js@2.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:ast-types@0.8.7": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:babel-runtime@5.7.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserify-aes@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-xor": "npm:buffer-xor@1.0.2",
      "create-hash": "npm:create-hash@1.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-rsa@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:browserify-sign@3.0.2": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.1",
      "create-hmac": "npm:create-hmac@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0",
      "inherits": "npm:inherits@2.0.1",
      "parse-asn1": "npm:parse-asn1@3.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.1.4",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:buffer-xor@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.5.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:commoner@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "commander": "npm:commander@2.5.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "glob": "npm:glob@4.2.2",
      "graceful-fs": "npm:graceful-fs@3.0.8",
      "iconv-lite": "npm:iconv-lite@0.4.11",
      "install": "npm:install@0.1.8",
      "mkdirp": "npm:mkdirp@0.5.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "private": "npm:private@0.1.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "q": "npm:q@1.1.2",
      "recast": "npm:recast@0.10.26",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:constants-browserify@0.0.1": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:create-ecdh@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "elliptic": "npm:elliptic@3.1.0"
    },
    "npm:create-hash@1.1.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "ripemd160": "npm:ripemd160@1.0.1",
      "sha.js": "npm:sha.js@2.4.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:create-hmac@1.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:crypto-browserify@3.9.14": {
      "browserify-aes": "npm:browserify-aes@1.0.2",
      "browserify-sign": "npm:browserify-sign@3.0.2",
      "create-ecdh": "npm:create-ecdh@2.0.1",
      "create-hash": "npm:create-hash@1.1.1",
      "create-hmac": "npm:create-hmac@1.1.3",
      "diffie-hellman": "npm:diffie-hellman@3.0.2",
      "inherits": "npm:inherits@2.0.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "public-encrypt": "npm:public-encrypt@2.0.1",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:diffie-hellman@3.0.2": {
      "bn.js": "npm:bn.js@2.2.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "miller-rabin": "npm:miller-rabin@2.1.0",
      "randombytes": "npm:randombytes@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:elliptic@3.1.0": {
      "bn.js": "npm:bn.js@2.2.0",
      "brorand": "npm:brorand@1.0.5",
      "hash.js": "npm:hash.js@1.0.3",
      "inherits": "npm:inherits@2.0.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:encoding@0.1.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "iconv-lite": "npm:iconv-lite@0.4.13"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:esprima-fb@15001.1.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fbjs@0.8.3": {
      "core-js": "npm:core-js@1.2.6",
      "immutable": "npm:immutable@3.8.1",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "ua-parser-js": "npm:ua-parser-js@0.7.10"
    },
    "npm:font-awesome@4.6.1": {
      "css": "github:systemjs/plugin-css@0.1.21"
    },
    "npm:glob@4.2.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inflight": "npm:inflight@1.0.4",
      "inherits": "npm:inherits@2.0.1",
      "minimatch": "npm:minimatch@1.0.0",
      "once": "npm:once@1.3.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:graceful-fs@3.0.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "constants": "github:jspm/nodelibs-constants@0.1.0",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:hash.js@1.0.3": {
      "inherits": "npm:inherits@2.0.1"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:iconv-lite@0.4.11": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:iconv-lite@0.4.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inflight@1.0.4": {
      "once": "npm:once@1.3.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:install@0.1.8": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:isomorphic-fetch@2.2.1": {
      "node-fetch": "npm:node-fetch@1.5.3",
      "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:lodash.isequal@4.2.0": {
      "lodash._root": "npm:lodash._root@3.0.1",
      "lodash.keys": "npm:lodash.keys@4.0.7",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@3.10.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@1.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:miller-rabin@2.1.0": {
      "bn.js": "npm:bn.js@3.1.1",
      "brorand": "npm:brorand@1.0.5"
    },
    "npm:minimatch@1.0.0": {
      "lru-cache": "npm:lru-cache@2.6.5",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "sigmund": "npm:sigmund@1.0.1"
    },
    "npm:mkdirp@0.5.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "minimist": "npm:minimist@0.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-fetch@1.5.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "encoding": "npm:encoding@0.1.12",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "is-stream": "npm:is-stream@1.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:once@1.3.2": {
      "wrappy": "npm:wrappy@1.0.1"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:parse-asn1@3.0.1": {
      "asn1.js": "npm:asn1.js@2.1.3",
      "browserify-aes": "npm:browserify-aes@1.0.2",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.1",
      "pbkdf2": "npm:pbkdf2@3.0.4",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pbkdf2@3.0.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "create-hmac": "npm:create-hmac@1.1.3",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:promise@7.1.1": {
      "asap": "npm:asap@2.0.4",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:public-encrypt@2.0.1": {
      "bn.js": "npm:bn.js@2.2.0",
      "browserify-rsa": "npm:browserify-rsa@2.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "create-hash": "npm:create-hash@1.1.1",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "parse-asn1": "npm:parse-asn1@3.0.1",
      "randombytes": "npm:randombytes@2.0.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:q@1.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:randombytes@2.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "crypto": "github:jspm/nodelibs-crypto@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-dom@15.1.0": {
      "react": "npm:react@15.1.0"
    },
    "npm:react-draggable@2.1.2": {
      "classnames": "npm:classnames@2.2.5",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-grid-layout@0.12.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "lodash.isequal": "npm:lodash.isequal@4.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.1.0",
      "react-dom": "npm:react-dom@15.1.0",
      "react-draggable": "npm:react-draggable@2.1.2",
      "react-resizable": "npm:react-resizable@1.4.1"
    },
    "npm:react-resizable@1.4.1": {
      "react": "npm:react@15.1.0",
      "react-dom": "npm:react-dom@15.1.0",
      "react-draggable": "npm:react-draggable@2.1.2"
    },
    "npm:react-tools@0.13.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commoner": "npm:commoner@0.10.3",
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react@15.1.0": {
      "fbjs": "npm:fbjs@0.8.3",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:recast@0.10.26": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "ast-types": "npm:ast-types@0.8.7",
      "esprima-fb": "npm:esprima-fb@15001.1.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "private": "npm:private@0.1.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4"
    },
    "npm:ripemd160@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sha.js@2.4.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:sigmund@1.0.1": {
      "http": "github:jspm/nodelibs-http@1.7.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:ua-parser-js@0.7.10": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
