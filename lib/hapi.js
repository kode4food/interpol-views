/*
 * interpol-views
 * Interpol View Engine for Node.js Web Frameworks
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thomas S. Bradford (kode4food.it)
 */

"use strict";

var path = require('path');
var interpol = require('interpol');
var util = require('interpol/lib/util');
var factory = require('./factory');

var mixin = util.mixin;

var runtimeFactory = factory.createRuntimeFactory();

/**
 * All hapi needs to do what it does.
 *
 * @param {Object} [localOptions] Object for configuring the Engine
 * @param {boolean} [localOptions.monitor] monitor files for changes
 * @param {boolean} [localOptions.compile] Parse raw templates
 */
function compile(template, compileOptions) {
  var importPath = compileOptions.importPath;
  var runtime = runtimeFactory.getRuntimeForPath(importPath);
  return interpol(template, runtime);
}

// Exported Functions
exports.compile = compile;
