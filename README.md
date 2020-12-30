# ISSUS

forge 没有不同 env 的 webpack 配置。可以使用 process.env [解决](https://github.com/electron-userland/electron-forge/issues/905#issuecomment-547960068)
但 webpack "mode" 配置方案更好

forge 没有使用 babel 编译 ts，而是用了 ts-loader。是否是满足需求待定。

[关于阻塞 UI 线程](https://github.com/electron/electron/issues/12098)：
[方案](https://github.com/jlongster/electron-with-server-example) 即使 5.x 版本真的解决了 block 渲染线程的问题（可以用 git/npm 测试），把主要的 node 线程任务拆分出 elretorn 主线程依然是非常有必要的。elretorn 除了 UI 以外还有很多工作：任务栏菜单、快捷键、通知...还有 npm/git 任务崩溃的时候...
与 webpack [集成方案参考](https://github.com/jlongster/electron-with-server-example/issues/6#issuecomment-611617665)：
