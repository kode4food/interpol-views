# interpol-views
Interpol View Engine for Node.js Web Frameworks

## Installation
Use NPM to install this thing:

```bash
npm install interpol-views --save
```

## Inclusion in Express
A basic View Engine for [Express](http://expressjs.com/) is supported.  To set a development instance as the default engine, you can do the following:

```javascript
app.engine('int', require('interpol-views').__express);
app.set('view engine', 'int');
```

If Express is started in development mode, the view engine will monitor the default views directory (usually `./views`) and continuously reload any modified files ending in `.int`. Obviously this will incur quite a bit of processing overhead, so should be avoided for production deployments.

If Express is started with any NODE_ENV *other* than 'development' (or nil), the engine will *not* monitor the directory for changes.

## Inclusion in Kraken
In order to use Interpol in a [Kraken](http://krakenjs.com/) app, you will have to modify `config/app.json` to include the following:

```json
"view engines": {
  "int": {
    "module": "interpol-views"
  }
}
```

Also, if you plan to use Interpol as your default view engine, you can configure it like so:

```json
"express": {
  "view engine": "int"
}
```

*Note:* Be aware that Interpol template filenames must contain valid Interpol identifers, so filenames like `errors/400.dust` will have to become something like `errors/http_400.int`.

### Pre-compiled JavaScript for Production
The benefit of pre-compiled JavaScript is that you can be minimally sure that your template has at least been parsed properly before deploying it.  Also, the initial parsing step using Interpol's PEG.js parser is rather expensive, even if it's only performed once.

The Interpol command-line interface generates pre-compiled JavaScript.  You can install this globally using `npm -g install interpol` and can then invoke the tools at your terminal by typing `interpol`.

If you're interested in deploying using only pre-compiled JavaScript, you will need to configure a view engine that *does not* perform compilation.  This can be done in Express like so:

```javascript
var interpolViews = require('interpol-views');
var viewEngine = interpolViews.createExpressEngine({
  compile: false  // read *.int.js files rather than *.int files
});
app.engine('int', viewEngine);
app.set('view engine', 'int');
```

In Kraken, it's a little more straight-forward, as you just add settings to your view engine definition:

```json
"view engines": {
  "int": {
    "module": "interpol-views",
    "settings": {
      "compile": false
    }
  }
}
```

After that, just launch the interpol command-line against your views (or public/templates) directory:

```bash
interpol -in ./views
```

## Inclusion in hapi
A basic View Engine for [hapi](http://hapijs.com/) is supported.  To set a development instance as the default engine, you can do the following:

```javascript
server.views({
  engines: {
    int: {
      module: require('interpol-views'),
      compileOptions: {
        importPath: viewsPath
      }
    }
  },
  path: viewsPath
});
```

The `importPath` property must be specified if you intend to perform `import` calls, otherwise it is optional.  The reason that it's required is that Interpol will be resolving modules internally, and there was no other way for the view engine to determine the configured view path.

## License (MIT License)
Copyright (c) 2014 Thomas S. Bradford

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
