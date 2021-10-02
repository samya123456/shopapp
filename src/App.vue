<template>
  <v-app>
   
<div class="container">
    
    <h1 align="center">Welcom to My App</h1>
     <div id="view" :class="[{'collapsed' : collapsed}]">
      <router-view/>
    </div>
<div id = "manu">
         <sidebar-menu
              class="sidebar"
              :menu="menu"
              :collapsed="collapsed"
              @item-click="onItemClick"
              @toggle-collapse="onToggleCollapse"
              
          />    
  </div>    



</div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default {
 name: 'App',
  components: {
 
  },
   data(){
    return{
      isDisplayAddProdQuantity:false, 
       menu: [
        {
          header: true,
          title: "Getting Started",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Home",
          
        },
        {
          href: "/addProductQuantity",
          title: "Add Product Quantity",
         
        },
        {
          href: "/addProduct",
          title: "Add Product",
          
        },
        {
          href: "/viewProductCompany",
          title: "Product Company Details",
          
        },
        
        ],
       
    collapsed: {
      type: Boolean,
      default: false
    },
    hideToggle: {
      type: Boolean,
      default: false
    },
    }
   },
 
  
  methods : {
    displayAddProdQuantity(){
        this.$router.push('/') 
      },
       onItemClick() {
    
       this.collapsed =false
       this.hideToggle =true
      document.getElementById("manu").style.width = "0px";
    },
    
    onToggleCollapse(){
      document.getElementById("manu").style.width = "100px";
       document.getElementById("main").style.marginLeft = "100px";
    }
      
    }
};
</script>
<style>
#view {
  padding-left: 350px;
}
#view.collapsed {
  padding-left: 50px;
}

.sidebar.v-sidebar-menu {
  height: 300px;
}


.sidebar.v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover {
  background-color: transparent;
}


.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}
</style>

