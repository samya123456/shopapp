<template>
  <v-app>
   
<div class="container">
    <h1 align="center">Welcom to My App</h1>
  <p align="justify">
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
            </p >


 
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
      isDisplayAddProdQuantity:false
    }
   },
 
  
  methods : {
    displayAddProdQuantity(){
        this.$router.push('/') 
      }
      
    }
};
</script>

