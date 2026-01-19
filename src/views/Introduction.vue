<template>
  <div class="content">
    <header class="header">
      <!-- <img src=""  alt="LOGO"/> -->
      <h2 style="white-space: nowrap">Cat Gallery</h2>
      <ul>
        <li id="li0"><a @click="scrollToSec('#sec0')">Introduction</a></li>
        <li id="li1"><a @click="scrollToSec('#sec1')">Functions</a></li>
        <li id="li2"><a @click="scrollToSec('#sec2')">Advantages</a></li>
      </ul>
      <div @click="toHome" class="routerLink">Experience now</div>
    </header>
    <div id="sec0" class="sec0">
      <div style="overflow: hidden; border-radius: 20px; min-width: 418px">
        <img src="/CatFace.png" alt="CatFace" />
      </div>

      <div class="sec0div">
        <h1>Welcome to <br />the Electric Cat Gallery</h1>
        <p>
          Explore a vibrant collection of stunning cat images powered by our advanced
          image sourcing technology.
        </p>
        <ul>
          <li>Explore a vibrant collection of stunning cat images</li>
          <li>Instant previews for your favorite cat selections</li>
          <li>Enjoy fast delivery on all image requests</li>
        </ul>
        <div @click="toHome" class="routerLink">Request Your Cat Image Now</div>
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

      <h2>Advantages</h2>
      <!-- 
        <div class="gallery-container">
            <button id="scroll-left" v-on:click="this.scrollLeft">← 左移</button>
            <div class="gallery" id="gallery">
                <img v-for="img in imgs" v-bind:key="img.alt" v-bind:src="img.src" v-bind:alt="img.alt" />

            </div>
            <button id="scroll-right" v-on:click="this.scrollRight">右移 →</button>
        </div> -->
      <div class="gallery-container">
        <button
          v-show="scrollButtonShow"
          id="scroll-left"
          v-on:click="this.scrollVertically('l')"
        >
          ← Left
        </button>
        <div class="gallery" id="gallery">
          <div
            v-for="div in divs"
            v-bind:key="div.id"
            v-bind:style="{
              backgroundColor: div.color,
            }"
          >
            <h3>{{ div.title }}</h3>
            <p>{{ div.content }}</p>
          </div>
        </div>
        <button
          v-show="scrollButtonShow"
          id="scroll-right"
          v-on:click="this.scrollVertically('r')"
        >
          Right →
        </button>
      </div>
      <div id="bottomButton" @click="toHome" class="routerLink">Experience now</div>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";

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
        //triplicate it when mounted to scroll smoothly
        {
          id: 0,
          color: "grey",
          title: "Instant Access to Cat Images",
          content:
            "Users can effortlessly request and enjoy beautiful cat images at the click of a button, enhancing their browsing experience",
        },
        {
          id: 1,
          color: "black",
          title: "Favorites Collection",
          content:
            "The platform allows users to easily add cat images to a favorites collection, making it simple to curate and revisit preferred images",
        },
        {
          id: 2,
          color: "black",
          title: "Single-Page Navigation",
          content:
            "Users benefit from smooth navigation throughout different sections of the gallery on a single page, streamlining their experience without unnecessary page loads",
        },
        {
          id: 3,
          color: "black",
          title: "Personalized Experience:",
          content:
            " By signing up or logging in, users can save and access their favorite images anytime, providing a more tailored and convenient experience",
        },
        // {id:4,color:"purple" }
      ],
      scrollPosition: 0,
      scrollButtonShow: false,
    };
  },

  methods: {
    //navigate to home page
    toHome() {
      this.$router.push("/home");
    },
    //scrolling navigation
    scrollToSec(id) {
      let top = document.querySelector(id).offsetTop;
      let hei = document.querySelector(".header").offsetHeight;
      window.scrollTo({
        top: top - hei,
        behavior: "smooth",
      });
    },
    //page scroll automation
    handleScroll() {
      //select active li
      let hei = window.scrollY;
      let aArr = ["#li0", "#li1", "#li2"];
      let secArr = ["#sec0", "#sec1", "#sec2"];
      let topArr = secArr.map((id) => {
        return (
          document.querySelector(id).offsetTop -
          document.querySelector(".header").offsetHeight
        );
      });

      for (let i = 0; i <= topArr.length - 1; i++) {
        let v = topArr[i];
        let nex = i + 1 <= topArr.length - 1 ? topArr[i + 1] : Number.POSITIVE_INFINITY;
        if (hei >= v && hei < nex) {
          aArr.forEach((vv, ii) => {
            document.querySelector(vv).style.background = "none";
          });
          let ele = document.querySelector(aArr[i]);
          ele.style.background = "rgba(232, 209, 179, 0.6)";
          break;
        }
      }
      //count "offsetBottom" and add animation for bottom button
      let offsetBottom = Math.min(
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY + 15,
        30
      );
      let bottomButton = document.getElementById("bottomButton");
      bottomButton.style.transform = `translateY(${offsetBottom}px) scale(${
        (30 - offsetBottom) / 30
      })`;
    },

    //sec2 scrolling logic: 8 elements in total, when scroll to the second 4, scroll to the first 4 again
    //enlong the arr the unshift the array to make endless arr will result scrolling false: no left space to scroll
    //scroll to left is precise, but the reverse is not
    scrollVertically(direction) {
      let ele = document.querySelector(".gallery div");
      let style = getComputedStyle(ele);

      let len = ele.getBoundingClientRect().width + Number.parseFloat(style.marginRight);
      if (direction == "r") {
        this.scrollPosition += 1;
      } else {
        len = -len;
        this.scrollPosition -= 1;
      }
      console.log(len);
      //scroll to left is precise, but the reverse is not
      var gallery = document.getElementById("gallery");
      gallery.scrollTo({
        left: gallery.scrollLeft + len,
        behavior: "smooth",
      });

      if (this.scrollPosition % 4 == 0) {
        this.resetGallery();
      }
    },
    persetGallery() {
      this.divs = [...this.divs, ...this.divs, ...this.divs]; //triplicate the divs for smooth scrolling);
    },
    resetGallery() {
      nextTick(() => {
        setTimeout(() => {
          gallery.scrollTo({
            left: 290 * 4,
            behavior: "auto",
          });
          console.log(document.getElementById("gallery").scrollLeft);
        }, 300);
      });
    },
    autoScrollGallery() {
      let gallery = document.querySelector(".gallery");
      if (gallery.scrollLeft > 290 * 4) {
        this.scrollButtonShow = true;
        return;
      } else {
        gallery.scrollBy({
          left: 2,
          behavior: "auto",
        });
        window.requestAnimationFrame(() => this.autoScrollGallery());
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.persetGallery();
    window.requestAnimationFrame(this.autoScrollGallery);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.content {
  position: relative;
  min-width: 1000px;
  background: linear-gradient(120deg, rgb(232, 209, 179) 0%, rgb(252, 246, 240) 40%);
  /* overflow: hidden; */
}

.header {
  background-color: rgba(250, 235, 215, 0.3);
  display: flex;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 5px 0px grey;
  z-index: 1;
  gap: 120px;
  max-height: 2000px;
}

.header ul {
  display: flex;
  align-items: center;
  margin-top: 0;
  padding-left: 0px;
  margin-bottom: 0;
  gap: 80px;
}

.header ul li {
  list-style-type: none;
  height: 50px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 5px 0px grey;
  padding: 0 10px;
  transition: transform 0.3s ease 0s;
}

.header ul li:hover {
  background-color: rgba(213, 173, 120, 0.3);
  cursor: pointer;
  transform: scale(1.05);
}

.header ul li a {
  line-height: 65px;
  text-decoration: none;
  font-size: large;
  font-weight: 400;
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
  width: 260px;
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
  height: 600px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
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
  padding: 10px;
  border-radius: 10px;
}

.gallery-container button {
  background-color: rgb(232, 209, 179);
  border: none;
  padding: 10px;
  margin: 20px;
  cursor: pointer;
  border-radius: 3px;
}
.sec2 .routerLink {
  padding: 0 auto;
  position: relative;
  margin-top: 60px;
  transition: all 0s ease 0s;
  margin-left: 0;
}
</style>
