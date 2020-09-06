import "./styles.scss";

import "./img/*.svg";
import "./img/*.jpg";

import Vue from 'vue';
import App from './App';

new Vue({
  el: '#page',
  render: h => h(App),
});