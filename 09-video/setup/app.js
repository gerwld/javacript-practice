// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.



//video elem
const switchBtn = document.querySelector('.switch-btn');
const video = document.querySelector('.video-container');


switchBtn.addEventListener('click', function (e) {
    if(!switchBtn.classList.contains('slide')) {
        video.pause();
        switchBtn.classList.add('slide');
    } else {
        video.play();
        switchBtn.classList.remove('slide');
    }
 });


//preloader
const preloader = document.querySelector('.preloader');
window.addEventListener("load", function () {
    preloader.classList.add('hide-preloader');
});




