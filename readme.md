# Encode a CSV with three-letter country codes

Given a CSV for input, this JS script will output a new CSV with additional columns containing 
the [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country codes.

## Installation

Requires npm, bower and grunt. To install necessary the packages and start the Express server: 

```
npm install && bower install
grunt
``` 

Point the browser to http://localhost:9008/ to begin.

## Parsing a CSV

* Paste your CSV into the "input" field. The first row should contain the field names. 
* Copy and paste the field names that have country names into the field "Comma separated list of country fields". If you skip this
step, then all fields will be checked for valid country names.
* Click "Run". Rows that contain complete matches will be output in the "Output" field. If some country names could not be matched,
 they will be output into the "Bad lines" textarea.
 
 