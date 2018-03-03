<template>
  <f7-page>
    <f7-navbar title="Supplies Modify" back-link="back"></f7-navbar>
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
                 :key="supply.item"
                 :supply="supply"
                 :index="index"></item-modify>


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
