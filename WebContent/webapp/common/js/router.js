/**
 * 路由： 通过一个路径名称来加载一个模块
 * 
 */
(function(){
	function loadJs(url, callback){
		$('#muduleScript').remove()
		var done = false;
		var script = document.createElement('script');
		script.id="muduleScript"
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')){
				done = true;
				script.onload = script.onreadystatechange = null;
				if (callback){
					callback.call(script);
				}
			}
		}
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	function loadCss(url, callback){
		$('#moduleStyle').remove()
		var link = document.createElement('link');
		link.id = 'moduleStyle'
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'screen';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if (callback){
			callback.call(link);
		}
	}
	
	function loadHtml(url, callback) {
        $.ajax({
            url: url,
            cache: false,
            dataType: 'text',
            success: function (res) {
            	router.container.html(res)
                if(callback) {
                	callback()
                }
            },
            error: function (res) {
            }
        })
    }
	
	function loadModule(moduleName, callback){
		var baseUrl,
			module = router.modules[moduleName],
			jsStatus = 'loading',
			cssStatus = 'loading';
		
		if(module) {
			baseUrl = router.base + moduleName + '/'
		} else {
			moduleName = 'welcome-page'
			module = router.modules[moduleName]
			baseUrl = router.base + moduleName + '/'
		}
		
		loadCss(baseUrl + module['css'], function(){
			cssStatus = 'loaded';
			checkFinished();
		});
		
		loadHtml(baseUrl + module['html'], function(){
			loadJs(baseUrl + module['js'], function(){
				module['controller'] && window[module['controller']]()
				jsStatus = 'loaded';
				checkFinished();
			});
		});
		
		function checkFinished(){
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				router.onLoad(moduleName);
				if (callback){
					callback();
				}
			}
		}
	}
	
	window.router = {
		base:'',
		container: '',
		modules: {},
		when: when,
		load: function(moduleName, callback){
			loadModule(moduleName, callback);
		},
		start: start,
		onLoad: function(moduleName){console.log('module ' + moduleName + ' is loaded.')}
	};
	
	function when(moduleName, module) {
		router.modules[moduleName] = module
		return router
	}
	
	function start() {
		// get router base.
		router.base = location.protocol + '//' + location.host + router.base
		
		var container = $('[easyui-view]')
		if(container && container.length === 1) {
			router.container = container
		} else {
			alert('please specify the easyui-view!')
			return
		}
		
		// route listening
		function doRoute() {
			var moduleName = location.hash
			
			if(moduleName && moduleName.length > 2) {
				moduleName = moduleName.substring(2)
			}
			
			router.load(moduleName, function() {
				$.parser.parse(router.container);
			})
		}
		window.onhashchange = function() {
			doRoute()
		}
		doRoute()
	}
	
})(jQuery);
