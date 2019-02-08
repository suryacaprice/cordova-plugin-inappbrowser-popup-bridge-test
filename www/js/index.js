var URL = "iab.html";

var webView, iabOpts, useIAB, osVersion, iab;

function log(msg){
    console.log(msg);
    $('#log').append("<p>"+msg+"</p>");
}

function openIAB(){
    var target = useIAB ? '_blank' : '_system';
    iab = cordova.InAppBrowser.open(URL, target, iabOpts);

    iab.addEventListener('loadstart', function(e) {
        log("received 'loadstart' for URL: "+ e.url);
    });
    iab.addEventListener('loadstop', function(e) {
        log("received 'loadstop' for URL: "+ e.url);
        testInjection();
    });
    iab.addEventListener('loaderror', function(e) {
        log("received 'loaderror' for URL: "+ e.url);
    });
}

function testInjection(){

}

function onDeviceReady(){
    console.log("deviceready");

    osVersion = parseFloat(device.version);

    if( device.platform === "iOS" ) {
        iabOpts = 'location=no,toolbar=no,disallowoverscroll=yes,zoom=no,transitionstyle=crossdissolve';
        if(window.webkit && window.webkit.messageHandlers ) {
            webView = "WKWebView" ;
        }else{
            webView = "UIWebView" ;
        }

        useIAB = osVersion >= 9 && webView === "WKWebView";

    }else{
        iabOpts = 'location=no';
        if(navigator.userAgent.toLowerCase().indexOf('crosswalk') > -1) {
            webView = "Crosswalk" ;
        } else {
            webView = "System" ;
        }
        useIAB = osVersion >= 4.4;
    }

    $('#platform').html(device.platform + " " + device.version);
    $('#webview').html(webView);
    $('#popupbridge').html(useIAB ? "YES" : "NO");
}

$(document).on('deviceready', onDeviceReady);
