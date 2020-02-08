function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    // Add the year
    var today = new Date;
    document.getElementById('year').innerHTML = today.getFullYear();
});
