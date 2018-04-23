/*
* initializationModule is for handling app start up
* */

import globalAxios from 'axios';
import router from '../../routes.js';

import {APIkey, gObj_hasRoot} from '../../config.js';


/* Supplanting okayToPost in state
*  okayToPost is a value of true stored in the db, once it comes back
*  supplies can be used. this was done because the async gets/posts would
*  inadvertently wipe out the supplies node in the DB. It would save the
*  empty array value at app start up before the DB responded with the saved array
*  okayToPost prevents that from happening.
*
*  But now I'm having issues with Framework 7 where the app loads before the DB
*  responds, but doesn't check it again. So no data is displayed to the user, even
*  though the DB is working just fine
*
*  dataBaseResponding will be set according to okayToPost in the db
*  then hopefully I can use that to cause the page to refresh and pull the data

*  need to update the following uses of okayToPost
*  supplyModule savesupply() if clause
*  supply/initSupply is directly setting - this should be changed to a commit mutation
*
*
*  First thing to do is set the new bool from the DB response
*  done in: initSupply- should probably be its own thing
*
*  before the app does anything else after log in it should set and check this bool
*  and only after getting a true should it do anything else.
*
*  if no DB response, generate an error page maybe with a refresh button
*
*  I might even want to make a module that does nothing but control initialization
*
* */


const state = {
  dataBaseResponding: false
};

// GETTERS getters GETTERS getters
const getters = {
  isDbResponding(state){
    return state.dataBaseResponding;
  }
};

// MUTATIONS mutations MUTATIONS mutations
const mutations = {

  SET_DATABASE_RESPONDING(state, responseCode){
    if (responseCode === 200){
      state.dataBaseResponding = true;

    } else {
      console.error('database NOT responding. http code: ' + responseCode);
      return;
    }

  }

};

// ACTIONS actions ACTIONS actions
const actions = {

  initAppData({dispatch, commit, getters}) {
    if(getters.isDbResponding){
          // console.log('**********dataBase bool set')
      let highlightRefs = ['fetchActiveHouse', 'fetchSupply'];

      dispatch('house/fetchActiveHouse', null, gObj_hasRoot);
      dispatch('supply/fetchSupply', null, gObj_hasRoot);
      // dispatch('supply/fetchSupply', ' initAppData if statement', gObj_hasRoot);
      // this.$store.dispatch('chores/initChores', null, gObj_hasRoot);

    }else{
      //check the DB again
      dispatch('initDataBase');
    }
  },

  initDataBase({dispatch, commit, state}) {
    //I don't think I need okayToPost. If the houseId node responds we should be good to go
    // if(nameString=== null){
    //   throw 'lkjlkjlk'
    // }
    // console.trace('*^*^*^*^*^*^*^*^*^*^initDataBase ' + nameString);


    let token = localStorage.getItem('token');
    let houseId = localStorage.getItem('houseId');

    globalAxios.get('houses/' + houseId + '.json?auth=' + token)
      .then(resp => {
        /* passes http status code to set a bool that tells the app the DB is alive
        * 200 sets it true, any other code leaves it at default value of false*/
        // console.log('initDB' + resp);
        commit('SET_DATABASE_RESPONDING', resp.status);
        dispatch('initAppData');
      })
      .catch(err => console.error(err));
  },

};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
