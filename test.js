'use strict';
/*global module, process*/

var testThen = (function(){function s(d){return null===d||"undefined"===typeof d}function n(d){return"function"===typeof d}function p(d,a,g){return Error("Argument "+d+' in "'+g+'" function is not a '+a+"!")}function t(d,a,g,k){function f(a,h,r){b-=1;l[a]=r;b&&s(h)||d(h,l)}var c,e,b,l=[];if(u(a))if(n(g))for(b=e=a.length,c=0;c<e;c++)g.call(k,f.bind(null,c),a[c],c,a);else d(p(g,"function","each"));else d(p(a,"array","each"))}function w(d,a,g,k){function f(l,q){b[e]=q;e+=1;e<c&&s(l)?g.call(k,f,a[e],e,a):(delete b[-1],
d(l,b))}var c,e=-1,b=[];u(a)?n(g)?(c=a.length,f()):d(p(g,"function","eachSeries")):d(p(a,"array","eachSeries"))}function x(d,a,g){function k(a,q,h){e-=1;b[a]=h;e&&s(q)||d(q,b)}var f,c,e,b=[];if(u(a)){e=c=a.length;for(f=0;f<c;f++)n(a[f])?a[f].call(g,k.bind(null,f)):(e-=1,b[f]=a[f]);e||d(null,b)}else d(p(a,"array","parallel"))}function y(d,a,g){function k(b,l){e[c]=l;c+=1;c<f&&s(b)?n(a[c])?a[c].call(g,k):k(null,a[c]):(delete e[-1],d(b,e))}var f,c=-1,e=[];u(a)?(f=a.length,k()):d(p(a,"array","parallel"))}
function m(d){function a(a,h){var r=new e,b=r.defer.bind(r);b._next_then=r;a(b,h);return r}function g(a,h){return n(h)?h._next_then?h:h.bind(null,a):null}function k(q){return function(h,b,c){return a(function(a){l(q.bind(null,a,h,b,c))})}}function f(b){return function(h,c){return a(function(a){l(b.bind(null,a,h,c))})}}var c=[],e=function(){},b=e.prototype,l="object"===typeof process&&n(process.nextTick)?process.nextTick:setTimeout;b.all=function(b){return a(function(a,c){c._all=g(a,b)},this)};b.then=
function(b,c){return a(function(a,d){d._success=g(a,b);d._error=g(a,c)},this)};b.fail=function(b){return a(function(a,d){d._fail=g(a,b);d._success=a.bind(a,null);d._fail&&c.push(d._fail)},this)};b.each=function(b,c,d){return a(function(a,e){e._each=function(e,f,g){t(a,b||e,c||f,d||g)}},this)};b.eachSeries=function(b,c,d){return a(function(a,e){e._eachSeries=function(e,f,g){t(a,b||e,c||f,d||g)}},this)};b.parallel=function(b,c){return a(function(a,d){d._parallel=function(d,e){t(a,b||d,c||e)}},this)};
b.series=function(b,d){return a(function(a,c){c._series=function(c,e){t(a,b||c,d||e)}},this)};b.defer=function(a){this._error=this._fail?c.shift():this._error;if(this._all)return this._all.apply(this._all._next_then,v.call(arguments));if(s(a))return(this._success=this._success||this._each||this._eachSeries||this._parallel||this._series)&&this._success.apply(this._success._next_then,v.call(arguments,1));if(this._error||c.length)return this._error?this._error(a):c.shift()(a);throw a;};m.each=k(t);m.eachSeries=
k(w);m.parallel=f(x);m.series=f(y);return a(function(a){l(n(d)?d.bind(null,a):a)})}var v=[].slice,u=Array.isArray;"undefined"!==typeof module&&module.exports?module.exports=m:"function"===typeof define&&define(function(){return m});"object"===typeof window&&(window.then=m);return m})();
// TEST begin

function asnycTask(n, callback) {
    setTimeout(function () {
        callback(null, n);
    }, n * 1000);
}

testThen(function (defer) {
    console.log(111);
    asnycTask(1, defer);
}).then(function (defer, a) {
    console.log(222, a);
    asnycTask(2, defer);
}).then(function (defer, a) {
    console.log(333, a);
    asnycTask(3, function (err, b) {
        console.log(3332, err, b);
        defer(null, 'hello!', b);
    });
}).then(function (defer, a, b) {
    console.log(444, a, b);
    defer('Error1!');
}).then(function (defer) {
    console.log(555);
    defer('Error2!');
}).fail(function (defer, err) {
    console.log(666, err);
    defer(null, 'aaa');
}).then(function (defer, a) {
    console.log(777, a);
    defer('Error3!');
}).fail(function (defer, err) {
    console.log(888, err);
});
// TEST end
