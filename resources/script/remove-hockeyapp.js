#!/usr/bin/env node

var fs = require('fs');

console.log('Running: Removing HockeyApp from app.js');

if (!(/adhoc/).test(process.env.npm_lifecycle_event)) {
    console.log('skipping: this is not an adhoc build');
    return;
}

var appDest = 'www/js/app.js';
fs.readFile(appDest, 'utf8', function(err, data) {
    if (err) {
        console.log('Error reading app.js');
        console.log('More info: <', err.message, '>');
        process.exit(1);
    }

    // delete hockeyapp code from app.js
    var result = '';
    if ((/%HOCKEYAPP([\s\S]*?)(%ENDHOCKEYAPP)/).test(data)) {
        result = data.replace(/%HOCKEYAPP([\s\S]*?)(%ENDHOCKEYAPP)/, '%HOCKEYAPP');
    } else {
        console.log('Exiting: no HockeyApp code to remove');
        return;
    }

    // write back to app.js
    fs.writeFile(appDest, result, 'utf8', function(err) {
        if (err) {
            console.log('Error while writting to app.js');
            console.log('More info: <', err.message, '>');
            process.exit(1);
        }
    });
});
