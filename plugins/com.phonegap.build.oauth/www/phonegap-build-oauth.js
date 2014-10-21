var PhonegapBuildOauth = {

	login: function(client_id, success, failure) {

		var authWindow = window.open("https://build.phonegap.com/authorize?client_id=" + client_id, "_blank", "clearcache=yes");

    $(authWindow).on('loadstart', function(e) {
        var url = e.url;
        if (url.match(/^(https?:\/\/)phonegap\.com\/?\?(code|error)=[a-zA-Z0-9]*$/)) {
            var qs = PhonegapBuildOauth.getQueryString(url);
            if (qs['code']) {
                authWindow.close();

                cordova.exec(function(a) {
                    success({ access_token: a.access_token });
                }, function(a) {
                    console.log("Auth failure: " + a.message);
                    failure({ error: a.message });
                }, "PhonegapBuildOauth", "authorizeByCode", [qs['code']]);

            } else if (qs['error']) {
                authWindow.close();
                console.log("Auth failure: " + a.message);
                alert('authorization failed');
            }
        }
    });

	},

	getQueryString: function(url) {
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



};

module.exports = PhonegapBuildOauth;