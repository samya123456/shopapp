<template>
  <v-app>
    
       <header>
         
    <h1 align="center"  class="p-3 text-center">Inventory App</h1>
     
    </header>
    <v-main class="grey lighten-3">
      <v-container>
         <v-row>
           <v-col cols="2">
             <v-sheet rounded="lg">
      
    
     
            
<div id = "manu">
         <sidebar-menu
              class="sidebar"
              :menu="menu"
              :collapsed="collapsed"
              @item-click="onItemClick"
              @toggle-collapse="onToggleCollapse"
              
          />    
  </div>    
  </v-sheet>
          </v-col>
        <v-col>
           
              <div id="view" :class="[{'collapsed' : collapsed}]">
           
                 <v-card
                 outlined
                 shaped
                 elevation=4
                 width="800">
                <router-view/>
                 </v-card>
              </div> 
         
        </v-col>
        </v-row>
    </v-container>
    </v-main>
   
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
          icon: 'fa fa-user'
          
        },
        {
          href: '/product',
          title: 'Product Manu',
          icon: 'fas fa-balance-scale',
           child: [
              {
              href: "/addProduct",
              title: "Add Product",
              icon :"fas fa-store"
              
            },
             {
              href: "/addProductQuantity",
              title: "Add Product Quantity",
              icon : 'fas fa-cart-arrow-down'
            },
           
            {
              href: "/viewProductCompany",
              title: "Product Company Details",
              icon :"fas fa-history"
              
            },
           ]
           },
           {
            href: '/sale',
            title: 'Sale',
            icon: 'fas fa-rupee-sign',
            child:[
              {
              href: "/saleProductCompany",
              title: "Sale Product",
              icon : "fab fa-audible"
            },

            ]
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
  padding-left: 100px;
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

