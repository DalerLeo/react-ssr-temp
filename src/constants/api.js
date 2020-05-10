
export const API_HOST = 'akkred.uz:8080/'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_PROTOCOL = 'http'
export const API_URL = `${API_PROTOCOL}://${API_HOST}`

export const CHECK_TOKEN = 'main/client/check_token/'

const MAIN = 'main'
const SERVICE = 'service'

export const STATIC_PAGES = `${MAIN}/static_pages/`
export const STATIC_PAGES_ITEM = `${MAIN}/static_pages/%s/`
export const ARTICLE = `${MAIN}/article`
export const ARTICLE_LIST = `${ARTICLE}/`
export const ARTICLE_CREATE = `${ARTICLE}/`
export const ARTICLE_ITEM = `${ARTICLE}/%d/`

export const LANGUAGE = 'main/language/language'
export const LANGUAGE_LIST = `${LANGUAGE}/`

export const FAQ = `${MAIN}/faq`
export const FAQ_LIST = `${FAQ}/`

export const USER_ACTIVE_SERVICES = `${SERVICE}/active_services/`
export const USER_UNUSED_SERVICES = `${SERVICE}/active_services/unused_services/`

export const LOGIN = `${MAIN}/login/`

export const LOGOUT = `${MAIN}/logout/`

export const FILE_UPLOAD = '/main/file/'

export const STAT_EMPLOYER_GENERAL = 'statistics/employer/general/'
export const STAT_EMPLOYER_VIEWS = 'statistics/employer/view_history/'
export const STAT_EMPLOYER_VACANCY_VIEWS = 'statistics/employer/vacancy_view_history/'

const FEEDBACK = `${MAIN}/feedback`
export const FEEDBACK_CREATE = `${FEEDBACK}/`

export const PRODUCT = 'main/product'
export const PRODUCT_LIST = `${PRODUCT}/`
export const PRODUCT_CATEGORY_LIST = `${PRODUCT}`
export const PRODUCT_ITEM = `${PRODUCT}/%d/`

export const ORDER = 'main/order'
export const ORDER_LIST = `${ORDER}/`
export const ORDER_CREATE = `${ORDER}/`
export const ORDER_ITEM = `${ORDER}/%d/`

export const AD = 'main/ads'
export const AD_LIST = `${AD}/`
export const AD_CREATE = `${AD}/`
export const AD_ITEM = `${AD}/%s/`

export const MENU_AS = 'main/product_type'

export const REGISTER = `${MAIN}/client/register/`

export const CLIENT = `${MAIN}/client`
export const CLIENT_UPDATE = `${CLIENT}/%d/`
export const CLIENT_DETAIL = `${CLIENT}/%d/`

export const ACTIVATE_MAILING = `${CLIENT}/%d/activate_mailing/`
export const DEACTIVATE_MAILING = `${CLIENT}/%d/deactivate_mailing/`

export const ADDRESS_CREATE = `${MAIN}/client-address/`
export const ADDRESS_LIST = `${MAIN}/client-address/`
export const ADDRESS_DELETE = `${MAIN}/client-address/%d/`

const FAVORITE = `${MAIN}/favourites`
export const FAVOURITE_CREATE = `${FAVORITE}/`
export const FAVOURITE_LIST = `${FAVORITE}/`
export const FAVOURITE_DELETE = `${FAVORITE}/unset/`

const FILTER = `${PRODUCT}/filters`
export const FILTER_LIST = `/${FILTER}/`

const COMMENT = `${MAIN}/comments/`
export const COMMENT_CREATE = `${COMMENT}`
export const COMMENT_LIST = `${COMMENT}`

const DELIVERY_TYPE = `${MAIN}/delivery-type/`
export const DELIVERY_TYPE_LIST = `${DELIVERY_TYPE}`
