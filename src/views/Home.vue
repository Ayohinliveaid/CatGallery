<template>
  <el-container>
    <el-header>
      Cat Gallery
      <router-link to="/" class="routerLink introButton">introduction</router-link>
    </el-header>
    <el-main>
      <el-tabs stretch v-model="activeName">
        <el-tab-pane label="Cats" name="cats" class="catsPane">
          <el-tabs tab-position="left" style="margin-top: 10px; height: 100%">
            <el-tab-pane id="mainPane" label="Main Cats">
              <el-button type="primary" class="buttonStyle" v-on:click="requestMainCats">
                other cats</el-button
              >

              <el-space direction="vertical" alignment="normal" class="spaceStyle">
                <div v-for="(cat, index) in mainCats" v-bind:key="index" class="cardDiv">
                  <el-card class="cardStyle">
                    <img
                      v-if="cat"
                      v-bind:src="cat.url"
                      alt="Cat Image"
                      style="height: 700px"
                    />
                  </el-card>

                  <el-card style="flex: 1" class="cardStyle0">
                    <el-button
                      type="primary"
                      class="buttonStyle"
                      v-on:click="addToFavourites(cat)"
                      >favourite</el-button
                    >
                    <br />
                    CatID: {{ cat.id }}
                  </el-card>
                </div>
              </el-space>
            </el-tab-pane>
            <el-tab-pane label="Animated Cats">
              <el-button
                type="primary"
                class="buttonStyle"
                v-on:click="requestAnimatedCats"
                >more cats</el-button
              >

              <el-space direction="vertical" alignment="normal">
                <div
                  v-for="(cat, index) in animatedCats"
                  v-bind:key="index"
                  class="cardDiv"
                >
                  <el-card class="cardStyle">
                    <img
                      v-if="cat"
                      v-bind:src="cat.url"
                      alt="Cat Image"
                      style="height: 700px"
                    />
                  </el-card>
                  <el-card style="flex: 1" class="cardStyle0">
                    <el-button
                      type="primary"
                      class="buttonStyle"
                      v-on:click="addToFavourites(cat)"
                      >favourite</el-button
                    >
                    CatID: {{ cat.id }}
                  </el-card>
                </div>
              </el-space>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="Favourites" name="favourites">
          <span v-if="!isLoggedIn"> Login to save and access your favourites!</span>

          <div class="window" v-if="!isLoggedIn">
            <el-tabs stretch>
              <el-tab-pane label="Login">
                <el-form
                  label-width="100px"
                  style="width: 90%x; margin-top: 25px; margin-right: 68px"
                  v-bind:model="loginForm"
                  v-bind:rules="loginRules"
                  ref="loginForm"
                >
                  <el-form-item label="E-mail" prop="email">
                    <el-input v-model="loginForm.email" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input
                      v-model="loginForm.password"
                      type="password"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" class="buttonStyle" v-on:click="login"
                      >Login</el-button
                    >
                  </el-form-item>
                </el-form>
                <p style="margin-top: 70px">(Test login function with any input)</p>
              </el-tab-pane>
              <el-tab-pane label="Sign Up">
                <el-form
                  label-width="100px"
                  style="width: 90%; margin-top: 25px; margin-right: 900px"
                >
                  <el-form-item label="E-mail">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="Password">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="Password">
                    <el-input></el-input>
                  </el-form-item>
                  <el-form-item label="Veri-code">
                    <el-input></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" class="buttonStyle">Sign Up</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>

          <h1 v-if="isLoggedIn == true && favouriteCats.length == 0">
            Add your favourites from "Cats" panel!
          </h1>

          <el-space direction="vertical" alignment="normal" v-if="isLoggedIn">
            <div v-for="(cat, index) in favouriteCats" v-bind:key="index" class="cardDiv">
              <el-card class="cardStyle">
                <img
                  v-if="cat"
                  v-bind:src="cat.url"
                  alt="Cat Image"
                  style="height: 700px"
                />
              </el-card>
              <el-card style="flex: 1" class="cardStyle0">
                <el-button
                  type="primary"
                  class="buttonStyle"
                  v-on:click="removeFromFavourites(cat)"
                  >Unfavorite</el-button
                >
                {{ cat.id }}
              </el-card>
            </div>
          </el-space>
        </el-tab-pane>

        <el-tab-pane label="Me" name="me" v-if="isLoggedIn">
          <h1>Wellcome {{ loginForm.email }}!</h1>
          <el-button
            type="primary"
            v-if="isLoggedIn"
            v-on:click="logout"
            class="buttonStyle"
            >logout</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      activeName: "cats",
      mainCats: [],
      animatedCats: [],
      favouriteCats: [],
      isLoggedIn: false,
      loginForm: {
        email: "",
        password: "",
      },
      loginRules: {
        email: [{ validator: this.validateEmail, trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    requestMainCats: function () {
      axios
        .get("https://api.thecatapi.com/v1/images/search?limit=3&mime_types=png", {
          headers: {
            "x-api-key":
              "live_QTQoXsscFALX63br8NHnps2gMpgK0qiTiTNot1j6oVNcDDe2fdOzkZYfzcqDA8dK",
          },
        })
        .then((response) => {
          // alert(JSON.stringify(response.data));  // Output the data received from the request
          this.mainCats = response.data.map((cat) => ({
            id: cat.id,
            url: cat.url,
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    },
    requestAnimatedCats: function () {
      axios
        .get("https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif", {
          headers: {
            "x-api-key":
              "live_QTQoXsscFALX63br8NHnps2gMpgK0qiTiTNot1j6oVNcDDe2fdOzkZYfzcqDA8dK",
          },
        })
        .then((response) => {
          // alert(JSON.stringify(response.data));  // Output the data received from the request
          this.animatedCats = response.data.map((cat) => ({
            id: cat.id,
            url: cat.url,
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle any errors
        });
    },
    addToFavourites: function (cat) {
      if (this.isLoggedIn == false) {
        alert("You need to login to save your favourites");
        this.activeName = "favourites";
      } else {
        // alert("The cat has been added to your favorites");
        var note = document.createElement("div");
        note.style.position = "fixed";
        note.style.height = "100px";
        note.style.width = "450px";
        note.style.top = "80%";
        note.style.left = "50%";
        note.style.zIndex = "9999";
        note.style.transform = "translate(-50%, -50%)";
        note.style.backgroundColor = "white";
        note.style.display = "flex";
        note.style.justifyContent = "center";
        note.style.alignItems = "center";
        note.style.borderRadius = "7px";
        note.style.opacity = "0.8";
        note.innerText = "Save successful";
        var body = document.querySelector("body");
        body.appendChild(note);
        setTimeout(function () {
          body.removeChild(note);
        }, 1000);
        this.favouriteCats.push(cat);
      }
    },
    removeFromFavourites: function (cat) {
      var indexOfCat = this.favouriteCats.findIndex((item) => item.id == cat.id);
      this.favouriteCats.splice(indexOfCat, 1);
    },
    login: function () {
      this.$refs.loginForm
        .validate()
        .then(() => {
          // If validation passes
          this.isLoggedIn = true;
          alert("Login successful!"); // Optional message
        })
        .catch((error) => {
          // If validation fails
          alert("Login failed: " + error.message); // Optional error handling
          this.activeName = "favourites";
        });
    },
    logout: function () {
      this.isLoggedIn = false;
      this.loginForm.email = "";
      this.loginForm.password = "";
      this.activeName = "cats";
    },
    validateEmail: function (rule, value, callback) {
      if (!value) {
        callback(new Error("enter valid email"));
      } else {
        callback();
      }
    },
    validatePassword: function (rule, value, callback) {
      if (!value) {
        callback(new Error("enter valid password"));
        this.activeName = "favourite";
      } else {
        callback();
      }
    },
  },
  mounted() {
    // Automatically fetch the cat image when the page loads
    this.requestMainCats();
    this.requestAnimatedCats();
  },
};
</script>

<style>
/* .catsPane{
    background-color: aqua;
    font-size: 40px;

} */
.introButton {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 0;
  color: rgba(82, 56, 23, 0.691);
}

.window {
  background-color: antiquewhite;
  height: 50vh;
  width: 60vh;
  position: fixed;
  /* positon:absolute;why absolute make the div non-visible? not compatible with element plus*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#mainPane.el-tab-pane {
  overflow: auto;
  position: relative;
}

.el-button.buttonStyle {
  background-color: rgb(233, 208, 176);
  border: none;
  color: rgba(82, 56, 23, 0.691);
  margin-bottom: 10px;
  position: sticky;
  left: 0;
  margin-bottom: auto;
  /* position:absolute;
    right:10px; */
}

.el-button.buttonStyle:hover {
  background-color: rgba(204, 158, 98, 0.691);
  /* Active background color */
  color: rgba(0, 0, 0, 0.691);
}

.cardDiv {
  display: flex;
  width: 1500px;
  overflow: auto;
}

.el-card.cardStyle {
  background-color: rgb(173, 247, 173);
  border: none;
  margin-left: 10px;
  /* box-shadow: 3px 3px 100px 100px rgb(173, 247, 173); */
}

.el-card.cardStyle0 {
  background-color: rgb(255, 245, 228);
  border: none;
  margin-left: 10px;
}
</style>
