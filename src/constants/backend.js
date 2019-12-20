import { arrayObjToObj } from 'utils/get'

export const CURRENCY_NAME = 'UZS'

export const EDUCATION_LIST = [
  { id: 'irrelevant', name: 'common_irrelevant' },
  { id: 'average', name: 'edu_average' },
  { id: 'lower_secondary', name: 'edu_lower_secondary' },
  { id: 'secondary_special', name: 'edu_secondary_special' },
  { id: 'incomplete_higher', name: 'edu_incomplete_higher' },
  { id: 'higher', name: 'edu_higher' },
  { id: 'academic_degree', name: 'edu_academic_degree' }
]
export const EDUCATION = arrayObjToObj(EDUCATION_LIST)

export const EXPERIENCES_LIST = [
  { id: '0', name: 'common_irrelevant' },
  { id: '5', name: 'experience_none' },
  { id: '1', name: 'experience_1_3' },
  { id: '2', name: 'experience_3_5' },
  { id: '3', name: 'experience_5_10' },
  { id: '4', name: 'experience_10' }
]

export const EXPERIENCES = arrayObjToObj(EXPERIENCES_LIST)

export const SEARCH_TYPE = [
  { id: 'company', name: 'main_companies' },
  { id: 'sphere', name: 'main_sphere' }
]

export const EMPLOYMENT_TYPE = [
  { id: 'full_time', name: 'emp_type_full' },
  { id: 'part_time', name: 'emp_type_part' },
  { id: 'shift_time', name: 'emp_type_shift' },
  { id: 'temporary', name: 'emp_type_temp' },
  { id: 'freelance', name: 'emp_type_free' }
]

export const EMP_FORM = [
  { id: 'ltd', name: 'ltd' },
  { id: 'pjsc', name: 'pjsc' },
  { id: 'jsc', name: 'jsc' },
  { id: 'up', name: 'up' },
  { id: 'npo', name: 'npo' },
  { id: 'so', name: 'so' },
  { id: 'fund', name: 'fund' },
  { id: 's', name: 's' },
  { id: 'ie', name: 'ie' },
  { id: 'ojsc', name: 'ojsc' },
  { id: 'cjsc', name: 'cjsc' },
  { id: 'llp', name: 'llp' },
  { id: 'other', name: 'other' }
]

export const CURRENCY_LIST = [
  { id: 'ue', name: 'U.E.' },
  { id: 'sum', name: 'UZS' }
]

export const COMP_LITERACY_LIST = [
  { id: 'none', name: 'pc_level_none' },
  { id: 'elementary', name: 'pc_level_elementary' },
  { id: 'average_user', name: 'pc_level_average_user' },
  { id: 'advanced_user', name: 'pc_level_advanced_user' },
  { id: 'expert', name: 'pc_level_expert' },
  { id: 'irrelevant', name: 'common_irrelevant' },
  { id: 'basic_level', name: 'pc_level_basic_level' },
  { id: 'confident_user', name: 'pc_level_confident_user' }
]
export const COMP_LITERACY = arrayObjToObj(COMP_LITERACY_LIST)

export const GENDER_LIST = [
  { id: 'male', name: 'gender_male' },
  { id: 'female', name: 'gender_female' },
  { id: 'irrelevant', name: 'common_irrelevant' }
]
export const GENDER = arrayObjToObj(GENDER_LIST)

export const DRIVER_LICENSE = [
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
  { id: 'C', name: 'C' },
  { id: 'D', name: 'D' }
]
export const LANG_LEVEL_LIST = [
  { id: 'elementary', name: 'lang_level_elementary' },
  { id: 'average', name: 'lang_level_average' },
  { id: 'good', name: 'lang_level_good' },
  { id: 'fluency', name: 'lang_level_fluency' }
]

export const LANG_LEVEL = arrayObjToObj(LANG_LEVEL_LIST)

export const SORT_LIST_BY = [
  { id: 'createdDate', name: 'По дате' }
]


export const MONTH_LIST = [
  { id: '01', name: 'month_january' },
  { id: '02', name: 'month_february' },
  { id: '03', name: 'month_march' },
  { id: '04', name: 'month_april' },
  { id: '05', name: 'month_may' },
  { id: '06', name: 'month_june' },
  { id: '07', name: 'month_july' },
  { id: '08', name: 'month_august' },
  { id: '09', name: 'month_september' },
  { id: '10', name: 'month_october' },
  { id: '11', name: 'month_november' },
  { id: '12', name: 'month_december' }
]

export const BONUS_LIST = [
  { id: '01', name: 'Бесплатная связь' },
  { id: '02', name: 'Бесплатный завтрак' },
  { id: '03', name: 'Бесплатный обед' },
  { id: '04', name: 'Парковка' },
  { id: '06', name: 'Повышение квалификации' },
  { id: '08', name: 'Тренажерный зал' },
  { id: '09', name: 'Стажировка' },
  { id: '10', name: 'Бассейн' }
]


export const MARITAL_STATUS_LIST = [
  { id: 'single', name: 'marital_status_single' },
  { id: 'married', name: 'marital_status_married' }
]
export const MARITAL_STATUS = arrayObjToObj(MARITAL_STATUS_LIST)

export const PROTOCOL_LIST = [
  { id: 'http://', name: 'http://' },
  { id: 'https://', name: 'https://' }
]

export const SOCIAL_LIST = [
  { id: 'facebook', name: 'Facebook' },
  { id: 'imo', name: 'IMO' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'viber', name: 'Viber' },
  { id: 'vk', name: 'VK' },
  { id: 'wechat', name: 'WeChat' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'email', name: 'Почта' },
  { id: 'ok', name: 'Одноклассники' }
]

export const APPLICANT_STATUSES = [
  { id: '1', name: 'looking_for_a_job' },
  { id: '2', name: 'considering_proposals' },
  { id: '3', name: 'not_looking_for_a_job' },
  { id: '4', name: 'app_status_other' }
]
