<template>
  <div class="card" data-number="0">
    <span class="number"> {{ trackPosition }} / {{ tracksCount }} </span>
    <span class="name"> {{ trackName }} </span>
    <div :class="`wavesurfer-${trackPosition}`" ref="wavesurfer"></div>
    <div class="time" v-bind:style="{ opacity: timeOpacity }">
      <span class="current-time">{{ currentTime }}</span>
      /
      <span class="track-length">{{ trackLength }}</span>
    </div>
    <button class="control play" @click="play" v-if="showPlayButton">
      <img src="@/assets/img/play.svg" alt="play"/>
    </button>
    <button class="control pause" @click="pause" v-else-if="trackLength !== '0:00'">
      <img src="@/assets/img/pause.svg" alt="pause"/>
    </button>
    <button class="control" v-else>
      <img src="@/assets/img/spin.svg" alt="spinner" class="spin"/>
    </button>
  </div>
  <div class="actions">
    <svg
        v-if="trackPosition > 1"
        class="back"
        fill="#000"
        height="30"
        viewBox="0 0 33 30"
        width="33"
        xmlns="http://www.w3.org/2000/svg"
        @click="back"
    >
      <path
          d="M14.2364 19.7534L11.7701 22.2284L0.633636 11.139L11.7247 -0.000976562L14.1997 2.46352L7.60269 9.08674L25.6017 9.04831C26.5192 9.04625 27.4281 9.22491 28.2765 9.57411C29.125 9.92331 29.8963 10.4362 30.5465 11.0835C31.1967 11.7308 31.7131 12.4998 32.0661 13.3467C32.4191 14.1935 32.6019 15.1016 32.6039 16.0191L32.6336 29.9921L29.1404 30.0009L29.1107 16.0278C29.1098 15.5691 29.0185 15.115 28.8421 14.6916C28.6657 14.2681 28.4076 13.8835 28.0826 13.5598C27.7576 13.2361 27.372 12.9795 26.9478 12.8048C26.5236 12.6301 26.0692 12.5407 25.6104 12.5416L7.03329 12.5817L14.2364 19.7534Z"
      />
    </svg>
    <svg
        v-bind:class="{like, active: status === 'like'}"
        width="38"
        height="32"
        viewBox="0 0 38 32"
        fill="#000"
        xmlns="http://www.w3.org/2000/svg"
        @click="like"
    >
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.0199 4.7691L17.1169 2.86605C16.2249 1.96208 15.163 1.24347 13.9922 0.751595C12.8214 0.259724 11.5648 0.00430845 10.2949 5.40396e-05C9.025 -0.00420038 7.76678 0.242791 6.5927 0.726807C5.41863 1.21082 4.35189 1.9223 3.45391 2.82028C2.55594 3.71826 1.84446 4.78499 1.36044 5.95907C0.876427 7.13314 0.629436 8.39137 0.633691 9.66129C0.637945 10.9312 0.893361 12.1878 1.38523 13.3586C1.8771 14.5294 2.59571 15.5913 3.49969 16.4833L18.9744 31.958L18.9779 31.9545L19.0234 32L34.4982 16.5253C35.4021 15.6333 36.1208 14.5714 36.6126 13.4006C37.1045 12.2298 37.3599 10.9732 37.3642 9.70331C37.3684 8.43338 37.1214 7.17516 36.6374 6.00109C36.1534 4.82701 35.4419 3.76027 34.5439 2.8623C33.646 1.96432 32.5792 1.25284 31.4051 0.768824C30.2311 0.284808 28.9729 0.0378171 27.7029 0.0420715C26.433 0.0463259 25.1765 0.301742 24.0057 0.793613C22.8349 1.28548 21.7729 2.00409 20.881 2.90807L19.0199 4.7691ZM18.9779 27.0034L27.6195 18.36L30.1581 15.909H30.1616L32.0226 14.0497C33.1718 12.9005 33.8174 11.3419 33.8174 9.71667C33.8174 8.09145 33.1718 6.5328 32.0226 5.3836C30.8734 4.2344 29.3148 3.58879 27.6896 3.58879C26.0644 3.58879 24.5057 4.2344 23.3565 5.3836L19.0217 9.72017L14.6414 5.34334C13.4922 4.19414 11.9335 3.54852 10.3083 3.54852C8.68307 3.54852 7.12442 4.19414 5.97522 5.34334C4.82602 6.49254 4.18041 8.05119 4.18041 9.6764C4.18041 11.3016 4.82602 12.8603 5.97522 14.0095L10.4221 18.4563L10.4238 18.4511L18.9779 27.0052V27.0034Z"
      />
    </svg>
    <svg
        v-bind:class="{skip, active: status === 'skip'}"
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="#000"
        xmlns="http://www.w3.org/2000/svg"
        @click="skip"
    >
      <path
          d="M4.04299 0.600292C3.63967 0.210754 3.09949 -0.00479148 2.53879 8.08397e-05C1.97809 0.00495316 1.44174 0.229854 1.04525 0.626343C0.648759 1.02283 0.423859 1.55918 0.418986 2.11988C0.414114 2.68058 0.629659 3.22076 1.0192 3.62408L13.3688 15.9737L1.01706 28.3234C0.812814 28.5206 0.649901 28.7566 0.537826 29.0175C0.425751 29.2784 0.36676 29.559 0.364293 29.843C0.361825 30.1269 0.415932 30.4085 0.523456 30.6713C0.63098 30.9341 0.789767 31.1729 0.990554 31.3737C1.19134 31.5744 1.4301 31.7332 1.69291 31.8408C1.95572 31.9483 2.23731 32.0024 2.52126 31.9999C2.8052 31.9975 3.08581 31.9385 3.34671 31.8264C3.60761 31.7143 3.84358 31.5514 4.04085 31.3471L16.3926 18.9975L28.7423 31.3471C29.1456 31.7367 29.6858 31.9522 30.2465 31.9474C30.8072 31.9425 31.3435 31.7176 31.74 31.3211C32.1365 30.9246 32.3614 30.3883 32.3663 29.8276C32.3711 29.2669 32.1556 28.7267 31.7661 28.3234L19.4164 15.9737L31.7661 3.62408C32.1556 3.22076 32.3711 2.68058 32.3663 2.11988C32.3614 1.55918 32.1365 1.02283 31.74 0.626343C31.3435 0.229854 30.8072 0.00495316 30.2465 8.08397e-05C29.6858 -0.00479148 29.1456 0.210754 28.7423 0.600292L16.3926 12.9499L4.04299 0.600292Z"
      />
    </svg>
  </div>
