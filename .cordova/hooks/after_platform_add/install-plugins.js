#!/usr/bin/env node

var plugins = [
    "org.apache.cordova.device",
    "org.apache.cordova.file",   
    "org.apache.cordova.battery-status",
    "org.apache.cordova.camera",
    "org.apache.cordova.console",
    "org.apache.cordova.contacts",
    "org.apache.cordova.device-motion",
    "org.apache.cordova.device-orientation",
 	"org.apache.cordova.dialogs", 
    "org.apache.cordova.file-transfer", 
    "org.apache.cordova.geolocation",
    "org.apache.cordova.globalization", 
	"org.apache.cordova.inappbrowser", 
	"org.apache.cordova.media", 
	"org.apache.cordova.media-capture", 
	"org.apache.cordova.network-information", 
	"org.apache.cordova.splashscreen", 
	"org.apache.cordova.statusbar", 
	"org.apache.cordova.vibration",
	"https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin.git",
	"https://github.com/Adobe-Marketing-Cloud/mobile-services"
];
 
// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
 
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}
 
plugins.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});