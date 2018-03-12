<template>
  <!--<f7-page>-->
  <div @click="flipBool">
    <f7-block>
      <f7-card  class='sh-supply-item'
                v-bind:bg-color="toggleColor">
        <f7-card-content>
          <p class="sh-big">{{supply.item}}</p>
          <p class="sh-small" v-if="supply.have"> We have this.</p>
          <p class="sh-small" v-if="!supply.have"> We need this.</p>
        </f7-card-content>



      </f7-card>
    </f7-block>
  </div>

  <!--</f7-page>-->
</template>

<script>
  import {mapActions} from 'vuex';
  // import {gObj_hasRoot} from "../../config";

  export default {
    props: ['supply'],
    computed: {
      toggleColor(){

        if(this.supply.have){
          return "green";
        } else {
          return "red";
        }
      }
    },
    methods: {
      ...mapActions({
        changeItemBoolStatus: 'supply/flipBool',
        saveSupplies: 'supply/saveSupply'
      }),

      flipBool(){
        this.supply.have = !this.supply.have;
        let thing = 'saveSupply';
        this.saveSupplies('ShoppingItem.vue flipBool  ');

      }
    }


  };
</script>

<style scoped>

  /*.card-content {*/
  /*margin: 5px;*/
  /*padding: 5px;*/
  /*}*/
  p {
    margin: .5em;

  }

  /*.big {*/
    /*font-size: 2em;*/
    /*font-weight: bold;*/
    /*color: black;*/
    /*line-height: 0.8;*/
  /*}*/

  /*.small {*/

    /*font-weight: bold;*/
    /*font-variant: all-petite-caps;*/
    /*color: black;*/
    /*line-height: 0.6;*/
  /*}*/


</style>
