$(function() {
	$('.cs-navi-tab').click(function() {
		var $this = $(this);
		var moduleName = $this.attr('src');
		
		moduleLoader.load(moduleName)
	});
});