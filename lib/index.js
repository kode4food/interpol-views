/*
 * interpol-views
 * Interpol View Engine for Node.js Web Frameworks
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thomas S. Bradford (kode4food.it)
 */

"use strict";

// Express Integration
var express = exports.express = require('./express');
exports.createExpressEngine = express.createExpressEngine;
exports.__express = express.createExpressEngine();

// hapi Integration
var hapi = exports.hapi = require('./hapi');
exports.compile = hapi.compile;
