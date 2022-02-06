import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance });
  }
}