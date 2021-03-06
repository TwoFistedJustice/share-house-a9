// Import Vue
import Vue from 'vue';



//Import Axios
import axios from 'axios';
// import { store } from  './store/store.js';
import store  from  './store/store.js';
import {gObj_hasRoot} from './config.js';

import {dataBaseUrl} from './config.js';
axios.defaults.baseURL = dataBaseUrl;

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Init App
new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App nameFull
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: Routes,
    on: {
      init: function () {
        console.log('*******initializing F7 app from main.js');
        // store.dispatch('initSh/initDataBase', null, gObj_hasRoot);
      }
    }
  },
  // Register App Component
  components: {
    app: App
  }
});
