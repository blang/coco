coco - Event Management
=====

coco is a simple webapp to manage events for ArmA communities. It's designed to be simple and user-friendly.

Usage
-----
This project is not yet ready for production.

Development [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/blang/coco.png?branch=master)](https://travis-ci.org/blang/coco)
-----
Required packages:

* MongoDB
* node.js with npm

First install Grunt globally

    npm install -g grunt-cli

Now, in the projects root directory

    npm install
    bower install

which installs all needed software.
Just start mongodb on localhost and you're done.

There are multiple `grunt` targets available:

* `test` Lint and test backend and frontend
* `test:backend` Run backend tests
* `test:frontend` Run frontend tests
* `serve` Start development webserver
* `serve:dist` Build project and start production server
* `build` Build project
* `preparedb` Drop environment specific database (lib/config/config.js) and import fixtures
* `env:prod preparedb` Drop production database and import fixtures (be careful!)
* `jshint{,:frontend,:backend,:testfe,:testbe,:gruntfile}` Lints js files

Example:

    grunt jshint:frontend test:frontend serve

Contributing
-----
If your interested in contributing bigger changes to this project please contact me first and open an issue to discuss first.


License
-----
MIT License. Some subparts of this project may have other licenses.
