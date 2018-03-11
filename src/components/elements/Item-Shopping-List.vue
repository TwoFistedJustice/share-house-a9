<template>
  <div @click="flipBool">
    <f7-block >
      <f7-card  class='sh-supply-item'
                v-bind:bg-color="toggleColor">
        <f7-card-content >
          <p v-if="!supply.inCart">{{supply.item}}</p>
          <p v-if="supply.inCart">{{supply.item}} added to cart</p>
        </f7-card-content>
      </f7-card>
    </f7-block>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  // import {gObj_hasRoot} from "../../config";

  export default {
    props: ['supply'],
    computed: {
      toggleColor(){

        if(this.supply.inCart){
          return "yellow";
        } else {
          return "pink";
        }
      }
    },
    methods: {
      ...mapActions({
        changeItemBoolStatus: 'supply/flipBool',
        saveSupplies: 'supply/saveSupply'
      }),

      flipBool() {
        this.supply.inCart = !this.supply.inCart;
        let thing = 'saveSupply';
        this.saveSupplies('ShoppingItem.vue flipBool  ');
        // this.$store.dispatch('supply/saveSupply', null, gObj_hasRoot);
      }

    }


  };
</script>

<style scoped>

  /*.supply-item {*/
    /*text-align: center;*/
    /*border-radius: 40%;*/
  /*}*/


  p {
    font-size: 2em;
    font-weight: bold;
    color: black;
  }

</style>
