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
          <f7-list-item radio name="button-chooser"
                        checked
                        value=""
                        @change="buttonSwitch = $event.target.value"
                        :title="'Neither'"></f7-list-item>
          <f7-list-item radio name="button-chooser"
                        value="bootem"
                        :checked="buttonSwitch === 'bootem'"
                        @change="buttonSwitch = $event.target.value"
                        :title="'Leave house'"
          ></f7-list-item>

          <f7-list-item radio name="button-chooser"
                        value="powers"
                        :checked="buttonSwitch === 'powers'"
                        @change="buttonSwitch = $event.target.value"
                        :title="'Change admin status'"
                        v-if=" isSelfAdmin"></f7-list-item>

          <!--<f7-list-item radio name="button-chooser"-->
          <!--v-if="isSelf"-->
          <!--value="adminPowerTake"-->
          <!--:checked="buttonSwitch === 'adminPowerTake'"-->
          <!--@change="buttonSwitch = $event.target.value"-->
          <!--:title="'Give up admin power'"></f7-list-item>-->


          <!--<f7-list-item title="Kickem out!"-->
          <!--:checked="allowDelete"-->
          <!--@change="allowDelete = $event.target.checked"-->
          <!--checkbox></f7-list-item>-->
          <f7-button small round fill
                     color="red"
                     v-if="buttonSwitch === 'bootem'"
                     @click="bootToRear">Leave House
          </f7-button>

          <f7-button small round fill
                     color="green"
                     v-if="buttonSwitch === 'powers' && !isAdmin"
                     @click="adminPowerGive">Make admin
          </f7-button>

          <f7-button small round fill
                     color="red"
                     v-if="buttonSwitch === 'powers' && isAdmin && isSelf"
                     @click="adminPowerTake"
          >Give up Admin power
          </f7-button>
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
        buttonSwitch: '',
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
        //this might belong in the manage house component
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

      isSelf() {
        let memberId = this.member.id;
        let userId = this.getUserId;

        let condition = (memberId === userId && !this.isOnlyAdmin) ? true : false;
        return condition;

      },

      isSelfAdmin(){
          /*
          * if user is an admin, can see own admin control
          * can see non-admins admin control
          * can not see admin control on other admins
          * */
        if (this.isSelf && this.isAdmin ) {
          return true;

        } else if (!this.memberData.memberIsAdmin){
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

      adminPowerGive() {
        let thing = 'adminPowerGive';
        this.$store.dispatch('membership/adminPowerGive', this.member, gObj_hasRoot);
      },

      adminPowerTake() {
        let thing = 'adminPowerTake';
        this.$store.dispatch('membership/adminPowerTake', this.member, gObj_hasRoot);
      },


    }


  }
</script>

<style scoped></style>
