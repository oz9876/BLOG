/**
 * WebViewJavascriptBridge 说明
 * 从app中获取参数 'js_commentParameter'
 * 'js_analytics'
 * 复制 'js_copy'
 * 关闭 'js_closeWindow'
 * 切换账号 'js_switchAccount'
 * 充值 'js_catPointRecharge'
 * 'js_openApp'
 * 'js_noToken'
 * ‘js_backIndex’
 */
// (function() {
//     if (window.WebViewJavascriptBridge) {
//         return;
//     }

//     var messagingIframe;
//     var sendMessageQueue = [];
//     var receiveMessageQueue = [];
//     var messageHandlers = {};

//     var CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme';
//     var QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__';

//     var responseCallbacks = {};
//     var uniqueId = 1;

//     var base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//     function base64encode(str) {
//         if (str === undefined) {
//             return str;
//         }

//         var out, i, len;
//         var c1, c2, c3;
//         len = str.length;
//         i = 0;
//         out = "";
//         while (i < len) {
//             c1 = str.charCodeAt(i++) & 0xff;
//             if (i == len) {
//                 out += base64encodechars.charAt(c1 >> 2);
//                 out += base64encodechars.charAt((c1 & 0x3) << 4);
//                 out += "==";
//                 break;
//             }
//             c2 = str.charCodeAt(i++);
//             if (i == len) {
//                 out += base64encodechars.charAt(c1 >> 2);
//                 out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
//                 out += base64encodechars.charAt((c2 & 0xf) << 2);
//                 out += "=";
//                 break;
//             }
//             c3 = str.charCodeAt(i++);
//             out += base64encodechars.charAt(c1 >> 2);
//             out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
//             out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
//             out += base64encodechars.charAt(c3 & 0x3f);
//         }
//         return out;
//     }


//     function _createQueueReadyIframe(doc) {
//         messagingIframe = doc.createElement('iframe');
//         messagingIframe.style.display = 'none';
//         doc.documentElement.appendChild(messagingIframe);
//     }

//     function isAndroid() {
//         var ua = navigator.userAgent.toLowerCase();
//         var isA = ua.indexOf("android") > -1;
//         if (isA) {
//             return true;
//         }
//         return false;
//     }

//     function isIphone() {
//         var ua = navigator.userAgent.toLowerCase();
//         var isIph = ua.indexOf("iphone") > -1;
//         if (isIph) {
//             return true;
//         }
//         return false;
//     }

//     //set default messageHandler
//     function init(messageHandler) {
//         if (WebViewJavascriptBridge._messageHandler) {
//             throw new Error('WebViewJavascriptBridge.init called twice');
//         }
//         WebViewJavascriptBridge._messageHandler = messageHandler;
//         var receivedMessages = receiveMessageQueue;
//         receiveMessageQueue = null;
//         for (var i = 0; i < receivedMessages.length; i++) {
//             _dispatchMessageFromNative(receivedMessages[i]);
//         }
//     }

//     function send(data, responseCallback) {
//         _doSend({
//             data: data
//         }, responseCallback);
//     }

//     function registerHandler(handlerName, handler) {
//         messageHandlers[handlerName] = handler;
//     }

//     function callHandler(handlerName, data, responseCallback) {
//         _doSend({
//             handlerName: handlerName,
//             data: data
//         }, responseCallback);
//     }

//     //sendMessage add message, 触发native处理 sendMessage
//     function _doSend(message, responseCallback) {
//         if (responseCallback) {
//             var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
//             responseCallbacks[callbackId] = responseCallback;
//             message.callbackId = callbackId;
//         }

//         sendMessageQueue.push(message);
//         messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
//     }

//     // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url shouldOverrideUrlLoading 的方式返回内容
//     function _fetchQueue() {
//         var messageQueueString = JSON.stringify(sendMessageQueue);
//         sendMessageQueue = [];
//         //add by hq
//         if (isIphone()) {
//             return messageQueueString;
//             //android can't read directly the return data, so we can reload iframe src to communicate with java
//         } else if (isAndroid()) {
//             messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString);
//         }
//     }

