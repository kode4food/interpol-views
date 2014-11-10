/*
 * interpol-views
 * Interpol View Engine for Node.js Web Frameworks
 * Licensed under the MIT License
 * see doc/LICENSE.md
 *
 * @author Thomas S. Bradford (kode4food.it)
 */

"use strict";

// Express and Kraken Integration
var express = exports.express = require('./express');
exports.__express = express.createExpressEngine();
exports.int = express.createExpressEngine;

// hapi Integration
var hapi = exports.hapi = require('./hapi');
exports.compile = hapi.compile;
