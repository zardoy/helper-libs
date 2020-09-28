# VK App Params

This is a small library for working with URL [launch params](https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0) from **vk-mini-apps**.

Also you can grab the full list of supported languages from link above.

Note, that this package **doesn't contain** compiled JS, so you can use it **only with TypeScript**.

## Use

1. `yarn add @zardoy/vk-params`

2. Import necessary methods. For example `import { vkGetParam } from "@zardoy/vk-params";`;

### Example use

```ts
vkUserLanguage(); // will fallback to browser language, if there is no appropriate param

// get vk launch param
vkGetParam("app_id"); // always returns a string, not a number!
// CAVEAT: for convenience it always returns string, but it actually can return null if there is no param, so be sure to check in root of your app that you are in vk env, like so:
if (!vkGetParam("app_id")) throw new Error(`This app can work only from VK environment.`);

vkIsDesktopVersion(); // boolean, whether is app launched on desktop or not
```
