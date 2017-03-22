var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var figlet = require('figlet');
var clear = require('clear');
var commander = require('commander');
var Finder = require('fs-finder');
const execa = require('execa');

clear();
console.log(chalk.cyan(figlet.textSync('ballet', { horizontalLayout: 'full' })));

commander
    .version('1.0.0')
    .usage('prep <project name>')
    .command('prep <project>')
    .description('builds all your microservices')
    .action(function (project) {
        var files = Finder.from('../').exclude(['.git', 'node_modules']).findFiles('package.json', function (files) {
            console.log(chalk.bold.cyan('Setting up the Stage for performance.\n'));
            console.log(chalk.bold.cyan('Prepping up for show :: ' + project));
            console.log(chalk.cyan('\n Dressing up ballerinas :'));
            var commandsArray = [];

            for (var i = 0; i < files.length; i++) {
                var jsonFile = require(files[i]);
                if (jsonFile.ballet && (jsonFile.ballet.project === project) && jsonFile.ballet.build) {
                    var pack = files[i].substring(0, files[i].lastIndexOf('/'));
                    var name = pack.substring(pack.lastIndexOf('/') + 1);
                    console.log(chalk.cyan('\n  :> ' + name));

                    var fullCommand = 'cd ' + files[i].substring(0, files[i].lastIndexOf('/'));

                    for (var j = 0; j < jsonFile.ballet.build.length; j++) {
                        fullCommand += "\n " + jsonFile.ballet.build[j];
                        // console.log(fullCommand);
                        commandsArray.push(fullCommand);

                    }
                }
            }
            console.log(chalk.cyan.bold('\n Ballerinas usually take a long time to get ready.'));
            console.log(chalk.cyan.bold('\n Patience please'));
            for (var i = 0; i < commandsArray.length; i++) {
                const stream = execa.shell(commandsArray[i]).stdout;
                stream.pipe(process.stdout);
            }
        });
    });


commander
    .version('1.0.0')
    .usage('dance <project name>')
    .command('dance <project>')
    .description('runs all your microservices')
    .action(function (project) {
        var files = Finder.from('../').exclude(['.git', 'node_modules']).findFiles('package.json', function (files) {
            console.log(chalk.bold.cyan('Stage is set for a grand performance.\n'));
            console.log(chalk.bold.cyan('Now Showing :: ' + project));
            console.log(chalk.cyan('\n Starring ballerinas :'));
            var commandsArray = [];

            for (var i = 0; i < files.length; i++) {
                var jsonFile = require(files[i]);
                if (jsonFile.ballet && (jsonFile.ballet.project === project) && jsonFile.ballet.run) {
                    // console.log('run script in ' + files[i] + ' with commands ' + jsonFile.ballet.run);

                    var pack = files[i].substring(0, files[i].lastIndexOf('/'));
                    var name = pack.substring(pack.lastIndexOf('/') + 1);
                    console.log(chalk.cyan('\n  :> ' + name));

                    for (var j = 0; j < jsonFile.ballet.run.length; j++) {
                        var fullCommand = 'cd ' + files[i].substring(0, files[i].lastIndexOf('/'));
                        fullCommand += "\n " + jsonFile.ballet.run[j];
                        // console.log(fullCommand);
                        commandsArray.push(fullCommand);
                    }
                }
            }
            console.log(chalk.cyan.bold('\n Starting the performance. Enjoy the show!\n'));
            for (var i = 0; i < commandsArray.length; i++) {
                const stream = execa.shell(commandsArray[i]).stdout;
                stream.pipe(process.stdout);
            }

        });
    });


commander.parse(process.argv);

