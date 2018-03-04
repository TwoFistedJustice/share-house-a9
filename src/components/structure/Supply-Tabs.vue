<template>

  <f7-page>

    <!--<f7-toolbar tabbar bottom-md labels>-->
    <f7-toolbar tabbar bottom-md labels>
      <f7-link tab-link="#tab1" text="Shared"></f7-link>
      <f7-link tab-link="#tab2" text="Shopping"></f7-link>
      <f7-link tab-link="#tab3" text="Add/Delete"></f7-link>
    </f7-toolbar>

    <f7-tabs swipeable>
      <f7-tab id="tab1">
        <inventory-list></inventory-list>
      </f7-tab>
      <f7-tab id="tab2" tab>
        <shopping-list></shopping-list>
      </f7-tab>
      <f7-tab id="tab3">
        <supplies-modify></supplies-modify>
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

