var argv = require("argv");
var args=argv.run();
var echo = require("../lib/echo");

console.log(echo(args.targets.join(' ')));
