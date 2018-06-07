import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { createProvider } from "./vue-apollo";
import moment from "moment";
import VueMoment from "vue-moment";
import VueImg from "v-img";
import Antd from "vue-antd-ui";
import "vue-antd-ui/dist/antd.css";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import i18n from './i18n'

Vue.use(VueImg);
Vue.use(Antd);
Vue.use(VueMoment, {
  moment
});
Vue.use(VuePlyr);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  i18n,
  render: h => h(App)
}).$mount("#app");
