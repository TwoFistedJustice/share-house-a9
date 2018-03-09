<template>
  <f7-page>
    <f7-navbar title="Shopping List" back-link="Close">
      <f7-nav-right>
        <f7-button small round raised color="orange" popup-open="#shopping-list-instructions">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>

    <f7-block strong>
      <f7-row>
        <f7-col desktop-width="10" tablet-width="33"></f7-col>
        <f7-col desktop-width="10" tablet-width="33">
          <f7-button small round raised
                     color="blue"
                     @click="buy"
                     back>Bought!
          </f7-button>
        </f7-col>
        <f7-col desktop-width="10" tablet-width="33"></f7-col>

      </f7-row>
    </f7-block>

    <shopping-item v-for="supply in getSupplies"
                   :key="supply.item"
                   :supply="supply"
                   v-if="!supply.have"></shopping-item>


    <f7-popup id="shopping-list-instructions">
      <f7-view>
        <f7-page>
          <f7-navbar title="How to">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
            <p class="big">Shopping List</p>
          </f7-navbar>

          <p>You can move between supply features either by swiping or
            by using the toolbar on the bottom of the screen</p>
          <p>Click an item when you add or remove it from your cart.</p>
          <p>Green means it's in your cart. </p>
          <p>Red means it's not in your cart. </p>
          <p>When you have paid for everything, click the "bought" button.</p>
          <p>Clicking the "bought" button automatically changes the green items
            in your inventory list to "we have this".</p>

        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-page>


</template>

<script>

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  import ShoppingItem from '../elements/Item-Shopping-List.vue';

  export default {
    name: 'shopping-list',

    computed: {
      ...mapGetters({
        getSupplies: 'supply/GetSupplies',
      })
    },//end computed

    methods: {
      ...mapActions({
        // confirmChanges: 'supply/confirmChange',
        buy: 'supply/BuyItems',
        saveSupplies: 'supply/saveSupply'

      })
    },
    beforeDestroy() {
      let thing = 'saveSupply';
      this.saveSupplies('ShoppingList.vue beforeDestroy');
    },


    components: {
      ShoppingItem
    }

  }
</script>
