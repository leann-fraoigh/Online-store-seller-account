# Avito Trainee Frontend Assignment 2024

## О сборке

Сборка основана на стнадртном [шаблоне](<https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts>) React + TypeScript + Vite. Роутинг -- React Router 6. Стили и компоненты -- Material UI.  .

## Установка

Вам понадобится установленный Node.js: 20 или выше.

1. Для установки зависимостей выполните команду

    ```bash
    npm install
    ```

2. Для старта локального сервера выполните команду

    ```bash
    npm run dev
    ```

3. Для работы вам понадобится бэкенд.
    Если бэкенд не запущен, то. Склонируйте репозиторий [Frontend-trainee-assignment-2024](https://gitverse.ru/avito.tech/tech-internship/content/main/Tech%20Internships%20/Frontend/Frontend-trainee-assignment-2024) и следуйте инструкциям по установке и запуску в [README.md](https://gitverse.ru/avito.tech/tech-internship/content/main/Tech%20Internships%20/Frontend/Frontend-trainee-assignment-2024/frontend-trainee-assignment-autumn-2024.md) проекта (пункты Перед запуском, Запуск сервера).

    Скопируйте содержимое файла `.env.sample` в файл `.env` и пропишите в `VITE_API_URL` путь к серверу.

## Вопросы и проблемы

* `?` Т.к. предложенная версия бэкенда не умеет фльтровать по части строки, поиск по объявлениям реализован только в виде поиска по полному названию.
  
* Некоторые места в коде сопровождаются комментариями c префиксом **TODO:**, означающими, что конкретное место в коде требует проверки или доработки.

* Нужно доработать валидацию форм.
  
* Нужно доработать обработку ошибок.
  
* Дебаунсинг/Троттлинг реализован для фильтров заказов и поиска по объявлениям.
  
* Прерывание запросов реализовано пока только для показа карточек объявлений в заказе.

* Ради скорости и эксперимента используется material UI. (В отличие от, например, Ant Design, у него есть хоть какая-то дока по интеграции с библиотекой роутинга). Но т.к. ранье не пользовалась им, вероятны ошибки семантики/доступности и т.д. Нужно будет перепроверить.


## Структура проекта

Т.к. проект маленький, не хочется применять сложную методологию. Сейчас организовано так:

|Директория|Описание|
|-|-|
|**src/screens**|Тут лежат основные экраны. Если для его отрисовки нужен только один файл, то он лежит непосредственно в директории и назван соответственно. Если у экрана в отдельный файл вынесен лоадер или другие компоненты, он лежит в поддиректории с соответствующим экрану названию, в `index.tsx`. (Лоадеры вынесены из компонентов для облегчения чтения кода и разделения ответственности.) |
|**src/components**|Тут лежат все компоненты, которые импортируются на основные экраны. Можно было бы оставить тут только компоненты, которые используются в нескольких местах, а остальные положить в директории соответствующих экранов, но так получается более плоская и ясная структура.|
|**src/hook**| Тут лежат кастомные хуки.|
|**src/assets/css**|Тут лежат стили, все они эспортируются в index.css. В нем же пока лежат небольшие стили для отдельных элементов. В будущем при усложнении стилей их стоит вынести в отдельные файл в соответствии с БЭМ или по другому принципу.|
|**src/models**|Тут лежат типы, которые используются по всему приложению.|
|**src/api**|Тут лежат всяческие хелперы для запросов на бэк.|
|**src/helpers**|Тут лежат всякие универсальные хелперы, котоыре потенциально могут использоваться в разных местах. Можно их потом разложить ближе к местам использования.|
|**src/tests**|Тут лежат юнит-тесты.|

## Тестирование

Для запуска через терминал `npm run {command}`
|Команда|Описание|
|-|-|
|**lint:test**|Запускает eslint|
|**lint:fix**|Чинит ошибки eslint|
|**vitest:test**|Запускает юнит-тестирование|
|**vitest:watch**|Запускает юнит-тестирование в режиме наблюдения за изменениями|
|**test**|Запускает все тесты|

## О приложении

Личный кабинет продавца на маркетплейсе, в котором есть возможность управлять своими объявлениями и заказами.

## Функциональные требования

**Приложение состоит из**:

1. Страницы объявления  
2. Страницы всех объявлений  
3. Страницы заказов  
4. Панели навигации

### На странице всех объявлений:

1. Отображается список всех объявлений продавца  
2. Реализована пагинация показа объявлений  
3. Реализован выбор количества объявлений для показа на странице (по умолчанию 10)  
4. Реализован поиск по названию объявления
5. Можно перейти на страницу объявления (по клику на карточку)  
6. В карточке объявления есть следующая информация о нем:  
   - Картинка  
   - Название;  
   - Стоимость;  
   - Количество просмотров;  
   - Количество лайков;
7. Есть возможность создавать новые объявления (Модальное окно с input):  
   - Картинка (текстовое поле для ввода URL);  
   - Название (текстовое поле);  
   - Описание (текстовое поле)
   - Стоимость (числовое поле);
  
### На странице объявления:

1. Есть возможность просмотра объявления
2. В редактировании объявления есть возможность:  
   - Менять картинку;  
   - Менять название;  
   - Менять цену;  
   - Менять описание.
  
### На странице заказов:

1. Отображается список заказов с фильтрами по статусу  
2. Возможно сделать сортировку по сумме заказа  
3. На карточке заказа изображена следующая информация:  
   - Количество товаров;  
   - Возможность завершения заказа;  
   - Стоимость заказа;
   - Дата создания заказа;
   - Статус (текстом);
   - Номер заказа;
   - Кнопка “Показать все товары”, показывающая все товары в данном заказе (модальное окно)  
4. При клике на товар в заказе есть возможность перейти в объявление продавца по этому товару
   
### Панель навигации:

1. Вкладка “Объявления” - реализован переход на страницу объявлений  
2. Вкладка “Заказы” - реализован переход на страницу заказов
