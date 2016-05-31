/**
 * jQuery EasyUI 1.4.5
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
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
                $('#mainPanle').html(res)
                if(callback) {
                	callback()
                }
            },
            error: function (res) {
            }
        })
    }
	
	function loadModule(routeName, callback){
		var baseUrl,
			module = router.modules[routeName],
			jsStatus = 'loading',
			cssStatus = 'loading';
		
		if(module) {
			baseUrl = router.base + 'modules/' + routeName + '/'
		} else {
			alert('sorry, the page is not existed!')
			return
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
				router.onLoad(routeName);
				if (callback){
					callback();
				}
			}
		}
	}
	
	function when(routeName, module) {
		router.modules[routeName] = module
		return router
	}
	
	window.router = {
		base:'.',
		modules: {},
		when: when,
		route: function(routeName, callback){
			loadModule(routeName, callback);
		},
		onLoad: function(routeName){console.log('module ' + routeName + ' is loaded.')}
	};

	var scripts = document.getElementsByTagName('script');
	for(var i=0; i<scripts.length; i++){
		var src = scripts[i].src;
		if (!src) continue;
		var m = src.match(/router\.js(\W|$)/i);
		if (m){
			router.base = src.substring(0, m.index);
		}
	}
	
})(jQuery);
