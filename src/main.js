import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

import App from './App.vue'
import AddProductQuantity from "./components/AddProductQuantity"
import PlaceOrderComponent from "./components/sales/PlaceOrderComponent"
import AddProduct from "./components/AddProduct"
import Dropdown from 'vue-simple-search-dropdown';
import ViewProductCompany from './components/ViewProductCompany'
import VueTableDynamic from 'vue-table-dynamic'
import VueDataTable from 'vue-data-table'
import DataTable from 'v-data-table'
import Vuetable from "vuetable-2";
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import Header from 'v-header'
import colors from 'vuetify/lib/util/colors'
import './assets/asset.css';
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import '@fortawesome/fontawesome-free/css/all.css'
import VueSidebarMenu from "vue-sidebar-menu";
import { SidebarMenu } from 'vue-sidebar-menu'
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import VueNumericInput from 'vue-numeric-input';
Vue.config.productionTip = false
Vue.use(VueAxios, axios,VueRouter,Dropdown,VueTableDynamic,VueDataTable,Vuetable,DataTable,Vuetify,Header,VueSidebarMenu,SidebarMenu,VueNumericInput)
Vue.component("Dropdown", Dropdown)
Vue.component('VueTableDynamic', VueTableDynamic);
Vue.component('VueDataTable', VueDataTable);
Vue.component('Vuetable', Vuetable);
Vue.component('DataTable', DataTable);
Vue.component('Header', Header);
Vue.component('VueSidebarMenu', VueSidebarMenu);
Vue.component('SidebarMenu', SidebarMenu);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('VueNumericInput', VueNumericInput);

const routes =[
  {path:'/addProductQuantity' ,component:AddProductQuantity},
  {path:'/addProduct' ,component:AddProduct},
  //{path:'/viewProductCompany' ,component:ViewProductCompany},
  {path:'/viewProductCompany' ,component:ViewProductCompany },
  {path:'/createOrder' ,component:PlaceOrderComponent }
  
];




setInteractionMode('eager')
  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })
  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })
  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })
  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })
  extend('email', {
    ...email,
    message: 'Email must be valid',
  })
  extend('isGreater', {
    params: ['otherValue'],
    validate(value, { otherValue }) {
      return value > otherValue;
    },
    message: '{_field_} should be greater than {otherValue}'
  });

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

const router = new VueRouter(
  {
  routes,
  mode:  'abstract'
}


);
new Vue({
  el: "#app",
  router,
  vuetify,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
