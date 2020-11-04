const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
// 绑定添加事件
$(".addButton").on("click", (e) => {
  let url = window.prompt("请输入想要添加的网址:") || ''; //提示用户进行输入的对话框
  if (url.indexOf("https://") === -1) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplify(url)[0],
    url: url,
  });
  render();
});
//从 localStorage 获取最新数据
const newHashMap = JSON.parse(localStorage.getItem("x"));
//用数组储存原始数据
const hashMap = newHashMap || [
  { logo: "M", url: "https://developer.mozilla.org/zh-CN/" },
  { logo: "C", url: "https://caniuse.com" },
  { logo: "R", url: "http://www.ruanyifeng.com/blog/" },
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
    const $Li = $(`<li>
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
    $Li.on("click", ".close", (e) => {
      e.preventDefault();
      hashMap.splice(index, 1);
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
// 跳转时将数据保存到 localStorage
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
//懒加载背景图
// let img = new Image();
// img.src = "./images/bgc.jpg";
// img.onload = (e) => {
//   document.body.style.background =
//     "url(./images/bgc.jpg) no-repeat center center fixed ";
//     document.body.style.backgroundSize= 'cover';

// };
