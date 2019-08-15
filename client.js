const axios = require('axios');

axios.interceptors.request.use(function (config) {
  config.metadata = { startTime: new Date() };
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, function (error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  return Promise.reject(error);
});

const limit = parseInt(process.argv[2]);

for (var i = 0; i < limit; i++) {
  axios
    .post('http://localhost:5000/api/v1/invoices', {
      storeId: 1000 + i,
      buyerId: 9000 + i,
      details: 'Detail for item ' + i,
      amount: 10 + i
    })
    .then(function (response) {
      console.log('Response time (ms):', response.duration);
    })
    .catch(function (error) {
      console.log('Response time (ms):', error.duration);
    });
}
