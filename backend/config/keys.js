//Place your own config here

const env = 'dev';

if(env === 'dev') {
    module.exports = require('./dev');
}
else {
    module.exports = require('./prod');
}
