<template>
  <v-app>
   
<div class="container">

   <nav class="main-nav">
     
    </nav>
    <h1 align="center">Welcom to My App</h1>
 <!-- <p align="justify">
    <router-link  to="/">Home</router-link>
  </p>

   
      
            <p >
              <router-link  to="/addProductQuantity">Add Product Quantity</router-link>
            </p>
            

            <p >
              <router-link   to="/addProduct">Add Product</router-link>
            </p>

            <p   >
              <router-link   to="/viewProductCompany">Product Company Details</router-link>
            </p > -->

         <sidebar-menu
      class="sidebar"
      :menu="menu"
      :collapsed="collapsed"
    />    
      


 
  <div>
  <router-view></router-view>  
  </div > 
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
      collapsed: true,  
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
    }
   },
 
  
  methods : {
    displayAddProdQuantity(){
        this.$router.push('/') 
      },
       onItemClick() {
      console.log("onItemClick");
       this.collapsed =false
    },
    onCollapse(c) {
      console.log(c);
      this.collapsed = c;
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

.sidebar.v-sidebar-menu .vsm--mobile-item {
  z-index: 0 !important;
}
.sidebar.v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover {
  background-color: transparent;
}

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}
</style>

