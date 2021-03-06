/**
 * Npm Shell Module for the Cloud9 IDE
 *
 * @copyright 2012, DreamLab
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
var Plugin = require("cloud9/plugin");
var sys = require("sys");
var util = require("cloud9/util");

var ShellJasminePlugin = module.exports = function(ide, workspace) {
    Plugin.call(this, ide, workspace);
    this.hooks = ["command"];
    this.name = "jasmine";
};

sys.inherits(ShellJasminePlugin, Plugin);

(function() {
    this.command = function(user, message, client) {
        if (message.command != "jasmine")
            return false;

        var _self = this;
        var argv = message.argv || [];

        this.spawnCommand('jasmine-node', ['--verbose', '--color', 'tests/'], message.cwd, 
            function(err) { // Error
                _self.sendResult(0, message.command, {
                    code: 0,
                    argv: message.argv,
                    err: err,
                    out: null
                });
            }, 
            function(out) { // Data
                _self.sendResult(0, message.command, {
                    code: 0,
                    argv: message.argv,
                    err: null,
                    out: out
                });
            }, 
            function(code, err, out) {
                _self.sendResult(0, message.command, {
                    code: code,
                    argv: message.argv,
                    err: null,
                    out: null
                });
            });

        return true;
    };
}).call(ShellJasminePlugin.prototype);
