import { bootstrap, importApp, mount, unmount } from "./import-html-entry.js";
import { getApps } from "./micro-app.js";

let prevRoute = "";
let currentRoute = window.location.pathname;

const getPrevRoute = () => prevRoute;
const getCurrentRoute = () => currentRoute;

function watchRouteChange() {
  // 监听浏览器路由变化
  window.addEventListener("popstate", () => {
    // 找到微应用配置中路由对应的子应用
    prevRoute = currentRoute;
    currentRoute = location.pathname;
    handleRouter();
  });
  const originPushState = window.history.pushState;
  window.history.pushState = function () {
    prevRoute = location.pathname;
    originPushState.apply(window.history, arguments);
    currentRoute = location.pathname;
    handleRouter();
  };

  const originReplaceState = window.history.replaceState;
  window.history.replaceState = function () {
    prevRoute = location.pathname;
    originReplaceState.apply(window.history, arguments);
    currentRoute = location.pathname;
    handleRouter();
  };
}

/**
 * router变化时的处理函数
 * 1. 匹配微应用配置中路由对应的子应用
 * 2. 把子应用挂载到指定的容器中
 * 3. 获取子应用的js文件，并执行
 */
function handleRouter() {
  const apps = getApps();
  // 找到微应用配置中路由对应的子应用
  if (window.location.pathname === "/") return;
  const app = apps.find(
    (app) => getCurrentRoute().indexOf(app.activeRule) > -1
  );
  if (app) {
    // 获取子应用的html
    // 把子应用挂载到指定的容器中
    // 解析出html的js，然后执行
    // 执行子应用的mount钩子
    importApp(app.entry).then(async (res) => {
      const container = document.querySelector(app.container);
      if (container) {
        if (getPrevRoute() !== getCurrentRoute()) {
          unmount({ container });
        }
        container.appendChild(res.template);
        await res.executeScripts();
        await mount();
      }
    });
  }
}

export { watchRouteChange, handleRouter };
