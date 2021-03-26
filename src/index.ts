type ParseMethod = "string" | "number" | "boolean";
type VkParamsInput = {
    [paramName: string]: {
        parseMethod: ParseMethod;
        canBeNull?: true;
        returnType?: any;
    };
};

type ParseMethodToReturnType<K extends ParseMethod> =
    K extends "string" ? string :
    K extends "number" ? number :
    K extends "boolean" ? boolean : never;
;
type TransformToVkReturnTypes<T extends VkParamsInput> = {
    [paramName in keyof T]: (T[paramName] extends { returnType: infer U; } ? U : ParseMethodToReturnType<T[paramName]["parseMethod"]>) | (T[paramName] extends { canBeNull: true; } ? null : never);// never means nothing
};

const makeVkParams = <T extends VkParamsInput = VkParamsInput>(params: T) => params;

type MobilePlatform = "android" | "iphone";

// wild hack
const vkParams = makeVkParams({
    // nullable param its a param that must not exist in url
    user_id: {
        // return type of user_id will is number
        parseMethod: "number",
    },
    app_id: {
        parseMethod: "number",
    },
    is_app_user: {
        parseMethod: "boolean",
    },
    are_notifications_enabled: {
        parseMethod: "boolean",
    },
    language: {
        parseMethod: "string",
        returnType: undefined as unknown as "en" | "ru" | "uk" | "ua" | "be" | "kz" | "pt" | "es"
    },
    ref: {
        parseMethod: "string",
        // TODO auto generate types
    },
    access_token_settings: {
        parseMethod: "string",
        // todo types
    },
    group_id: {
        // todo check probably it's a number
        parseMethod: "string",
        canBeNull: true
    },
    viewer_group_role: {
        parseMethod: "string",
        canBeNull: true,
        returnType: undefined as unknown as "none" | "member" | "moder" | "editor" | "admin"
    },
    platform: {
        parseMethod: "string",
        returnType: undefined as unknown as `mobile_${MobilePlatform}` | `mobile_${MobilePlatform}_messenger` | "mobile_web" | "desktop_web"
    },
    is_favorite: {
        parseMethod: "boolean",
    },
    ts: {
        parseMethod: "number",
        canBeNull: true
    },
    // sign is usually used only on backend
});

export const paramNames = Object.keys(vkParams) as (keyof typeof vkParams)[];
export const nullableParamNames =
    Object.entries(vkParams)
        .filter(([, config]) => "canBeNull" in config)
        .map(([paramName]) => paramName);

type VK_PARAM_TYPES = TransformToVkReturnTypes<typeof vkParams>;

/**
 * @description Gets VK launch param from URL
 * @paramName VK launch param name
 * @returns Value of the param
 * @example ```vkGetParam("app_id") === 2342```
 */
export const vkGetParam = <T extends keyof VK_PARAM_TYPES>(paramName: T): VK_PARAM_TYPES[T] => {
    const vk_param = `vk_${paramName}`;
    const param_value =
        new URL(window.location.toString())
            .searchParams
            .get(vk_param);
    const paramConfig = vkParams[paramName];
    if (param_value === null) {
        if (!paramConfig || "canBeNull" in paramConfig) return null as any;
        else throw new TypeError(`Launched app doesn't contain ${vk_param} in url. Make sure that you launch app from VK.`);
    }
    return paramConfig.parseMethod === "string" ? param_value :
        paramConfig.parseMethod === "boolean" ? Boolean(+param_value) :
            paramConfig.parseMethod === "number" ? +param_value : undefined as any;
};

/**
 * @returns Is app launched on desktop
 */
export const vkIsDesktopVersion = () => vkGetParam("platform") === "desktop_web";
