

// let str = require('./a.js');
// console.log(str);
// console.log(1234567890);

require('./index.css');
require('./index.less');
// import './style';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// import $ from "expose-loader?$!jquery";
// import $ from "jquery";
// console.log(window.$);

// import logo from './dmm.jpg';
// let img = new Image();
// img.src = logo;
// document.body.appendChild(img)


let xhr = new XMLHttpRequest;
xhr.open('GET', '/api/user', true)
xhr.onload = function () {
  console.log(xhr.response)
}
xhr.send()
