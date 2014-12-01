document.addEventListener('DOMContentLoaded', function () {
    var top = document.getElementById('top'),
        introBounding = document.getElementById('navbar-intro').getBoundingClientRect(),
        large = true,
        shadow = false;

    setInterval(function () {
        var scroll = document.body.getBoundingClientRect().top,
            treshold = (scroll * -1) - scroll;

        //Check large
        if (treshold > (introBounding.height * 0.5)) {
            if (large) {
                removeClass(top, 'large');
                large = false;
            }
        } else {
            if (!large) {
                addClass(top, 'large');
                large = true;
            }
        }

        //Check shadow
        if(treshold > introBounding.height && !shadow) {
            addClass(top, 'shadow');
            shadow = true;
        } else if(treshold <= introBounding.height && shadow) {
            removeClass(top, 'shadow');
            shadow = false;
        }
    }, 200);
});

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

