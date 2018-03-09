<template>
  <f7-page>
    <f7-navbar title="Shared Supplies" back-link="Close">
      <f7-nav-right>
        <f7-button small round raised color="orange" popup-open="#inventory-list-instructions">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>

    <f7-block strong>
      <f7-row>
        <f7-col desktop-width="10" tablet-width="50">
          <f7-button small round raised
                     color="blue"
                     @click="switchAllHaveStatus">We {{haveNeedText}} it all!</f7-button>
        </f7-col>

      </f7-row>
      </f7-block>

    <inventory-item v-for="supply in getSupplies"
               :key="supply.item"
               :supply="supply"></inventory-item>


      <f7-popup id="inventory-list-instructions">
        <f7-view>
          <f7-page>
            <f7-navbar title="How to use">
              <f7-nav-right>
                <f7-link popup-close>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <p class="big">Inventory List</p>
            <p>You can move between supply features either by swiping or
              by using the toolbar on the bottom of the screen</p>
            <p>Click an item when you run out.</p>
            <p>Green means you have it. </p>
            <p>Red means you have run out. </p>
            <p>Everything that has been "bought"  in the shopping list will turn green here.</p>
            <p>clicking the "Change All" button switches every item to the opposite color</p>

          </f7-page>
        </f7-view>
      </f7-popup>

  </f7-page>




</template>

<script>

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";
  import InventoryItem from '../elements/Item-Shared.vue';


  export default {
    data: function () {
      return {};
    },
    computed: {
      //Vuex namespacing require object syntax in mapWhatever
      ...mapGetters({
        getSupplies: 'supply/GetSupplies',
        getHaveSwitch: 'supply/GetDisplayHaveSwitch'
      }),

      haveNeedText() {
        /* changes the switch button text to match functionality
        *  sets the central supply bool in vuex */

        // this.setDisplayHaveSwitch(this.checkArrayBools());
        // this.$store.dispatch('supply/setDisplayHaveSwitch', this.checkArrayBools(), gObj_hasRoot);
        this.$store.dispatch('supply/setDisplayHaveSwitch', null, gObj_hasRoot);

        if (this.getHaveSwitch === true) {
          return 'Need';
        } else {
          return 'Have';
        }
      },
    },//end computed

    methods: {
      ...mapActions({
        changeItemHaveStatus: 'supply/flipBool',
        saveSupplies: 'supply/saveSupply',
        // setDisplayHaveSwitch: 'supply/setDisplayHaveSwitch',
        switchAllHaveStatus: 'supply/switchAllHaveStatus'
      }),


    }, //END METHODS
    components: {
      InventoryItem
    },

    beforeDestroy() {
      let thing = 'saveSupply';
      this.saveSupplies('suppliesInventory.vue beforeDestroy');
    },


  }
</script>
