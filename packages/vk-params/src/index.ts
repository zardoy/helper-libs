interface VK_PARAM_TYPES {
    user_id: number,
    app_id: number,
    is_app_user: boolean,
    are_notifications_enabled: boolean,
    language: "en" | "ru" | "uk" | "ua" | "be" | "kz" | "pt" | "es",
    ref: string,
    access_token_settings: string,
    group_id: string | null,
    viewer_group_role: ("none" | "member" | "moder" | "editor" | "admin") | null,
    platform: "mobile_android" | "mobile_iphone" | "mobile_web" | "desktop_web" | "mobile_android_messenger" | "mobile_iphone_messenger",
    is_favorite: boolean,
    ts: null | number;
}

export const vkGetParam = <T extends keyof VK_PARAM_TYPES>(param: T): VK_PARAM_TYPES[T] => {
    const canBeNull = param === "group_id" || param === "viewer_group_role" || param === "ts";
    const vk_param = "vk_" + param;
    const param_value = new URL(window.location.toString()).searchParams.get(vk_param);
    if (!canBeNull && !param_value)
        throw new TypeError(`Launched app doesn't contain ${vk_param} in url. Make sure that you launch app from VK.`);
    if (
        param === "user_id" ||
        param === "app_id" ||
        param === "ts"
    ) {
        return +param_value! as any;
    } else if (
        param === "is_app_user" ||
        param === "are_notifications_enabled" ||
        param === "is_favorite"
    ) {
        return Boolean(+param_value!) as any;
    } else {
        return param_value as any;
    }
};

export const vkIsDesktopVersion = () => vkGetParam("platform") === "desktop_web";