import authAxios from '../../axios/axios-auth.js';


/* gObj_hasRoot looks like {root: true}, is for vuex namespacing*/
import {APIkey, gObj_hasRoot} from '../../config.js';


const state = {
  idToken: null, /* 'A Firebase Auth ID token for the authenticated nameFull.' */
  keepMeLoggedIn: true, //to be set by nameFull - eventually
  refreshToken: null,
  userId: null, /* holds data.localid "The uid of the authenticated nameFull." */

};

const getters = {

  isAuthenticated (state) {
    /*used in Header.vue  to display or not different components*/
    return state.idToken != null;
  },

  getUserId (state){
    return state.userId;
  }
};

const mutations = {
  SET_AUTH_DATA(state, userData) {
    state.idToken = userData.idToken;
    state.refreshToken = userData.refreshToken;
    state.userId = userData.userId;
  },

  CLEAR_AUTH_DATA(state) {
    state.idToken = null;
    state.userId = null;
  },
};

const actions = {

  //this should be part of auth
  createNewUser({commit, dispatch, state}, formData) {
    /*dispatched from SignUp.vue*/

    authAxios.post('/signupNewUser?key=' + APIkey, {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    })
      .then(response => {
        let authBlob = {
          idToken: response.data.idToken,
          userId: response.data.localId
        };
        let highlightRefs = ['storeNewUser'];
        dispatch('user/storeNewUser', {signupData: formData, authBlob: authBlob}, gObj_hasRoot);
      })
      .catch(err => {
        console.error('createNewUser', err);
      });

  },

  login({commit, dispatch, state}, authData) {

    authAxios.post('/verifyPassword?key=' + APIkey, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(response => {
        password: authData.password,
          console.log('login.then', response);
        commit('auth/SET_AUTH_DATA', {
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
          userId: response.data.localId
        }, gObj_hasRoot);

        let highlightRefs = ['setLocalStorage', 'logoutTimer', 'initDataBase'];

        dispatch('auth/setLocalStorage', response.data, gObj_hasRoot);
        dispatch('auth/logoutTimer', response.data.expiresIn, gObj_hasRoot);
        // dispatch('initSh/initDataBase', null, gObj_hasRoot);
        dispatch('initSh/initDataBase', 'login', gObj_hasRoot);

        // dispatch('house/fetchActiveHouse', null, gObj_hasRoot); //moved into init module
      })
      .catch(error => {
        console.error('login', error);
      });
  },

  loginOmatic({commit, dispatch}) {
    /* dispatched from app.vue.created */

    // dispatch authuser from here first
    // then see if we need it in refresh log in

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date().getTime();

    let authBlob = {
      idToken: token,
      userId: userId
    };
    if (!token) {
      return;
    }
    else if (now <= expirationDate) {

      let highlightRefs = ['SET_AUTH_DATA', 'fetchUser', 'refreshLogin'];

      commit('SET_AUTH_DATA', authBlob);

      // dispatch('user/fetchUser', null, gObj_hasRoot);
    }
    else {
      dispatch('auth/refreshLogin', null, gObj_hasRoot);
    }
  },

  logout({commit}) {
    // console.log('****************** logout');

    let highlightRefs = ['CLEAR_AUTH_DATA', 'CLEAR_HOUSE_DATA', 'CLEAR_USER_DATA', 'CLEAR_USER_NAME'];

    commit('auth/CLEAR_AUTH_DATA', null, gObj_hasRoot);
    commit('house/CLEAR_HOUSE_DATA', null, gObj_hasRoot);
    commit('user/CLEAR_USER_DATA', null, gObj_hasRoot);
    commit('user/CLEAR_USER_NAME', null, gObj_hasRoot);
    commit('supply/CLEAR_SUPPLIES', null, gObj_hasRoot);
    commit('membership/CLEAR_MEMBER_STATE', null, gObj_hasRoot);
    localStorage.clear();
  },

  logoutTimer({commit, state, dispatch}, expirationTime) {
    /* dispatched from signin */
    /*
     TODO add keep me logged in as a feature in A8 or later

    If state.keepMeLoggedIn is true, dispatch refresh one second before token expires
    otherwise, logout in one hour

    */

    if (state.keepMeLoggedIn) {
      setTimeout(() => {
        let highlightRefs = ['logout', 'refreshLogin'];

        dispatch('auth/refreshLogin', null, gObj_hasRoot)
      }, expirationTime * 999);
    } else {
      setTimeout(() => {
        dispatch('auth/logout', null, gObj_hasRoot)
      }, expirationTime * 1000);
    }
  },

  refreshLogin({commit, dispatch}) {

    let refreshToken = localStorage.getItem('refreshToken');

    authAxios.post('https://securetoken.googleapis.com/v1/token?key=' + APIkey,
      'grant_type=refresh_token&refresh_token=' + refreshToken)

      .then(response => {
        let highlightRefs = ['fetchActiveHouse', 'setLocalStorage', 'SET_AUTH_DATA'];

        commit('auth/SET_AUTH_DATA', {
          idToken: response.data.id_token,
          refreshToken: response.data.refresh_token,
          userId: response.data.user_id
        }, gObj_hasRoot);


        /* *************************************
          firebase properties for refresh use same names, but different case than for log-in
          except user_id is the same as localId
        **************************************/
        dispatch('auth/setLocalStorage', {
          expiresIn: response.data.expires_in,
          refreshToken: response.data.refresh_token,
          idToken: response.data.id_token,
          localId: response.data.user_id

        }, gObj_hasRoot);
        dispatch('initSh/initDataBase', null, gObj_hasRoot);
        // dispatch('initSh/initDataBase', 'refreshLogin', gObj_hasRoot);
        // dispatch('house/fetchActiveHouse', null, gObj_hasRoot);
      })
      .catch(error => console.error('refresh: ', error));
  },

  setLocalStorage({commit}, resData) {

    /* *******************************
    Beware of firebase naming conventions -
    they vary between api features for essentially the same data
    ********************************/
    //get the current date for use with localStorage
    const now = new Date();
    //convert the date to the exact time in milliseconds and add the expiration time in ms
    //The getTime() method returns the number of milliseconds between midnight of January 1, 1970 and the specified date.
    const expirationTime = new Date(now.getTime() + resData.expiresIn * 1000);

    localStorage.setItem('expirationDate', expirationTime);
    localStorage.setItem('refreshToken', resData.refreshToken);
    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
