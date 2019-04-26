function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    document.addEventListener('scroll', handleScroll);
});

function handleScroll() {
    var nav = document.getElementById('nav');
    if (document.body.scrollTop > 0) {
        nav.classList.add('nav-scroll');
    } else {
        nav.classList.remove('nav-scroll');
    }
}
