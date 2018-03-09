<template>
  <f7-page>
    <f7-navbar title="Admin Menu" sliding></f7-navbar>
    <!--<f7-block>-->
    <!--<p>This will only be visible to Admins</p>-->
    <!--</f7-block>-->

    <!--<f7-block-title>Load page in panel</f7-block-title>-->
    <!--<f7-list>-->
    <!--<f7-list-item link="/about/" title="About"></f7-list-item>-->
    <!--<f7-list-item link="/form/" title="Form"></f7-list-item>-->
    <!--</f7-list>-->

    <!--<f7-block-title>Load page in main view</f7-block-title>-->
    <f7-list>
      <f7-list-item link="/join-house/" title="Join House" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/house-management/" title="Manage house details" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/member-management/" title="Manage membership" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
    </f7-list>


  </f7-page>
</template>
<script>
  export default {}
</script>
