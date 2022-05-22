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
    $('.loader').delay(250).fadeOut(400);
    const swiper = new Swiper('.swiper', {
        speed: 400,
        slidesPerView: 1,
        effect: 'cards',
        cardsEffect: {
            // slideShadows: false
        },
    });
})

$('.play').click(function(){
    $(this).hide();
    $(this).next().show();
    let number = $(this).parent().attr("data-number");
    WaveSurferInit.instances[number].play();
});
$('.pause').click(function(){
    $(this).hide();
    $(this).prev().show();
    let number = $(this).parent().attr("data-number");
    WaveSurferInit.instances[number].pause();
})