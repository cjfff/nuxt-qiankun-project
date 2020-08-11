import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createInject, excutePlugins } from "@/utils";
import * as plugins from "@/plugins";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

async function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  store.$router = router;

  const inject = createInject(app);

  await excutePlugins({ store, router, app }, inject)(plugins);

  app.$mount("#app");
}

createApp();
