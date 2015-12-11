# node-required

node cli tool for tracing and reporting required files

```sh

sudo npm install -g node-required

// -j outputs json

node-required -j api/file.js
{
  files: [
    '/list/of/files.js',
    '/required/by/the.js',
    '/specified/file.js'
  ]
}


// -x skips module

node-required -x aws-sdk api/file.js

```