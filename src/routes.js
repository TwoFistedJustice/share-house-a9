import Vue from 'vue';

// import {store} from './store/store';

import {store} from './store/store';
// let belongsToHouse = store.state.user.belongsToHouse;



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

// MEMBER IMPORTS
import MemberManagement from './components/directives/Manage-Members.vue';

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

    // async(routeTo, routeFrom, resolve, reject,) {
    //   if (store.state.user.belongsToHouse) {
    //     console.log("value: " + store.state.user.belongsToHouse);
    //     resolve({
    //       component: JoinHouse})
    //     }
    //   else
    //     {
    //       console.log("value: " + store.state.user.belongsToHouse);
    //       resolve({
    //         component: HomePage})
    //     }
    //   }
  },


  {
    path: '/join-house/',
    component: JoinHouse,
    // async(routeTo, routeFrom, resolve, reject) {
    //   if (belongsToHouse) {
    //     console.log("JOIN*****vuex value: " + belongsToHouse);
    //     resolve({
    //       component: HomePage})
    //   }
    //   else
    //   {
    //     resolve({
    //       component: JoinHouse})
    //   }
    // }
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

  {
    path: '/member-management/',
    component: MemberManagement,

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
