<template>

  <f7-page>


    <f7-toolbar tabbar bottom-md labels>
      <f7-link tab-link="#tabSupply1" text="Shared"></f7-link>
      <f7-link tab-link="#tabSupply2" text="Shopping"></f7-link>
      <f7-link tab-link="#tabSupply3" text="Add/Delete"></f7-link>
      <f7-link tab-link="#tabSupply4" text="Blank"></f7-link>
    </f7-toolbar>
<!-- Last tab won't work right - try making them routable!-->
    <!--<f7-tabs swipeable data-loop="true">-->
    <f7-tabs swipeable data-loop="false">
      <f7-tab id="tabSupply1" tab-active>
        <inventory-list></inventory-list>
      </f7-tab>
      <f7-tab id="tabSupply2" tab>
        <shopping-list></shopping-list>
      </f7-tab>
      <f7-tab id="tabSupply3">
        <supplies-modify></supplies-modify>
      </f7-tab>
      <f7-tab id="tabSupply4">
        <p><-- Go back the other way remove this now</p>

      </f7-tab>

    </f7-tabs>

  </f7-page>

</template>

<script>
  // SUPPLY IMPORTS
  import ShoppingList from './../features/Shopping-List';
  import SuppliesModify from './../features/Supplies-Modify.vue';
  import InventoryList from './../features/Supplies-Shared.vue';


  export default {
    name: "supply--tabs",
    components: {
      InventoryList,
      ShoppingList,
      SuppliesModify
    }
  }
</script>