//     //提供给native使用,
//     function _dispatchMessageFromNative(messageJSON) {
//         setTimeout(function() {
//             var message = JSON.parse(messageJSON);
//             var responseCallback;
//             //java call finished, now need to call js callback function
//             if (message.responseId) {
//                 responseCallback = responseCallbacks[message.responseId];
//                 if (!responseCallback) {
//                     return;
//                 }
//                 responseCallback(message.responseData);
//                 delete responseCallbacks[message.responseId];
//             } else {
//                 //直接发送
//                 if (message.callbackId) {
//                     var callbackResponseId = message.callbackId;
//                     responseCallback = function(responseData) {
//                         _doSend({
//                             responseId: callbackResponseId,
//                             responseData: responseData
//                         });
//                     };
//                 }

//                 var handler = WebViewJavascriptBridge._messageHandler;
//                 if (message.handlerName) {
//                     handler = messageHandlers[message.handlerName];
//                 }
//                 //查找指定handler
//                 try {
//                     handler(message.data, responseCallback);
//                 } catch (exception) {
//                     if (typeof console != 'undefined') {
//                         console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception);
//                     }
//                 }
//             }
//         });
//     }

//     //提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
//     function _handleMessageFromNative(messageJSON) {
//         // console.log(messageJSON);
//         if (receiveMessageQueue) {
//             receiveMessageQueue.push(messageJSON);
//         } else {
//             _dispatchMessageFromNative(messageJSON);
//         }
//     }

//     var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
//         init: init,
//         send: send,
//         registerHandler: registerHandler,
//         callHandler: callHandler,
//         _fetchQueue: _fetchQueue,
//         _handleMessageFromNative: _handleMessageFromNative,
//         _handleMessageFromObjC: _handleMessageFromNative
//     };

//     var doc = document;
//     _createQueueReadyIframe(doc);
//     var readyEvent = doc.createEvent('Events');
//     readyEvent.initEvent('WebViewJavascriptBridgeReady');
//     readyEvent.bridge = WebViewJavascriptBridge;
//     doc.dispatchEvent(readyEvent);
// })();
!function(){function e(e){o=e.createElement("iframe"),o.style.display="none",o.src=p+"://"+u,e.documentElement.appendChild(o)}function a(e){if(WebViewJavascriptBridge._messageHandler)throw new Error("WebViewJavascriptBridge.init called twice");WebViewJavascriptBridge._messageHandler=e;var a=v;v=null;for(var n=0;n<a.length;n++)c(a[n])}function n(e,a){t({data:e},a)}function i(e,a){f[e]=a}function r(e,a,n){t({handlerName:e,data:a},n)}function t(e,a){if(a){var n="cb_"+w++ +"_"+(new Date).getTime();g[n]=a,e.callbackId=n}l.push(e),o.src=p+"://"+u}function s(){var e=JSON.stringify(l);return l=[],e}function c(e){setTimeout(function(){var a,n=JSON.parse(e);if(n.responseId){if(a=g[n.responseId],!a)return;a(n.responseData),delete g[n.responseId]}else{if(n.callbackId){var i=n.callbackId;a=function(e){t({responseId:i,responseData:e})}}var r=WebViewJavascriptBridge._messageHandler;n.handlerName&&(r=f[n.handlerName]);try{r(n.data,a)}catch(s){"undefined"!=typeof console&&console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.",n,s)}}})}function d(e){v?v.push(e):c(e)}if(!window.WebViewJavascriptBridge){var o,l=[],v=[],f={},p="wvjbscheme",u="__WVJB_QUEUE_MESSAGE__",g={},w=1;window.WebViewJavascriptBridge={init:a,send:n,registerHandler:i,callHandler:r,_fetchQueue:s,_handleMessageFromObjC:d};var b=document;e(b);var h=b.createEvent("Events");h.initEvent("WebViewJavascriptBridgeReady"),h.bridge=WebViewJavascriptBridge,b.dispatchEvent(h)}}();
WebViewJavascriptBridge.init(function (response, responseCallback) {
    responseCallback();
});