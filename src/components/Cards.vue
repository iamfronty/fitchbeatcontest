<template>
  <swiper
      :speed="600"
      :slides-per-view="1"
      :effect="'cards'"
      :allow-touch-move="false"
      v-bind:modules="isFirefox === -1 ? modules : []"
      @swiper="onSwiper"
  >
    <swiper-slide v-for="(artist, index) in artists" :key="artist.name">
      <CardItem
          :track-position="index + 1"
          :tracks-count="artists.length"
          :track-name="artist.name"
          :status="artist.status"
          :audio-url="`./audio/${artist.name}.mp3`"
          :slide-to="slideTo"
          :current-card="currentCard"
          :waves-ready="wavesReady"
          :update-artist-status="updateArtistStatus"
          v-if="currentCard >= index - 2 && currentCard < index + 2"
      />
    </swiper-slide>
    <swiper-slide>
      <span class="end">
        биточки кончились,
        <br/>
        спасибо за голоса!
        <br/><br/>
        ссылки на плейлисты
        <br/>
        можешь найти внизу
        <br/><br/>
        с любовью,
        <br/>
        фитч и музыканты
      </span>
    </swiper-slide>
  </swiper>
  <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSeX-8rkSQvvEY_xIwsIqca-w4nzazrJHZE9lGiN6Vd1zdd5bQ/formResponse"
      target="_self"
      method="POST"
      ref="form"
  >
    <input type="checkbox" name="entry.600622066" value="4OUR20"/>
    <input type="checkbox" name="entry.600622066" value="Институт Мозга"/>
    <input type="checkbox" name="entry.600622066" value="Митя"/>
    <input type="checkbox" name="entry.600622066" value="Якудза 01"/>
    <input type="checkbox" name="entry.600622066" value="avdoshkin"/>
    <input type="checkbox" name="entry.600622066" value="bendigo"/>
    <input type="checkbox" name="entry.600622066" value="berrserrk"/>
    <input type="checkbox" name="entry.600622066" value="bleep"/>
    <input type="checkbox" name="entry.600622066" value="chidx"/>
    <input type="checkbox" name="entry.600622066" value="el B"/>
    <input type="checkbox" name="entry.600622066" value="EMMUZLO"/>
    <input type="checkbox" name="entry.600622066" value="Erwi"/>
    <input type="checkbox" name="entry.600622066" value="esde"/>
    <input type="checkbox" name="entry.600622066" value="Flawie"/>
    <input type="checkbox" name="entry.600622066" value="hey, kitty!"/>
    <input type="checkbox" name="entry.600622066" value="Keitha"/>
    <input type="checkbox" name="entry.600622066" value="Key9en"/>
    <input type="checkbox" name="entry.600622066" value="Kitaliy Vlichko"/>
    <input type="checkbox" name="entry.600622066" value="KLIPAK"/>
    <input type="checkbox" name="entry.600622066" value="Lotus Fonda"/>
    <input type="checkbox" name="entry.600622066" value="Lwysh"/>
    <input type="checkbox" name="entry.600622066" value="moscillate"/>
    <input type="checkbox" name="entry.600622066" value="muwa"/>
    <input type="checkbox" name="entry.600622066" value="nerazin"/>
    <input type="checkbox" name="entry.600622066" value="Rarerxnin"/>
    <input type="checkbox" name="entry.600622066" value="reddle"/>
    <input type="checkbox" name="entry.600622066" value="RSPK"/>
    <input type="checkbox" name="entry.600622066" value="saki"/>
    <input type="checkbox" name="entry.600622066" value="siberial"/>
    <input type="checkbox" name="entry.600622066" value="Sorel Mathis"/>
    <input type="checkbox" name="entry.600622066" value="sovietvillain"/>
    <input type="checkbox" name="entry.600622066" value="SOVVY"/>
    <input type="checkbox" name="entry.600622066" value="Stagename"/>
    <input type="checkbox" name="entry.600622066" value="straus"/>
    <input type="checkbox" name="entry.600622066" value="TupaAlone"/>
    <input type="checkbox" name="entry.600622066" value="uneedfeel"/>
    <input type="checkbox" name="entry.600622066" value="vzr"/>
    <input type="checkbox" name="entry.600622066" value="YllaN"/>
    <input type="checkbox" name="entry.600622066" value="Ymnblthd"/>
    <input type="checkbox" name="entry.600622066" value="yoxory"/>
    <input type="checkbox" name="entry.600622066" value="Руслан Амирметов"/>
    <input type="hidden" name="fvv" value="1"/>
    <input type="hidden" name="fbzx" value="-3375994907148994576"/>
    <input type="hidden" name="pageHistory" value="0"/>
  </form>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import CardItem from "./CardItem.vue";

import "swiper/css";
import "swiper/css/effect-cards";

import {EffectCards} from "swiper";

export default {
  props: {
    wavesReady: Function,
    updateWavesCount: Function,
  },
  data() {
    return {
      swiper: null,
      artists: [],
      formAction: "",
      form: null,
      currentCard: 0,
      isFirefox: navigator.userAgent.indexOf('Firefox'),
    };
  },
  components: {
    CardItem,
    Swiper,
    SwiperSlide,
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    slideTo(slideIndex) {
      this.swiper.slideTo(slideIndex);
      this.currentCard = slideIndex;

      if (slideIndex === this.artists.length) this.sendForm();
    },
    updateArtistStatus(artistIndex, status) {
      const newArtists = [
        ...this.artists,
      ];

      newArtists[artistIndex] = {
        ...newArtists[artistIndex],
        status: status,
      };
      this.artists = [...newArtists];
    },
    sendForm() {
      let form = this.$refs.form;

      this.artists.map((artist) => {
        if (artist.status === 'like') {
          form.querySelector(`input[name="${artist.elName}"]`).checked = true;
          this.form.append(artist.elName, artist.name);
        }
      });

      form.submit();
    },
  },
  mounted() {
    if (typeof this.$refs.form !== 'undefined' && this.formAction !== '') {
      return;
    }

    const form = this.$refs.form;

    this.formAction = form.getAttribute("action");

    this.form = new FormData();
    const formElements = form.querySelectorAll('input:not([type="checkbox"])');
    Object.values(formElements).map((el) => {
      this.form.append(el.getAttribute("name"), el.value);
    });

    const checkboxElements = form.querySelectorAll('input[type="checkbox"]');
    let artists = [];

    Object.values(checkboxElements).map((el) => {
      artists.push({
        name: el.value,
        elName: el.getAttribute("name"),
        status: '',
      });
    });
    this.artists = [...artists];
    this.updateWavesCount(3);
  },
  setup() {
    return {
      modules: [EffectCards],
    };
  },
};
</script>

<style>
.main .swiper {
  width: 80em;
}

.swiper-3d .swiper-slide-shadow {
  background: #f5f5f5;
}

.end {
  font-size: 4em;
  color: #df547d;
  display: block;
  text-align: center;
}

@media screen and (max-width: 920px) {
  .main .swiper {
    width: 100%;
    overflow: hidden;
  }
}
</style>
