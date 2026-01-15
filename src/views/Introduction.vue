<template>
  <div class="content">
    <header class="header">
      <!-- <img src=""  alt="LOGO"/> -->
      <h2>Cat Gallery</h2>

      <ul>
        <li><a href="#sec0">Introduction</a></li>
        <li><a href="#sec1">Functions</a></li>
        <li><a href="#sec2">Advantages</a></li>
      </ul>
      <router-link to="/home" class="routerLink">Experience now</router-link>
    </header>
    <div id="sec0" class="sec0">
      <div style="overflow: hidden">
        <img src="/public/CatFace.png" alt="CatFace" />
      </div>

      <div class="sec0div">
        <h1>Welcome to the Electric Cat Gallery</h1>
        <p>
          Explore a vibrant collection of stunning cat images powered by our advanced
          image sourcing technology.
        </p>
        <ul>
          <li>Explore a vibrant collection of stunning cat images</li>
          <li>Instant previews for your favorite cat selections</li>
          <li>Enjoy fast delivery on all image requests</li>
        </ul>
        <router-link to="/home" class="routerLink"
          >Request Your Cat Image Now</router-link
        >
      </div>
    </div>
    <div id="sec1" class="sec1">
      <div>
        <h2>Functions</h2>
      </div>
      <div class="sec1div">
        <div style="background-color: #ffcccb">
          <h3>Browse & Enjoy</h3>
          Instantly request and display beautiful cat images with a click.
        </div>
        <div style="background-color: lightyellow">
          <h3>Save Your Favorites</h3>
          Easily add any cat image to your favorites collection.
        </div>
        <div style="background-color: lightgreen">
          <h3>Smooth Navigation</h3>
          Navigate through different sections of the gallery all on a single page.
        </div>
        <div style="background-color: lightblue">
          <h3>Personalize Your Experience</h3>
          Sign up or log in to save and access your favorite images anytime.
        </div>
      </div>
    </div>
    <div id="sec2" class="sec2">
      <!-- sec2: continuing updating! -->
      <div class="sec2div">
        <h2>Advantages</h2>
      </div>
      <!-- 
        <div class="gallery-container">
            <button id="scroll-left" v-on:click="this.scrollLeft">← 左移</button>
            <div class="gallery" id="gallery">
                <img v-for="img in imgs" v-bind:key="img.alt" v-bind:src="img.src" v-bind:alt="img.alt" />

            </div>
            <button id="scroll-right" v-on:click="this.scrollRight">右移 →</button>
        </div> -->
      <div class="gallery-container">
        <button id="scroll-left" v-on:click="this.scrollLeft">← Left</button>
        <div class="gallery" id="gallery">
          <div
            v-for="div in divs"
            v-bind:key="div.id"
            v-bind:style="{
              backgroundColor: div.color,
              padding: '10px',
              borderRadius: '10px',
            }"
          >
            <h3>{{ div.title }}</h3>
            <p>{{ div.content }}</p>
          </div>
        </div>
        <button id="scroll-right" v-on:click="this.scrollRight">Right →</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // Define any reactive data for this component

      imgs: [
        { src: "", alt: "i1" },
        { src: "", alt: "i2" },
        { src: "", alt: "i3" },
        { src: "", alt: "i4" },
        { src: "", alt: "i5" },
      ],
      divs: [
        {
          id: 0,
          color: "#FFCCCB",
          title: "Instant Access to Cat Images",
          content:
            "Users can effortlessly request and enjoy beautiful cat images at the click of a button, enhancing their browsing experience",
        },
        {
          id: 1,
          color: "lightyellow",
          title: "Favorites Collection",
          content:
            "The platform allows users to easily add cat images to a favorites collection, making it simple to curate and revisit preferred images",
        },
        {
          id: 2,
          color: "lightgreen",
          title: "Single-Page Navigation",
          content:
            "Users benefit from smooth navigation throughout different sections of the gallery on a single page, streamlining their experience without unnecessary page loads",
        },
        {
          id: 3,
          color: "lightblue",
          title: "Personalized Experience:",
          content:
            " By signing up or logging in, users can save and access their favorite images anytime, providing a more tailored and convenient experience",
        },
        // {id:4,color:"purple" }
      ],
    };
  },

  methods: {
    scrollLeft() {
      var lastItem = this.imgs.pop();
      this.imgs.unshift(lastItem);
      var lastItem = this.divs.pop();
      this.divs.unshift(lastItem);
      var gallery = document.getElementById("gallery");
      gallery.scrollBy({
        left: -270,
        behavior: "auto",
      });
    },
    scrollRight() {
      var firstItem = this.imgs.shift();
      this.imgs.push(firstItem);
      var firstItem = this.divs.shift();
      this.divs.push(firstItem);
      var gallery = document.getElementById("gallery");
      gallery.scrollBy({
        left: 270,
        behavior: "auto",
      });
    },
  },
};
</script>

