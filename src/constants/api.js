
export const API_HOST = '94.250.255.250:8081/'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_PROTOCOL = 'http'
export const API_URL = `${API_PROTOCOL}://${API_HOST}`

export const CHECK_TOKEN = '/main/client/check_token/'

const MAIN = 'main'
const BLOG = 'blog'
const EMPLOYER = 'employer'
const APPLICANT = 'applicant'
const STATISTICS = 'statistics'
const CHAT = 'chat'
const SERVICE = 'service'
const FINANCE = 'finance'

export const STATIC_PAGES = `${MAIN}/static_pages/`
export const STATIC_PAGES_ITEM = `${MAIN}/static_pages/%s/`
export const GENERAL_STATS = `${STATISTICS}/general_open/count/main_objects/`
export const ACTIVE_USERS_COUNT = `${MAIN}/get_active_user_count/`
export const NOTIFICATIONS = `${MAIN}/notifications/`

export const EMPLOYER_REGISTER = `${EMPLOYER}/employer/`
export const APPLICANT_REGISTER = `${APPLICANT}/applicant/`

export const USER_RESET_PASSWORD = `${MAIN}/reset_password/`
export const USER_ACTIVATION = `/${MAIN}/activate/%s/%s/`
export const USER_BLOCK = `${MAIN}/change_access/`

export const SEARCH_LIST = `${MAIN}/search/`
export const SEARCH_HISTORY_LIST = `${MAIN}/search_history/`
export const SEARCH_HISTORY_CREATE = `${MAIN}/search_history/`

export const PROFESSIONS_LIST = `/${MAIN}/speciality/`
export const SPECIALITY_LIST = `/${MAIN}/speciality/`
export const SPECIALITY_LIST_ALL = `/${MAIN}/speciality/as_menu/`
export const POSITION_LIST = `${MAIN}/position/`
export const REGIONS_LIST = `${MAIN}/region/`
export const LANGUAGES_LIST = `${MAIN}/language/`
export const COUNTRY_FLAG_LIST = `${MAIN}/country/`
export const COMPANY_LIST = `${MAIN}/company/`
export const CURRENCY_LIST = `${MAIN}/currency/`
export const INSTITUTION_LIST = `${MAIN}/institution/`
export const DRIVER_LICENSE_LIST = `${MAIN}/driver_licence/`
export const POSTS_LIST = `${BLOG}/post/`

const VACANCY_APPEAL = `${MAIN}/vacancy_appeal`
export const VACANCY_APPEAL_LIST = `${VACANCY_APPEAL}/`
export const VACANCY_APPEAL_CREATE = `${VACANCY_APPEAL}/`
export const VACANCY_APPEAL_ITEM = `${VACANCY_APPEAL}/%d/`

const EMPLOYER_APPEAL = `${MAIN}/employer_appeal`
export const EMPLOYER_APPEAL_CREATE = `${EMPLOYER_APPEAL}/`
export const EMPLOYER_APPEAL_LIST = `${EMPLOYER_APPEAL}/`

export const EMPLOYER_MANAGER_CHAT = `${CHAT}/get_manager_chat/`
export const EMPLOYER_APPEAL_CHAT = `${EMPLOYER_APPEAL}/chats/`
export const FRONT_CHAT_LIST = `${CHAT}/front_chats/`
export const CHAT_MESSAGES = `${CHAT}/%d/messages/`

export const EMPLOYER_LIST = `${EMPLOYER}/employer/approved/`
export const EMPLOYER_ITEM = `${EMPLOYER}/employer/%d/`
export const EMPLOYER_ITEM_APPROVED = `${EMPLOYER}/employer/approved/%d/`
export const EMPLOYER_RESUME_COMMENT = `${EMPLOYER}/resume_comment/`
export const EMPLOYER_FAVORITE = `${EMPLOYER}/employer/%d/favorite/`
export const EMPLOYER_GUESTS = `${EMPLOYER}/employer/guests/`

export const COMPANY_WEEK_LIST = `${EMPLOYER}/employer/week_companies/`
export const COMPANY_POPULAR_LIST = `${EMPLOYER}/employer/popular_companies/`

const EMPLOYER_STAFF = `${EMPLOYER}/employer_staff`
export const EMPLOYER_STAFF_LIST = `${EMPLOYER_STAFF}/`
export const EMPLOYER_STAFF_ITEM = `${EMPLOYER_STAFF}/%d/`
export const EMPLOYER_STAFF_UPDATE = `${EMPLOYER_STAFF}/%d/`
export const EMPLOYER_STAFF_DELETE = `${EMPLOYER_STAFF}/%d/`
export const EMPLOYER_STAFF_CREATE = `${EMPLOYER_STAFF}/`

export const APPLICANT_LIST = `${APPLICANT}/applicant/`
export const APPLICANT_ITEM = `${APPLICANT}/applicant/%d/`
export const APPLICANT_FAV_VACANCY_LIST = `${APPLICANT}/applicant/favorite_vacancies/`
export const APPLICANT_FAV_EMPLOYERS_LIST = `${APPLICANT}/applicant/favorite_employers/`
export const APPLICANT_RATE = `${APPLICANT}/applicant/approved/%d/rate/`

export const ARTICLE = `${MAIN}/article`
export const ARTICLE_LIST = `${ARTICLE}/`
export const ARTICLE_CREATE = `${ARTICLE}/`
export const ARTICLE_ITEM = `${ARTICLE}/%d/`

