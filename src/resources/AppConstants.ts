export const APP_PATH_LandingPage = "/"
export const FORBIDDEN_URL = "/forbidden"

export const APP_PATH_STATISTICS = "/statistics"
export const APP_PATH_STATISTICS_OVERVIEW = (battleTag: string, gateway:string) => `${APP_PATH_STATISTICS}/${battleTag}/${gateway}/overview`
export const APP_PATH_STATISTICS_MAP = (battleTag: string, gateway:string) => `${APP_PATH_STATISTICS}/${battleTag}/${gateway}/map`
export const APP_PATH_STATISTICS_RACE = (battleTag: string, gateway:string) => `${APP_PATH_STATISTICS}/${battleTag}/${gateway}/race`
export const APP_PATH_STATISTICS_MAPRACE = (battleTag: string, gateway:string) => `${APP_PATH_STATISTICS}/${battleTag}/${gateway}/maprace`

export const APP_PATH_STATISTICS_2v2 = (battleTag: string, gateway:string) => `${APP_PATH_STATISTICS}/${battleTag}/${gateway}/2v2`

export const STORAGE_BATTLETAG = 'battleTag'
export const STORAGE_GATEWAY = 'gateway'

export const GATEWAY_EU = 20
export const GATEWAY_NA = 10
export const GAMEMODE_1v1 = 1
export const GAMEMODE_2v2_AT = 6
export const DEFAULT_GATEWAY = GATEWAY_EU.toString()

export const IS_DARK_MODE = 'darkMode';

export const NO_GAMES_TEXT = "Not played"

export const W3CHAMPIONS_BASE_URL = 'https://w3champions.com'
export const W3CHAMPIONS_API_BASE_URL = 'https://api.w3champions.com'
export const W3CHAMPIONS_PROFILE_URL = (playerBattleTag: string) => {
    let battleTag = playerBattleTag.split('#');
    return (`${W3CHAMPIONS_BASE_URL}/player/${battleTag[0]}/${battleTag[1]}`)
}