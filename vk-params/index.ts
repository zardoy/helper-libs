type KNOWN_VK_PARAMS = "user_id" | "app_id" | "is_app_user" | "are_notifications_enabled" | "language" |
    "ref" | "access_token_settings" | "group_id" | "viewer_group_role" | "platform" | "is_favorite";

// caveat: actually it can return null if you launched app not from vk env so check for vk env is mandatory
export const vkGetParam = (param: KNOWN_VK_PARAMS): string => {
    let vk_param = "vk_" + param;
    return new URL(window.location.toString()).searchParams.get(vk_param);
};

export const vkIsDesktopVersion = () => vkGetParam("platform") === "desktop_web";
export const vkUserLanguage = () => vkGetParam("language") || window.navigator.language;