import "primeicons/primeicons.css";
import "../css/app.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";

import AppState from "./plugins/appState.js";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import Noir from "./presets/Noir.js";
import router from './router';

const app = createApp(App);
app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: "p",
            darkModeSelector: ".p-dark",
            cssLayer: false,
        },
    },
});
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component("ThemeSwitcher", ThemeSwitcher);

app.mount("#app");
