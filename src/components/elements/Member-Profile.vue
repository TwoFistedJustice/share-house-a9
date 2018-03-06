<template>
  <!-- This should be fairly simple-->
  <!-- Name, picture, Admin?-->
  <!-- House job -->
  <!-- -->
  <div>
    <f7-card>
      <f7-card-header>
        <!--name and contact info & house job-->
        <p class="big">Name</p>
      </f7-card-header>
      <f7-card-content>
        <!-- picture, interests, contact info, emergency contact-->
      </f7-card-content>
      <f7-card-footer>

      </f7-card-footer>
    </f7-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";

  export default {
    name: "member--profile"

    props: [],
    data: function () {
      return {

       superPowers: false,


      };

    },

    computed: {

      ...mapGetters({
        // getActiveHouse: 'house/getActiveHouse',
        // getBelongsToHouse: 'user/getBelongsToHouse',
        // getHouseId: 'house/getHouseId',
        isAdmin: 'user/getIsAdmin',
        // getNode: 'house/getHousesNode'

      }),

    },
    methods: {
      ...mapActions({

      }),




    }


  }
</script>

<style scoped>

</style>
