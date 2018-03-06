import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/authModule.js';
import user from './modules/userModule.js';
import house from './modules/houseModule.js';
import membership from './modules/memberModule.js';
import profile from './modules/profileModule.js';
import supply from './modules/supplyModule.js';
import chores from './modules/choreModule.js';
Vue.use(Vuex);


export const store = new Vuex.Store({

  state:{},
  getters:{},
  mutations:{},
  actions:{},
  modules: {
    auth,
    chores,
    house,
    membership,
    profile,
    supply,
    user
  }

}); // END STORE



