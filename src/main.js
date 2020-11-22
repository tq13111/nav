$(function () {
  const $siteList = $(".siteList");
  const $lastLi = $siteList.find("li.last");
  // 绑定添加事件
  $(".addButton").on("click", (e) => {
    let url = window.prompt("请输入想要添加的网址:"); //提示用户进行输入的对话框
    if (url && url.indexOf("https://") === -1) {
      url = "https://" + url;
    }
    let logo = simplify(url)[0];
    let img = url + "/favicon.ico";
    let repeat = false;
    hashMap.forEach((ele) => {
      if (url && ele.url === url) {
        repeat = true;
        window.alert("已有该站点，请重新输入。");
      }
    });
    if (!repeat) {
      hashMap.push({
        logo: logo,
        img: img,
        type: "img",
        url: url,
      });
    }

    render();
  });
  //从 localStorage 获取最新数据
  const newHashMap = JSON.parse(localStorage.getItem("x"));
  //用数组储存原始数据
  const hashMap = newHashMap || [
    {
      logo: "M",
      type: "img",
      img: "https://developer.mozilla.org/favicon.ico",
      url: "https://developer.mozilla.org/zh-CN/",
    },
    {
      logo: "C",
      type: "img",
      img: "https://caniuse.com/img/favicon-128.png",
      url: "https://caniuse.com",
    },
    {
      logo: "R",
      type: "img",
      img: "http://www.ruanyifeng.com/favicon.ico",
      url: "http://www.ruanyifeng.com/blog/",
    },
  ];
  //简化 url 函数
  const simplify = (url) => {
    if (url === "https://developer.mozilla.org/zh-CN/") {
      url = "MDN官网";
    } else if (url === "http://www.ruanyifeng.com/blog/") {
      url = "阮一峰博客";
    }
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, "");
  };
  //封装渲染函数
  const render = () => {
    $siteList.find("li:not(.last)").remove();
    
    hashMap.forEach((node, index) => {
      let $Li;
      if (node.type === "img") {
        $Li = $(`<li>
        <a href="${node.url}">
          <div class="site">
              <div class="logo">
                <img src="${node.img}" alt="">
              </div>
              <span class="link">${simplify(node.url)}</span>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
        </a>
      </li>`).insertBefore($lastLi);
      } else if (node.type === "test") {
        $Li = $(`<li>
        <a href="${node.url}">
          <div class="site">
              <div class="logo">${node.logo.toUpperCase()}</div>
              <span class="link">${simplify(node.url)}</span>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
        </a>
      </li>`).insertBefore($lastLi);
      }
      $Li &&
        $Li.on("click", ".close", (e) => {
          e.preventDefault();
          hashMap.splice(index, 1);
          render();
        }) &&
        //图片请求失败处理
        $("img").on("error", (e) => {
          hashMap[index].type = "test";
          render();
        });
    });
  };
  render();

  // 添加键盘跳转事件
  $(document).on("keypress", (e) => {
    console.log(String.fromCharCode(e.charCode));
    hashMap.forEach((ele) => {
      console.log(ele.logo);
      if (ele.logo.toLowerCase() === String.fromCharCode(e.charCode)) {
        window.open(ele.url, "_self");
      }
    });
  });
  //阻止 input 冒泡
  $("input").on("keypress", (e) => {
    e.stopPropagation();
  });
  // 跳转时将数据保存到 localStorage
  window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
  };
  $('.wrapper').hide()
});
  // 淡入淡出
window.onload = function () {
  $(".wrapper").fadeIn(3000);
};