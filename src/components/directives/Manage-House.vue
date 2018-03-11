<template>

  <f7-page>
    <f7-navbar title="House Details" back-link="Close">
      <f7-nav-right>
        <f7-button small round raised
                   class="sh-how-to"
                   color="orange"
                   popup-open="#manage-house-details">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>


      <f7-block-title>{{getHouseName}} </f7-block-title>
      <f7-block>
        <!--checkbox to show form - via superPowers boolean-->
        <p class="sh-big">I want to</p>
        <f7-list form>

          <!--<f7-list-item checkbox-->
                        <!--:checked="superPowers"-->
                        <!--@change="superPowers = $event.target.checked">Change the house name</f7-list-item>-->

          <f7-list-item radio name="control-chooser"
                        checked
                        value=""
                        @change="superPower = $event.target.value"
                        :title="'None'"></f7-list-item>
          <f7-list-item radio name="control-chooser"
                        value="changeName"
                        :checked="superPower === 'changeName'"
                        @change="superPower = $event.target.value"
                        :title="'Change the house name'"></f7-list-item>

          <f7-list-item radio name="control-chooser"
                        value="deleteHouse"
                        :checked="superPower === 'deleteHouse'"
                        @change="superPower = $event.target.value"
                        :title="'Delete the house'"></f7-list-item>



          <br>


        </f7-list>

      </f7-block>

    <f7-block>
      <f7-list form>
        <div v-if="superPower === 'changeName'">
          <f7-label><p class="sh-small">Change House Name</p></f7-label>
          <f7-input type="text"
                    placeholder="Enter new house name"
                    :value="newHouseName"
                    v-on:input="newHouseName =$event.target.value"></f7-input>
          <f7-button small round fill
                     back
                     @click="changeHouseName">Change Name
          </f7-button>
        </div>
        <div v-if="superPower === 'deleteHouse'">
          <f7-list form>
            <f7-button small round fill
                       back
                       color="red"
                       @click="deleteHouse">Delete the House</f7-button>
          </f7-list>

        </div>

      </f7-list>
    </f7-block>



    <f7-popup id="manage-house-details">
      <f7-view>
        <f7-page>
          <f7-navbar title="How to">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <p class="sh-big">Manage House Details</p>
          <p>Some words</p>

        </f7-page>
      </f7-view>
    </f7-popup>



  </f7-page>

</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";

    export default {
        name: "manage--members",
      // props: [],
      data: function () {
        return {

          houseName: '',
          houseId: '',
          knock: null,
          // superPowers: false,
          superPower: '',

          newHouseName: ''

        };

      },
      // components: {},
      computed: {

        ...mapGetters({
          getActiveHouse: 'house/getActiveHouse',
          getHouseName: 'house/getHouseName',
          getBelongsToHouse: 'user/getBelongsToHouse',
          getHouseId: 'house/getHouseId',
          isAdmin: 'user/getIsAdmin',
          // getNode: 'house/getHousesNode'

        }),

      },
      methods: {
        ...mapActions({
          deleteHouse: 'house/deleteHouse',
        }),

        changeHouseName() {
          const formData = {
            houseName: this.newHouseName
          }
          let thing = 'changeHouseName';
          this.$store.dispatch('house/changeHouseName', formData, gObj_hasRoot);
          this.newHouseName = '';

        },

      }


    }
</script>

<style scoped>

</style>


}

</script>

<style scoped>

</style>
