<template>

  <!--   JOIN OR CREATE A HOUSE-->
  <f7-page>
    <f7-navbar title="Welcome Home!" back-link="Run like hell">
      <f7-nav-right>
        <f7-button small round raised color="orange" popup-open="#create-house-instructions">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>I would like to</f7-block-title>
    <f7-block strong>
      <f7-list form>

        <!--radio select join or create-->
        <!--selection determines which button is shown and which instruction are displayed-->

        <f7-list-item radio name="Join-Create"
                      :checked="toJoin"
                      @change="toJoin = true"
                      :title="'Join an existing house'"></f7-list-item>
        <br><br>
        <f7-list-item radio name="Join-Create"
                      :checked="!toJoin"
                      @change="toJoin = false"
                      :title="'Create a new house'"></f7-list-item>

        <f7-block>
          <!--<f7-block-title>Create a new house</f7-block-title>-->
          <!-- only the button changes each calls a different function-->
          <f7-input type="text"
                    placeholder="House name"
                    :value="formData.houseName"
                    v-on:input="formData.houseName =$event.target.value"></f7-input>

          <f7-input type="text"
                    placeholder="Street"
                    :value="formData.street"
                    v-on:input="formData.street=$event.target.value"></f7-input>

          <f7-input type="text"
                    placeholder="City"
                    :value="formData.city"
                    v-on:input="formData.city =$event.target.value"></f7-input>

          <f7-input type="text"
                    placeholder="Country"
                    :value="formData.country"
                    v-on:input="formData.country=$event.target.value"></f7-input>
          <br>

          <f7-button small round fill color="green" v-if="!toJoin && isformFilled">Create a House</f7-button>
          <f7-button small round fill
                     color="gray"
                     v-if="!toJoin && !isformFilled"
          @click="createHouse">Create a House</f7-button>

          <f7-button small round fill v-if="toJoin && isformFilled">Join a House</f7-button>
          <f7-button small round fill color="gray" v-if="toJoin && !isformFilled">Join a House</f7-button>

        </f7-block>


      </f7-list>


    </f7-block>

    <!-- INSTRUCTIONS-->
    <f7-popup id="create-house-instructions">
      <f7-view>
        <f7-page v-if="!toJoin">
          <f7-navbar title="How to create a house">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block strong>
            <p>Enter the name you have chosen for you house.</p>

            <p>You can enter any name you like, even one that has already been used.</p>

            <p>Your street is your unique identifier. It can be your real street or one you make up.</p>

            <p>When someone joins your house, they will need to know the EXACT street you entered here.</p>

            <p>We may one day add a map feature. If you enter a fake street, you won't be able to use it.</p>

            <p>When you create a new house you become its ADMIN. You control who gets to join the house. Only you will
              be
              able to change house details. You will also be able to make someone else an admin.</p>

          </f7-block>


        </f7-page>
        <f7-page v-if="toJoin">
          <f7-navbar title="How to join a house">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block strong>
            <p>Enter the name and street of the house you would like to join.</p>

            <p>The street is the unique identifier of the house. You must enter it
              EXACTLY as the it was entered when the house was created.</p>

            <p>Wait for the house ADMIN to approve you.</p>


          </f7-block>


        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-page>

</template>

<script>
  // import {mapGetters} from 'vuex';
  // import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";

  export default {
    name: "join",
    data: function () {
      return {
        //toJoin default value determines which radio is checked
        toJoin: true,
        // formFilled: false,
        formData: {
          houseName: '',
          street: '',
          city: '',
          country: ''
        }
      };
    },
    computed: {
      isformFilled() {
        /* if all fields contain other than an empty string, return true*/
        if (this.formData.houseName != ''
          && this.formData.street != ''
          && this.formData.city != ''
          && this.formData.country != '') {
          return true;
        } else {
          return false;
        }
      }

    },

    methods: {

      createHouse() {
        let thing = 'createNewHouse';
        this.$store.dispatch('house/createNewHouse', this.formData, gObj_hasRoot);
        this.clearFormData();
      },


      joinHouse() {
        // console.clear();
        // console.log('***********join house button not active yet', this.houseId);
        let thing = 'addMember';
        this.$store.dispatch('membership/addMember', this.formData, gObj_hasRoot);

        this.clearFormData();

      },

      clearFormData() {
        this.formData.houseName = '';
        this.formData.street = '';
        this.formData.city = '';
        this.formData.country = '';
      }
    }


  }
</script>


<style scoped>

</style>
