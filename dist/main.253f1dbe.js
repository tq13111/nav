// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last"); // 绑定添加事件

$(".addButton").on("click", function (e) {
  var url = window.prompt("请输入想要添加的网址:"); //提示用户进行输入的对话框

  if (url.indexOf("https://") === -1) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplify(url)[0],
    url: url
  });
  render();
}); //从 localStorage 获取最新数据

var newHashMap = JSON.parse(localStorage.getItem("x")); //用数组储存原始数据

var hashMap = newHashMap || [{
  logo: "M",
  url: "https://developer.mozilla.org/zh-CN/"
}, {
  logo: "C",
  url: "https://caniuse.com"
}, {
  logo: "R",
  url: "http://www.ruanyifeng.com/blog/"
}]; //简化 url 函数

var simplify = function simplify(url) {
  if (url === "https://developer.mozilla.org/zh-CN/") {
    url = "MDN官网";
  } else if (url === "http://www.ruanyifeng.com/blog/") {
    url = "阮一峰博客";
  }

  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
}; //封装渲染函数


var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $Li = $("<li>\n        <a href=\"".concat(node.url, "\">\n          <div class=\"site\">\n              <div class=\"logo\">").concat(node.logo.toUpperCase(), "</div>\n              <span class=\"link\">").concat(simplify(node.url), "</span>\n              <div class=\"close\">\n                <svg class=\"icon\">\n                  <use xlink:href=\"#icon-close\"></use>\n                </svg>\n              </div>\n            </div>\n        </a>\n      </li>")).insertBefore($lastLi);
    $Li.on("click", ".close", function (e) {
      e.preventDefault();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); // 添加键盘跳转事件

$(document).on("keypress", function (e) {
  console.log(String.fromCharCode(e.charCode));
  hashMap.forEach(function (ele) {
    console.log(ele.logo);

    if (ele.logo.toLowerCase() === String.fromCharCode(e.charCode)) {
      window.open(ele.url, "_self");
    }
  });
}); // 跳转时将数据保存到 localStorage

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
}; //懒加载背景图


var img = new Image();
img.src = "./images/bgc.jpg";

img.onload = function (e) {
  document.body.style.background = "url(./images/bgc.jpg) no-repeat center center fixed ";
  document.body.style.backgroundSize = 'cover';
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.253f1dbe.js.map