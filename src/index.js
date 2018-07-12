var domtoimage = require('dom-to-image');

L.Control.EasyPrint = L.Control.extend({

    onAdd: function () {
        this.mapContainer = this._map.getContainer();
        var container = L.DomUtil.create('div', 'leaflet-control-easyPrint leaflet-bar leaflet-control');
        return container;
    },

  printMap: function (url) {
    return this._printOpertion(url);
  },

  _printOpertion: function (url) {
    var plugin = this;
    domtoimage.toPng(plugin.mapContainer, {
        width: parseInt(plugin.mapContainer.style.width.replace('px')),
        height: parseInt(plugin.mapContainer.style.height.replace('px'))
      })
      .then(function (dataUrl) {
          console.log(dataUrl);
          $.post( url,{map: dataUrl});
          //var blob = plugin._dataURItoBlob(dataUrl);
      })
      .catch(function (error) {
          console.error('Print operation failed', error);
      }); 
  },

  _dataURItoBlob: function (dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);
    for(var i = 0; i < byteString.length; i++) {
        dw.setUint8(i, byteString.charCodeAt(i));
    }
    return new Blob([ab], {type: mimeString});
  }
});

L.easyPrint = function() {
  return new L.Control.EasyPrint();
};