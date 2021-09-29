<template>
<div id ="app">
  
  <h1>Welcom to My App</h1>
  

   <p >
    <router-link  to="/addProductQuantity">Add Existing Product Quantity</router-link>
   </p>

   <p >
    <router-link  to="/addProduct">Add Product</router-link>
   </p>

   <p >
    <router-link  to="/">Home</router-link>
   </p>
    
  <div>
  <router-view></router-view>  
  </div > 
  </div> 
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

  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