</template>

<script>
const fmtMSS = (s) => {
  return ((s - (s %= 60)) / 60 + (10 < s ? ":" : ":0") + s).split(".")[0];
};

export default {
  data() {
    return {
      showPlayButton: true,
      timeOpacity: 0,
      currentTime: "0:00",
      trackLength: "0:00",
      waveSurfer: null,
    };
  },
  props: {
    trackPosition: Number,
    tracksCount: Number,
    trackName: String,
    status: String,
    audioUrl: String,
    slideTo: Function,
    currentCard: Number,
    wavesReady: Function,
    updateArtistStatus: Function,
  },
  methods: {
    play() {
      this.showPlayButton = false;
      this.waveSurfer.play();
      this.waveSurfer.on("audioprocess", () => {
        this.timeOpacity = 1;
        this.currentTime = fmtMSS(this.waveSurfer.getCurrentTime());
        this.trackLength = fmtMSS(this.waveSurfer.getDuration());

        if (this.currentTime === this.trackLength) {
          this.showPlayButton = true;
        }
      });
    },
    pause() {
      this.showPlayButton = true;
      this.waveSurfer.pause();
    },
    like() {
      this.updateArtistStatus(this.trackPosition - 1, 'like');
      this.pause();
      this.slideTo(this.trackPosition);
    },
    skip() {
      this.updateArtistStatus(this.trackPosition - 1, 'skip');
      this.pause();
      this.slideTo(this.trackPosition);
    },
    back() {
      this.pause();
      this.slideTo(this.trackPosition - 2);
    },
    createWaveSurfer() {
      if (this.waveSurfer !== null) {
        return;
      }

      this.waveSurfer = WaveSurfer.create({
        container: `.wavesurfer-${this.trackPosition}`,
        barWidth: 4,
        height: 180,
        barGap: 4,
        waveColor: "#000",
        responsive: true,
        progressColor: "#df547d",
        cursorWidth: 0,
        normalize: true,
        backend: 'MediaElement',
      });

      fetch(`./waveforms/${this.trackName}.json`)
          .then(response => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then(peaks => {
            console.log('loaded peaks! sample_rate: ' + peaks.sample_rate);
            this.waveSurfer.load(this.audioUrl, peaks.data);
            this.waveSurfer.on("ready", () => {
              this.wavesReady();
            });
          })
          .catch((e) => {
            console.error('error', e);
          });
    },
  },
  mounted() {
    this.createWaveSurfer();
  },
  unmounted() {
    this.waveSurfer.destroy();
    this.waveSurfer = null;
  }
};
</script>

<style>
.card {
  padding: 6em;
  box-sizing: border-box;
  border-radius: 6em;
  background: #fff;
  /* width: 640px; */
  text-align: center;
  margin-bottom: 6em;
}

.card .number {
  opacity: 0.5;
  display: block;
  font-size: 2em;
  margin-bottom: 1rem;
}

.card .name {
  display: block;
  font-weight: 500;
  font-size: 4.5em;
  margin-bottom: 3rem;
}

.card .time {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  margin-top: 1rem;
  margin-bottom: 3rem;
  gap: 1em;
  opacity: 0;
  transition: opacity 0.3s;
}

.card .control {
  font-size: inherit;
  width: 8em;
  height: 8em;
  border-radius: 100px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.card .control img {
  height: 3em;
  width: auto;
}

.card .control:hover {
  background: #e9e9e9;
}

.card .control:active {
  transform: scale(0.95);
}

.card audio {
  display: none;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6em;
}

.actions svg {
  cursor: pointer;
  transition: fill 0.2s;
  height: 4em;
  width: auto;
}

.actions svg.active {
  fill: #df547d;
}

@media screen and (max-width: 920px) {
  .card {
    padding: 4em;
    margin-bottom: 6em;
  }

  .card .number {
    margin-bottom: 0.5rem;
  }

  .card .name {
    margin-bottom: 1.5rem;
  }

  .card .time {
    margin-bottom: 1.5rem;
  }
}
</style>
