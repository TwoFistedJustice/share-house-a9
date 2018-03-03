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


export default [
  // {path: '',
  // component: },

  {path: '/supplies/',
  component: SupplyTabs},


  {path: '/shopping-list/',
    component: ShoppingList},

  {path: '/inventory-list/',
    component: InventoryList},

  {path: '/supplies-modify/',
    component: SuppliesModify },

  {path: '/join-house/',
  component: JoinHouse },




  // Default F7 Template Pages
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  // {
  //   path: '/dynamic-route/blog/:blogId/post/:postId/',
  //   component: DynamicRoutePage,
  // },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
