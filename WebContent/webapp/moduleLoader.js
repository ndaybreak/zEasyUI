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
 * moduleLoader - jQuery EasyUI
 * 
 */
(function(){
	var modules = {
		bookingList:{
			html: 'content.html',
			js: 'script.js',
			css: 'style.css'
		}
	};
	
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
	
	function loadModule(name, callback){
		var baseUrl,
			module = modules[name],
			jsStatus = 'loading',
			cssStatus = 'loading';
		
		if(module) {
			baseUrl = moduleLoader.base + 'modules/' + name + '/'
		} else {
			alert('sorry, the page is not existed!')
		}
		
		loadCss(baseUrl + module['css'], function(){
			cssStatus = 'loaded';
			checkFinished();
		});
		
		loadHtml(baseUrl + module['html'], function(){
			loadJs(baseUrl + module['js'], function(){
				jsStatus = 'loaded';
				checkFinished();
			});
		});
		
		function checkFinished(){
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				moduleLoader.onLoad(name);
				if (callback){
					callback();
				}
			}
		}
	}
	
	window.moduleLoader = {
		modules:modules,
		base:'.',
		load: function(name, callback){
			loadModule(name, callback);
		},
		onLoad: function(name){console.log('module ' + name + ' is loaded.')}
	};

	var scripts = document.getElementsByTagName('script');
	for(var i=0; i<scripts.length; i++){
		var src = scripts[i].src;
		if (!src) continue;
		var m = src.match(/moduleLoader\.js(\W|$)/i);
		if (m){
			moduleLoader.base = src.substring(0, m.index);
		}
	}

})();
