export const APP_PATH_LandingPage = "/"
export const FORBIDDEN_URL = "/forbidden"

export const APP_PATH_STATISTICS = "/statistics"
export const APP_PATH_STATISTICS_OVERVIEW = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/overview`
export const APP_PATH_STATISTICS_MAP = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/map`
export const APP_PATH_STATISTICS_RACE = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/race`
export const APP_PATH_STATISTICS_MAPRACE = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/maprace`

export const STORAGE_BATTLETAG = 'battleTag'

export const IS_DARK_MODE = 'darkMode';


export const W3CHAMPIONS_BASE_URL = 'https://w3champions.com'
export const W3CHAMPIONS_PROFILE_URL = (playerBattleTag: string) => {
    let battleTag = playerBattleTag.split('#');
    return (`${W3CHAMPIONS_BASE_URL}/player/${battleTag[0]}/${battleTag[1]}`)
}