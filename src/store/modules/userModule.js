/*
* userModule controls only data related to the person using the interface
* if something can affect any user, look in memberModule
* */


import globalAxios from 'axios';

import {APIkey, gObj_hasRoot} from '../../config.js';

/* USER DATA THAT DOES NOT BELONG TO AUTH GOES HERE
*   nicknames, user settings, etc.
*
* */

const state = {
  /* belongToHouse is a bool based on DB query that returns true if user belongs to a house an false if not */
  belongsToHouse: false,
  userInfo: {
    email: null,
    nameFirst: null,
    nameLast: null,
    nameFull: null,
    isAdmin: false,
    role: ''
  }
};

const getters = {
  getBelongsToHouse(state) {
    /* used to set v-if in components */
    return state.belongsToHouse;
  },

  getUserInfo(state) {
    return state.userInfo;
  },

  getIsAdmin(state) {
    return state.userInfo.isAdmin;
  }

};

const mutations = {
  CLEAR_USER_DATA(state) {
    localStorage.setItem('belongsToHouse', false);
    state.belongsToHouse = false;
    state.userInfo.email = null;
    state.userInfo.isAdmin = false;
    state.userInfo.role = '';

  },

  CLEAR_USER_NAME(state) {
    state.userInfo.nameFirst = '';
    state.userInfo.nameLast = '';
    state.userInfo.nameFull = '';
  },

  SET_BELONGS_TO_HOUSE(state, bool) {
    state.belongsToHouse = bool;
    localStorage.setItem('belongsToHouse', bool);
  },

  SET_USER_INFO(state, userBlob) {
    /* Set user's nameFull, admin status, and role */
    state.userInfo.email = userBlob.email;
    state.userInfo.nameFirst = userBlob.nameFirst;
    state.userInfo.nameLast = userBlob.nameLast;
    state.userInfo.nameFull = userBlob.nameFirst + ' ' + userBlob.nameLast;
    // state.userInfo.nameFull = userBlob.nameFull;
    state.userInfo.isAdmin = userBlob.isAdmin;
    state.userInfo.role = userBlob.role;
  },
};
const actions = {


  addHouseToUser({commit, dispatch}, payload) {
    /*
    payload expects - same as houseBlob in instantiateHouse
    { houseId: pushId, active: true}
    * */

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let houseBlob = {
      houseId: payload.houseId,
      active: true
    }

    globalAxios.patch('users/' + userId + '/house.json?auth=' + token, houseBlob)
    /*creates the house node in the nameFull's node*/
      .then(response => {
        let highlightRefs = ['fetchActiveHouse'];
        dispatch('house/fetchActiveHouse', null, gObj_hasRoot);

      })
      .catch(err => console.error('addHouseToUser', err));
  },

  setUserInfo({commit}, payload) {
    // console.log('********user/setUserInfo', payload);
    /* payload looks just like userBlob in the else block*/
    /* if no payload is passed, it means user does not belong to a house
    *  only then go to the dB and get their info,otherwise it comes from their
    *  member info in activeHouse - this is to prevent redundant db gets
    * */
    /*  if user belongs to a house, get their info from local state */
    if (payload != null) {
      let highlightRefs = ['SET_USER_INFO'];
      commit('user/SET_USER_INFO', payload, gObj_hasRoot);
    } else {

      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      /*  user doesn't belong to a house, get their info from the DB */
      globalAxios.get('users/' + userId + '.json?auth=' + token)
        .then(response => {

          let role = '';
          if (!response.data.house) {
            role = 'Seeker';
          }

          // console.log('getting user info ', response);
          let userBlob = {
            email: response.data.email,
            id: response.data.id,
            isAdmin: false,
            nameFirst: response.name.first,
            nameLast: response.name.last,
            // nameFull: response.data.name.first + ' ' + response.data.name.last,
            role: role
          };
          let highlightRefs = ['SET_USER_INFO'];
          commit('user/SET_USER_INFO', userBlob, gObj_hasRoot);

        })
        .catch(err => console.error('user/setUserInfo', err));
    }
  },

  /* adds to  nameFull object in DB, captures UID */
  storeNewUser({commit, state}, payload) {
    console.log('***** STORING NEW USER');

    /* get token from auth */
    let token = payload.authBlob.idToken;
    let userId = payload.authBlob.userId;
    if (!token) {
      return;
    }

    let userBlob = {
      name: {
        last: payload.signupData.lastName,
        first: payload.signupData.firstName,
      },

      email: payload.signupData.email,
      userId: payload.authBlob.userId
    };
    /* stores firebase node-key of new nameFull */

    /* 'patch' allows userID as node nameFull :-) */
    globalAxios.patch('users/' + userId + '.json/?auth=' + token, userBlob)
      .then(response => {
        console.log("userModule.storeUser", response)
      })
      .catch(err => console.error("userModule.storeUser", err));
  },

};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
