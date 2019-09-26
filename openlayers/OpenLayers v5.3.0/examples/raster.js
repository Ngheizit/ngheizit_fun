(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[99],{

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_ol_Map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _src_ol_View_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73);
/* harmony import */ var _src_ol_source_BingMaps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/* harmony import */ var _src_ol_source_Raster_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(153);






var minVgi = 0;
var maxVgi = 0.25;
var bins = 10;


/**
 * Calculate the Vegetation Greenness Index (VGI) from an input pixel.  This
 * is a rough estimate assuming that pixel values correspond to reflectance.
 * @param {Array<number>} pixel An array of [R, G, B, A] values.
 * @return {number} The VGI value for the given pixel.
 */
function vgi(pixel) {
  var r = pixel[0] / 255;
  var g = pixel[1] / 255;
  var b = pixel[2] / 255;
  return (2 * g - r - b) / (2 * g + r + b);
}


/**
 * Summarize values for a histogram.
 * @param {numver} value A VGI value.
 * @param {Object} counts An object for keeping track of VGI counts.
 */
function summarize(value, counts) {
  var min = counts.min;
  var max = counts.max;
  var num = counts.values.length;
  if (value < min) {
    // do nothing
  } else if (value >= max) {
    counts.values[num - 1] += 1;
  } else {
    var index = Math.floor((value - min) / counts.delta);
    counts.values[index] += 1;
  }
}


/**
 * Use aerial imagery as the input data for the raster source.
 */
var bing = new _src_ol_source_BingMaps_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]({
  key: 'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5',
  imagerySet: 'Aerial'
});


/**
 * Create a raster source where pixels with VGI values above a threshold will
 * be colored green.
 */
var raster = new _src_ol_source_Raster_js__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]({
  sources: [bing],
  /**
   * Run calculations on pixel data.
   * @param {Array} pixels List of pixels (one per source).
   * @param {Object} data User data object.
   * @return {Array} The output pixel.
   */
  operation: function(pixels, data) {
    var pixel = pixels[0];
    var value = vgi(pixel);
    summarize(value, data.counts);
    if (value >= data.threshold) {
      pixel[0] = 0;
      pixel[1] = 255;
      pixel[2] = 0;
      pixel[3] = 128;
    } else {
      pixel[3] = 0;
    }
    return pixel;
  },
  lib: {
    vgi: vgi,
    summarize: summarize
  }
});
raster.set('threshold', 0.1);

function createCounts(min, max, num) {
  var values = new Array(num);
  for (var i = 0; i < num; ++i) {
    values[i] = 0;
  }
  return {
    min: min,
    max: max,
    values: values,
    delta: (max - min) / num
  };
}

raster.on('beforeoperations', function(event) {
  event.data.counts = createCounts(minVgi, maxVgi, bins);
  event.data.threshold = raster.get('threshold');
});

raster.on('afteroperations', function(event) {
  schedulePlot(event.resolution, event.data.counts, event.data.threshold);
});

var map = new _src_ol_Map_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]({
  layers: [
    new _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]({
      source: bing
    }),
    new _src_ol_layer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]({
      source: raster
    })
  ],
  target: 'map',
  view: new _src_ol_View_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]({
    center: [-9651695, 4937351],
    zoom: 13,
    minZoom: 12,
    maxZoom: 19
  })
});


var timer = null;
function schedulePlot(resolution, counts, threshold) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(plot.bind(null, resolution, counts, threshold), 1000 / 60);
}

var barWidth = 15;
var plotHeight = 150;
var chart = d3.select('#plot').append('svg')
  .attr('width', barWidth * bins)
  .attr('height', plotHeight);

var chartRect = chart.node().getBoundingClientRect();

var tip = d3.select(document.body).append('div')
  .attr('class', 'tip');

function plot(resolution, counts, threshold) {
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(counts.values)])
    .range([0, plotHeight]);

  var bar = chart.selectAll('rect').data(counts.values);

  bar.enter().append('rect');

  bar.attr('class', function(count, index) {
    var value = counts.min + (index * counts.delta);
    return 'bar' + (value >= threshold ? ' selected' : '');
  })
    .attr('width', barWidth - 2);

  bar.transition().attr('transform', function(value, index) {
    return 'translate(' + (index * barWidth) + ', ' +
        (plotHeight - yScale(value)) + ')';
  })
    .attr('height', yScale);

  bar.on('mousemove', function(count, index) {
    var threshold = counts.min + (index * counts.delta);
    if (raster.get('threshold') !== threshold) {
      raster.set('threshold', threshold);
      raster.changed();
    }
  });

  bar.on('mouseover', function(count, index) {
    var area = 0;
    for (var i = counts.values.length - 1; i >= index; --i) {
      area += resolution * resolution * counts.values[i];
    }
    tip.html(message(counts.min + (index * counts.delta), area));
    tip.style('display', 'block');
    tip.transition().style({
      left: (chartRect.left + (index * barWidth) + (barWidth / 2)) + 'px',
      top: (d3.event.y - 60) + 'px',
      opacity: 1
    });
  });

  bar.on('mouseout', function() {
    tip.transition().style('opacity', 0).each('end', function() {
      tip.style('display', 'none');
    });
  });

}

function message(value, area) {
  var acres = (area / 4046.86).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return acres + ' acres at<br>' + value.toFixed(2) + ' VGI or above';
}


/***/ })

},[[323,0]]]);
//# sourceMappingURL=raster.js.map