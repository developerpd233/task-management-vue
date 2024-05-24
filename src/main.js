// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

// import { createApp } from "vue";
// import './style.css'
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from './plugins/font-awesome'

// createApp(App)
//   .use(router)
//   .use(store)
//   .component("font-awesome-icon", FontAwesomeIcon)
//   .mount("#app");


import { createApp } from 'vue';
import './style.css';
import '../node_modules/flowbite-vue/dist/index.css';
import App from './App.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import DashboardPage from './components/pages/DashboardPage.vue';
import { FontAwesomeIcon } from './plugins/font-awesome';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

  
axios.defaults.baseURL = import.meta.env.VITE_LARAVEL11_API_URL;
axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config;
});
  
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage },
  ],
});
  
createApp(App).use(
    router
).use(
    Toast
).component("font-awesome-icon", FontAwesomeIcon).mount('#app');