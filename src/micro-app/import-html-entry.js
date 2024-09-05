// 子应用的hooks
let microAppHooks = {};
/**
 * 微应用初始化调用一次
 */
async function bootstrap() {
  microAppHooks.bootstrap && (await microAppHooks.bootstrap());
}

/**
 * 每次进入微应用执行一次
 *
 * @typedef {Object} Params
 * @property {Element} container
 *
 * @param {Params} params
 */
async function mount(params) {
  microAppHooks.mount && (await microAppHooks.mount(params));
}

/**
 * 每次切出或者卸载微应用执行一次
 *
 * @typedef {Object} Params
 * @property {Element} container
 *
 * @param {Params} params
 */
async function unmount(params) {
  microAppHooks.unmount && (await microAppHooks.unmount(params));
}

async function importApp(url) {
  const html = await fetch(url).then((res) => res.text());
  const template = document.createElement("div");
  template.innerHTML = html;

  const getScripts = () => {
    const scripts = template.querySelectorAll("script");
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (src) {
          const source = src.startsWith("http") ? src : `${url}${src}`;
          return fetch(source).then((res) => res.text());
        } else {
          return Promise.resolve(script.innerHTML);
        }
      })
    );
  };

  /**
   * 执行子应用的script，执行子应用初始化hook
   * @param {*} scriptElements
   */
  const executeScripts = async (scriptElements) => {
    // 伪造module.exports，子应用的umd模块执行完，可以从这里获取子应用的导出
    const module = { exports: {} };
    let exports = module.exports;

    const scripts = await getScripts();
    scripts.forEach((script) => {
      eval(script);
    });
    exports = module.exports;
    microAppHooks = exports;
    await bootstrap();
  };

  return {
    template,
    getScripts,
    executeScripts,
  };
}

export { importApp, bootstrap, mount, unmount };
