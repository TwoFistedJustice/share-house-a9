import Vue from 'vue';

// import vuex store
import store from './store/store';
console.log(store.state.user);
console.log("belongsToHouse: " + store.state.user.belongsToHouse);
let localbelongsToHouse = localStorage.getItem('belongsToHouse');


console.log(store.state.auth);
console.log("keepMeLoggedIn " + store.state.auth.keepMeLoggedIn);

// import HomePage from './pages/home.vue';
import HomePage from './components/structure/Home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
// import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './components/structure/Panel-Left.vue';

import PanelRightPage from './components/structure/Panel-Right.vue';

// SUPPLY IMPORTS
import SupplyTabs from './components/structure/Supply-Tabs.vue';
import ShoppingList from './components/features/Shopping-List.vue';
import SuppliesModify from './components/features/Supplies-Modify.vue';
import InventoryList from './components/features/Supplies-Shared.vue';


import JoinHouse from './components/directives/Join.vue';

// ADMIN IMPORTS
import MemberManagement from './components/directives/Manage-Members.vue';
import HouseManagement from './components/directives/Manage-House.vue';


export default [
  // {path: '',
  // component: },

  //STRUCTURE ROUTES

  // {
  //   path: '/',
  //   component: HomePage,
  //
  //   },


  {
    path: '/',
    component: HomePage,

    async(routeTo, routeFrom, resolve, reject,) {
      if (localbelongsToHouse) {
        // console.log("value: " + store.state.user.belongsToHouse);
        resolve({
          component: HomePage})
        }
      else
        {
          // console.log("value: " + store.state.user.belongsToHouse);
          resolve({
            component: JoinHouse})
        }
      }
  },


  {
    path: '/join-house/',
    component: JoinHouse,
    async(routeTo, routeFrom, resolve, reject) {
      if (!localbelongsToHouse) {
          resolve({
          component: JoinHouse})
      }
      else
      {
        resolve({
          component: HomePage})
      }
    }
  },

  // {
  //   path: '/',
  //   component: HomePage,
  //   async(routeTo, routeFrom, resolve, reject) {
  //     if (store.state.auth.idToken) {
  //       resolve({
  //         component: SomeComponent})
  //     }
  //     else
  //     {
  //       resolve({
  //         component: HomePage})
  //     }
  //   }
  // },



  {
    path: '/panel-left/',
    component:
    PanelLeftPage,
    created:

      function () {
        console.log('created');
      }
  },

  {
    path: '/panel-right/',
    component:
    PanelRightPage,

  },

  {
    path: '/supplies/',
    component:
    SupplyTabs
  },


// FEATURE ROUTES

  {
    path: '/shopping-list/',
    component:
    ShoppingList,

  },

  {
    path: '/inventory-list/',
    component:
    InventoryList
  },

  {
    path: '/supplies-modify/',
    component:
    SuppliesModify
  },


  // ADMIN ROUTES

  {
    path: '/member-management/',
    component: MemberManagement,

    },

  {
    path: '/house-management/',
    component: HouseManagement,

    },



// Default F7 Template Pages

  {
    path: '/about/',
    component: AboutPage,
  }
  ,
  {
    path: '/form/',
    component: FormPage,
  }
  ,
// {
//   path: '/dynamic-route/blog/:blogId/post/:postId/',
//   component: DynamicRoutePage,
// },
  {
    path: '(.*)',
    component:
    NotFoundPage,
  }
  ,

  {
    path: '/some-page/',
    // Component Object
    component:
      {
        template: `
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="title">{{title}}</div>
            </div>
          </div>
          <div class="page-content">
            <a @click="openAlert" class="red-link">Open Alert</a>
            <div class="list simple-list">
              <ul>
                {{#each names}}
                  <li>{{this}}</li>
                {{/each}}
              </ul>
            </div>
          </div>
        </div>
      `,
        style:
          `
        .red-link {
          color: red;
        }
      `,
        data:

          function () {
            return {
              title: 'Component Page',
              names: ['John', 'Vladimir', 'Timo'],
            }
          }

        ,
        methods: {
          openAlert: function () {
            var self = this;
            self.$app.dialog.alert('Hello world!');
          }
          ,
        }
        ,
        on: {
          pageInit: function (e, page) {
            // do something on page init
          }
          ,
          pageAfterOut: function (e, page) {
            // page has left the view
          }
          ,
        }
      }
    ,
  }
  ,

]
;
