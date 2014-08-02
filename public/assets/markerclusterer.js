function MarkerClusterer(t,e,n){this.extend(MarkerClusterer,google.maps.OverlayView),this.map_=t,this.markers_=[],this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var i=n||{};this.gridSize_=i.gridSize||60,this.minClusterSize_=i.minimumClusterSize||2,this.maxZoom_=i.maxZoom||null,this.styles_=i.styles||[],this.imagePath_=i.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=i.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=i.zoomOnClick&&(this.zoomOnClick_=i.zoomOnClick),this.averageCenter_=!1,void 0!=i.averageCenter&&(this.averageCenter_=i.averageCenter),this.setupStyles_(),this.setMap(t),this.prevZoom_=this.map_.getZoom();var r=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var t=r.map_.mapTypes[r.map_.getMapTypeId()].maxZoom,e=r.map_.getZoom();0>e||e>t||r.prevZoom_!=e&&(r.prevZoom_=r.map_.getZoom(),r.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){r.redraw()}),e&&e.length&&this.addMarkers(e,!1)}function Cluster(t){this.markerClusterer_=t,this.map_=t.getMap(),this.gridSize_=t.getGridSize(),this.minClusterSize_=t.getMinClusterSize(),this.averageCenter_=t.isAverageCenter(),this.center_=null,this.markers_=[],this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,t.getStyles(),t.getGridSize())}function ClusterIcon(t,e,n){t.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.styles_=e,this.padding_=n||0,this.cluster_=t,this.center_=null,this.map_=t.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(this.map_)}MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m",MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",MarkerClusterer.prototype.extend=function(t,e){return function(t){for(var e in t.prototype)this.prototype[e]=t.prototype[e];return this}.apply(t,[e])},MarkerClusterer.prototype.onAdd=function(){this.setReady_(!0)},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){if(!this.styles_.length)for(var t,e=0;t=this.sizes[e];e++)this.styles_.push({url:this.imagePath_+(e+1)+"."+this.imageExtension_,height:t,width:t})},MarkerClusterer.prototype.fitMapToMarkers=function(){for(var t,e=this.getMarkers(),n=new google.maps.LatLngBounds,i=0;t=e[i];i++)n.extend(t.getPosition());this.map_.fitBounds(n)},MarkerClusterer.prototype.setStyles=function(t){this.styles_=t},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.isZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.isAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.setMaxZoom=function(t){this.maxZoom_=t},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_||this.map_.mapTypes[this.map_.getMapTypeId()].maxZoom},MarkerClusterer.prototype.calculator_=function(t,e){for(var n=0,i=t.length,r=i;0!==r;)r=parseInt(r/10,10),n++;return n=Math.min(n,e),{text:i,index:n}},MarkerClusterer.prototype.setCalculator=function(t){this.calculator_=t},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.addMarkers=function(t,e){for(var n,i=0;n=t[i];i++)this.pushMarkerTo_(n);e||this.redraw()},MarkerClusterer.prototype.pushMarkerTo_=function(t){if(t.isAdded=!1,t.draggable){var e=this;google.maps.event.addListener(t,"dragend",function(){t.isAdded=!1,e.repaint()})}this.markers_.push(t)},MarkerClusterer.prototype.addMarker=function(t,e){this.pushMarkerTo_(t),e||this.redraw()},MarkerClusterer.prototype.removeMarker_=function(t){var e=-1;if(this.markers_.indexOf)e=this.markers_.indexOf(t);else for(var n,i=0;n=this.markers_[i];i++)if(n==t){e=i;break}return-1==e?!1:(this.markers_.splice(e,1),!0)},MarkerClusterer.prototype.removeMarker=function(t,e){var n=this.removeMarker_(t);return!e&&n?(this.resetViewport(),this.redraw(),!0):!1},MarkerClusterer.prototype.removeMarkers=function(t,e){for(var n,i=!1,r=0;n=t[r];r++){var o=this.removeMarker_(n);i=i||o}return!e&&i?(this.resetViewport(),this.redraw(),!0):void 0},MarkerClusterer.prototype.setReady_=function(t){this.ready_||(this.ready_=t,this.createClusters_())},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.getMap=function(){return this.map_},MarkerClusterer.prototype.setMap=function(t){this.map_=t},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(t){this.gridSize_=t},MarkerClusterer.prototype.getMinClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinClusterSize=function(t){this.minClusterSize_=t},MarkerClusterer.prototype.getExtendedBounds=function(t){var e=this.getProjection(),n=new google.maps.LatLng(t.getNorthEast().lat(),t.getNorthEast().lng()),i=new google.maps.LatLng(t.getSouthWest().lat(),t.getSouthWest().lng()),r=e.fromLatLngToDivPixel(n);r.x+=this.gridSize_,r.y-=this.gridSize_;var o=e.fromLatLngToDivPixel(i);o.x-=this.gridSize_,o.y+=this.gridSize_;var s=e.fromDivPixelToLatLng(r),a=e.fromDivPixelToLatLng(o);return t.extend(s),t.extend(a),t},MarkerClusterer.prototype.isMarkerInBounds_=function(t,e){return e.contains(t.getPosition())},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[]},MarkerClusterer.prototype.resetViewport=function(t){for(var e,n=0;e=this.clusters_[n];n++)e.remove();for(var i,n=0;i=this.markers_[n];n++)i.isAdded=!1,t&&i.setMap(null);this.clusters_=[]},MarkerClusterer.prototype.repaint=function(){var t=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var e,n=0;e=t[n];n++)e.remove()},0)},MarkerClusterer.prototype.redraw=function(){this.createClusters_()},MarkerClusterer.prototype.distanceBetweenPoints_=function(t,e){if(!t||!e)return 0;var n=6371,i=(e.lat()-t.lat())*Math.PI/180,r=(e.lng()-t.lng())*Math.PI/180,o=Math.sin(i/2)*Math.sin(i/2)+Math.cos(t.lat()*Math.PI/180)*Math.cos(e.lat()*Math.PI/180)*Math.sin(r/2)*Math.sin(r/2),s=2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)),a=n*s;return a},MarkerClusterer.prototype.addToClosestCluster_=function(t){for(var e,n=4e4,i=null,r=(t.getPosition(),0);e=this.clusters_[r];r++){var o=e.getCenter();if(o){var s=this.distanceBetweenPoints_(o,t.getPosition());n>s&&(n=s,i=e)}}if(i&&i.isMarkerInClusterBounds(t))i.addMarker(t);else{var e=new Cluster(this);e.addMarker(t),this.clusters_.push(e)}},MarkerClusterer.prototype.createClusters_=function(){if(this.ready_)for(var t,e=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),n=this.getExtendedBounds(e),i=0;t=this.markers_[i];i++)!t.isAdded&&this.isMarkerInBounds_(t,n)&&this.addToClosestCluster_(t)},Cluster.prototype.isMarkerAlreadyAdded=function(t){if(this.markers_.indexOf)return-1!=this.markers_.indexOf(t);for(var e,n=0;e=this.markers_[n];n++)if(e==t)return!0;return!1},Cluster.prototype.addMarker=function(t){if(this.isMarkerAlreadyAdded(t))return!1;if(this.center_){if(this.averageCenter_){var e=this.markers_.length+1,n=(this.center_.lat()*(e-1)+t.getPosition().lat())/e,i=(this.center_.lng()*(e-1)+t.getPosition().lng())/e;this.center_=new google.maps.LatLng(n,i),this.calculateBounds_()}}else this.center_=t.getPosition(),this.calculateBounds_();t.isAdded=!0,this.markers_.push(t);var r=this.markers_.length;if(r<this.minClusterSize_&&t.getMap()!=this.map_&&t.setMap(this.map_),r==this.minClusterSize_)for(var o=0;r>o;o++)this.markers_[o].setMap(null);return r>=this.minClusterSize_&&t.setMap(null),this.updateIcon(),!0},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){for(var t,e=new google.maps.LatLngBounds(this.center_,this.center_),n=this.getMarkers(),i=0;t=n[i];i++)e.extend(t.getPosition());return e},Cluster.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.calculateBounds_=function(){var t=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(t)},Cluster.prototype.isMarkerInClusterBounds=function(t){return this.bounds_.contains(t.getPosition())},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.updateIcon=function(){var t=this.map_.getZoom(),e=this.markerClusterer_.getMaxZoom();if(t>e)for(var n,i=0;n=this.markers_[i];i++)n.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var r=this.markerClusterer_.getStyles().length,o=this.markerClusterer_.getCalculator()(this.markers_,r);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(o),this.clusterIcon_.show()}},ClusterIcon.prototype.triggerClusterClick=function(){var t=this.cluster_.getMarkerClusterer();google.maps.event.trigger(t,"clusterclick",this.cluster_),t.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())},ClusterIcon.prototype.onAdd=function(){if(this.div_=document.createElement("DIV"),this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(t),this.div_.innerHTML=this.sums_.text}var e=this.getPanes();e.overlayMouseTarget.appendChild(this.div_);var n=this;google.maps.event.addDomListener(this.div_,"click",function(){n.triggerClusterClick()})},ClusterIcon.prototype.getPosFromLatLng_=function(t){var e=this.getProjection().fromLatLngToDivPixel(t);return e.x-=parseInt(this.width_/2,10),e.y-=parseInt(this.height_/2,10),e},ClusterIcon.prototype.draw=function(){if(this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.top=t.y+"px",this.div_.style.left=t.x+"px"}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(t),this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.remove=function(){this.setMap(null)},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.setSums=function(t){this.sums_=t,this.text_=t.text,this.index_=t.index,this.div_&&(this.div_.innerHTML=t.text),this.useStyle()},ClusterIcon.prototype.useStyle=function(){var t=Math.max(0,this.sums_.index-1);t=Math.min(this.styles_.length-1,t);var e=this.styles_[t];this.url_=e.url,this.height_=e.height,this.width_=e.width,this.textColor_=e.textColor,this.anchor_=e.anchor,this.textSize_=e.textSize,this.backgroundPosition_=e.backgroundPosition},ClusterIcon.prototype.setCenter=function(t){this.center_=t},ClusterIcon.prototype.createCss=function(t){var e=[];if(document.all)e.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="'+this.url_+'");');else{e.push("background-image:url("+this.url_+");");var n=this.backgroundPosition_?this.backgroundPosition_:"0 0";e.push("background-position:"+n+";")}"object"==typeof this.anchor_?(e.push("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?"height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;":"height:"+this.height_+"px; line-height:"+this.height_+"px;"),e.push("number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?"width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;":"width:"+this.width_+"px; text-align:center;")):e.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;");var i=this.textColor_?this.textColor_:"black",r=this.textSize_?this.textSize_:11;return e.push("cursor:pointer; top:"+t.y+"px; left:"+t.x+"px; color:"+i+"; position:absolute; font-size:"+r+"px; font-family:Arial,sans-serif; font-weight:bold"),e.join("")},window.MarkerClusterer=MarkerClusterer,MarkerClusterer.prototype.addMarker=MarkerClusterer.prototype.addMarker,MarkerClusterer.prototype.addMarkers=MarkerClusterer.prototype.addMarkers,MarkerClusterer.prototype.clearMarkers=MarkerClusterer.prototype.clearMarkers,MarkerClusterer.prototype.fitMapToMarkers=MarkerClusterer.prototype.fitMapToMarkers,MarkerClusterer.prototype.getCalculator=MarkerClusterer.prototype.getCalculator,MarkerClusterer.prototype.getGridSize=MarkerClusterer.prototype.getGridSize,MarkerClusterer.prototype.getExtendedBounds=MarkerClusterer.prototype.getExtendedBounds,MarkerClusterer.prototype.getMap=MarkerClusterer.prototype.getMap,MarkerClusterer.prototype.getMarkers=MarkerClusterer.prototype.getMarkers,MarkerClusterer.prototype.getMaxZoom=MarkerClusterer.prototype.getMaxZoom,MarkerClusterer.prototype.getStyles=MarkerClusterer.prototype.getStyles,MarkerClusterer.prototype.getTotalClusters=MarkerClusterer.prototype.getTotalClusters,MarkerClusterer.prototype.getTotalMarkers=MarkerClusterer.prototype.getTotalMarkers,MarkerClusterer.prototype.redraw=MarkerClusterer.prototype.redraw,MarkerClusterer.prototype.removeMarker=MarkerClusterer.prototype.removeMarker,MarkerClusterer.prototype.removeMarkers=MarkerClusterer.prototype.removeMarkers,MarkerClusterer.prototype.resetViewport=MarkerClusterer.prototype.resetViewport,MarkerClusterer.prototype.repaint=MarkerClusterer.prototype.repaint,MarkerClusterer.prototype.setCalculator=MarkerClusterer.prototype.setCalculator,MarkerClusterer.prototype.setGridSize=MarkerClusterer.prototype.setGridSize,MarkerClusterer.prototype.onAdd=MarkerClusterer.prototype.onAdd,MarkerClusterer.prototype.draw=MarkerClusterer.prototype.draw,Cluster.prototype.getCenter=Cluster.prototype.getCenter,Cluster.prototype.getSize=Cluster.prototype.getSize,Cluster.prototype.getMarkers=Cluster.prototype.getMarkers,ClusterIcon.prototype.onAdd=ClusterIcon.prototype.onAdd,ClusterIcon.prototype.draw=ClusterIcon.prototype.draw,ClusterIcon.prototype.onRemove=ClusterIcon.prototype.onRemove;