#!/usr/bin/env node

var filestocopy = [

// ios 
{
    "resources/splash/ios/Default-568h@2x~iphone.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default-568h@2x~iphone.png"
}, {
    "resources/splash/ios/Default-Landscape@2x~ipad.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default-Landscape@2x~ipad.png"
}, {
    "resources/splash/ios/Default-Landscape~ipad.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default-Landscape~ipad.png"
}, {
    "resources/splash/ios/Default-Portrait@2x~ipad.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default-Portrait@2x~ipad.png"
}, {
    "resources/splash/ios/Default-Portrait~ipad.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default-Portrait~ipad.png"
}, {
    "resources/splash/ios/Default.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default.png"
}, {
    "resources/splash/ios/Default@2x~ipad.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default@2x~ipad.png"
}, {
    "resources/splash/ios/Default@2x~iphone.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default@2x~iphone.png"
}, {
    "resources/splash/ios/Default~iphone.png": 
    "platforms/ios/PhoneGap/Resources/splash/Default~iphone.png"
}, {
    "resources/icon/ios/icon-40.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-40.png"
}, {
    "resources/icon/ios/icon-40@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-40@2x.png"
}, {
    "resources/icon/ios/icon-50.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-50.png"
}, {
    "resources/icon/ios/icon-50@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-50@2x.png"
}, {
    "resources/icon/ios/icon-60.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-60.png"
}, {
    "resources/icon/ios/icon-60@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-60@2x.png"
}, {
    "resources/icon/ios/icon-72.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-72.png"
}, {
    "resources/icon/ios/icon-72@2x.png":
    "platforms/ios/PhoneGap/Resources/icons/icon-72@2x.png"
}, {
    "resources/icon/ios/icon-76.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-76.png"
}, {
    "resources/icon/ios/icon-76@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-76@2x.png"
}, {
    "resources/icon/ios/icon-small.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-small.png"
}, {
    "resources/icon/ios/icon-small@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon-small@2x.png"
}, {
    "resources/icon/ios/icon.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon.png"
}, {
    "resources/icon/ios/icon@2x.png": 
    "platforms/ios/PhoneGap/Resources/icons/icon@2x.png"
},  

// android
{
    "resources/icon/android/icon-96.png": 
    "platforms/android/res/drawable/icon.png"
}, {
    "resources/icon/android/icon-72.png": 
    "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "resources/icon/android/icon-36.png": 
    "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "resources/icon/android/icon-48.png": 
    "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "resources/icon/android/icon-96.png": 
    "platforms/android/res/drawable-xhdpi/icon.png"
}, 

// wp8
{
    "resources/icon/wp8/ApplicationIcon": 
    "platforms/wp8/ApplicationIcon.png"
}, {
    "resources/icon/wp8/TileMedium.png.png": 
    "platforms/wp8/TileMedium.png"
}, {
    "resources/icon/wp8/TileSmall.png": 
    "platforms/wp8/TileSmall.png"
}
];
 
var fs = require('fs');
var path = require('path');
 
// no need to configure below
var rootdir = process.argv[2];
 
filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) &amp;&amp; fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(
               fs.createWriteStream(destfile));
        }
    });
});