<template>
  <f7-page>
    <f7-navbar title="Supplies Modify" back-link="Close">
      <f7-nav-right>
        <f7-button small round raised
                   class="sh-how-to"
                   color="orange"
                   popup-open="#supplies-modify-instructions">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Modify Supplies</f7-block-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Add Supply</f7-label>
        <f7-input
          type="text"
          placeholder="Add this"

          :value="supplyToAdd"
          v-on:input="supplyToAdd = $event.target.value"
          v-on:keyup.enter="addToSuppliesList"></f7-input>
      </f7-list-item>

      <f7-row>
        <f7-col desktop-width="10" tablet-width="33"></f7-col>
        <f7-col desktop-width="10" tablet-width="33">
          <f7-button small round raised fill
                     @click="addToSuppliesList">Add Supply
          </f7-button>
        </f7-col>
        <f7-col desktop-width="10" tablet-width="33"></f7-col>
      </f7-row>
    </f7-list>


    <item-modify v-for="(supply, index) in getSupplies"
                 :key="supply.item + index"
                 :supply="supply"
                 :index="index"></item-modify>


    <f7-popup id="supplies-modify-instructions">
      <f7-view>
        <f7-page>
          <f7-navbar title="How to">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <p class="sh-big">Modify Supply List</p>
          <p>You can move between supply features either by swiping or
            by using the toolbar on the bottom of the screen</p>
          <p>To add a new supply, enter it into the box and press the Add Supply button</p>
          <p>To remove a supply, check the "Allow Deletion" box, and the press the Delete button</p>


        </f7-page>
      </f7-view>
    </f7-popup>



  </f7-page>
</template>

<script>

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  import itemModify from '../elements/Item-Modify.vue';

  export default {
    name: "supplies--modify",
    data: function () {
      return {
        supplyToAdd: ''
      };
    },
    computed: {
      ...mapGetters({
        getSupplies: 'supply/GetSupplies',
      })
    },//end computed

    methods: {
      ...mapActions({
        addSupply: 'supply/AddSupply',
        // saveSupplies: 'supply/saveSupply',

      }),

      addToSuppliesList() {

        let supply = {item: this.supplyToAdd, have: false, inCart: false};
        console.log(supply);

        this.addSupply(supply);
        this.supplyToAdd = '';
      },
      fetchData() {
        console.log('fetch');
      }


    }, // END METHODS
    components: {
      itemModify
    }

  }
</script>

<style scoped>

</style>
