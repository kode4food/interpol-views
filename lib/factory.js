/*
 * interpol-views
 * Interpol View Engine for Node.js Web Frameworks
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thomas S. Bradford (kode4food.it)
 */

var path = require('path');
var interpol = require('interpol');
var util = require('interpol/lib/util');

var mixin = util.mixin;

var nodeEnv = process.env.NODE_ENV || 'development';
var isDevelopment = nodeEnv === 'development';
var defaultPath = path.resolve(process.cwd(), 'templates');

var defaultOptions = {
  path: defaultPath,
  monitor: isDevelopment,
  compile: true
};

function createRuntimeFactory(options) {
  options = mixin({}, defaultOptions, options || {});
  var cache = {};

  return {
    getRuntimeForPath: getRuntimeForPath,
    createRuntimeForPath: createRuntimeForPath
  };

  function getRuntimeForPath(importPath) {
    if ( !importPath ) {
      importPath = options.path;
    }
    var runtime = cache[importPath];
    if ( runtime ) {
      return runtime;
    }
    runtime = cache[importPath] = createRuntimeForPath(importPath);
    return runtime;
  }

  function createRuntimeForPath(importPath) {
    var resOptions = mixin({}, options, { path: importPath });
    var resolver = interpol.createFileResolver(resOptions);
    return interpol.runtime({
      resolvers: [resolver].concat(interpol.resolvers()),
      cache: !isDevelopment
    });
  }
}

// Exported Functions
exports.createRuntimeFactory = createRuntimeFactory;
