//Place your own config here

const env = 'dev';

if(env === 'dev') {
    module.exports = require('./dev.json');;
}
else {
    module.exports = require('./prod.json');
}
