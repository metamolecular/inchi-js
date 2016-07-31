# InChI.js - InChI for the Web Browser

[InChI](http://www.iupac.org/home/publications/e-resources/inchi.html) is an open chemical identifier system created by IUPAC. InChI is also a program and library written in C, and the only implementation to have been released publicly.

InChI's C codebase poses challenges to Web developers. The only viable way to generate InChIs is to deploy native binaries on a Web server. InChIs are then generated through asynchronous HTTP requests and responses. Although this approach works, it comes at the price of requiring the installation and maintenance of server-side software, as well as requiring an application layer capable of sanitizing and processing HTTP requests.

InChI.js solves this problem by offering an InChI implementation that runs unmodified on modern Web browsers without plugins. Eliminating the server-side InChI component can reduce Web development costs and make new kinds of browser-based applications viable. For example, InChI.js can be used to build [static sites](https://en.wikipedia.org/wiki/Static_web_page).

Optimization efforts have shown early promise. For example, the size of the main InChI.js file is under 900 KB, which compresses to under 300 KB with gzip. Performance should be adequate for most applications. For example, benchmarks performed on average hardware using Google Chrome and Mozilla Firefox gave InChI generation times of 10 ms or less for simple structures.

InChI.js is made possible by [Emscripten](http://kripken.github.io/emscripten-site/), a C-to-JavaScript transpilation toolchain.

## Demo

[http://metamolecular.com/inchi-js](http://metamolecular.com/inchi-js)

## Compilation

InChI.js can be compiled from source. To do so, first install the [Emscripten toolchain](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

If using the Emscripten portable installation, activate it with:

```
$ path-to-portable-installation/emsdk activate latest
```

On OSX an additional step is needed:

```
$ path-to-portable-installation/emsdk_env.sh
```

After Emscripten has been installed and initialized, clone this repository, initialize its InChI submodule, and run <code>make</code>:

```
$ cd inchi.js
$ git submodule init
$ git submodule update
$ make
```

## Deployment

The <code>build</code> directory contains two files, both of which are needed. Place these files into a publicly-viewable directory.

- <code>inchi.js</code>: The complete JavaScript code required to generate InChIs.
- <code>inchi.js.mem</code>: The Emscripten [<code>memory file</code>](https://kripken.github.io/emscripten-site/docs/optimizing/Optimizing-Code.html#memory-initialization) that will be loaded by <code>inchi.js</code>

Create an HTML document containing the following tag:

```
<script async src="../build/inchi.js"></script>
```

Using the [<code>async</code> attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) allows the included <code>inchi.js.mem</code> to be loaded correctly.

Initialization takes place by defining an InChI object, and registering an onRuntimeInitialized callback function. Code within that function will be guaranteed to have a fully initialized InChI object.

The following script initializes InChI.js. Place it within an inline <code>script</code> tag.

```
var InChI = {
  onRuntimeInitialized: function () {
    InChI.fromMolfile = InChI.cwrap('get_inchi', 'string', ['string']);
    
    var molfile; // get a molfile
    var inchi = InChI.fromMolfile(molfile);
  },
  memoryInitializerPrefixURL: 'path/to/js.mem/folder'
};
```

<code>InChI.getMolfile</code> returns an InChI string on success. On warning or failure, a multi-line string is returned in which warnings and errors appear after the first line.

## Running Compiled inchi.js

After compiling the code, a sample web page can be run from the web/index.html file. Depending on your browser (e.g., Chrome), it may be necessary to run this page behind a localhost server. OS X bundles a lightweight server in the form of [SimpleHTTPServer](http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds). Another option is the Node.js [http-server](https://www.npmjs.com/package/http-server) module.

## Other Work

InChI.js was made possible through the previous work of Noel O'Boyle and Michał Nowotka. Read about their progress here:

- [(Almost) Translate the InChI code into JavaScript](http://baoilleach.blogspot.com/2011/05/almost-translate-inchi-code-into.html)
- [(Almost) Translate the InChI code into JavaScript Part II](http://baoilleach.blogspot.com/2011/05/almost-translate-inchi-code-into_13.html)
- [(Almost) Translate the InChI code into JavaScript Part III](http://baoilleach.blogspot.co.uk/2011/05/almost-translate-inchi-code-into_24.html)
- [Compiling inchi-1 to JavaScript](http://chembl.blogspot.co.uk/2013/05/compiling-inchi-1-to-javascript.html)

## License

Copyright (C) 2015 Metamolecular, LLC. Compiled code uses content copyright (C) 2011 IUPAC and InChI Trust Limited.

This library and build system are licensed under the terms of the [IUPAC/InChI-Trust InChI Licence No. 1.0](http://www.inchi-trust.org/download/104/LICENCE.pdf) (see: LICENSE.txt).