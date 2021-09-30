<template>
<div id ="app"  v-bind:style="{ backgroundColor: '#E5ECFA'}">

  <h1>Welcom to My App</h1>
  <p align="justify">
    <router-link  to="/viewProductQuickSearch">Quick Search</router-link>
  </p>
  <p align="justify">
    <router-link  to="/">Home</router-link>
  </p>
 <table class="table table-striped table-bordered center">
   <thead>
      <tr>
            <th align="justify">
              <router-link  to="/addProductQuantity">Add Product Quantity</router-link>
            </th>
            

            <th align="justify">
              <router-link   to="/addProduct">Add Product</router-link>
            </th>

            <th align="justify">
              <router-link   to="/viewProductCompany">Product Company Details</router-link>
            </th>

      </tr>
   </thead>
 </table>
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
