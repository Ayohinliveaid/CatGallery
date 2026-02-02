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
  Message,
  Lock,
  Key,
  Collection,
  User,
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
app.component("Message", Message);
app.component("Lock", Lock);
app.component("Key", Key);
app.component("Collection", Collection);
app.component("User", User);

app.mount("#app");
