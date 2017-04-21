var argv = require('yargs').argv;
var path = require('path');
var webpack = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        // only use PhantomJS for our 'test' browser
        browsers: ['PhantomJS'],

        // just run once by default unless --watch flag is passed
        singleRun: !argv.watch,

        // which karma frameworks do we want integrated
        frameworks: ['mocha', 'chai'],

        // displays tests in a nice readable format
        reporters: ['spec', 'coverage-istanbul', 'tap'],

        // include some polyfills for babel and phantomjs
        files: [
            // Adding polyfill to run on PhantomJS
            'node_modules/babel-polyfill/browser.js',
            'test/**/*.js' // specify files to watch for tests
        ],
        preprocessors: {
            // these files we want to be precompiled with webpack
            // also run tests throug sourcemap for easier debugging
            'test/**/*.js': ['webpack', 'sourcemap'],
        },
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
            reports: ['lcov', 'text-summary'],
            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: path.join(__dirname, 'artifacts/coverage'),
            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,
            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,
        },
        tapReporter: {
            outputFile: 'artifacts/test/results.tap',
            disableStdout: true
        },
        // A lot of people will reuse the same webpack config that they use
        // in development for karma but remove any production plugins like UglifyJS etc.
        // I chose to just re-write the config so readers can see what it needs to have
        webpack: webpack,

        webpackMiddleware: {
            noInfo: true
        },
        // tell karma all the plugins we're going to be using to prevent warnings
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
            'karma-coverage-istanbul-reporter',
            'karma-tap-reporter'
        ]
    });
};