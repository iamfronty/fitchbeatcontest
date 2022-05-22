$(window).ready(function () {
    // var wavesurfer = WaveSurfer.create({
    //     container: '#waveform',
    //     barWidth: 4,
    //     height: 256,
    //     barGap: 4,
    //     backgroundColor: "#000",
    //     responsive: true,
    //     waveColor: "#DF547D"
    // });
    // wavesurfer.load('assets/audio/sovvy.mp3');
    $('.loader').fadeOut(400);
    const swiper = new Swiper('.swiper', {
        speed: 400,
        slidesPerView: 1
    });
})