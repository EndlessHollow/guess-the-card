import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
//TODO: Fix when they finally provide TS support
// @ts-ignore
import Aura from "@/presets/aura";

const app = createApp(App);

app.use(PrimeVue, {
  unstyled: true,
  pt: Aura,
});

app.mount("#app");
