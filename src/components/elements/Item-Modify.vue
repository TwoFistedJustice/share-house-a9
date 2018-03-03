<template>
  <div @click="supply.have = !supply.have">
    <f7-block>
      <f7-card>
        <f7-card-content>
          <p>{{supply.item}}</p>
        </f7-card-content>
        <f7-list form>
          <f7-list-item title="allow deletion"
                        :checked="allowDelete"
                        @change="allowDelete = $event.target.checked"
                        checkbox></f7-list-item>
          <f7-button v-if="allowDelete" big round fill
                     color="red"
                     @click="deleteItem(index)"><strong>Delete!</strong></f7-button>
          <!--<f7-button v-if="!allowDelete" small round color="gray">Prepare to Delete!</f7-button>-->


        </f7-list>

      </f7-card>
    </f7-block>
  </div>

</template>

<script>

  /***
   *  a supply item looks like:
   *  {item: 'Paper Towels', have: true, inCart: false}
   * ***/
  import {mapActions} from 'vuex';

  export default {
    props: [
      'supply',
      'index'],
    data() {
      return {
        allowDelete: false
      }
    },
    methods: {
      ...mapActions({
        deleteItem: 'supply/deleteItem'
      })
    }

  }
</script>


<style scoped>


  p {
    font-size: 2em;
    font-weight: bold;
    color: black;
  }

  p.button {
    color: black;
  }
</style>
