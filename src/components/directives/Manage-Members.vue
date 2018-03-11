<template>

  <f7-page>

    <f7-navbar title="Manage Members"
               back-link="Close">
      <f7-nav-right>
        <f7-button small round raised
                   class = 'sh-how-to'

                   popup-open="#manage-members-instructions">How To</f7-button>
      </f7-nav-right>
    </f7-navbar>
    <!--<f7-toolbar tabbar scrollable bottom-md labels>-->
    <!--<f7-toolbar tabbar scrollable>-->
    <f7-toolbar tabbar scrollable>

      <f7-link v-for="(member, index) in getActiveHouse.members"
               :key="member.id + index"
               :member="member"
               :tab-link="'#tab' + index"
               :tab-link-active="index === 0">{{member.nameFirst}} {{member.nameLast}}</f7-link>


    </f7-toolbar>

    <f7-tabs swipeable
             data-loop="true">

      <f7-tab v-for="(member, index) in getActiveHouse.members"
              :key="member.id + index"
              :id="'tab' + index">
        <member-console-sh :member="member" ></member-console-sh>
      </f7-tab>

      </f7-tab>
    </f7-tabs>


    <f7-popup id="manage-members-instructions">
      <f7-view>
        <f7-page>
          <f7-navbar title="How to">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <p class="sh-big">Manage Members</p>
          <p>You can move between members either by swiping or
            by using the toolbar on the bottom of the screen</p>

        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-page>

</template>

<script>
  //VUEX IMPORTS
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";
  // COMPONENT IMPORTS
  import MemberConsoleSh from '../elements/Member-Console.vue';

  export default {
    name: "manage--members",

    data: function () {
      return {
        houseId: '',
        superPowers: false,
      };

    },
    components: {
      MemberConsoleSh: MemberConsoleSh
    },
    computed: {

      ...mapGetters({
        getActiveHouse: 'house/getActiveHouse',
        getMembers: 'house/getMembers',
        getBelongsToHouse: 'user/getBelongsToHouse',
        getHouseId: 'house/getHouseId',
        isAdmin: 'user/getIsAdmin',


      }),
      memberLength: function(){
        return this.getActiveHouse.members.length;
      }

    },
    methods: {
      ...mapActions({

      }),




    }


  }
</script>

<style scoped>

</style>

}
</script>

