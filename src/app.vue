<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>

    <!-- Popup About -->
    <f7-popup id="popup-about">
      <f7-view>
        <f7-page>
          <f7-navbar title="About Share House">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block><p>Share House exists to foster community amongst people who share housing.</p></f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>

            <!-- BEGIN INPUT FIELDS-->
            <!-- two f7 list items are needed to keep the fields lined up-->
            <f7-list-item>
              <!--email field-->
              <f7-list-item>
                <f7-label>Email</f7-label>
                <f7-input
                  name="e-mail-logIn"
                  placeholder="e-mail"
                  type="text"
                  :value="email"
                  v-on:input="email = $event.target.value"></f7-input>
              </f7-list-item>
              <!--END email field-->
            </f7-list-item>

            <!--password field-->
            <f7-list-item>
              <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input
                  name="password login"
                  type="password"
                  placeholder="Password"
                  :value="password"
                  v-on:input="password = $event.target.value"></f7-input>
              </f7-list-item>

            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button
              title="Sign In"
              @click="logUserIn"
              login-screen-close></f7-list-button>
            <f7-list-button
              title="Cancel"
              @click="clearFormData"
              login-screen-close></f7-list-button>

            <f7-block-footer>
              <p>Click Sign In to close Login Screen</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>


    <!-- Signup Screen -->
    <f7-login-screen id="signup-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Sign Up</f7-login-screen-title>
          <f7-list form>

            <f7-list-item>
              <f7-label>First Name</f7-label>
              <f7-input
                name="first-name"
                placeholder="First Name"
                type="text"
                :value="firstName"
                v-on:input="firstName = $event.target.value"
              ></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Last Name</f7-label>
              <f7-input
                name="last-name"
                placeholder="Last Name"
                type="text"
                :value="lastName"
                v-on:input="lastName = $event.target.value"></f7-input>
            </f7-list-item>

            <f7-list-item>
              <f7-label>Email</f7-label>
              <f7-input
                name="e-mail-signIn"
                placeholder="e-mail"
                type="text"
                :value="email"
                v-on:input="email = $event.target.value"></f7-input>
            </f7-list-item>

            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input
                name="password"
                type="password"
                placeholder="Password"
                :value="password"
                v-on:input="password = $event.target.value"></f7-input>
            </f7-list-item>

            <f7-list-item>
              <f7-label>Confirm Password</f7-label>
              <f7-input
                name="Confirm-password"
                type="password"
                placeholder="Not active"
                :value="confirmPassword"
                v-on:input="confirmPassword = $event.target.value"></f7-input>
            </f7-list-item>

          </f7-list>
          <f7-list>
            <f7-list-button
              title="Create Account"
              @click="createAccount"
              login-screen-close></f7-list-button>
            <f7-list-button
              title="Cancel"
              @click="clearFormData"
              login-screen-close></f7-list-button>

            <f7-block-footer>
              <p>Click Create Acccount to close Sign Up Screen</p>
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>


  </div>
</template>

<script>
  import {gObj_hasRoot} from "./config";
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      }
    },
    computed:{
      ...mapGetters({
        isDataBaseResponding: 'initSh/isDbResponding'
      }),



    },

    methods: {

      createAccount() {
        const signUpFormData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          terms: this.terms
        }
        let thing = 'createNewUser';
        this.$store.dispatch('auth/createNewUser', signUpFormData, gObj_hasRoot);
        this.clearFormData();
      },

      logUserIn() {
        const loginFormData = {
          email: this.email,
          password: this.password,
        };
        let thing = 'login';
        this.$store.dispatch('auth/login', loginFormData, gObj_hasRoot);
        this.clearFormData();

      },

      clearFormData() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.terms = false;

      }
    },
    created() {
      //       console.log('*****************created*******************');
      //TODO move these into a initModule, then use only a single dispatch  from here to there
      let thing1 = 'loginOmatic';
      // let thing2 = 'fetchSupply';
      // let thing3 = 'initSupply';
      // let thing4 = 'initDataBase';

      this.$store.dispatch('auth/loginOmatic', null, gObj_hasRoot);
      // this.$store.dispatch('initSh/initDataBase', null, gObj_hasRoot);
      // init supply misnamed - it sets okayToPost in state - probably not needed
      // this.$store.dispatch('supply/initSupply', null, gObj_hasRoot);
      // this.$store.dispatch('supply/fetchSupply', null, gObj_hasRoot);



    },


  }
</script>
