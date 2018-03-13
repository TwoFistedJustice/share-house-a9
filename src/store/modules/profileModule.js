/*
* Profile Module is for creating, manipulating, and displaying user profiles
*
* store personal info in user node
* fetch with member pushId
*
*
*  populate from Make-Profile.vue
* */


import {gObj_hasRoot} from '../../config.js';


const state = {
  name: null,
  phone: null,
  email: null,
  bio: null,
  emergencyContact:{
    name: null,
    phone: null,
    email: null,
    relationship: null
  }
};
const getters = {};
const mutations = {};
const actions = {};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

