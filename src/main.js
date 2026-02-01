import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "/router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import {
  Compass,
  Star,
  Medal,
  ArrowLeft,
  ArrowRight,
  Grid,
} from "@element-plus/icons-vue";

var app = createApp(App);
app.use(ElementPlus); //use for plugin
app.use(router);
app.component("Compass", Compass);
app.component("Star", Star);
app.component("Medal", Medal);
app.component("ArrowLeft", ArrowLeft);
app.component("ArrowRight", ArrowRight);
app.component("Grid", Grid);

app.mount("#app");
