import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import AddProductQuantity from "./components/AddProductQuantity"
import AddProduct from "./components/AddProduct"
import Dropdown from 'vue-simple-search-dropdown';
import ViewProductsQuickSearch from './components/ViewProductsQuickSearch'
import ViewProductCompany from './components/ViewProductCompany'
//import ViewProductCompanyUpdated from './components/ViewProductCompanyUpdated'
import VueTableDynamic from 'vue-table-dynamic'
import VueDataTable from 'vue-data-table'
import DataTable from 'v-data-table'
import Vuetable from "vuetable-2";
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import Header from 'v-header'
import colors from 'vuetify/lib/util/colors'
import './assets/asset.css';
Vue.config.productionTip = false
Vue.use(VueAxios, axios,VueRouter,Dropdown,VueTableDynamic,VueDataTable,Vuetable,DataTable,Vuetify,Header)
Vue.component("Dropdown", Dropdown)
Vue.component('VueTableDynamic', VueTableDynamic);
Vue.component('VueDataTable', VueDataTable);
Vue.component('Vuetable', Vuetable);
Vue.component('DataTable', DataTable);
Vue.component('Header', Header);


const routes =[
  {path:'/addProductQuantity' ,component:AddProductQuantity},
  {path:'/addProduct' ,component:AddProduct},
  //{path:'/viewProductCompany' ,component:ViewProductCompany},
  {path:'/viewProductCompany' ,component:ViewProductCompany },
  {path:'/viewProductQuickSearch' ,component:ViewProductsQuickSearch}
  
 
];

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})

const router = new VueRouter({
  routes,
  mode: 'history'
});
new Vue({
  el: "#app",
  router,
  vuetify,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
