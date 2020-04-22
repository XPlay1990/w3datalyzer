export const APP_PATH_LandingPage = "/"
export const FORBIDDEN_URL = "/forbidden"

export const APP_PATH_STATISTICS = "/statistics"
export const APP_PATH_STATISTICS_OVERVIEW = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/overview`
export const APP_PATH_STATISTICS_MAP = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/map`
export const APP_PATH_STATISTICS_RACE = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/race`
export const APP_PATH_STATISTICS_MAPRACE = (battleTag: string) => `${APP_PATH_STATISTICS}/${battleTag}/maprace`

export const STORAGE_BATTLETAG='battleTag'
