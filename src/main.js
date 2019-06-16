import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import './registerServiceWorker'
import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
import Swal from 'sweetalert2';
require('firebase/firestore')
import Vue2Filters from 'vue2-filters'
import store from './store.js';

Vue.use(Vue2Filters)

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)
// jquery usage
window.$ = window.jQuery = jQuery;
// Sweet alert usage
window.Swal = Swal;

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);

Vue.config.productionTip = false

let app = '';

fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");

  }
});
