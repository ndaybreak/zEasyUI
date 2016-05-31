$(function() {
	router.base = '/zEasyUI/webapp/modules/'
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
	
	router.start()
	
});