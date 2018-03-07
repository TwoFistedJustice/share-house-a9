<template>
  <!-- This should be fairly simple-->
  <!-- Name, picture, Admin?-->
  <!-- House job -->
  <!-- -->
  <div>
    <f7-card>
      <f7-card-header>
        <!--name and contact info & house job-->
        <p class="big">{{member.nameFirst}} {{member.nameLast}}</p>

        <p class="small"> {{member.role}}</p>

      </f7-card-header>
      <f7-card-content>
        <p>make it a radio list that controls which button to show</p>
        <!-- picture, interests, contact info, emergency contact-->
        <f7-list form>

          <f7-list-item title="Kickem out!"
                    :checked="allowDelete"
                    @change="allowDelete = $event.target.checked"
                    checkbox></f7-list-item>
          <f7-button v-if="allowDelete">bootem!</f7-button>
        </f7-list>

      </f7-card-content>
      <!--<f7-card-footer>-->

      <!--</f7-card-footer>-->
    </f7-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {gObj_hasRoot} from "../../config";

  export default {
    name: "member--profile",

    props: ['member'],

    data: function () {
      return {
        setClass: true,
        allowDelete: false,
        canSeeAdminControls: false,
        memberData: {
          memberId: this.member.id,
          memberIsAdmin: this.member.isAdmin
        },

      };

    },
    computed: {
      ...mapGetters({
        isAdmin: 'user/getIsAdmin',
        GetAdminCount: 'membership/GetAdminCount',
        getUserId: 'auth/getUserId'
      }),

      canLeave() {
        /*
        * If the user is and admin, but not the only admin
        * or the user is the member and not an admin
        * they can see the leave house button
        * The last admin standing must delete the house to leave
        * */
        let isAdmin = this.isAdmin;
        let memberId = this.member.id;
        let userId = this.getUserId;


        if (memberId === userId && !isAdmin) {
          return true;
          // } else if (memberId === userId && isAdmin && !this.isOnlyAdmin) {
          //   return true;
        } else {
          return false;
        }
      },

      isOnlyAdmin() {
        /* checks to see if the user is the only admin */
        if (this.isAdmin && this.GetAdminCount > 1) {
          return false;
        } else {
          return true;
        }
      },

      isSelf(){
        let memberId = this.member.id;
        let userId = this.getUserId;

        let condition = (memberId === userId && !this.isOnlyAdmin )? true : false;
        return condition;

      },

      showAdminControls(){
        /* user shouldn't see admin controls on their own component
        *  non-admins should never see admin controls ever
        *
        *  maybe have another set of control for self-admin - like give up admin power
        * */
        let isAdmin = this.isAdmin;
        let memberId = this.member.id;
        let userId = this.getUserId;

        // if(memberId === userId){
        //   return false
        // } else
        if (isAdmin && !this.memberData.isAdmin) {
          return true;
        } else {
          return false;
        }
      }


    },
    methods: {
      bootToRear() {
        let thing = 'removeMember';
        this.$store.dispatch('membership/removeMember', this.member, gObj_hasRoot);
      },

      adminPowerGive(){
        let thing = 'adminPowerGive';
        this.$store.dispatch('membership/adminPowerGive', this.member, gObj_hasRoot);
      },

      adminPowerTake(){
        let thing = 'adminPowerTake';
        this.$store.dispatch('membership/adminPowerTake', this.member, gObj_hasRoot);
      },

      testFn() {
        console.log('testFn in Member.vue');

      }

    }


  }
</script>

<style scoped></style>
