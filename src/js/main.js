var _paq = _paq || [];

document.addEventListener('DOMContentLoaded', function () {
	var top = document.getElementById('top'),
		intro = document.getElementById('navbar-intro'),
		introBounding = (intro ? intro.getBoundingClientRect() : false),
		large = true,
		shadow = false;


	function checkTopBar() {
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
		if (treshold > introBounding.height && !shadow) {
			addClass(top, 'shadow');
			shadow = true;
		} else if (treshold <= introBounding.height && shadow) {
			removeClass(top, 'shadow');
			shadow = false;
		}
	}

	if(introBounding) {
		setInterval(checkTopBar, 200);
	} else {
		//Kein Intro Bereich, klasse Entfernen
		removeClass(top, 'large');
	}


	//Goal Tracking
	var mailElements = document.querySelectorAll('a[href^="mailto"]'),
		telElements = document.querySelectorAll('a[href^="tel"]');

	for(var i = 0; i < mailElements.length; ++i) {
		mailElements[i].addEventListener('click', function(e) {
			_paq.push(['trackGoal', 1]);
		});
	}
	for(var j = 0; j < telElements.length; ++j) {
		telElements[j].addEventListener('click', function(e) {
			_paq.push(['trackGoal', 2]);
		});
	}
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

