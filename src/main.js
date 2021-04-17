import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from './routes/vue-router'
import axios from 'axios'
import { store } from './store/vuex'
/*import naver from 'vue-naver-maps'*/

Vue.config.productionTip = false

//axios.defaults.baseURL = 'http://127.0.0.1:8070'; // java
//axios.defaults.baseURL = 'http://127.0.0.1:8090'; // local-python
axios.defaults.baseURL = 'http://34.64.147.165:8090'; // server-python
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

if( process.env == 'local' ) axios.defaults.baseURL = 'http://127.0.0.1:8090'

/* vuex 설치 */
/* vue-the-mask 설치 */
/*
Vue.use(naver, {
  clientID: 'k0ch2lsnrj',
  useGovAPI: false, //공공 클라우드 API 사용 (선택)
  subModules:'' // 서브모듈 (선택)
});*/

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

