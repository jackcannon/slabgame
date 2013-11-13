var server = {
  get: function (cb) {
    $.ajax({
      url: 'http://' + window.location.host + '/getPattern',
      success: function (data) {
        if(cb) cb(JSON.parse(data));
      }
    });
  },
  set: function (json, cb) {
    $.ajax({
      url: 'http://' + window.location.host + '/setPattern',
      data: {
        pattern: JSON.stringify(json)
      },
      success: function (data) {
        if(cb) cb(data);
      }
    });
  }
};

var helper = {
  capitalise: function capitalise(str) {
    if(typeof str !== 'string' || str.length == 0) return str;
    if(str.length == 1) return s.toUpperCase();
    return str.substr(0,1).toUpperCase() + str.substr(1).toLowerCase();
  },
  preload: function preloadImages(arr) {
    if(!(arr instanceof Array)) return [];
    var imgs = [];
    for(var i in arr) {
      var url = arr[i];
      if(typeof url !== 'string') continue;
      var img = new Image();
      img.src = url;

      imgs.push(img);
    }
    return imgs;
  }
};