<style>
body {
  background-color: rgb(252, 246, 240);
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.content {
  position: relative;
  min-width: 1000px;
}

.header {
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  /* overflow: auto; */
}

.header ul {
  display: flex;
  margin-left: 100px;
  margin-top: 0;
  /* margin-right: 50px; */
  padding-bottom: 0;
  padding-left: 10px;
  margin-bottom: 0;
}

.header ul li {
  margin-right: 100px;
  list-style-type: none;
  height: 70px;
  /* display:flex;
    align-items: center; */
}

.header ul li:hover {
  background-color: black;
}

.header ul li a {
  line-height: 65px;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
  background-color: antiquewhite;
  padding-top: 25px;
  padding-bottom: 22px;
  color: black;
}

.sec0 {
  height: 60vw;
  max-height: 500px;
  min-height: 300px;
  display: flex;
}
.sec0 * {
  margin: 0;
}

.sec0 img {
  height: 100%;
  min-height: 100px;
  max-height: 500px;
}

.sec0div {
  /* flex: 2; */
  height: 100%;
  display: flex;
  /* Add this to make it a flex container */
  flex-direction: column;
  /* Arrange children in a column */
  /* justify-content: space-between;  */
}

h1 {
  padding: 10px;
}

p {
  padding: 10px;
  padding-top: 0;
}

h2 {
  padding-left: 10px;
}

.sec0 .routerLink {
  height: 50px;
  width: 240px;
  background-color: rgb(232, 209, 179);
  border: none;
  border-radius: 4px;
  padding-left: 30px;
  padding-right: 10px;
  margin-left: 20px;
  margin-top: auto;
}

.routerLink:hover {
  background-color: rgb(213, 173, 120);
}

.sec1 {
  margin-top: 70px;
}

.sec1 div {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 30px; */
}

.sec1div {
  display: flex;

  justify-content: center;
  margin-left: 5vw;
  margin-right: 5vw;
}

.sec1div div {
  height: 500px;
  width: 20vw;
  min-width: 180px;
  background-color: antiquewhite;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px rgb(249, 241, 231);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
}

.sec1div div:hover {
  background-color: rgb(238, 222, 199);
}

.sec2 {
  height: 500px;
  margin-top: 70px;
}
v .sec2 .sec2div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table {
  width: 80vw;
  background-color: antiquewhite;
}

.table th {
  background-color: aqua;
  border-radius: 20px;
  width: 20vw;
}

.table td {
  background-color: aquamarine;
  border-radius: 20px;
}

.gallery-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery {
  display: flex;
  width: 870px;
  overflow-x: hidden;
  /* scroll-behavior: smooth; */
}

.gallery img {
  width: 100px;
  margin-right: 10px;
  flex-shrink: 0;
}

.gallery div {
  width: 250px;
  margin-right: 20px;
  flex-shrink: 0;
  height: 300px;
  box-sizing: content-box;
}

.gallery-container button {
  background-color: rgb(232, 209, 179);
  border: none;
  padding: 10px;
  margin: 20px;
  cursor: pointer;
  border-radius: 3px;
}
</style>
