// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const linkContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const toggleMenu = document.querySelector('.nav-toggle');

toggleMenu.addEventListener('click', function () {
    let height = links.getBoundingClientRect().height;
    let contHeight = linkContainer.getBoundingClientRect().height;
    if (contHeight === 0) {
        linkContainer.style.height = `${height}px`;
    } else {
        linkContainer.style.height = "0";
    }
});
// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', function () {
    const navHeight = navbar.getBoundingClientRect().height;
    const scrollHeight = window.pageYOffset;
    //show navbar
    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else navbar.classList.remove('fixed-nav');

    //show toplink
    if (scrollHeight > 500) {
        topLink.classList.add('show-link');
    } else topLink.classList.remove('show-link');
});
// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        //prevent default action
        e.preventDefault();
        //calculate header height & menu
        const navHeight = navbar.getBoundingClientRect().height;
        let contHeight = linkContainer.getBoundingClientRect().height;
        //navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        let position = element.offsetTop - navHeight;

        //flow compensation if not fixed
        const fixedNav = navbar.classList.contains('fixed-nav');
        if (!fixedNav) {
            position -= navHeight;
        };

        //compensation on mobile, if menu open
        if (navHeight > 82) {
            position += contHeight;
        }

        window.scrollTo({
            left: 0,
            top: position
        });
        linkContainer.style.height = 0;
    });
});
