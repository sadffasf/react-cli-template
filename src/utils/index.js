/*URL 相关*/

/*URL 参数转对象 */
export function parseQueryString(url) {
  url = url ? url : window.location.search;
  let search = url[0] === "?" ? url : url.substring(url.lastIndexOf("?"));
  let q = {};
  search.replace(
    /([^?&=]+)=([^&]+)/g,
    (_, k, v) => (q[k] = decodeURIComponent(v))
  );
  return q;
}
/*URL 获取URL参数 */
export function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return decodeURI(r[2]);
  }
  return null;
}

/*获取URL hash后面的参数*/
export const getHashQueryString = (key) => {
  const after = window.location.href.split("?")[1];
  if (after) {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
    const r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  }
  return null;
};

/*判断是否IOS*/
export const isIOS = (() => {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
})();

/*判断是否安卓*/
export const isAndroid = (() => {
  return /android/.test(navigator.userAgent.toLowerCase());
})();

//判断是否微信内置浏览器
export function isWeiXin() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

//判断浏览器是否是移动端
export function isMobile() {
  const agent = navigator.userAgent;
  const k = [
    "android",
    "iphone",
    "ipod",
    "ipad",
    "windows phone",
    "mqqbrowser",
  ];
  let flag = false;
  // Windows
  if (
    agent.indexOf("Windows NT") < 0 ||
    (agent.indexOf("Windows NT") >= 0 &&
      agent.indexOf("compatible; MSIE 9.0;") >= 0)
  ) {
    // Mac PC
    if (agent.indexOf("Windows NT") < 0 && agent.indexOf("Macintosh") < 0) {
      for (let item of k) {
        if (agent.indexOf(item) >= 0) {
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
}

/* ----------文件类型判断------------*/

export function checkFileName(fileName, list) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return list.some((i) => name.endsWith(`.${i}`) === true);
}

export function isImage(fileName) {
  return checkFileName(fileName, ["png", "jpeg", "jpg", "png", "bmp"]);
}

export function isH5Video(fileName) {
  return checkFileName(fileName, ["mp4", "webm", "ogg"]);
}
export function isPdf(fileName) {
  return checkFileName(fileName, ["pdf"]);
}

export function isWord(fileName) {
  return checkFileName(fileName, ["doc", "docx"]);
}

export function isExcel(fileName) {
  return checkFileName(fileName, ["xlsx", "xls"]);
}

//图片相关
//base64转Buffer
export function dataURItoBuffer(dataURI) {
  let byteString = atob(dataURI.split(",")[1]);
  let buffer = new ArrayBuffer(byteString.length);
  let view = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i);
  }
  return buffer;
}
//base64转Blob
export function dataURItoBlob(dataURI) {
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  let buffer = dataURItoBuffer(dataURI);
  return new Blob([buffer], {
    type: mimeString,
  });
}

//调整拍照图片方向

//复制文本
export function copy(value, callback) {
  if (!document.queryCommandSupported("copy")) {
    callback(false);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.readOnly = Boolean("readOnly");
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  document.execCommand("copy");
  textarea.remove();
  callback(true);
}

//动态加载第三方js
export function asyncLoadScript(url) {
  return new Promise(function (resolve, reject) {
    const tag = document.getElementsByTagName("script");
    for (const i of tag) {
      if (i.src === url) {
        resolve();
        return;
      }
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onerror = reject;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
}

//动态创建form表单导出数据(POST)
const postExport = (url, data = {}) => {
  const form = document.createElement("form");
  form.style.display = "none";
  form.action = `${url}`;
  form.method = "post";
  document.body.appendChild(form);
  // 动态创建input并给value赋值
  for (const key in data) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }
  form.submit();
  form.remove();
};

//获取指定 Cookie 值
export const getCookie = (k) => {
  const res = RegExp("(^|; )" + encodeURIComponent(k) + "=([^;]*)").exec(
    document.cookie
  );
  return res && res[2];
};
//设置 Cookie 值
export function setCookie(name, value, expriesDays, encode = false) {
  let Days = expriesDays || 10;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  const val = encode ? escape(value) : value;
  document.cookie =
    name +
    "=" +
    val +
    ";domain=zhuanzhuan.com;path=/;expires=" +
    exp.toUTCString();
}

//数字每千位加逗号
export function toThousands(num) {
  return (
    num &&
    num.toString().replace(/\d+/, function (s) {
      return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    })
  );
}
//对象转url字符串供导出接口(GET)使用
const objectToQueryString = (paramObj) => {
  const tmpArray = [];
  // 特殊字符转义
  const filter = (str) => {
    str += ""; // 隐式转换
    str = str.replace(/%/g, "%25");
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/ /g, "%20");
    str = str.replace(/\//g, "%2F");
    str = str.replace(/\?/g, "%3F");
    str = str.replace(/&/g, "%26");
    str = str.replace(/\=/g, "%3D");
    str = str.replace(/#/g, "%23");
    return str;
  };
  for (const attr in paramObj) {
    tmpArray.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return tmpArray.join("&");
};

//函数防抖
export function debounce(fn, delay) {
  delay = delay || 1000;
  let timer = null;
  return function () {
    let context = this;
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, arg);
    }, delay);
  };
}

//节流函数
export function throttle(fn, delay = 300) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        clearTimeout(timer);
      }, delay);
    }
  };
}
/*深拷贝*/
export const deepClone = (target) => {
  // 使用万能检测数据的方法检测数据
  const type = Object.prototype.toString.call(target);
  // #1 日期或正则，'[Object date]' / '[Object regexp]'
  if (/(date|regexp)/i.test(type)) return new target.constructor(target);
  // #2 错误对象，'[Object error]'
  if (/error/i.test(type)) return new target.constructor(target.message);
  // #3 函数，'[Object function]'
  if (/function/i.test(type))
    return new Function("return " + target.toString())();
  // #4 简单数据类型
  if (target === null || typeof target !== "object") return target;
  // #5 数组或对象
  const result = new target.constructor();
  for (let attr in target) {
    result[attr] = clone(target[attr]);
  }
  return result;
};
//转义html标签
export function HtmlEncode(text) {
  return text
    .replace(/&/g, "&")
    .replace(/\"/g, '"')
    .replace(/</g, "<")
    .replace(/>/g, ">");
}
// 平行数据转嵌套树
export function listToTree(tempData) {
  // 删除所有的children,以防止多次调用
  let map = {}; // 构建map
  tempData.forEach(function (item) {
    delete item.children;
    map[item.id] = item; // 构建以id为键 当前数据为值
    map["children"] = [];
  });
  let treeData = [];
  tempData.forEach((child) => {
    const mapItem = map[child.pid]; // 判断当前数据的pid是否存在map中
    if (mapItem) {
      // 存在则表示当前数据不是最顶层的数据
      // 注意： 这里的map中的数据是引用了tempData的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
      (mapItem.children || (mapItem.children = [])).push(child); // 这里判断mapItem中是否存在child
    } else {
      // 不存在则是顶层数据
      treeData.push(child);
    }
  });
  return treeData;
}

// 树形数据转平行数据,运用参数缓存结果
export function treeToList(data, pid = "", list = []) {
  // 树形数据转换成平行数据
  data.forEach((item, index) => {
    list.push(Object.assign(item, { pid: pid }));
    if (Array.isArray(item.children) && item.children.length) {
      this.treeToList(item.children, item.id, list);
    }
  });
  return list;
}

// 金额大写
export function digitUppercase(money) {
  // 汉字的数字
  let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  // 基本单位
  let cnIntRadice = ["", "拾", "佰", "仟"];
  // 对应整数部分扩展单位
  let cnIntUnits = ["", "万", "亿", "兆"];
  // 对应小数部分单位
  let cnDecUnits = ["角", "分", "毫", "厘"];
  // 整数金额时后面跟的字符
  let cnInteger = "整";
  // 整型完以后的单位
  let cnIntLast = "元";
  // 最大处理的数字
  let maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  // 分离金额后用的数组，预定义
  let parts;
  let chineseStr = money < 0 ? "欠" : "";
  money = (money + "")
    .split("")
    .filter((item, index) => {
      return new RegExp("^[0-9.]$").test(item);
    })
    .join("");
  if (money === "") {
    return "";
  }
  money = Math.abs(money) + "";
  if (money >= maxNum) {
    // 超出最大处理数字
    return "";
  }
  if (money === 0) {
    chineseStr = chineseStr + (cnNums[0] + cnIntLast + cnInteger);
    return chineseStr;
  }
  // 转换为字符串
  if (money.indexOf(".") === -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum !== "") {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n !== "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr === "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === "") {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

/**
 * 随机生成一个自定义长度，不重复的字母加数字组合，可用来做id标识
 *
 * @param {Number} randomLength 可选长度位数，默认10
 * @return {String} 返回随机值
 *
 */
export const randomId = (randomLength = 10) => {
  return Number(
    Math.random().toString().substr(3, randomLength) + Date.now()
  ).toString(36);
};

/**
 * 文件大小换算成单位
 *
 * @param {Number} bytes 大小
 * @param {String} units 可选单位，默认metric
 * @param {Number} precision 可选位数，数值精度保留几位小数点，默认1
 * @return {String} 返回带单位值，byteSize(1580)，输出1.6 kB
 *
 */
export const byteSize = (bytes, units = "metric", precision = 1) => {
  let value = "",
    unit = "";
  const base = units === "metric" || units === "metric_octet" ? 1000 : 1024;
  const table = [
    {
      expFrom: 0,
      expTo: 1,
      metric: "B",
      iec: "B",
      metric_octet: "o",
      iec_octet: "o",
    },
    {
      expFrom: 1,
      expTo: 2,
      metric: "kB",
      iec: "KiB",
      metric_octet: "ko",
      iec_octet: "Kio",
    },
    {
      expFrom: 2,
      expTo: 3,
      metric: "MB",
      iec: "MiB",
      metric_octet: "Mo",
      iec_octet: "Mio",
    },
    {
      expFrom: 3,
      expTo: 4,
      metric: "GB",
      iec: "GiB",
      metric_octet: "Go",
      iec_octet: "Gio",
    },
    {
      expFrom: 4,
      expTo: 5,
      metric: "TB",
      iec: "TiB",
      metric_octet: "To",
      iec_octet: "Tio",
    },
    {
      expFrom: 5,
      expTo: 6,
      metric: "PB",
      iec: "PiB",
      metric_octet: "Po",
      iec_octet: "Pio",
    },
    {
      expFrom: 6,
      expTo: 7,
      metric: "EB",
      iec: "EiB",
      metric_octet: "Eo",
      iec_octet: "Eio",
    },
    {
      expFrom: 7,
      expTo: 8,
      metric: "ZB",
      iec: "ZiB",
      metric_octet: "Zo",
      iec_octet: "Zio",
    },
    {
      expFrom: 8,
      expTo: 9,
      metric: "YB",
      iec: "YiB",
      metric_octet: "Yo",
      iec_octet: "Yio",
    },
  ];

  for (let i = 0; i < table.length; i++) {
    const lower = Math.pow(base, table[i].expFrom);
    const upper = Math.pow(base, table[i].expTo);
    if (bytes >= lower && bytes < upper) {
      const retUnit = table[i][units];
      if (i === 0) {
        value = String(bytes);
        unit = retUnit;
        break;
      } else {
        value = (bytes / lower).toFixed(precision);
        unit = retUnit;
        break;
      }
    }
  }
  return `${value} ${unit}`.trim();
};
