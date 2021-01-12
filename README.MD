# VK Params &middot; [![npm version](https://img.shields.io/npm/v/@zardoy/vk-params?color=limegreen)](https://npmjs.com/package/@zardoy/vk-params) [![GitHub top language](https://img.shields.io/github/languages/top/zardoy/vk-params)](https://github.com/zardoy/vk-params/tree/master/src) [![gitmoji badge](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://github.com/carloscuesta/gitmoji) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A small helper for working with VK [launch params [ru]](https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0). Useful for **vk-mini-apps**.

## Usage

```ts
import { vkGetParam } from "@zardoy/vk-params";

// No vk_ prefix needed
vkGetParam("app_id");
//=> 6739175

vkGetParam("are_notifications_enabled");
//=> false
```

## API

### `vkGetParam(param)`

- param: name of param to get. Use without *_vk* prefix. [A full list of params [ru]](https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0).

Return value depends on param argument.

It is important to know, that if appropriate param in url doesn't exist this function will [throw an Error](https://github.com/zardoy/vk-params/blob/b73581e07f2fe11771fdc6ceb4d6b087a3451aff/src/index.ts#L29).

### `vkIsDesktopVersion(): boolean`

Shortcut for `vkGetParam("platform") === "desktop_web"`.

### `paramNames`

Array of names all VK launch params.

### `nullableParamNames`

Same as previous, but contains only params that may not exist in url.

## Things to note

- If you are using *React*, you should use [Error Boundary](https://ru.reactjs.org/docs/error-boundaries.html) in the root of your app.
- For proper typings support, use TypeScript v4 or higher.

[Stats, file list and more package details](https://yarnpkg.com/package/@zardoy/vk-params)

*Please*, let me know if you find a better alternative to this module.
