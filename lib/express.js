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

var ModuleName = "[$_a-zA-Z][$_a-zA-Z0-9]*";
var ModulePathRegex = new RegExp(ModuleName + "([/]" + ModuleName + ")*");

/**
 * Creates a new Express Rendering Engine.  Generally it's not necessary to
 * directly call this function, as an instance of the engine is created by
 * default in Interpol's `__express` property.  If you must, there are
 * three properties recognized by the localOptions.
 *
 * @param {Object} [localOptions] Object for configuring the Engine
 * @param {boolean} [localOptions.monitor] monitor files for changes
 * @param {boolean} [localOptions.compile] Parse raw templates
 */

function createExpressEngine(localOptions) {
  var runtimeFactory = factory.createRuntimeFactory(localOptions);
  return renderFile;

  function renderFile(templatePath, options, callback) {
    try {
      var importPath = options.settings.views || localOptions.path;
      var modulePath = templatePath.slice(importPath.length + 1);
      var match = ModulePathRegex.exec(modulePath);

      if ( !match ) {
        callback(new Error("Filename must be a resolvable identifier"), null);
        return;
      }

      var runtime = runtimeFactory.getRuntimeForPath(importPath);
      var moduleName = match[0];
      var module = runtime.resolve(moduleName);
      if ( module ) {
        callback(null, module(options));
        return;
      }

      callback(new Error("Template not resolved: " + templatePath), null);
    }
    catch ( err ) {
      callback(err, null);
    }
  }
}

// Exported Functions
exports.createExpressEngine = createExpressEngine;
