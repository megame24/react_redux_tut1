import fs from 'fs';
import cherrio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console*/
fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if(err) {
        return console.log(err);
    }

    const $ = cherrio.load(markup);

    //since a separate spreadsheet is only utilized for the production build, need t dynamically 
    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('index.html written to /dist'.green);
    });
});