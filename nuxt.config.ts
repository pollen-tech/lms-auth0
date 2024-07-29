// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
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
  nitro: {
    runtimeConfig: {
      app: {
        baseURL: "/",
        buildAssetsDir: "_nuxt",
      },
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
  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composables/**",
    ],
  },
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
      lmsBackendUrl:
        "https://47ekwsnw5d.execute-api.ap-southeast-1.amazonaws.com/dev/", // https://47ekwsnw5d.execute-api.ap-southeast-1.amazonaws.com/dev/
      pollenPassUrl:
        "http://sandbox.web.pollen-pass.s3-website-ap-southeast-1.amazonaws.com",
      pollenDirectUrl:
        "http://sandbox.web.direct.s3-website-ap-southeast-1.amazonaws.com",
      appName: "Pollen LMS",
      appVersion: "2.0.0",
    },
  },
});
