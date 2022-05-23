<script>
import PreloaderItem from "./components/PreloaderItem.vue";
import Cards from "./components/Cards.vue";

export default {
  data() {
    return {
      loader: true,
      mainOpacity: 0,
      wavesReadyCount: 0,
      wavesCount: -1,
    };
  },
  components: {
    Cards,
    PreloaderItem,
  },
  methods: {
    wavesReady() {
      this.wavesReadyCount++;
    },
    updateWavesCount(count) {
      this.wavesCount = count;
    }
  },
  created() {
    const interval = setInterval(() => {
      if (this.wavesReadyCount === this.wavesCount) {
        clearInterval(interval);
        this.loader = false;
        this.mainOpacity = 1;
      }
    }, 50);
  },
};
</script>

<template>
  <Transition>
    <PreloaderItem v-if="loader" :loaded="wavesReadyCount" />
  </Transition>
  <div class="main" v-bind:style="{ opacity: mainOpacity }">
    <Cards :waves-ready="wavesReady" :update-waves-count="updateWavesCount" />
    <div class="footer">
      <div class="links">
        <a
          href="https://soundcloud.com/mr-nobody-852994512/sets/shiza-kanye-beat-contest-vol1/s-qO1HZwrAhwf"
          target="_blank"
        >
          <img src="@/assets/img/sc.svg" alt="soundcloud" />
        </a>
        <a href="#" target="_blank">
          <img src="@/assets/img/vk.svg" alt="soundcloud" />
        </a>
      </div>
      <span>beat contest vol. 1</span>
      <span>
        powered by
        <a href="https://t.me/fitchgang" target="_blank">fitch</a>
      </span>
      <span>
        web by
        <a href="https://fronty.ws" target="_blank">fr!</a> x
        <a href="https://github.com/JustCup" target="_blank">JustCup</a>
      </span>
    </div>
  </div>
</template>

<style>
body {
  font-family: "JetBrains Mono", monospace;
  background: #f5f5f5;
  user-select: none;
  font-size: 8px;
}

img {
  pointer-events: none;
}

.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 6em;
  box-sizing: border-box;
}

.footer {
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.footer .links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  margin-bottom: 1em;
}

.footer .links a {
  opacity: 0.5;
  transition: opacity 0.2s;
  text-decoration: none;
}

.footer .links a:hover {
  opacity: 1;
}

.footer a {
  color: inherit;
}

form {
  display: none;
}

@media screen and (max-width: 920px) {
  body {
    font-size: 6px;
  }

  .main {
    padding: 4em;
  }

  .footer {
    font-size: 2em;
  }

  .footer .links a img {
    height: 1em;
    width: auto;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
