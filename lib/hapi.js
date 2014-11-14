/*
 * interpol-views
 * Interpol View Engine for Node.js Web Frameworks
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thomas S. Bradford (kode4food.it)
 */

"use strict";

var interpol = require('interpol');
var factory = require('./factory');

var runtimeFactory = factory.createRuntimeFactory();

/**
 * All hapi needs to do what it does.
 *
 * @param {Object} [compileOptions] Object for configuring the Engine
 * @param {boolean} [compileOptions.monitor] monitor files for changes
 * @param {boolean} [compileOptions.compile] parse raw templates
 * @param {String} [compileOptions.importPath] where to find imports
 */
function compile(template, compileOptions) {
  var importPath = compileOptions.importPath;
  var runtime = runtimeFactory.getRuntimeForPath(importPath);
  return interpol(template, runtime);
}

// Exported Functions
exports.compile = compile;
