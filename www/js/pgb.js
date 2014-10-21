(function() {
 
$(document).on('deviceready', function() {

	access_token = window.sessionStorage.getItem('access_token');

	if (access_token) {
		getApps(access_token, function() {
			// Add slight delay to allow DOM rendering to finish.
			// Avoids flicker on slower devices.
			setTimeout(function() {
		   	// allow the screen to dim when returning from the served app
		   	window.plugins.insomnia.allowSleepAgain();
		   	navigator.splashscreen.hide();
			});
		});
	}

	$('.back').click(function() {
		showView('.apps');
	});

});

var access_token;
var apps = {};


// rendering

function showView(sel) {
	$('.view').removeClass('current');
	$(sel).addClass('current');
}

function getApps(access_token, callback) {
	$.ajax({
	  dataType: "json",
	  url:"https://build.phonegap.com/api/v1/apps?access_token=" + access_token,
	  success: function(data) {
	  	saveApps(data.apps);
	  	renderApps(data.apps);
	  	if (typeof callback == 'function') callback();
	  }
	});
}

function saveApps(appArray) {
	window.sessionStorage.setItem('appArray', JSON.stringify(appArray));
}

function renderApps(appArray) {
	var html = "";

	appArray.forEach(function(app) {
		apps[app.id] = app;
	});

	$.get('templates/app-li.html', function(template) {

		$(".apps ul")
			.html(Mustache.render(template, { apps: appArray, access_token: access_token }))
			.find('a').click(function() {
				renderApp($(this).attr("data-id"));
			});

	});

}

function renderApp(id) {
	var app = apps[id];

	$.get('templates/app-view.html', function(template) {

	  analyzePlugins(app.id, function(res) {
	  	$.extend(app, res);
	  	$.extend(app, { 
	  		pg_version_mismatch: cordova.version != app.phonegap_version,
	  		pg_version: cordova.version
	  	});

	    $('.app .detail').html(Mustache.render(template, app));
		  $('.app a.install').click(install);
		  $('.app a.run').click(run);
		  $('.app a.link').click(browse);
		  $('.app a.show-details').click(function(e) { 
		  	$('.app-plugins').toggle(); 
		  	e.preventDefault(); 
		  });

		  showView('.app');
	  });
  });

}

function browse() {
	var url = $(this).text();
	window.open(url, '_system');
}

function install() {
	var id = $(this).attr("data-id");
	window.open(apps[id].install_url, "_system");
}

function run() {
	var app_id = $(this).attr("data-id");
	console.log('running app ' + app_id);

	$.ajax({
	  dataType: "json",
	  url:"https://build.phonegap.com/api/v1/apps/" + app_id + "/www?access_token=" + access_token,
	  success: function(data) {

			window.phonegap.app.downloadZip({
				address: data.www_url,
				onDownloadError: function(e) {
					console.log('Failed to fetch app.');
				}
			});
		}
	});
}

function analyzePlugins(app_id, callback) {
	$.ajax({
	  dataType: "json",
	  url:"https://build.phonegap.com/api/v1/apps/" + app_id + "/plugins?access_token=" + access_token,
	  success: function(data) {

	  	if (typeof data.plugins != 'undefined') {

	  		var available_plugins = cordova.require('cordova/plugin_list').metadata;

	  		var return_obj = {
	  			plugins: data.plugins,
	  			plugin_missing: false,
	  			plugin_mismatch: false
	  		}

	  		return_obj.plugins.forEach(function(plugin) {
	  			plugin.available_version = available_plugins[plugin.name]
	  			if (typeof available_plugins[plugin.name] == 'undefined') {
	  				return_obj.plugin_missing = plugin.mismatch = true;
	  			} else if (available_plugins[plugin.name] != plugin.version) {
	  				return_obj.plugin_mismatch = plugin.mismatch = true;
	  			}
	  			return plugin;
	  		});

	  		callback(return_obj);
	  	}

	  }
	});

}

function getQueryString(url) {
		var a = url.slice((url.indexOf('?') + 1)).split('&')
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

})();