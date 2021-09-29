import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import AddProductQuantity from "./components/AddProductQuantity"
import AddProduct from "./components/AddProduct"

Vue.config.productionTip = false
Vue.use(VueAxios, axios,VueRouter)

const routes =[
  {path:'/addProductQuantity' ,component:AddProductQuantity},
  {path:'/addProduct' ,component:AddProduct}
  
 
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