export const RESUME = `${APPLICANT}/resume`
export const RESUME_LIST = `${RESUME}/`
export const RESUME_FAV_LIST = `${EMPLOYER}/employer/favorites/`
export const RESUME_CREATE = `${RESUME}/`
export const RESUME_ITEM = `${RESUME}/%d/`
export const RESUME_UPDATE = `${RESUME}/%d/`
export const RESUME_DELETE = `${RESUME}/%d/`
export const RESUME_INVITE = `${RESUME}/%d/invite/`
export const RESUME_FAV_CREATE = `${RESUME}/%d/favorite/`
export const RESUME_ITEM_ACTIVATE = `${RESUME}/%d/activate/`
export const RESUME_ITEM_UPDATE_DATE = `${RESUME}/%d/refresh/`
export const RESUME_ITEM_DEACTIVATE = `${RESUME}/%d/deactivate/`
export const RESUME_ACTIVE_LIST = `${RESUME}/approved/`
export const RESUME_ACTIVE_ITEM = `${RESUME_ACTIVE_LIST}%d/`
export const RESUME_ITEM_GUESTS = `${RESUME}/%d/guests/`
export const RESUME_GUESTS = `${RESUME}/guests/`
export const RESUME_SUITABLE_LIST = `${RESUME}/approved/suitable_resumes/`
export const RESUME_DOWNLOAD = `${RESUME}/%d/%s/`

export const VACANCY = `${EMPLOYER}/vacancy`
export const VACANCY_CREATE = `${VACANCY}/`
export const VACANCY_LIST = `${VACANCY}/`
export const VACANCY_ITEM = `${VACANCY}/%d/`
export const VACANCY_UPDATE = `${VACANCY}/%d/`
export const VACANCY_DELETE = `${VACANCY}/%d/`
export const VACANCY_ACTIVATE = `${VACANCY}/%d/activate/`
export const VACANCY_DEACTIVATE = `${VACANCY}/%d/deactivate/`
export const VACANCY_FAV_CREATE = `${VACANCY}/%d/favorite/`
export const VACANCY_APPROVED = `${VACANCY}/approved`
export const VACANCY_APPROVED_LIST = `${VACANCY}/approved/`
export const VACANCY_POPULAR_LIST = `${VACANCY}/approved/top/`
export const VACANCY_APPROVED_ITEM = `${VACANCY_APPROVED}/%d/`
export const VACANCY_APPEALED_LIST = `${MAIN}/vacancy_appeal/`
export const VACANCY_APPEALED_ITEM = `${MAIN}/vacancy_appeal/%d/`
export const VACANCY_APPEALED_ITEM_COUNT = `${MAIN}/vacancy_appeal/%d/status_count/`
export const VACANCY_APPEALED_ITEM_STATUS_CHANGE = `${MAIN}/vacancy_appeal/%d/change_status/`
export const VACANCY_ITEM_VIEW_HISTORY = `${MAIN}/view_history/get_history/`

export const FAQ = `${MAIN}/faq`
export const FAQ_LIST = `${FAQ}/`

export const EMPLOYER_SERVICE_LIST = `${SERVICE}/employer_service/`
export const VACNACY_SERVICE_DISCOUNTS = `${SERVICE}/posting_vacancy/`
export const DATABASE_ACCESS_LIST = `${SERVICE}/database_access/`
export const DATABASE_ACCESS_ITEM = `${SERVICE}/database_access/%s/`
export const VIP_PACKET_LIST = `${SERVICE}/vip_packet/`
export const FILL_BALANCE = `${FINANCE}/transaction/filling_balance/`
export const APPLICANT_SERVICE_LIST = `${SERVICE}/applicant_service/`
export const SERVICES_ACTIVATE = `${SERVICE}/active_services/activate/`
export const SERVICES_MIN_PRICES = `${STATISTICS}/general_open/service_min_prices/`

export const USER_ACTIVE_SERVICES = `${SERVICE}/active_services/`
export const USER_UNUSED_SERVICES = `${SERVICE}/active_services/unused_services/`

export const LOGIN = `${MAIN}/login/`
export const LOGOUT = `${MAIN}/logout/`
export const FILE_UPLOAD = '/main/file/'

export const STAT_EMPLOYER_GENERAL = 'statistics/employer/general/'
export const STAT_EMPLOYER_VIEWS = 'statistics/employer/view_history/'
export const STAT_EMPLOYER_VACANCY_VIEWS = 'statistics/employer/vacancy_view_history/'

const ORDER = `${SERVICE}/order`
export const ORDER_CREATE = `${ORDER}/`
export const ORDER_LIST = `${ORDER}/`
export const ORDER_ITEM = `${ORDER}/%d/`
export const ORDER_MAKE_PAYMENT = `${ORDER}/%d/make_payment/`
export const ORDER_ACTIVATE = `${ORDER}/activate/`
export const ORDER_REQUEST_CONTRACT = `${ORDER}/%d/ask_contract/`

const FEEDBACK = `${MAIN}/feedback`
export const FEEDBACK_CREATE = `${FEEDBACK}/`

export const PRODUCT = 'main/product'
export const PRODUCT_LIST = `${PRODUCT}/`
export const PRODUCT_CATEGORY_LIST = `${PRODUCT}`

export const MENU_AS = 'main/product_type/as_menu'

export const SIGN_IN = `${MAIN}/login/`
export const SIGN_OUT = `${MAIN}/logout/`

export const REGISTER = `${MAIN}/client/register/`

