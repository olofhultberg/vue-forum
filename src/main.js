// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import firebase from 'firebase'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import AppDate from '@/components/AppDate'

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA34yoyvTnkSOl9aOUvXdEN5O2ij4t7IDM',
  authDomain: 'vue-shool-forum.firebaseapp.com',
  databaseURL: 'https://vue-shool-forum.firebaseio.com',
  projectId: 'vue-shool-forum',
  storageBucket: 'vue-shool-forum.appspot.com',
  messagingSenderId: '415999539264',
  appId: '1:415999539264:web:6f1cf3ca68e0f37b'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
