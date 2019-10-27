import axios from 'axios';
import handleError from './apiErrorHandler';

const SERVER_DOMAIN='';



axios.interceptors.request.use(function(config) {
    alert('request using  it now')
    return config;
}, function(error) {
    alert('request error use now')
    return error;
});

axios.interceptors.response.use(function(response) {
    alert('response using it now')
    return response;
}, function(error) {
    alert('response error use now')
    return error;
});

const getHeaders = function(){
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
  };

export default {



get: (path)=>{
    return new Promise((resolve, reject) => {
      axios.get(`${SERVER_DOMAIN}${path}`, getHeaders())
        .then(response => { resolve(response) })
        .catch(error => { reject(handleError(error)) });
    });
  },
  // HTTP PUT Request - Returns Resolved or Rejected Promise
  put: (path, data) => {
    return new Promise((resolve, reject) => {
      axios.put(`${SERVER_DOMAIN}${path}`, data, getHeaders())
        .then(response => { resolve(response) })
        .catch(error => { reject(handleError(error)) });
    });
  },
  // HTTP POST Request - Returns Resolved or Rejected Promise
  post: (path, data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${SERVER_DOMAIN}${path}`, data, getHeaders())
        .then(response => { resolve(response) })
        .catch(error => { reject(handleError(error)) });
    });
  },
  // HTTP DELETE Request - Returns Resolved or Rejected Promise
  delete: (path) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${SERVER_DOMAIN}${path}`, getHeaders())
        .then(response => { resolve(response) })
        .catch(error => { reject(handleError(error)) });
    });
  }
}