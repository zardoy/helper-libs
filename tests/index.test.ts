import { JSDOM } from "jsdom";

import { paramNames, vkGetParam, vkIsDesktopVersion } from "../src/index";

test("checks vkGetParam", () => {
    (global as unknown as { jsdom: JSDOM; }).jsdom.reconfigure({
        url: "http://localhost:10888/?vk_access_token_settings=&vk_app_id=7139517&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1610454586&vk_user_id=180660262",
    });
    const results = {} as any;
    for (let paramName of paramNames) {
        results[paramName] = vkGetParam(paramName as any);
    }
    expect(results).toMatchInlineSnapshot(`
        Object {
          "access_token_settings": "",
          "app_id": 7139517,
          "are_notifications_enabled": false,
          "group_id": null,
          "is_app_user": true,
          "is_favorite": false,
          "language": "ru",
          "platform": "desktop_web",
          "ref": "other",
          "ts": 1610454586,
          "user_id": 180660262,
          "viewer_group_role": null,
        }
    `);
});

test("vkIsDesktopVersion", () => {
    expect(vkIsDesktopVersion()).toMatchInlineSnapshot(`true`);
});
