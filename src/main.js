import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import AddProductQuantity from "./components/AddProductQuantity"
import AddProduct from "./components/AddProduct"
import Dropdown from 'vue-simple-search-dropdown';
import ViewProductsQuickSearch from './components/ViewProductsQuickSearch'
//import ViewProductCompany from './components/ViewProductCompany'
import ViewProductCompanyUpdated from './components/ViewProductCompanyUpdated'
import DataTable from 'v-data-table'


Vue.config.productionTip = false
Vue.use(VueAxios, axios,VueRouter,Dropdown,DataTable)
Vue.component("Dropdown", Dropdown)
Vue.component("DataTable", DataTable)

const routes =[
  {path:'/addProductQuantity' ,component:AddProductQuantity},
  {path:'/addProduct' ,component:AddProduct},
  //{path:'/viewProductCompany' ,component:ViewProductCompany},
  {path:'/viewProductCompany' ,component:ViewProductCompanyUpdated},
  {path:'/viewProductQuickSearch' ,component:ViewProductsQuickSearch}
  
 
];

const router = new VueRouter({
  routes,
  mode: 'history'
});
new Vue({
  el: "#app",
  router,
  render: h => h(App),
  
}).$mount('#app')
