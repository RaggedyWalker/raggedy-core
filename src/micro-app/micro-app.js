import { handleRouter, watchRouteChange } from "./watch-router.js";

/**
 * 1. 监听浏览器路由的变化
 * 2. 匹配微应用配置中路由对应的子应用
 * 3. 把子应用挂载到指定的容器中
 * 4. 获取子应用的js文件，并执行
 * /


/**
 * @type {Array<{ name: string, entry: string, container: string, activeRule: string }>} apps
 */
let apps = [];

const getApps = () => apps;

function registryMicroApp(microAppConfig) {
  apps = microAppConfig;
}

function start() {
  window["__POWER_BY_QIANKUN__"] = true;
  watchRouteChange();
  handleRouter();
}

export { getApps, registryMicroApp, start };

/* function getExecutableScript(scriptSrc, scriptText, proxy, strictGlobal) {
  const sourceUrl = isInlineCode(scriptSrc)
    ? ""
    : `//# sourceURL=${scriptSrc}\n`;

  window.proxy = proxy;
  return strictGlobal
    ? `;(function(window, self){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy);`
    : `;(function(window, self){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy);`;
} */
