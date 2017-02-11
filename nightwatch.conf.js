const seleniumServer = require('selenium-server');
const phantomjs = require('phantomjs-prebuilt');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

const seleniumHost = '127.0.0.1';

require('nightwatch-cucumber')({
    cucumberArgs: [
        '--require', 'test/e2e/timeout.js',
        '--require', 'test/e2e/step_definitions',
        '--format', 'pretty',
        '--format', 'json:test/e2e/reports/cucumber.json',
        '--format-options', '{"colorsEnabled":true}',
        'test/e2e/features'
    ]
});

module.exports = {
    output_folder: 'test/e2e/reports',
    page_objects_path: 'test/e2e/pages',
    live_output: true,
    test_workers: {
        enabled: true,
        workers: 'auto'
    },
    selenium: {
        start_process: true,
        server_path: seleniumServer.path,
        log_path: '',
        host: seleniumHost,
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.gecko.driver': geckodriver.path
        }
    },
    test_settings: {
        default: {
            launch_url: 'http://localhost',
            selenium_port: 4444,
            selenium_host: seleniumHost,
            desiredCapabilities: {
                browserName: 'phantomjs',
                javascriptEnabled: true,
                acceptSslCerts: true,
                'phantomjs.binary.path': phantomjs.path
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true,
                marionette: true
            }
        }
    }
}