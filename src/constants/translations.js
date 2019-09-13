import React from 'react'
import loMerge from 'lodash/merge'
import sprintf from 'sprintf'
import * as TR from './appTranslations'
import { STATIC_PAGE_ITEM_URL } from 'constants/routes'

const otherTranslations = loMerge(
  TR.commonTranslations,
  TR.genders,
  TR.maritalStatuses,
  TR.educationLevels,
  TR.experiences,
  TR.employementTypes,
  TR.compLiteracyLevel,
  TR.months,
  TR.languageLevels,
  TR.companyForms,
  TR.applicantStatuses
)

const getTermsLink = text => {
  return <a target={'_blank'} href={sprintf(STATIC_PAGE_ITEM_URL, 'userterms')}>{text}</a>
}

const translations = {
  ...otherTranslations,

  'menu_applicant': {
    ru: 'Ищу работу',
    en: 'Job seeker',
    uz: 'Ish qidiruvchi'
  },
  'menu_vacancy_catalog': {
    ru: 'Каталог вакансий',
    en: 'Job directory',
    uz: 'Ish katalogi'
  },
  'menu_create_resume': {
    ru: 'Добавить резюме',
    en: 'Add resume',
    uz: 'Rezyume qo\'shish'
  },
  'menu_employer': {
    ru: 'Ищу сотрудника',
    en: 'Employer',
    uz: 'Ish beruvchi'
  },
  'menu_resume_catalog': {
    ru: 'Каталог резюме',
    en: 'Resume сatalog',
    uz: 'Xulosa'
  },
  'menu_create_vacancy': {
    ru: 'Добавить вакансию',
    en: 'Add vacancy',
    uz: 'Bo\'shliqni qo\'shish'
  },
  'menu_company_catalog': {
    ru: 'Каталог компаний',
    en: 'Companies',
    uz: 'Kompaniyalar'
  },
  'menu_my_office': {
    ru: 'Мой кабинет',
    en: 'My office',
    uz: 'Mening ofisim'
  },
  'menu_my_resume': {
    ru: 'Мои резюме',
    en: 'My resume',
    uz: 'Rezyumeim'
  },
  'menu_my_vacancy': {
    ru: 'Мои вакансии',
    en: 'My vacancies',
    uz: 'Vakansiyalarim'
  },
  'menu_my_favorites': {
    ru: 'Избранное',
    en: 'Favorites',
    uz: 'Sevimlilar'
  },
  'menu_my_search': {
    ru: 'История поиска',
    en: 'Search history',
    uz: 'Qidiruv tarixi'
  },
  'menu_my_search_desc': {
    ru: ' - это возможность не пропустить ни одного важного резюме. Укажите необходимые условия поиска, сохраните поисковый запрос и  вы будете каждый день получать информацию о новых резюме по вашим параметрам.',
    en: '',
    uz: ''
  },
  'menu_my_messages': {
    ru: 'Сообщения',
    en: 'Messages',
    uz: 'Xabarlar'
  },
  'menu_my_settings': {
    ru: 'Настройки',
    en: 'Settings',
    uz: 'Sozlamalar'
  },
  'menu_billing': {
    ru: 'Биллинг',
    en: 'Billing',
    uz: 'Billing'
  },
  'menu_events': {
    ru: 'Мероприятия',
    en: 'Events',
    uz: 'Voqealar'
  },
  'menu_signin': {
    ru: 'Войти',
    en: 'Sign in',
    uz: 'Kirish'
  },
  'menu_registration': {
    ru: 'Регистрация',
    en: 'Sign up',
    uz: 'Ro\'yxatdan o\'tish'
  },
  'menu_not_registered': {
    ru: 'Еще не зарегестрировались?',
    en: 'Haven\'t registered yet?',
    uz: 'Xali ro\'yxatdan o\'tmadingizmi?'
  },
  'menu_sign_up': {
    ru: 'Зарегестрироваться',
    en: 'Sign up',
    uz: 'Ro\'yxatdan o\'ting'
  },
  'menu_logout': {
    ru: 'Выйти',
    en: 'Log out',
    uz: 'Chiqish'
  },
  'menu_services': {
    ru: 'Услуги',
    en: 'Services',
    uz: 'Xizmatlar'
  },
  'menu_views': {
    ru: 'Просмотры',
    en: 'Views',
    uz: 'Ko\'rishlar'
  },
  'menu_feedback': {
    ru: 'Отклики',
    en: 'Feedback',
    uz: 'Qayta aloqalar'
  },
  'menu_vip_room': {
    ru: 'VIP комната',
    en: 'VIP room',
    uz: 'VIP xonasi'
  },
  'menu_favorites_vacancy': {
    ru: 'Избранные вакансии',
    en: 'Favorite vacancies',
    uz: 'Sevimli vakansiyalar'
  },
  'menu_favorites_company': {
    ru: 'Избранные компании',
    en: 'Favorite companies',
    uz: 'Sevimli kompaniyalar'
  },
  'menu_favorites_resume': {
    ru: 'Избранные резюме',
    en: 'Favorite resumes',
    uz: 'Sevimli resyumelar'
  },
  'menu_emp_stat': {
    ru: 'Главная',
    en: '',
    uz: ''
  },
  'menu_guests': {
    ru: 'Гости',
    en: '',
    uz: ''
  },
  'menu_emp_orders': {
    ru: 'Мои заказы',
    en: '',
    uz: ''
  },
  'menu_emp_active_services': {
    ru: 'Активные услуги',
    en: '',
    uz: ''
  },
  'menu_emp_staff': {
    ru: 'Сотрудники',
    en: '',
    uz: ''
  },
  'menu_subscriptions': {
    ru: 'Мои подписки',
    en: '',
    uz: ''
  },
  'search_main_title': {
    ru: 'Работа найдется для каждого',
    en: '',
    uz: ''
  },
  'login_auth_title': {
    ru: 'Авторизация',
    en: '',
    uz: ''
  },
  'login_reset_pass_title': {
    ru: 'Восстановление пароля',
    en: '',
    uz: ''
  },
  'login_password': {
    ru: 'Пароль',
    en: '',
    uz: ''
  },
  'login_password_confirm': {
    ru: 'Повтор пароля',
    en: '',
    uz: ''
  },
  'login_remember': {
    ru: 'Запомнить',
    en: '',
    uz: ''
  },
  'login_forgot_pass': {
    ru: 'Забыли пароль?',
    en: '',
    uz: ''
  },
  'login_error_text': {
    ru: 'Неверный адрес электронной почты или пароль',
    en: 'Incorrect email or password',
    uz: ''
  },
  'register_title': {
    ru: 'Регистрация',
    en: '',
    uz: ''
  },
  'register_employer_tab': {
    ru: 'Работодатель',
    en: 'Employer',
    uz: 'Ish beruvchi'
  },
  'register_applicant_tab': {
    ru: 'Специалист',
    en: 'Applicant',
    uz: 'Mutaxassis'
  },
  'register_app_name': {
    ru: 'Ваше Имя',
    en: '',
    uz: ''
  },
  'register_app_personal': {
    ru: 'Личная информация',
    en: '',
    uz: ''
  },
  'register_app_photo': {
    ru: 'Мое фото',
    en: '',
    uz: ''
  },
  'register_app_birthdate': {
    ru: 'Дата рождения',
    en: '',
    uz: ''
  },
  'register_app_phone': {
    ru: 'Номер телефона',
    en: '',
    uz: ''
  },
  'register_emp_form': {
    ru: 'Форма и название организации',
    en: '',
    uz: ''
  },
  'register_emp_title': {
    ru: 'Введите название организации',
    en: '',
    uz: ''
  },
  'register_emp_recruiter': {
    ru: 'Кадровое агенство',
    en: '',
    uz: ''
  },
  'register_emp_contact_person': {
    ru: 'Имя контактного лица',
    en: '',
    uz: ''
  },
  'register_emp_contact_number': {
    ru: 'Номер контактного лица',
    en: '',
    uz: ''
  },
  'register_password': {
    ru: 'Придумайте пароль',
    en: '',
    uz: ''
  },
  'register_button': {
    ru: 'Зарегистрироваться',
    en: '',
    uz: ''
  },
  'register_have_account_button': {
    ru: 'Уже зарегестрировались?',
    en: '',
    uz: ''
  },
  'register_terms_of_use': {
    ru: <span>Нажимая кнопку «Зарегестрироваться», Вы соглашаетесь с условиями {getTermsLink('пользовательского соглашения')}</span>,
    en: '',
    uz: ''
  },
  'main_full_name': {
    ru: 'Ф.И.О.',
    en: 'Full Name',
    uz: 'F.I.Sh.'
  },
  'main_vacancy': {
    ru: 'Вакансии',
    en: 'Vacancies',
    uz: 'Vakansiyalar'
  },
  'main_resume': {
    ru: 'Резюме',
    en: 'Resume',
    uz: 'Resyume'
  },
  'main_specialists': {
    ru: 'Специалистов',
    en: 'Specialists',
    uz: 'Mutaxassislar'
  },
  'main_companies': {
    ru: 'Компании',
    en: 'Companies',
    uz: 'Kompaniyalar'
  },
  'main_region': {
    ru: 'Регион',
    en: 'Region',
    uz: 'Tuman'
  },
  'main_education_level': {
    ru: 'Уровень образования',
    en: '',
    uz: ''
  },
  'main_salary_from': {
    ru: 'Заработная плата (от)',
    en: '',
    uz: ''
  },
  'main_filter_salary_none': {
    ru: 'Скрывать вакансии без указания зарплаты',
    en: '',
    uz: ''
  },
  'main_work_experience': {
    ru: 'Опыт работы',
    en: '',
    uz: ''
  },
  'main_region_select': {
    ru: 'Выберите регион',
    en: '',
    uz: ''
  },
  'main_type_of_employment': {
    ru: 'Тип занятости',
    en: '',
    uz: ''
  },
  'main_responsibilities': {
    ru: 'Должностные обязанности',
    en: '',
    uz: ''
  },
  'main_requirements': {
    ru: 'Требования',
    en: '',
    uz: ''
  },
  'main_schedule': {
    ru: 'График работы',
    en: '',
    uz: ''
  },
  'main_sex': {
    ru: 'Пол',
    en: '',
    uz: ''
  },
  'main_marital_status': {
    ru: 'Семейное положение',
    en: '',
    uz: ''
  },
  'main_age': {
    ru: 'Возраст',
    en: '',
    uz: ''
  },
  'main_from': {
    ru: 'От',
    en: '',
    uz: ''
  },
  'main_to': {
    ru: 'До',
    en: '',
    uz: ''
  },
  'main_language_knowledge': {
    ru: 'Знание языков',
    en: '',
    uz: ''
  },
  'main_education': {
    ru: 'Образование',
    en: '',
    uz: ''
  },
  'main_extra_education': {
    ru: 'Дополнительное образование',
    en: '',
    uz: ''
  },
  'main_extra_education_short': {
    ru: 'Доп. образование',
    en: '',
    uz: ''
  },
  'main_photo_availability': {
    ru: 'Наличие фото',
    en: 'Photo availability',
    uz: ''
  },
  'main_with_photo': {
    ru: 'С фото',
    en: '',
    uz: ''
  },
  'main_without_photo': {
    ru: 'Без фото',
    en: '',
    uz: ''
  },
  'main_pc_knowledge': {
    ru: 'Знание компьютера',
    en: '',
    uz: ''
  },
  'main_programm_knowledge': {
    ru: 'Знание программ',
    en: '',
    uz: ''
  },
  'main_driver_license': {
    ru: 'Водительские права',
    en: '',
    uz: ''
  },
  'main_additional_requirements': {
    ru: 'Дополнительные требования',
    en: '',
    uz: ''
  },
  'main_company_offer': {
    ru: 'Что мы предлагаем',
    en: '',
    uz: ''
  },
  'main_respond_desc': {
    ru: 'Работодатель увидит ваш отклик в личном кабинете и на почте',
    en: '',
    uz: ''
  },
  'main_service': {
    ru: 'Услуга',
    en: '',
    uz: ''
  },
  'main_cost': {
    ru: 'Стоимость',
    en: '',
    uz: ''
  },
  'main_serv_db_title': {
    ru: 'База Myjob',
    en: '',
    uz: ''
  },
  'main_serv_db_desc': {
    ru: 'Чтобы видеть контактные данные, Вам необходимо приобрести базу "MyJob"',
    en: '',
    uz: ''
  },
  'main_update_date': {
    ru: 'Обновлено',
    en: 'Updated',
    uz: ''
  },
  'main_published_date': {
    ru: 'Опубликовано',
    en: '',
    uz: ''
  },
  'main_resume_salary_no': {
    ru: 'З/П не указана',
    en: '',
    uz: ''
  },
  'main_vacancy_salary_no': {
    ru: 'З/П договорная',
    en: '',
    uz: ''
  },
  'main_wishes': {
    ru: 'Пожелания',
    en: '',
    uz: ''
  },
  'main_skills': {
    ru: 'Навыки и умения',
    en: '',
    uz: ''
  },
  'main_hobby': {
    ru: 'Интересы и хобби',
    en: '',
    uz: ''
  },
  'main_info': {
    ru: 'Информация',
    en: '',
    uz: ''
  },
  'main_auth_data': {
    ru: 'Данные авторизации',
    en: '',
    uz: ''
  },
  'main_additional_info': {
    ru: 'Дополнительная информация',
    en: '',
    uz: ''
  },
  'main_additional_info_label': {
    ru: 'Укажите дополнительную информацию о вакансии',
    en: '',
    uz: ''
  },
  'main_additional_info_short': {
    ru: 'Доп. информация',
    en: '',
    uz: ''
  },
  'main_to_invite_desc': {
    ru: 'Специалист увидит ваше приглашение в своей личной почте',
    en: '',
    uz: ''
  },
  'main_select_from_list': {
    ru: 'Выберите из списка',
    en: '',
    uz: ''
  },
  'main_balance': {
    ru: 'Баланс',
    en: '',
    uz: ''
  },
  'main_vip_message_none': {
    ru: 'У вас пока нет сообщений',
    en: '',
    uz: ''
  },
  'main_my_guests': {
    ru: 'Ваши гости',
    en: '',
    uz: ''
  },
  'main_my_guests_desc': {
    ru: '- здесь вы сможете увидеть кто просматривал профиль вашей компании',
    en: '',
    uz: ''
  },
  'main_visits': {
    ru: 'Посещений',
    en: 'Visits',
    uz: 'Tashriflar'
  },
  'main_mj_serv': {
    ru: 'Услуги MyJob',
    en: '',
    uz: ''
  },
  'main_mj_serv_all': {
    ru: 'Все услуги',
    en: '',
    uz: ''
  },
  'main_mj_serv_description': {
    ru: 'Продвигайте вакансии, свой профиль, будьте первым!',
    en: '',
    uz: ''
  },
  'main_global_edit': {
    ru: 'Редактировать',
    en: '',
    uz: ''
  },
  'main_specialist': {
    ru: 'Специалисты',
    en: '',
    uz: ''
  },
  'main_popular_vacancy': {
    ru: 'Популярные вакансии',
    en: '',
    uz: ''
  },
  'main_search_by': {
    ru: 'Поиск по...',
    en: 'Search by...',
    uz: ''
  },
  'main_search_by_companies': {
    ru: 'Компании',
    en: '',
    uz: ''
  },
  'main_search_by_vacancy': {
    ru: 'Вакансии',
    en: '',
    uz: ''
  },
  'main_search_by_resume': {
    ru: 'Резюме',
    en: '',
    uz: ''
  },
  'main_search_by_area': {
    ru: 'Поиск по сфере',
    en: '',
    uz: ''
  },
  'main_search_by_region': {
    ru: 'Поиск в регионах',
    en: '',
    uz: ''
  },
  'main_search_by_query': {
    ru: 'по запросу',
    en: 'by request',
    uz: ''
  },
  'main_search_result_text': {
    ru: 'Результат поиска',
    en: 'Search result',
    uz: ''
  },
  'main_new_vacancy': {
    ru: 'Новые вакансии',
    en: '',
    uz: ''
  },
  'main_companies_of_the_week': {
    ru: 'Компании недели',
    en: '',
    uz: ''
  },
  'main_popular_companies': {
    ru: 'Популярные компании',
    en: '',
    uz: ''
  },
  'main_compilation': {
    ru: 'Подборки',
    en: '',
    uz: ''
  },
  'main_search': {
    ru: 'Поиск',
    en: '',
    uz: ''
  },
  'main_fast_search': {
    ru: 'Быстрый поиск',
    en: '',
    uz: ''
  },
  'main_find_wished_company': {
    ru: 'Найдите компанию мечты',
    en: '',
    uz: ''
  },
  'main_sphere': {
    ru: 'Сфера деятельности',
    en: '',
    uz: ''
  },
  'main_all_spheres': {
    ru: 'Все сферы',
    en: 'All spheres',
    uz: ''
  },
  'main_sphere_select': {
    ru: 'Указать сферу деятельности',
    en: '',
    uz: ''
  },
  'main_pop_vacancy_more': {
    ru: 'ещё %(count)s вакансия',
    en: '',
    uz: ''
  },
  'main_article': {
    ru: 'Статья',
    en: '',
    uz: ''
  },
  'main_news': {
    ru: 'Новость',
    en: '',
    uz: ''
  },
  'serv_vacancy_buy': {
    ru: 'Размещение вакансии',
    en: '',
    uz: ''
  },
  'serv_db_buy': {
    ru: 'Доступ к базе',
    en: '',
    uz: ''
  },
  'serv_vip_buy': {
    ru: 'VIP-пакеты',
    en: '',
    uz: ''
  },
  'serv_balance_buy': {
    ru: 'Пополнение счета',
    en: '',
    uz: ''
  },
  'serv_simple_vacancy': {
    ru: 'Стандартная вакансия',
    en: '',
    uz: ''
  },
  'serv_premium_vacancy_shor': {
    ru: 'Премиум',
    en: 'Premium',
    uz: 'Premium'
  },
  'serv_premium_vacancy': {
    ru: 'Премиум вакансия',
    en: '',
    uz: ''
  },
  'serv_additional_emp': {
    ru: 'Дополнительные функции для продвижения вакансий',
    en: '',
    uz: ''
  },
  'serv_total': {
    ru: 'Итого',
    en: '',
    uz: ''
  },
  'serv_in_stock': {
    ru: 'У вас в наличии',
    en: '',
    uz: ''
  },
  'serv_pay': {
    ru: 'Оплатить',
    en: '',
    uz: ''
  },
  'serv_cart': {
    ru: 'Корзина',
    en: '',
    uz: ''
  },
  'serv_add_cart': {
    ru: 'В корзину',
    en: '',
    uz: ''
  },
  'serv_remove_cart': {
    ru: 'Удалить из корзины',
    en: '',
    uz: ''
  },
  'serv_clear_cart': {
    ru: 'Очистить корзину',
    en: '',
    uz: ''
  },
  'serv_vip_six': {
    ru: 'VIP на 6 месяцев',
    en: '',
    uz: ''
  },
  'serv_vip_twelve': {
    ru: 'VIP на 12 месяцев',
    en: '',
    uz: ''
  },
  'serv_discount': {
    ru: 'Скидка',
    en: '',
    uz: ''
  },
  'serv_discounts': {
    ru: 'Скидки',
    en: '',
    uz: ''
  },
  'serv_discounts_desc': {
    ru: 'Зависят от количества приобретаемой услуги',
    en: '',
    uz: ''
  },
  'serv_discounts_count': {
    ru: 'Кол-во',
    en: '',
    uz: ''
  },
  'serv_discounts_price': {
    ru: 'Сумма за 1шт.',
    en: '',
    uz: ''
  },
  'serv_db_desc': {
    ru: 'Здесь Вы можете получить доступ к базе резюме кандидатов по требуемой ' +
         'Вам сфере и на нужный Вам период - контакты всех кандидатов, зарегистрированных ' +
         'в выбранных Вами сферах, будут открыты. \n\n На доступ к базе предоставляется скидка в ' +
         'зависимости от количества выбранных Вами сфер и длительности периода доступа.',
    en: '',
    uz: ''
  },
  'serv_db_period': {
    ru: 'Выберите период доступа',
    en: '',
    uz: ''
  },
  'serv_balance_fill': {
    ru: 'Пополнение баланса',
    en: '',
    uz: ''
  },
  'serv_balance_fill_terms': {
    ru: 'Минимальный договор заключается на сумму 100.000 сум',
    en: '',
    uz: ''
  },
  'serv_balance_fill_desc': {
    ru: 'Счет в системе MyJob.uz ведется в единицах (ед.). Единицы используются для приобритения вакансий, доступа к базе резюме и других возможностей по повышению эффективности размещения вакансий. Для использования услуг сайта Вам необходимо иметь единицы на балансе, причем чем больше единиц Вы приобритаете, тем больше бонусных единиц получаете бесплатно!',
    en: '',
    uz: ''
  },
  'resume_create': {
    ru: 'Создание резюме',
    en: '',
    uz: ''
  },
  'resume_wish_position': {
    ru: 'Желаемая должность',
    en: '',
    uz: ''
  },
  'resume_professional_area': {
    ru: 'Профессиональная область',
    en: '',
    uz: ''
  },
  'resume_wish_salary': {
    ru: 'Желаемая зарплата',
    en: '',
    uz: ''
  },
  'resume_wish_salary_short': {
    ru: 'Желаемая з/п',
    en: '',
    uz: ''
  },
  'resume_no_sallary': {
    ru: 'По договоренности',
    en: '',
    uz: ''
  },
  'resume_work_exp': {
    ru: 'Есть опыт работы',
    en: '',
    uz: ''
  },
  'resume_company_title': {
    ru: 'Компания',
    en: '',
    uz: ''
  },
  'resume_job_area': {
    ru: 'Сфера',
    en: '',
    uz: ''
  },
  'resume_work_hint': {
    ru: `Это первое, на что обращают внимание работодатели. Кроме официального опыта, также подойдут: 
         - неофициальное трудоустройство,
         - стажировки и практики,
         - опыт в компании, которая закрылась.`,
    en: '',
    uz: ''
  },
  'resume_education_hint': {
    ru: `Это первое, на что обращают внимание работодатели. Кроме официального опыта, также подойдут: 
         - неофициальное трудоустройство,
         - стажировки и практики,
         - опыт в компании, которая закрылась.`,
    en: '',
    uz: ''
  },
  'resume_position_select': {
    ru: 'Должность',
    en: '',
    uz: ''
  },
  'resume_country': {
    ru: 'Страна',
    en: '',
    uz: ''
  },
  'resume_city': {
    ru: 'Город',
    en: '',
    uz: ''
  },
  'resume_start_date': {
    ru: 'Начало работы',
    en: '',
    uz: ''
  },
  'resume_end_date': {
    ru: 'Окончание работы',
    en: '',
    uz: ''
  },
  'resume_until_today': {
    ru: 'Работаю в данный момент',
    en: '',
    uz: ''
  },
  'resume_duties': {
    ru: 'Обязанности',
    en: '',
    uz: ''
  },
  'resume_desc': {
    ru: 'Опишите, что вы делали на работе. Работодатели часто ищут резюме по ключевым навыкам.',
    en: '',
    uz: ''
  },
  'resume_add_work_exp': {
    ru: 'Добавить опыт работы',
    en: '',
    uz: ''
  },
  'resume_institution': {
    ru: 'Учебное заведение',
    en: '',
    uz: ''
  },
  'resume_faculty': {
    ru: 'Факультет',
    en: '',
    uz: ''
  },
  'resume_specialty': {
    ru: 'Специальность',
    en: '',
    uz: ''
  },
  'resume_start_edu': {
    ru: 'Начало обучения',
    en: '',
    uz: ''
  },
  'resume_end_edu': {
    ru: 'Окончание обучения',
    en: '',
    uz: ''
  },
  'resume_until_edu': {
    ru: 'Учусь в данный момент',
    en: '',
    uz: ''
  },
  'resume_add_education': {
    ru: 'Добавить образование',
    en: '',
    uz: ''
  },
  'resume_add_extra_education': {
    ru: 'Добавить дополнительное образование',
    en: '',
    uz: ''
  },
  'resume_language': {
    ru: 'Язык',
    en: '',
    uz: ''
  },
  'resume_language_level': {
    ru: 'Уровень владения',
    en: '',
    uz: ''
  },
  'resume_add_language': {
    ru: 'Добавить язык',
    en: '',
    uz: ''
  },
  'resume_programm_knowledge': {
    ru: 'Знание компьютерных программ',
    en: '',
    uz: ''
  },
  'resume_relocation_travel': {
    ru: 'Переезд и командировки',
    en: '',
    uz: ''
  },
  'resume_is_ready_move': {
    ru: 'Готов к переезду',
    en: '',
    uz: ''
  },
  'resume_is_ready_travel': {
    ru: 'Готов к командировкам',
    en: '',
    uz: ''
  },
  'resume_similar_list': {
    ru: 'Похожие резюме',
    en: '',
    uz: ''
  },
  'resume_comments': {
    ru: 'Комментарии',
    en: 'Notes',
    uz: 'Sharhlar'
  },
  'resume_comments_all': {
    ru: 'Все комментарии',
    en: 'All motes',
    uz: 'Barcha sharhlar'
  },
  'resume_choose': {
    ru: 'Выберите резюме',
    en: 'Choose resume',
    uz: 'Resyumeni tanlang'
  },
  'resume_contact_info': {
    ru: 'Контактная информация',
    en: '',
    uz: ''
  },
  'applicant_living_place': {
    ru: 'Город проживания',
    en: '',
    uz: ''
  },
  'applicant_alt_communicate': {
    ru: 'Альтернативный способ связи',
    en: '',
    uz: ''
  },
  'applicant_resume_progress': {
    ru: 'Резюме заполнено на',
    en: '',
    uz: ''
  },
  'applicant_replenish': {
    ru: 'Пополнить',
    en: '',
    uz: ''
  },
  'applicant_public': {
    ru: 'Активные',
    en: '',
    uz: ''
  },
  'applicant_archive': {
    ru: 'Архивные',
    en: '',
    uz: ''
  },
  'applicant_drafts': {
    ru: 'Черновик',
    en: '',
    uz: ''
  },
  'applicant_guests_all': {
    ru: 'Все посещения',
    en: '',
    uz: ''
  },
  'applicant_vip_room_intro': {
    ru: 'это платная услуга, которая поможет Вам отправить ваше резюме в компанию, у которой нет вакансий, или нет подходящей для Вас вакансии. И, да, Ваше резюме будет в VIP комнате компании, что отделяет и выделяет среди остальных резюме»',
    en: '',
    uz: ''
  },
  'applicant_vacancy_appeal_seen': {
    ru: 'Просмотрено',
    en: '',
    uz: ''
  },
  'applicant_vacancy_appeal_requested': {
    ru: 'Отправлено',
    en: '',
    uz: ''
  },
  'applicant_vacancy_appeal_viewed': {
    ru: 'На рассмотрении',
    en: '',
    uz: ''
  },
  'applicant_vacancy_appeal_accepted': {
    ru: 'Прилашен',
    en: '',
    uz: ''
  },
  'applicant_vacancy_appeal_rejected': {
    ru: 'Отклонен',
    en: '',
    uz: ''
  },
  'applicant_resume_appeals': {
    ru: 'Отклики по резюме',
    en: '',
    uz: ''
  },
  'company_info': {
    ru: 'Информация о компании',
    en: '',
    uz: ''
  },
  'company_photo': {
    ru: 'Фото компании',
    en: '',
    uz: ''
  },
  'company_trademark': {
    ru: 'Торговая марка компании',
    en: '',
    uz: ''
  },
  'company_est_year': {
    ru: 'Год основания',
    en: '',
    uz: ''
  },
  'company_staff_count': {
    ru: 'Кол-во сотрудников',
    en: 'Staff count',
    uz: ''
  },
  'company_address': {
    ru: 'Юридический адрес',
    en: '',
    uz: ''
  },
  'company_phone': {
    ru: 'Телефон',
    en: '',
    uz: ''
  },
  'company_phone_extra': {
    ru: 'Доп. номер телефона',
    en: '',
    uz: ''
  },
  'company_contact_person': {
    ru: 'Контактное лицо',
    en: '',
    uz: ''
  },
  'company_website': {
    ru: 'Веб сайт компании',
    en: '',
    uz: ''
  },
  'company_requisites': {
    ru: 'Банковские реквизиты',
    en: '',
    uz: ''
  },
  'company_requisites_placeholder': {
    ru: 'Указанные реквизиты будут использованы для формирования счетов и доставки документов вашей компании',
    en: '',
    uz: ''
  },
  'company_description': {
    ru: 'Описание организации',
    en: '',
    uz: ''
  },
  'company_email_hint': {
    ru: 'Email  — это ваш логин для авторизации на сайте. Будьте бдительны при смене email.',
    en: '',
    uz: ''
  },
  'company_about': {
    ru: 'О компании',
    en: '',
    uz: ''
  },
  'company_vacancies': {
    ru: 'Вакансии этой компании',
    en: '',
    uz: ''
  },
  'company_personal_manager': {
    ru: 'Мой персональный менеджер',
    en: '',
    uz: ''
  },
  'emp_active_vacancies': {
    ru: 'Опубликованных вакансий',
    en: '',
    uz: ''
  },
  'emp_vacancy_progress': {
    ru: 'Вакансия заполнена на',
    en: '',
    uz: ''
  },
  'emp_vacancy_waiting_moderation': {
    ru: 'Ожидает модерации',
    en: 'Waiting for moderation',
    uz: ''
  },
  'emp_active_vacancy_f': {
    ru: 'Опубликованные вакансии',
    en: '',
    uz: ''
  },
  'emp_search_requests': {
    ru: 'Поисковые запросы',
    en: '',
    uz: ''
  },
  'emp_active_serv': {
    ru: 'Активные услуги',
    en: '',
    uz: ''
  },
  'emp_my_services': {
    ru: 'Мои услуги',
    en: '',
    uz: ''
  },
  'emp_no_active_services': {
    ru: 'Вы еще не приобрели услуги',
    en: '',
    uz: ''
  },
  'emp_validity': {
    ru: 'Период действия',
    en: '',
    uz: ''
  },
  'emp_rest_of_days': {
    ru: 'Остаток дней',
    en: '',
    uz: ''
  },
  'emp_extend_service': {
    ru: 'Продлить',
    en: '',
    uz: ''
  },
  'emp_company_profile': {
    ru: 'профиль компании',
    en: '',
    uz: ''
  },
  'emp_company_profile_created': {
    ru: 'Профиль создан',
    en: '',
    uz: ''
  },
  'emp_profile_completed': {
    ru: 'Профиль компании заполнен на',
    en: '',
    uz: ''
  },
  'emp_view_count': {
    ru: '%(views)s просмотров профиля компании',
    en: '',
    uz: ''
  },
  'emp_selection_of_specialists': {
    ru: 'Подборка специалистов на основе ваших вакансий',
    en: '',
    uz: ''
  },
  'emp_nae': {
    ru: 'новости / статьи / события',
    en: '',
    uz: ''
  },
  'emp_weekly': {
    ru: 'За неделю',
    en: '',
    uz: ''
  },
  'emp_monthly': {
    ru: 'За месяц',
    en: '',
    uz: ''
  },
  'emp_yearly': {
    ru: 'За год',
    en: '',
    uz: ''
  },
  'emp_all_period': {
    ru: 'За весь период',
    en: '',
    uz: ''
  },
  'emp_view_stat_graph': {
    ru: 'Статистика просмотров',
    en: '',
    uz: ''
  },
  'emp_all_vacancy_view': {
    ru: 'Просмотры всех вакансий',
    en: '',
    uz: ''
  },
  'emp_all_vacancy_show': {
    ru: 'Показы всех вакансий',
    en: '',
    uz: ''
  },
  'emp_vacancy_search': {
    ru: 'Поиск по вакансиям',
    en: '',
    uz: ''
  },
  'emp_active_vacancy': {
    ru: 'активные',
    en: '',
    uz: ''
  },
  'emp_archive_vacancy': {
    ru: 'архивные',
    en: '',
    uz: ''
  },
  'emp_vacancy_appeals': {
    ru: 'Отклики по вакансии',
    en: '',
    uz: ''
  },
  'emp_vacancy_appeal_all': {
    ru: 'Все',
    en: '',
    uz: ''
  },
  'emp_vacancy_appeal_viewed': {
    ru: 'На рассмотрении',
    en: '',
    uz: ''
  },
  'emp_vacancy_appeal_accepted': {
    ru: 'Приглашены',
    en: '',
    uz: ''
  },
  'emp_vacancy_appeal_rejected': {
    ru: 'Отклонены',
    en: '',
    uz: ''
  },
  'emp_vip_room_intro': {
    ru: 'здесь отображаются личные письма от специалистов, которые хотят у вас работать, и «потратили больше…, чем другие», чтобы попасть к вам в комнату. Уделите время, просмотрите их сообщения!',
    en: '',
    uz: ''
  },
  'emp_order_number': {
    ru: '№ заказа',
    en: '',
    uz: ''
  },
  'emp_order_title': {
    ru: 'Заказ №',
    en: '',
    uz: ''
  },
  'emp_order_date': {
    ru: 'Дата заказа',
    en: '',
    uz: ''
  },
  'emp_order_sum': {
    ru: 'Сумма заказа',
    en: '',
    uz: ''
  },
  'emp_order_paid': {
    ru: 'Оплачено',
    en: '',
    uz: ''
  },
  'emp_order_rest': {
    ru: 'Остаток',
    en: '',
    uz: ''
  },
  'emp_status_title': {
    ru: 'Статус',
    en: '',
    uz: ''
  },
  'emp_stat_wait': {
    ru: 'Ожидает',
    en: '',
    uz: ''
  },
  'emp_stat_active': {
    ru: 'Активен',
    en: '',
    uz: ''
  },
  'emp_stat_done': {
    ru: 'Завершен',
    en: '',
    uz: ''
  },
  'emp_stat_canceled': {
    ru: 'Отменен',
    en: '',
    uz: ''
  },
  'emp_add_staff': {
    ru: 'Добавить менеджера',
    en: '',
    uz: ''
  },
  'emp_new_staff': {
    ru: 'Новый пользователь',
    en: '',
    uz: ''
  },
  'emp_edit_staff': {
    ru: 'Редактирование пользователя',
    en: '',
    uz: ''
  },
  'emp_staff_is_admin': {
    ru: 'Главный пользователь, админ',
    en: '',
    uz: ''
  },
  'chat_new_messages': {
    ru: 'Новые сообщения',
    en: 'New messages',
    uz: 'Yangi xabarlar'
  },
  'chat_no_messages': {
    ru: 'У вас пока нет сообщений',
    en: 'You have no messages yet',
    uz: ''
  },
  'chat_last_message': {
    ru: 'Последнее сообщение',
    en: '',
    uz: ''
  },
  'chat_select_chat': {
    ru: 'Пожалуйста, выберите чат',
    en: 'Please, select chat',
    uz: ''
  },
  'chat_load_more': {
    ru: 'Загрузить еще',
    en: 'Load more messages',
    uz: ''
  },
  'chat_write_message': {
    ru: 'Напишите сообщение...',
    en: 'Write a message...',
    uz: ''
  },
  'vacancy_create_title': {
    ru: 'Создание вакансии',
    en: '',
    uz: ''
  },
  'vacancy_edit_title': {
    ru: 'Редактирование вакансии',
    en: '',
    uz: ''
  },
  'vacancy_title': {
    ru: 'Наименование вакансии',
    en: '',
    uz: ''
  },
  'vacancy_title_desc': {
    ru: 'Указанная должность будет указываться в вашем резюме, работодатели будут видеть эту должность как вашу специальность. Указывайте реальную информацию!',
    en: '',
    uz: ''
  },
  'vacancy_wished_sphere': {
    ru: 'Желаемая сфера',
    en: '',
    uz: ''
  },
  'vacancy_wished_specialities': {
    ru: 'Выберите должность',
    en: '',
    uz: ''
  },
  'vacancy_official_duties': {
    ru: 'Должностные обязанности',
    en: '',
    uz: ''
  },
  'vacancy_official_duties_label': {
    ru: 'Укажите должностные инструкции к соискателю',
    en: '',
    uz: ''
  },
  'vacancy_working_conditions': {
    ru: 'Условия работы',
    en: '',
    uz: ''
  },
  'vacancy_salary': {
    ru: 'Оклад',
    en: '',
    uz: ''
  },
  'vacancy_bonus_pack': {
    ru: 'Бонусы и соцпакеты',
    en: '',
    uz: ''
  },
  'vacancy_answer_questions': {
    ru: 'Ответьте на вопросы',
    en: 'Answer the questions',
    uz: 'Savollarga javob bering'
  },
  'vacancy_questions': {
    ru: 'Дополнительные вопросы для соискателя',
    en: '',
    uz: ''
  },
  'vacancy_questions_desc': {
    ru: 'Здесь вы можете создать вопросы, на которые кандидаты должны будут ответить при отклике на вашу вакансию. Ответы кандидатов покажут Вам сразу насколько данный кандидат соответствует Вашим требованиям.',
    en: '',
    uz: ''
  },
  'vacancy_question_title': {
    ru: 'Вопрос',
    en: '',
    uz: ''
  },
  'vacancy_question_open': {
    ru: 'Открытый вопрос',
    en: '',
    uz: ''
  },
  'vacancy_question_variants': {
    ru: 'С вариантами ответа',
    en: '',
    uz: ''
  },
  'vacancy_question_variants_title': {
    ru: 'Вариант ответа',
    en: '',
    uz: ''
  },
  'vacancy_resume_work': {
    ru: 'Резюме в работе',
    en: '',
    uz: ''
  },
  'vacancy_resume_need': {
    ru: 'Подходящие резюме',
    en: '',
    uz: ''
  },
  'vacancy_promotion_desc': {
    ru: 'Продвигайте свою вакансию, чтобы скорее находить кандидатов',
    en: '',
    uz: ''
  },
  'vacancy_archive_move_desc': {
    ru: 'Если вам уже не нужна эта вакансия, то её можно переместить в архив, и создать новую',
    en: '',
    uz: ''
  },
  'vacancy_rest_detail': {
    ru: 'Осталось',
    en: '',
    uz: ''
  },
  'vacancy_in_archive': {
    ru: 'Вакансия в архиве',
    en: '',
    uz: ''
  },
  'vacancy_archive_reason': {
    ru: 'Укажите причину архивации вакансии',
    en: '',
    uz: ''
  },
  'vacancy_archive_comment': {
    ru: 'Причина архивации',
    en: '',
    uz: ''
  },
  'vacancy_promotion': {
    ru: 'Продвижение вакансии',
    en: '',
    uz: ''
  },
  'vacancy_republish': {
    ru: 'Разместить повторно',
    en: '',
    uz: ''
  },
  'vacancy_delete': {
    ru: 'Удалить вакансию',
    en: '',
    uz: ''
  },
  'vacancy_similar_list': {
    ru: 'Похожие вакансии',
    en: '',
    uz: ''
  },
  'vacancy_view_vacancy_tab': {
    ru: 'Вакансия',
    en: '',
    uz: ''
  },
  'vacancy_view_requirements_tab': {
    ru: 'Требования',
    en: '',
    uz: ''
  },
  'vacancy_view_duties_tab': {
    ru: 'Обязанности',
    en: '',
    uz: ''
  },
  'vacancy_view_conditions_tab': {
    ru: 'Условия работы',
    en: '',
    uz: ''
  },
  'vacancy_view_extra_info_tab': {
    ru: 'Доп. информация',
    en: '',
    uz: ''
  },
  'vacancy_view_questions_tab': {
    ru: 'Доп. вопросы',
    en: '',
    uz: ''
  },
  'resume_promotion': {
    ru: 'Продвижение резюме',
    en: '',
    uz: ''
  },
  'resume_promotion_desc': {
    ru: 'Продвигайте своё резюме, чтобы работадатель нашел вас быстрее',
    en: '',
    uz: ''
  },
  'button_hide': {
    ru: 'Свернуть',
    en: '',
    uz: ''
  },
  'button_show_all': {
    ru: 'Просмотреть все',
    en: '',
    uz: ''
  },
  'button_more_vacancy': {
    ru: 'Больше вакансий',
    en: '',
    uz: ''
  },
  'button_more_specialist': {
    ru: 'Больше специалистов',
    en: '',
    uz: ''
  },
  'button_more_news': {
    ru: 'Больше новостей',
    en: '',
    uz: ''
  },
  'button_cancel': {
    ru: 'Отмена',
    en: '',
    uz: ''
  },
  'button_select': {
    ru: 'Выбрать',
    en: '',
    uz: ''
  },
  'button_send': {
    ru: 'Отправить',
    en: '',
    uz: ''
  },
  'button_change': {
    ru: 'Изменить данные',
    en: '',
    uz: ''
  },
  'button_find': {
    ru: 'Найти',
    en: 'Find',
    uz: 'Qidirish'
  },
  'button_save_search': {
    ru: 'Сохранить результаты поиска',
    en: '',
    uz: ''
  },
  'button_more': {
    ru: 'Ещё',
    en: '',
    uz: ''
  },
  'button_add_favorite': {
    ru: 'Добавить в избранное',
    en: '',
    uz: ''
  },
  'button_remove_favorite': {
    ru: 'Удалить из избранного',
    en: '',
    uz: ''
  },
  'button_work_here': {
    ru: 'Хочу здесь работать',
    en: '',
    uz: ''
  },
  'button_respond': {
    ru: 'Откликнуться',
    en: '',
    uz: ''
  },
  'button_respond_already': {
    ru: 'Вы уже откликивались на эту вакансию',
    en: '',
    uz: ''
  },
  'button_respond_vacancy': {
    ru: 'Откликнуться на вакансию',
    en: '',
    uz: ''
  },
  'button_show_serv': {
    ru: 'Показать',
    en: '',
    uz: ''
  },
  'button_buy_serv': {
    ru: 'Купить',
    en: '',
    uz: ''
  },
  'button_hide_serv': {
    ru: 'Скрыть',
    en: '',
    uz: ''
  },
  'button_apply': {
    ru: 'Применить',
    en: '',
    uz: ''
  },
  'button_show_contact': {
    ru: 'Показать контакты',
    en: '',
    uz: ''
  },
  'button_to_invite': {
    ru: 'Пригласить на собеседование',
    en: '',
    uz: ''
  },
  'button_is_invited': {
    ru: 'Вы отправили приглашение',
    en: '',
    uz: ''
  },
  'button_preview': {
    ru: 'Предварительный просмотр',
    en: '',
    uz: ''
  },
  'button_save_resume': {
    ru: 'Сохранить резюме',
    en: '',
    uz: ''
  },
  'button_save_vacancy': {
    ru: 'Сохранить вакансию',
    en: '',
    uz: ''
  },
  'button_save_publish': {
    ru: 'Сохранить и опубликовать',
    en: '',
    uz: ''
  },
  'button_to_postpone': {
    ru: 'Продолжить позже',
    en: '',
    uz: ''
  },
  'button_continue_edit': {
    ru: 'Продолжить редактирование',
    en: '',
    uz: ''
  },
  'button_back': {
    ru: 'Назад',
    en: '',
    uz: ''
  },
  'button_view_guest': {
    ru: 'Просмотреть',
    en: '',
    uz: ''
  },
  'button_fill_profile': {
    ru: 'Заполнить',
    en: '',
    uz: ''
  },
  'button_all_aplicants': {
    ru: 'Все кандидаты',
    en: '',
    uz: ''
  },
  'button_emp_reorder': {
    ru: 'Повторить заказ',
    en: '',
    uz: ''
  },
  'button_emp_contract': {
    ru: 'Запросить договор',
    en: '',
    uz: ''
  },
  'button_add_question': {
    ru: 'Добавить вопрос',
    en: '',
    uz: ''
  },
  'button_simple_save': {
    ru: 'Сохранить',
    en: '',
    uz: ''
  },
  'button_simple_add': {
    ru: 'Добавить',
    en: '',
    uz: ''
  },
  'button_simple_create': {
    ru: 'Создать',
    en: '',
    uz: ''
  },
  'button_simple_edit': {
    ru: 'Изменить',
    en: '',
    uz: ''
  },
  'button_save_changes': {
    ru: 'Сохранить изменения',
    en: 'Save changes',
    uz: ''
  },
  'button_simple_del': {
    ru: 'Удалить',
    en: '',
    uz: ''
  },
  'button_vacancy_promotion': {
    ru: 'Продвижение вакансии',
    en: '',
    uz: ''
  },
  'button_vacancy_main': {
    ru: 'Сделать основным',
    en: '',
    uz: ''
  },
  'button_edit_all': {
    ru: 'Редактировать всё',
    en: '',
    uz: ''
  },
  'button_resume_download': {
    ru: 'Скачать резюме',
    en: '',
    uz: ''
  },
  'button_resume_print': {
    ru: 'Распечатать резюме',
    en: '',
    uz: ''
  },
  'button_resume_refresh': {
    ru: 'Обновить дату публикации',
    en: '',
    uz: ''
  },
  'button_archive_move': {
    ru: 'Переместить в архив',
    en: '',
    uz: ''
  },
  'button_publish': {
    ru: 'Опубликовать',
    en: '',
    uz: ''
  },
  'button_consider': {
    ru: 'Рассмотреть',
    en: '',
    uz: ''
  },
  'button_invite': {
    ru: 'Пригласить',
    en: '',
    uz: ''
  },
  'button_reject': {
    ru: 'Отклонить',
    en: '',
    uz: ''
  },
  'footer_faq_resume': {
    ru: 'Работа с резюме',
    en: '',
    uz: ''
  },
  'footer_faq_applicant': {
    ru: 'Советы для соискателей',
    en: '',
    uz: ''
  },
  'footer_offer': {
    ru: 'Коммерческое предложение',
    en: 'Offer',
    uz: ''
  },
  'footer_useful': {
    ru: 'Полезное',
    en: '',
    uz: ''
  },
  'footer_advertising': {
    ru: 'Реклама на сайте',
    en: '',
    uz: ''
  },
  'footer_contact': {
    ru: 'Контакты',
    en: '',
    uz: ''
  },
  'footer_copyright': {
    ru: 'Все права защищены.',
    en: '',
    uz: ''
  },
  'footer_copyright_desc': {
    ru: 'Публикация материалов сайта разрешается при обязательной установке активной гиперссылки на сайт www.myjob.uz. рядом с опубликованным материалом. Использование материалов ресурса в коммерческих целях запрещено.',
    en: '',
    uz: ''
  },
  'search_advanced_title': {
    ru: 'Расширенный поиск',
    en: '',
    uz: ''
  },
  'search_sort_by_date': {
    ru: 'Сначала новые',
    en: '',
    uz: ''
  },
  'search_sort_by_salary': {
    ru: 'По возрастанию зарплаты',
    en: '',
    uz: ''
  },
  'page_not_found_text': {
    ru: 'Страница не найдена',
    en: '',
    uz: ''
  },
  'page_not_found_go_home': {
    ru: 'Перейти на главную',
    en: '',
    uz: ''
  },
  'contact_form_title': {
    ru: 'Обратная связь',
    en: '',
    uz: ''
  },
  'contact_form_description': {
    ru: `Для отправки сообщения, пожалуйста заполните форму ниже.
         Мы всегда ждем Ваших пожеланий, комментариев и предложений!`,
    en: '',
    uz: ''
  },
  'contact_form_name': {
    ru: 'Имя',
    en: '',
    uz: ''
  },
  'contact_form_name_placeholder': {
    ru: 'Укажите свое имя',
    en: '',
    uz: ''
  },
  'contact_form_email_placeholder': {
    ru: 'Укажите свой email',
    en: '',
    uz: ''
  },
  'contact_form_message': {
    ru: 'Сообщение',
    en: '',
    uz: ''
  },
  'contact_form_message_placeholder': {
    ru: 'Ваше сообщение',
    en: '',
    uz: ''
  }
}

export default translations
