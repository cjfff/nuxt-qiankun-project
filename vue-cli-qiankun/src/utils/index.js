import Vue from "vue";

export const createInject = app => (key, value) => {
  if (!key) {
    throw new Error("inject(key, value) has no key provided");
  }
  if (value === undefined) {
    throw new Error(`inject('${key}', value) has no value provided`);
  }

  key = "$" + key;
  // Add into app
  app[key] = value;
  // Add into context
  if (!app.context[key]) {
    app.context[key] = value;
  }

  // Check if plugin not already installed
  const installKey = "__vue_" + key + "_installed__";
  if (Vue[installKey]) {
    return;
  }
  Vue[installKey] = true;
  // Call Vue.use() to install the plugin into vm
  Vue.use(() => {
    if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
      Object.defineProperty(Vue.prototype, key, {
        get() {
          return this.$root.$options[key];
        },
      });
    }
  });
};

export const excutePlugins = (
  { app, store, router },
  inject
) => async plugins => {
  for (const key in plugins) {
    const plugin = plugins[key];
    if (typeof plugin === "function") {
      try {
        console.time(`plugin ${key}`);

        await plugin({ app, store, router }, inject);

        console.timeEnd(`plugin ${key}`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const resolveMenus = apps => {
  return apps.map(item => {
    return item;
  });
};
