function fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}

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
        speed: 600,
        slidesPerView: 1,
        effect: 'cards'
    });
})

$('.play').click(function () {
    $(this).hide();
    $(this).next().show();
    $(this).prev('.time').css('opacity', '1')
    let number = $(this).parent().attr("data-number");
    let wavesurfer = WaveSurferInit.instances[number];
    wavesurfer.play();
    wavesurfer.on('audioprocess', function () {
        let currTime = fmtMSS(wavesurfer.getCurrentTime());
        let trackLength = fmtMSS(wavesurfer.getDuration());
        let currCard = $('.card[data-number="'+ number + '"]');
        currCard.children('.time').children('.current-time').html(currTime.split('.')[0]);
        currCard.children('.time').children('.track-length').html(trackLength.split('.')[0]);
        if (currTime.split('.')[0] == trackLength.split('.')[0]) {
            currCard.children('.pause').hide();
            currCard.children('.play').show();
        }
    });
});
$('.pause').click(function () {
    $(this).hide();
    $(this).prev().show();
    let number = $(this).parent().attr("data-number");
    WaveSurferInit.instances[number].pause();
})