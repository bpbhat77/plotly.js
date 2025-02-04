var fs = require('fs');

var browserify = require('browserify');

var compressAttributes = require('./util/compress_attributes');
var appendVersion = require('./util/append_version');
var constants = require('./util/constants');

/*
 * Trimmed down version of ./bundle.js for CI testing
 *
 * Outputs plotly.js bundle in build/ and
 * plotly-geo-assets.js bundle in dist/
 * in accordance with test/image/index.html
 *
 */


// Browserify plotly.js
browserify(constants.pathToPlotlySrc, {
    standalone: 'Plotly',
    transform: [compressAttributes]
})
.bundle(function(err) {
    if(err) throw err;
})
.pipe(fs.createWriteStream(constants.pathToPlotlyBuild))
.on('finish', function() {
    appendVersion(constants.pathToPlotlyBuild, {object: 'Plotly'});
});


// Browserify the geo assets
browserify(constants.pathToPlotlyGeoAssetsSrc, {
    standalone: 'PlotlyGeoAssets'
})
.bundle(function(err) {
    if(err) throw err;
})
.pipe(fs.createWriteStream(constants.pathToPlotlyGeoAssetsDist))
.on('finish', function() {
    appendVersion(constants.pathToPlotlyGeoAssetsDist, {object: 'PlotlyGeoAssets'});
});
