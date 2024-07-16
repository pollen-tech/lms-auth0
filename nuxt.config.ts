// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Pollen LMS",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["@/assets/scss/style.scss"],
  runtimeConfig: {
    public: {
      auth0_domain: "",
      auth0_client_id: "",
      auth0_audience: "",
      auth0_redirect_uri: "",
      lmsBackendUrl: "http://localhost:3080/",
      adminApiUrl: "https://admin-api-dev.pollen.tech",
      internalKey: "c3RhZ2luZy1wb2xsZW4udGVjaA==",
      appName: "Pollen LMS",
      appVersion: "2.0.0",
    },
  },
});
