<template>
  <f7-page>
    <f7-navbar>
      <!-- NAV MENUS IN HEADER CORNERS-->
      <f7-nav-left>
        <f7-link
          v-if="isAuthenticated"
          icon-if-ios="f7:menu"
          icon-if-md="material:menu"
          panel-open="left"
          text="Menu"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Share House A9</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right" text="Admin"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- LEFT AND RIGHT LINKS-->
    <!--<f7-toolbar>-->
    <!--<f7-link>Left Link</f7-link>-->
    <!--<f7-link>Right Link</f7-link>-->
    <!--</f7-toolbar>-->

    <!--<f7-block strong>-->
    <!--<p>Here is your blank Framework7 app. Let's see what we have here.</p>-->
    <!--</f7-block>-->

    <!-- NAV AND MODAL BUTTONS-->
    <!--<f7-block-title>Navigation</f7-block-title>-->
    <!--<f7-list>-->
    <!--<f7-list-item link="/about/" title="About"></f7-list-item>-->
    <!--<f7-list-item link="/form/" title="Form"></f7-list-item>-->
    <!--</f7-list>-->
    <!--<f7-block-title>Modals</f7-block-title>-->
    <f7-block
      v-if="!isAuthenticated"
      strong>
      <f7-row>
        <f7-col desktop-width="10" tablet-width="33">
          <f7-button fill raised popup-open="#popup-about">About</f7-button>
        </f7-col>
        <f7-col desktop-width="10" tablet-width="33">
          <f7-button fill raised login-screen-open="#signup-screen">Sign Up</f7-button>
        </f7-col>
        <f7-col desktop-width="10" tablet-width="33">
          <f7-button fill raised login-screen-open="#login-screen">Login</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block
      v-if="isAuthenticated"
      strong>
      <p>home.vue</p>
      <p>if user.belongsToHouse is false....</p>
      <b><p>if not a member display join or create</p></b>
      <p>good place to display this week's house job</p>
      <p>Welcome home {{getUserInfo.nameFull}}!</p>
      <p>To access your stuff use the menu in the upper left corner!</p>
      <f7-button @click="onLogout">Log out</f7-button>

    </f7-block>


    <!-- LEFT RIGHT PANEL BUTTONS-->
    <!--<f7-block-title>Panels</f7-block-title>-->
    <!--<f7-block strong>-->
    <!--<f7-row>-->
    <!--<f7-col width="50">-->
    <!--<f7-button fill raised panel-open="left">Left Panel</f7-button>-->
    <!--</f7-col>-->
    <!--<f7-col width="50">-->
    <!--<f7-button fill raised panel-open="right">Right Panel</f7-button>-->
    <!--</f7-col>-->
    <!--</f7-row>-->
    <!--</f7-block>-->


    <!--<f7-list>-->
    <!--<f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>-->
    <!--<f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>-->
    <!--</f7-list>-->


  </f7-page>
</template>
<script>
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex';
  import {gObj_hasRoot} from "../config.js";


  export default {

    computed: {
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        getActiveHouse: 'house/getActiveHouse',
        getUserInfo: 'user/getUserInfo'
      }),

    },
    methods: {
      ...mapActions({
        // saveSupplies: t.saveSupply,
        // fetchSupplies: t.fetchSupply
      }),
      TestFn() {

        // confirm("Which button would you like to press to blow up the earth?");
        // console.log('test');
        // this.$store.dispatch('supply/testFn', null, gObj_hasRoot);
        // this.$store.commit('supply/SET_BUTTON_HAVE_SWITCH', null, gObj_hasRoot);
      },
      onLogout() {
        this.$store.dispatch('auth/logout', null, gObj_hasRoot);
      }
    }

  }
</script>
