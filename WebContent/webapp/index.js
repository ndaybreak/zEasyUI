$(function() {
	router
		.when('booking-list', {
				html: 'content.html',
				js: 'script.js',
				css: 'style.css',
				controller: 'bookingListCtrl'
			})
		.when('booking-detail', {
				html: 'content.html',
				js: 'script.js',
				css: 'style.css',
				controller: 'bookingDetailCtrl'
			})
		.when('welcome-page', {
				html: 'content.html',
				js: 'script.js',
				css: 'style.css',
				controller: 'welcomePageCtrl'
			})
	
	function doRoute() {
		var routeName = location.hash
		
		if(routeName && routeName.length > 2) {
			routeName = routeName.substring(2)
		} else {
			routeName = 'welcome-page'
		}
		
		router.route(routeName, function() {
			$.parser.parse('#mainPanle');
		})
	}
	
	window.onhashchange = function() {
		doRoute()
	}
	
	doRoute()
	
});