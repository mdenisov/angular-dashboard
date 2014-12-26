angular.module('templates.app', ['users/users-edit.tpl.html', 'users/users-list.tpl.html', 'views/author/edit.tpl.html', 'views/author/list.tpl.html', 'views/bankpress/edit.tpl.html', 'views/bankpress/list.tpl.html', 'views/columnist/edit.tpl.html', 'views/columnist/list.tpl.html', 'views/daytheme/edit.tpl.html', 'views/daytheme/list.tpl.html', 'views/directives/popover/popover-html.tpl.html', 'views/history/edit.tpl.html', 'views/history/list.tpl.html', 'views/home/edit.tpl.html', 'views/home/list.tpl.html', 'views/interview/edit.tpl.html', 'views/interview/list.tpl.html', 'views/lenta/edit.tpl.html', 'views/lenta/list.tpl.html', 'views/modals/history.tpl.html', 'views/notify.tpl.html', 'views/partials/breadcrumb.tpl.html', 'views/partials/footer.tpl.html', 'views/partials/header.tpl.html', 'views/partials/news/filter.tpl.html', 'views/partials/news/history.tpl.html', 'views/partials/news/illustrations.tpl.html', 'views/partials/news/list.tpl.html', 'views/partials/sidebar.tpl.html', 'views/settings/edit.tpl.html', 'views/topic/edit.tpl.html', 'views/topic/list.tpl.html']);

angular.module("users/users-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("users/users-edit.tpl.html",
    "\n" +
    "<div class=\"page-header\">\n" +
    "    <h2>Edit {{user.name}}'s Details</h2>\n" +
    "</div>\n" +
    "\n" +
    "<table class=\"full-width\">\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <form class=\"form-horizontal\" role=\"form\" name=\"form\" novalidate crud-edit=\"user\">\n" +
    "                <div class=\"form-group\" show-errors>\n" +
    "                    <label class=\"col-md-4 control-label\">Name</label>\n" +
    "                    <div class=\"col-md-5\">\n" +
    "                        <input type=\"text\" class=\"form-control\" name=\"name\" ng-model=\"user.name\" required />\n" +
    "                        <span ng-show=\"showError('name', 'required')\" class=\"help-inline\">This field is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"isInvalid('email')\">\n" +
    "                    <label class=\"col-md-4 control-label\">Email</label>\n" +
    "                    <div class=\"col-md-5\">\n" +
    "                        <input type=\"email\" class=\"form-control\" name=\"email\" ng-model=\"user.email\" required validate-email />\n" +
    "                        <span ng-show=\"showError('email', 'required')\" class=\"help-inline\">This field is required.</span>\n" +
    "                        <span ng-show=\"showError('email', 'email')\" class=\"help-inline\">Please enter a valid email address.</span>\n" +
    "                        <span ng-show=\"showError('email', 'validateEmail')\" class=\"help-inline\">Please enter a valid email address.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-md-4 control-label\">Role</label>\n" +
    "                    <div class=\"col-md-5\">\n" +
    "                        <select class=\"form-control\" name=\"role\" ng-model=\"user.role\" required>\n" +
    "                            <option value=\"user\">User</option>\n" +
    "                            <option value=\"admin\">Admin</option>\n" +
    "                        </select>\n" +
    "                        <span ng-show=\"showError('role', 'required')\" class=\"help-inline\">This field is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-md-offset-4 col-md-5\">\n" +
    "                        <crud-buttons></crud-buttons>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>");
}]);

angular.module("users/users-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("users/users-list.tpl.html",
    "<!--<h4>My projects</h4>-->\n" +
    "\n" +
    "<!--<div ng-include=\"'js/app/projects/projects-list.tpl.html'\"></div>-->\n" +
    "\n" +
    "<div class=\"page-header\">\n" +
    "    <h2>Users</h2>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <form class=\"form-inline\" role=\"form\">\n" +
    "            <div class=\"form-group sort\">\n" +
    "                <div class=\"btn-group\" dropdown>\n" +
    "                    <button type=\"button\" class=\"btn btn-sm btn-primary\">Sort By</button>\n" +
    "                    <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\">\n" +
    "                        <span class=\"caret\"></span>\n" +
    "                        <span class=\"sr-only\">Sort By</span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li>\n" +
    "                            <a ng-click=\"sort('id')\">\n" +
    "                                Id <i ng-class=\"{'glyphicon glyphicon-chevron-up' : isSortUp('id'), 'glyphicon glyphicon-chevron-down' : isSortDown('id')}\"></i>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a ng-click=\"sort('name')\">\n" +
    "                                Name <i ng-class=\"{'glyphicon glyphicon-chevron-up' : isSortUp('name'), 'glyphicon glyphicon-chevron-down' : isSortDown('name')}\"></i>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a ng-click=\"sort('email')\">\n" +
    "                                Email <i ng-class=\"{'glyphicon glyphicon-chevron-up' : isSortUp('email'), 'glyphicon glyphicon-chevron-down' : isSortDown('email')}\"></i>\n" +
    "                            </a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Enter name or email\" ng-model=\"search\">\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<table class=\"table table-bordered table-condensed1 table-striped table-hover\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th class=\"span8\">Name</th>\n" +
    "            <th class=\"span1\">Email</th>\n" +
    "            <th class=\"span1\">Role</th>\n" +
    "            <th class=\"span2\">Tools</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"user in users | limitTo:10 | startsWithLetter:search | orderBy:sortField:reverse\" ng-click=\"edit(user.$id())\">\n" +
    "            <td>\n" +
    "                <a href=\"#/users/{{user.id}}\">{{user.name}}</a>\n" +
    "            </td>\n" +
    "            <td>{{user.email}}</td>\n" +
    "            <td>{{user.role}}</td>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-sm btn-default edit\" ng-click=\"edit(user.$id())\">\n" +
    "                    <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "                </button>\n" +
    "                <button class=\"btn btn-sm btn-danger remove\" ng-click=\"remove(user, $index, $event)\">\n" +
    "                    <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"!users.length\">\n" +
    "            <td colspan=\"4\">No users for you!</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <button class=\"btn btn-primary btn-sm pull-right\" role=\"button\" ng-click=\"new()\">Add User</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/author/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/author/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Имя</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"name\" ng-model=\"item.name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Фамилия</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"surname\" ng-model=\"item.surname\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Профессия или статус</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"columnist_status\" ng-model=\"item.columnist_status\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Фото</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация об авторе</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"info\" ng-model=\"item.info\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/author/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/author/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Авторы</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/bankpress/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/bankpress/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.products\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getProducts($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Рубрика</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"sub_category\" ng-model=\"item.sub_category\">\n" +
    "                                    <option value=\"\">(не установлено)</option>\n" +
    "                                    <option value=\"lenta_banks\">Банки</option>\n" +
    "                                    <option value=\"lenta_products_and_services\">Продукты и услуги</option>\n" +
    "                                    <option value=\"lenta_buisness\">Бизнес</option>\n" +
    "                                    <option value=\"lenta_market\">Рынки</option>\n" +
    "                                    <option value=\"lenta_macroeconomic\">Макроэкономика</option>\n" +
    "                                    <option value=\"lenta_in_world\">В мире</option>\n" +
    "                                    <option value=\"lenta_accidents\" selected=\"selected\">Происшествия</option>\n" +
    "                                    <option value=\"lenta_projects_bankiru\">Проекты Банки.ру</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банки</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanks($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация о банках</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks_info\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanksInfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Микрофинансовые организации</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.mfo\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Страховые компании</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.insurance\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getInsurance($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Регионы</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.regions\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRegions($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">RSS</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.rss\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRss($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Текст</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor=\"{plugins: ['table','placeholders','clips','fullscreen']}\" data-placeholders='{\"placeholders\": [{\"name\": \"placeholder_gallery\",\"value\": \"Иллюстрации\"}]}' required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Сюжеты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.topic\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Изображение</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-horizontal col-md-12 col-lg-12\" ng-show=\"item.image.src\" style=\"margin-top: 15px;\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Источник</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source\" ng-model=\"item.image.source\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Ссылка</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source_url\" ng-model=\"item.image.source_url\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                            <label class=\"control-label\">Подпись</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.sign\" ng-model=\"item.image.sign\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Внутреннее название</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"inside\" ng-model=\"item.inside\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Подзаголовок</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"subtitle\" ng-model=\"item.subtitle\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Лизинг</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.leasing\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать в карточке банка</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"noshowinbankcard\" ng-model=\"item.noshowinbankcard\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/bankpress/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/bankpress/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Мониторинг банковской прессы</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/columnist/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/columnist/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.products\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getProducts($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банки</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanks($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация о банках</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks_info\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanksInfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Микрофинансовые организации</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.mfo\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Страховые компании</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.insurance\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getInsurance($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Регионы</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.regions\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRegions($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">RSS</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.rss\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRss($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Текст</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor=\"{plugins: ['table','placeholders','clips','fullscreen']}\" data-placeholders='{\"placeholders\": [{\"name\": \"placeholder_gallery\",\"value\": \"Иллюстрации\"}]}' required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Сюжеты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.topic\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Автор</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"author\" ng-model=\"item.author\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Метка</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"label\" ng-model=\"item.label\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Скрыть портрет колумниста</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"hide_columnist_photo\" ng-model=\"item.hide_columnist_photo\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/columnist/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/columnist/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Мнение</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/daytheme/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/daytheme/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.products\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getProducts($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Рубрика</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"sub_category\" ng-model=\"item.sub_category\">\n" +
    "                                    <option value=\"\">(не установлено)</option>\n" +
    "                                    <option value=\"lenta_banks\">Банки</option>\n" +
    "                                    <option value=\"lenta_products_and_services\">Продукты и услуги</option>\n" +
    "                                    <option value=\"lenta_buisness\">Бизнес</option>\n" +
    "                                    <option value=\"lenta_market\">Рынки</option>\n" +
    "                                    <option value=\"lenta_macroeconomic\">Макроэкономика</option>\n" +
    "                                    <option value=\"lenta_in_world\">В мире</option>\n" +
    "                                    <option value=\"lenta_accidents\" selected=\"selected\">Происшествия</option>\n" +
    "                                    <option value=\"lenta_projects_bankiru\">Проекты Банки.ру</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банки</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanks($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация о банках</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks_info\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanksInfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Микрофинансовые организации</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.mfo\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Страховые компании</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.insurance\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getInsurance($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Регионы</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.regions\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRegions($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">RSS</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.rss\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRss($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Текст</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor=\"{plugins: ['table','placeholders','clips','fullscreen']}\" data-placeholders='{\"placeholders\": [{\"name\": \"placeholder_gallery\",\"value\": \"Иллюстрации\"}]}' required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Сюжеты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.topic\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Изображение</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-horizontal col-md-12 col-lg-12\" ng-show=\"item.image.src\" style=\"margin-top: 15px;\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Источник</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source\" ng-model=\"item.image.source\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Ссылка</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source_url\" ng-model=\"item.image.source_url\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                            <label class=\"control-label\">Подпись</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.sign\" ng-model=\"item.image.sign\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Внутреннее название</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"inside\" ng-model=\"item.inside\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Подзаголовок</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"subtitle\" ng-model=\"item.subtitle\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Лизинг</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.leasing\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать только в тематическом разделе</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"razdel_only\" ng-model=\"item.razdel_only\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать в карточке банка</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"noshowinbankcard\" ng-model=\"item.noshowinbankcard\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Видеоновости</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.video\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/daytheme/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/daytheme/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Тема дня</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/directives/popover/popover-html.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/directives/popover/popover-html.tpl.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "    <div class=\"arrow\"></div>\n" +
    "    <div class=\"popover-inner\">\n" +
    "        <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "        <div class=\"popover-content\" ng-bind-html=\"content\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/history/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/history/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Активность</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input type=\"checkbox\" name=\"active\" ng-model=\"item.active\" ui-switch=\"{color: '#64BD63', secondaryColor: '#DB5455'}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"open($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Статус</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"open($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input type=\"checkbox\" name=\"correction\" ng-model=\"item.correction\" ui-switch=\"{color: '#64BD63', secondaryColor: '#DB5455'}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"products\" ng-model=\"item.products\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Рубрика</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <select class=\"form-control\" name=\"sub_category\" ng-model=\"item.sub_category\">\n" +
    "                                    <option value=\"\">(не установлено)</option>\n" +
    "                                    <option value=\"lenta_banks\">Банки</option>\n" +
    "                                    <option value=\"lenta_products_and_services\">Продукты и услуги</option>\n" +
    "                                    <option value=\"lenta_buisness\">Бизнес</option>\n" +
    "                                    <option value=\"lenta_market\">Рынки</option>\n" +
    "                                    <option value=\"lenta_macroeconomic\">Макроэкономика</option>\n" +
    "                                    <option value=\"lenta_in_world\">В мире</option>\n" +
    "                                    <option value=\"lenta_accidents\" selected=\"selected\">Происшествия</option>\n" +
    "                                    <option value=\"lenta_projects_bankiru\">Проекты Банки.ру</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Источник</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Главная новость</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input type=\"checkbox\" name=\"mainnews\" ng-model=\"item.mainnews\" ui-switch=\"{color: '#64BD63', secondaryColor: '#DB5455'}\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Банки</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"banks\" ng-model=\"item.banks\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Текст</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div class=\"panel\">\n" +
    "                        <div class=\"panel-tools\" align=\"left\">\n" +
    "                            <ul class=\"tooltip-area\">\n" +
    "                                <li>\n" +
    "                                    <div class=\"file-input-wrapper\" title=\"Добавиить\" data-toggle=\"tooltip\" data-placement=\"top\">\n" +
    "                                        <a href=\"\" class=\"btn btn-primary\"><i class=\"fa fa-upload\"></i></a>\n" +
    "                                        <input type=\"file\" name=\"image\" value=\"Добавиить\" accept=\"image/*\" multiple=\"multiple\" />\n" +
    "                                    </div>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <label class=\"btn btn-default disabled\" title=\"Выбрать все\" data-toggle=\"tooltip\" data-placement=\"top\">\n" +
    "                                        <input type=\"checkbox\" class=\"default\" disabled=\"disabled\">\n" +
    "                                    </label>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <button class=\"btn btn-default\" disabled data-target=\"reload\" title=\"Редактировать\" data-toggle=\"tooltip\" data-placement=\"top\"><i class=\"fa fa-pencil\"></i></button>\n" +
    "                                </li>\n" +
    "                                <li>\n" +
    "                                    <button class=\"btn btn-default\" disabled data-target=\"reload\" title=\"Удалить\" data-toggle=\"tooltip\" data-placement=\"top\"><i class=\"fa fa-trash-o\"></i></button>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                        <div class=\"padding--vertical\">\n" +
    "\n" +
    "                            <div class=\"illustrations__block\">\n" +
    "                                <img class=\"img-thumbnail\" alt=\"140x140\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA0Njg3NSIgeT0iNzAiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xNDB4MTQwPC90ZXh0PjwvZz48L3N2Zz4=\" style=\"width: 140px; height: 140px;\">\n" +
    "                                <img class=\"img-thumbnail\" alt=\"140x140\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA0Njg3NSIgeT0iNzAiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xNDB4MTQwPC90ZXh0PjwvZz48L3N2Zz4=\" style=\"width: 140px; height: 140px;\">\n" +
    "                                <img class=\"img-thumbnail\" alt=\"140x140\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA0Njg3NSIgeT0iNzAiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xNDB4MTQwPC90ZXh0PjwvZz48L3N2Zz4=\" style=\"width: 140px; height: 140px;\">\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/history/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/history/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Просмотр истории</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <div ng-include=\"'views/partials/news/history.tpl.html'\"></div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/home/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Активность</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Статус</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "                                        <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"products\" ng-model=\"item.products\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Рубрика</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <select class=\"form-control\" name=\"sub_category\" ng-model=\"item.sub_category\">\n" +
    "                                    <option value=\"\">(не установлено)</option>\n" +
    "                                    <option value=\"lenta_banks\">Банки</option>\n" +
    "                                    <option value=\"lenta_products_and_services\">Продукты и услуги</option>\n" +
    "                                    <option value=\"lenta_buisness\">Бизнес</option>\n" +
    "                                    <option value=\"lenta_market\">Рынки</option>\n" +
    "                                    <option value=\"lenta_macroeconomic\">Макроэкономика</option>\n" +
    "                                    <option value=\"lenta_in_world\">В мире</option>\n" +
    "                                    <option value=\"lenta_accidents\" selected=\"selected\">Происшествия</option>\n" +
    "                                    <option value=\"lenta_projects_bankiru\">Проекты Банки.ру</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Изображение</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-horizontal col-md-12 col-lg-12\" ng-show=\"item.image.src\" style=\"margin-top: 15px;\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Источник</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source\" ng-model=\"item.image.source\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Ссылка</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source_url\" ng-model=\"item.image.source_url\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                            <label class=\"control-label\">Подпись</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.sign\" ng-model=\"item.image.sign\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"item.image\">\n" +
    "                            <label class=\"control-label col-md-1\">Источник</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"item.image\">\n" +
    "                            <label class=\"control-label col-md-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Главная новость</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <switch name=\"mainnews\" ng-model=\"item.mainnews\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Банки</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"banks\" ng-model=\"item.banks\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Текст</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/home/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Новости</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/interview/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/interview/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.products\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getProducts($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать на главной вместе с онлайн-конференцией</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"with_online\" ng-model=\"item.with_online\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банки</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanks($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация о банках</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks_info\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanksInfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Микрофинансовые организации</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.mfo\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Страховые компании</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.insurance\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getInsurance($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Регионы</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.regions\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRegions($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">RSS</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.rss\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRss($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Текст</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor=\"{plugins: ['table','placeholders','clips','fullscreen']}\" data-placeholders='{\"placeholders\": [{\"name\": \"placeholder_gallery\",\"value\": \"Иллюстрации\"}]}' required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Сюжеты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.topic\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Изображение</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-horizontal col-md-12 col-lg-12\" ng-show=\"item.image.src\" style=\"margin-top: 15px;\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Источник</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source\" ng-model=\"item.image.source\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Ссылка</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source_url\" ng-model=\"item.image.source_url\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                            <label class=\"control-label\">Подпись</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.sign\" ng-model=\"item.image.sign\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Внутреннее название</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"inside\" ng-model=\"item.inside\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Автор</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"personname\" ng-model=\"item.personname\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Профессия или статус</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"personinfo\" ng-model=\"item.personinfo\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Лизинг</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.leasing\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать только в тематическом разделе</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"razdel_only\" ng-model=\"item.razdel_only\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать в карточке банка</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"noshowinbankcard\" ng-model=\"item.noshowinbankcard\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Видеоновости</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.video\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/interview/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/interview/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Интервью</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/lenta/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/lenta/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование новости' : 'Добавление новости'}}</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\" enctype=\"multipart/form-data\">\n" +
    "\n" +
    "            <tabset>\n" +
    "\n" +
    "                <tab heading=\"Основные\">\n" +
    "\n" +
    "                    <div class=\"padding--vertical\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Заголовок</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                                <div ng-messages=\"form.title.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Активность</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"active\" ng-model=\"item.active\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Начало публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Статус</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"status\"  ng-model=\"item.status\">\n" +
    "                                    <option value=\"1\">[1] Опубликован</option>\n" +
    "                                    <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                                    <option value=\"2\">[2] Черновик</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Окончание публикации</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Корректура</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"correction\" ng-model=\"item.correction\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банковские продукты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.products\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getProducts($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Рубрика</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <select class=\"form-control\" name=\"sub_category\" ng-model=\"item.sub_category\">\n" +
    "                                    <option value=\"\">(не установлено)</option>\n" +
    "                                    <option value=\"lenta_banks\">Банки</option>\n" +
    "                                    <option value=\"lenta_products_and_services\">Продукты и услуги</option>\n" +
    "                                    <option value=\"lenta_buisness\">Бизнес</option>\n" +
    "                                    <option value=\"lenta_market\">Рынки</option>\n" +
    "                                    <option value=\"lenta_macroeconomic\">Макроэкономика</option>\n" +
    "                                    <option value=\"lenta_in_world\">В мире</option>\n" +
    "                                    <option value=\"lenta_accidents\" selected=\"selected\">Происшествия</option>\n" +
    "                                    <option value=\"lenta_projects_bankiru\">Проекты Банки.ру</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Ссылка на источник</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                                <div ng-messages=\"form.source_url.$error\">\n" +
    "                                    <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-1\">Главная новость</label>\n" +
    "                            <div class=\"col-md-8\">\n" +
    "                                <switch name=\"mainnews\" ng-model=\"item.mainnews\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Банки</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanks($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Информация о банках</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.banks_info\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getBanksInfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Микрофинансовые организации</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <tags-input ng-model=\"item.mfo\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Страховые компании</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.insurance\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getInsurance($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Регионы</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.regions\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRegions($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">RSS</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.rss\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getRss($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Анонс</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"preview_text\" ng-model=\"item.preview_text\" redactor=\"{'buttons': ['html','|','formatting','|','bold','italic','deleted','|','unorderedlist','orderedlist','outdent','indent','|','alignment']}\" required></textarea>\n" +
    "                                <div ng-messages=\"form.preview_text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Текст</label>\n" +
    "                            <div class=\"col-md-10 col-lg-11\">\n" +
    "                                <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor=\"{plugins: ['table','placeholders','clips','fullscreen']}\" data-placeholders='{\"placeholders\": [{\"name\": \"placeholder_gallery\",\"value\": \"Иллюстрации\"}]}' required></textarea>\n" +
    "                                <div ng-messages=\"form.text.$error\">\n" +
    "                                    <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Сюжеты</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.topic\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Изображение</label>\n" +
    "                            <div class=\"col-md-5 col-lg-3\">\n" +
    "                                <fieldset>\n" +
    "                                    <div class=\"form-group\" ng-show=\"item.image.src\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <img class=\"img-thumbnail img-responsive\" ng-attr-src=\"{{item.image.src}}\" />\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                        <div class=\"col-md-12 col-lg-12\">\n" +
    "                                            <div class=\"file-input-wrapper\">\n" +
    "                                                <upload-button\n" +
    "                                                        class=\"btn btn-primary btn-upload\"\n" +
    "                                                        url=\"/file/upload\"\n" +
    "                                                        param=\"file\"\n" +
    "                                                        accept=\"acceptImageTypes\"\n" +
    "                                                        force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                                        data=\"uploadData\"\n" +
    "                                                        on-upload=\"onUpload(files)\"\n" +
    "                                                        on-success=\"onSuccess(response)\"\n" +
    "                                                        on-error=\"onImageError(response)\"\n" +
    "                                                        on-complete=\"onImageComplete(response)\">\n" +
    "                                                    {{ item.image.src ? 'Заменить' : 'Выбрать' }}\n" +
    "                                                </upload-button>\n" +
    "                                            </div>\n" +
    "                                            <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image.src\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-horizontal col-md-12 col-lg-12\" ng-show=\"item.image.src\" style=\"margin-top: 15px;\">\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Источник</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source\" ng-model=\"item.image.source\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\">\n" +
    "                                            <label class=\"control-label\">Ссылка</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.source_url\" ng-model=\"item.image.source_url\"/>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"form-group\" style=\"margin-bottom: 0;\">\n" +
    "                                            <label class=\"control-label\">Подпись</label>\n" +
    "                                            <input class=\"form-control\" type=\"text\" name=\"image.sign\" ng-model=\"item.image.sign\"/>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </fieldset>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Внутреннее название</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"inside\" ng-model=\"item.inside\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Лизинг</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.leasing\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать на главной Banki.ru</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <switch name=\"noshowonfrontpage\" ng-model=\"item.noshowonfrontpage\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать на главной до</label>\n" +
    "                            <div class=\"col-md-4 col-lg-5\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"onfrontpagedateto\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"item.onfrontpagedateto\" is-open=\"datepickers.onfrontpagedateto_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'onfrontpagedateto_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать только в тематическом разделе</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <switch name=\"razdel_only\" ng-model=\"item.razdel_only\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать на allbanks.ru</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <switch name=\"no_show_on_allbanks\" ng-model=\"item.no_show_on_allbanks\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Не показывать в карточке банка</label>\n" +
    "                            <div class=\"col-md-2 col-lg-3\">\n" +
    "                                <switch name=\"noshowinbankcard\" ng-model=\"item.noshowinbankcard\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Показывать как главную только в тем. разделе</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <switch name=\"productsonly\" ng-model=\"item.productsonly\" class=\"green\"></switch>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"control-label col-md-2 col-lg-1\">Видеоновости</label>\n" +
    "                            <div class=\"col-md-5 col-lg-5\">\n" +
    "                                <tags-input ng-model=\"item.video\" display-property=\"name\">\n" +
    "                                    <auto-complete source=\"getMfo($query)\"></auto-complete>\n" +
    "                                </tags-input>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Иллюстрации\">\n" +
    "\n" +
    "                    <div ng-include=\"'views/partials/news/illustrations.tpl.html'\"></div>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/lenta/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/lenta/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Лента новостей</h2>\n" +
    "            <!--<label class=\"color\">{{{this.subtitle}}}</label>-->\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/filter.tpl.html'\"></div>\n" +
    "\n" +
    "            <div ng-include=\"'views/partials/news/list.tpl.html'\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/modals/history.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/modals/history.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Просмотр изменений</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <pre>{{ selected.item }}</pre>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"close()\">Закрыть</button>\n" +
    "</div>");
}]);

angular.module("views/notify.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/notify.tpl.html",
    "<div ng-class=\"['notifications__item', 'animated1', 'fast1', 'fadeInRight1', $classes]\">\n" +
    "    <span class=\"notifications__close\" ng-click=\"$close()\">закрыть x</span>\n" +
    "    <span ng-show=\"!$messageTemplate\">{{$message}}</span>\n" +
    "    <span ng-show=\"$messageTemplate\" class=\"cg-notify-message-template\"></span>\n" +
    "</div>");
}]);

angular.module("views/partials/breadcrumb.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/breadcrumb.tpl.html",
    "<nav id=\"breadcrumb\" class=\"breadcrumb-nav\">\n" +
    "    <ol class=\"breadcrumb\">\n" +
    "        <li ng-repeat=\"breadcrumb in breadcrumbs.get() track by breadcrumb.path\" ng-class=\"{ active: $last }\">\n" +
    "            <a ng-if=\"!$last\" ng-href=\"#{{ breadcrumb.path }}\" ng-bind=\"breadcrumb.label\" class=\"margin-right-xs\"></a>\n" +
    "            <span ng-if=\"$last\" ng-bind=\"breadcrumb.label\"></span>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "</nav>");
}]);

angular.module("views/partials/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/footer.tpl.html",
    "<div id=\"bottom\" class=\"footer\">\n" +
    "    <p>© Company 2014</p>\n" +
    "</div>");
}]);

angular.module("views/partials/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/header.tpl.html",
    "<header role=\"header\" id=\"top\" class=\"header\">\n" +
    "\n" +
    "    <div class=\"header__logo clearfix\">\n" +
    "        <a class=\"header__logo__link\" ng-click=\"home()\">\n" +
    "            <span class=\"header__logo__link__text\">Банки.ру</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"header__bar\">\n" +
    "        <ul class=\"nav navbar-nav nav-main-xs navbar-left\">\n" +
    "            <li>\n" +
    "                <a class=\"icon-toolsbar navbar-toggler\" ng-click=\"toggleMenu()\"><i class=\"fa fa-bars\"></i></a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"nav navbar-nav nav-main-xs navbar-right\">\n" +
    "            <li>\n" +
    "                <a class=\"link icon-toolsbar\" popover-html=\"{{otherServices}}\" popover-placement=\"bottom\">\n" +
    "                    <i class=\"fa fa-th-large\"></i>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li><a class=\"h-seperate\" ng-click=\"home()\">Новости</a></li>\n" +
    "            <li><a href=\"#/topic\">Сюжеты</a></li>\n" +
    "            <li><a href=\"#/settings\">Настройки</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "</header>");
}]);

angular.module("views/partials/news/filter.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/news/filter.tpl.html",
    "<div class=\"row form-group\">\n" +
    "\n" +
    "    <div class=\"col-lg-6\">\n" +
    "        <div class=\"input-icon input-icon--inline\">\n" +
    "            <i class=\"ico fa fa-search\"></i>\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Поиск...\" name=\"title\" ng-model=\"$parent.search.title\">\n" +
    "        </div>\n" +
    "        <!--<a class=\"btn btn-primary\" ng-click=\"searchByFilter()\">Искать</a>-->\n" +
    "        <a class=\"btn btn-default\" ng-click=\"$parent.toggleFilter()\">Фильтр</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-lg-6 text-right\">\n" +
    "        <div class=\"row text-right\">\n" +
    "            <div class=\"col-md-2 pull-right\">\n" +
    "                <select ng-model=\"$parent.entryLimit\" class=\"form-control\">\n" +
    "                    <option>5</option>\n" +
    "                    <option>10</option>\n" +
    "                    <option>20</option>\n" +
    "                    <option>50</option>\n" +
    "                    <option>100</option>\n" +
    "                </select>\n" +
    "                <!--<select name=\"limit\" class=\"form-control\" ng-model=\"entryLimit\" ng-options=\"name as value for (name, value) in itemLimits\"></select>-->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row form-group ng-hide animated fadeIn\" ng-show=\"$parent.showFilter\">\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "            <div class=\"panel-body form-horizontal\">\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Активность</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"\"  type=\"radio\" name=\"active\" ng-model=\"$parent.search.active\">Все</label>\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"1\" type=\"radio\" name=\"active\" ng-model=\"$parent.search.active\">Активные</label>\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"0\" type=\"radio\" name=\"active\" ng-model=\"$parent.search.active\">Неактивные</label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Ключевые слова</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input class=\"form-control\" type=\"text\" name=\"title\" ng-model=\"$parent.search.title\" />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Блокировка</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"\"  type=\"radio\" name=\"block\" ng-model=\"$parent.search.block\">Все</label>\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"1\" type=\"radio\" name=\"block\" ng-model=\"$parent.search.block\">Блокированы</label>\n" +
    "                        <label class=\"radio-inline\"><input ng-value=\"0\" type=\"radio\" name=\"block\" ng-model=\"$parent.search.block\">Свободные</label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Статус</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <select class=\"form-control\" name=\"status\" ng-model=\"$parent.search.status\">\n" +
    "                            <option value=\"\" selected=\"selected\">Любой</option>\n" +
    "                            <option value=\"1\">[1] Опубликован</option>\n" +
    "                            <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                            <option value=\"2\">[2] Черновик</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Дата начала публикации</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_start_from\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"$parent.date.date_start\" is-open=\"datepickers.date_start_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_start_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish\" datepicker-popup=\"dd.MM.yyyy\" ng-model=\"$parent.date.date_finish\" is-open=\"datepickers.date_finish_opened\" date-disabled=\"disabled(date, mode)\" ng-click=\"openDatepicker($event, 'date_finish_opened')\" show-button-bar=\"false\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Дата окончания публикации</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish_from\" ng-model=\"$parent.date.date_finish_from\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_finish_to\" ng-model=\"$parent.date.date_finish_to\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">ID</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"id_from\" ng-model=\"$parent.ids.id_from\" />\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"id_to\" ng-model=\"$parent.ids.id_to\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Дата изменения</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_update_from\" ng-model=\"$parent.date.search.date_update_from\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_update_to\" ng-model=\"$parent.date.search.date_update_to\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\">Дата создания</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_create_from\" ng-model=\"$parent.search.date_create_from\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input class=\"form-control\" type=\"text\" name=\"date_create_to\" ng-model=\"$parent.search.date_create_to\" data-toggle=\"datepicker\"/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"row form-group\">\n" +
    "                    <label class=\"control-label col-md-3\"></label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <!--<button class=\"btn btn-primary\" ng-click=\"searchByFilter()\">Искать</button>-->\n" +
    "                        <button class=\"btn btn-warning\" ng-click=\"$parent.resetFilter()\">Сбросить</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row form-group\" ng-show=\"$parent.canCreateNew\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "        <button class=\"btn btn-danger\" ng-click=\"new()\">Добавить</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/partials/news/history.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/news/history.tpl.html",
    "<div class=\"grid\">\n" +
    "\n" +
    "    <div class=\"row form-group\">\n" +
    "        <div class=\"col-lg-6 col-lg-offset-6 text-right align-xs-center\">\n" +
    "            <div class=\"row text-right\">\n" +
    "                <div class=\"col-md-2 pull-right\">\n" +
    "                    <select ng-model=\"$parent.entryLimit\" class=\"form-control\">\n" +
    "                        <option>5</option>\n" +
    "                        <option>10</option>\n" +
    "                        <option>20</option>\n" +
    "                        <option>50</option>\n" +
    "                        <option>100</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"table-big\">\n" +
    "\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "\n" +
    "            <tr>\n" +
    "                <tr>\n" +
    "                    <th class=\"text-center\">\n" +
    "                        <a ng-click=\"$parent.sort('id')\">\n" +
    "                            # <i ng-class=\"{'fa fa-angle-up' : isSortUp('id'), 'fa fa-angle-down' : isSortDown('id')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-left\">Заголовок</th>\n" +
    "                    <th class=\"text-center\">\n" +
    "                        <a ng-click=\"$parent.sort('date_create')\">\n" +
    "                            Дата создания <i ng-class=\"{'fa fa-angle-up' : isSortUp('date_create'), 'fa fa-angle-down' : isSortDown('date_create')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center\">Модератор</th>\n" +
    "                    <th class=\"text-center\">\n" +
    "                        <a ng-click=\"$parent.sort('action')\">\n" +
    "                            Действие <i ng-class=\"{'fa fa-angle-up' : isSortUp('action'), 'fa fa-angle-down' : isSortDown('action')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center\"></th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody align=\"center\">\n" +
    "                <tr ng-repeat=\"item in $parent.items | orderBy:$parent.orderBy:$parent.reverse | paginationFilter:($parent.currentPage-1)*$parent.entryLimit | limitTo:$parent.entryLimit\">\n" +
    "                    <td>{{item.id}}</td>\n" +
    "                    <td class=\"text-left\">\n" +
    "                        <a ng-click=\"$parent.revert(item.$id())\">{{item.title}}</a>\n" +
    "                    </td>\n" +
    "                    <td>{{item.date_create | date : format : timezone}}</td>\n" +
    "                    <td>{{item.moderator}}</td>\n" +
    "                    <td>{{item.action}}</td>\n" +
    "                    <td style=\"white-space: nowrap;\">\n" +
    "                        <a ng-click=\"$parent.show(item, $index, $event)\">Показать изменения</a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 text-left align-xs-center\">\n" +
    "            <div class=\"grid__info\">\n" +
    "                Показаны\n" +
    "                {{ $parent.currentPage === 1 ? 1 : (($parent.currentPage - 1) * $parent.entryLimit) + 1 }}\n" +
    "                -\n" +
    "                {{ $parent.filtered.length < $parent.entryLimit ? $parent.filtered.length : ($parent.currentPage * $parent.entryLimit) < $parent.filtered.length ? ($parent.currentPage * $parent.entryLimit) : $parent.filtered.length }} из {{ $parent.items.length }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-6  text-right align-xs-center\" ng-show=\"$parent.filtered.length > $parent.entryLimit\">\n" +
    "            <pagination direction-links=\"true\" previous-text=\"«\" next-text=\"»\" ng-model=\"$parent.currentPage\" ng-change=\"$parent.setPage()\" total-items=\"$parent.filtered.length\" items-per-page=\"$parent.entryLimit\"></pagination>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("views/partials/news/illustrations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/news/illustrations.tpl.html",
    "<div class=\"panel\">\n" +
    "    <div class=\"panel-tools\" align=\"left\">\n" +
    "        <ul class=\"tooltip-area\">\n" +
    "            <li>\n" +
    "                <div class=\"file-input-wrapper\">\n" +
    "                    <upload-button\n" +
    "                            class=\"btn btn-primary btn-upload\"\n" +
    "                            url=\"/file/upload\"\n" +
    "                            param=\"file\"\n" +
    "                            accept=\"acceptImageTypes\"\n" +
    "                            force-iframe-upload=\"forceIframeUpload\"\n" +
    "                            data=\"uploadData\"\n" +
    "                            on-upload=\"onIllustrationsUpload(files)\"\n" +
    "                            on-success=\"onIllustrationsSuccess(response)\"\n" +
    "                            on-error=\"onIllustrationsError(response)\"\n" +
    "                            on-complete=\"onIllustrationsComplete(response)\">\n" +
    "                        <i class=\"fa fa-upload\"></i>\n" +
    "                    </upload-button>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                {{$parent.selectAll}}\n" +
    "                <label class=\"btn btn-default\" tooltip=\"Выбрать все\" ng-class=\"{'disabled' : !item.illustrations.length}\">\n" +
    "                    <input type=\"checkbox\" class=\"default\" ng-disabled=\"!item.illustrations.length\" ng-click=\"selectIllustrationItems()\" ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"$parent.isSelectedAllIllustrationItems()\">\n" +
    "                </label>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <button class=\"btn btn-default\" tooltip=\"Редактировать\" ng-disabled=\"!item.illustrations.length || !selectedAny\"><i class=\"fa fa-pencil\"></i></button>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <button class=\"btn btn-default\" tooltip=\"Удалить\" ng-click=\"removeIllustrationItem()\" ng-disabled=\"!item.illustrations.length || !selectedAny\"><i class=\"fa fa-trash-o\"></i></button>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"padding--vertical\">\n" +
    "\n" +
    "        <div class=\"illustrations__block\" ng-show=\"item.illustrations\">\n" +
    "            <div class=\"img-thumbnail\" ng-repeat=\"image in item.illustrations\" ng-click=\"$parent.selectIllustrationItem(image, $index, $event)\" ng-class=\"{'img-thumbnail--selected' : image.selected}\" style=\"width: 140px; height: 140px; float: left; overflow: hidden;\">\n" +
    "                <img ng-attr-src=\"{{image.src}}\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("views/partials/news/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/news/list.tpl.html",
    "<div class=\"grid\">\n" +
    "\n" +
    "    <div class=\"table-big\">\n" +
    "\n" +
    "        <table class=\"table table-striped\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <th class=\"text-center sorting_asc\">\n" +
    "                        <a ng-click=\"$parent.sort('id')\">\n" +
    "                            # <i ng-class=\"{'fa fa-angle-up' : isSortUp('id'), 'fa fa-angle-down' : isSortDown('id')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-left sorting_asc\">Заголовок</th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('active')\">\n" +
    "                            Акт. <i ng-class=\"{'fa fa-angle-up' : isSortUp('active'), 'fa fa-angle-down' : isSortDown('active')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('block')\">\n" +
    "                            Блок <i ng-class=\"{'fa fa-angle-up' : isSortUp('block'), 'fa fa-angle-down' : isSortDown('block')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">Кто заблокировал</th>\n" +
    "                    <th class=\"text-center sorting\">Автор</th>\n" +
    "\n" +
    "                    <th class=\"text-center sorting\">Последний изменивший</th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('correction')\">\n" +
    "                            Корректура <i ng-class=\"{'fa fa-angle-up' : isSortUp('correction'), 'fa fa-angle-down' : isSortDown('correction')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('status')\">\n" +
    "                            Статус <i ng-class=\"{'fa fa-angle-up' : isSortUp('status'), 'fa fa-angle-down' : isSortDown('status')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('start')\">\n" +
    "                            Начало пуб. <i ng-class=\"{'fa fa-angle-up' : isSortUp('start'), 'fa fa-angle-down' : isSortDown('start')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('finish')\">\n" +
    "                            Конец пуб. <i ng-class=\"{'fa fa-angle-up' : isSortUp('finish'), 'fa fa-angle-down' : isSortDown('finish')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\">\n" +
    "                        <a ng-click=\"$parent.sort('change')\">\n" +
    "                            Изменена <i ng-class=\"{'fa fa-angle-up' : isSortUp('change'), 'fa fa-angle-down' : isSortDown('change')}\"></i>\n" +
    "                        </a>\n" +
    "                    </th>\n" +
    "                    <th class=\"text-center sorting\"></th>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody align=\"center\">\n" +
    "                <tr ng-repeat=\"item in $parent.filtered = ($parent.items | filter:$parent.search | dateStartRangeFilter:date.date_start:date.date_finish | idRangeFilter:ids.id_from:ids.id_to | orderBy:$parent.orderBy:$parent.reverse) | paginationFilter:($parent.currentPage-1)*$parent.entryLimit | limitTo:$parent.entryLimit\">\n" +
    "                    <td>{{item.id}}</td>\n" +
    "                    <td class=\"text-left\">\n" +
    "                        <a ng-click=\"edit(item.$id())\">{{item.title}}</a>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a class=\"action\" tooltip=\"{{item.isActive() ? 'Деактивировать' : 'Активировать'}}\" ng-click=\"$parent.toggleActiv(item, $index, $event)\">\n" +
    "                            <i ng-class=\"item.isActive() ? 'fa fa-check-circle-o text-success' : 'fa fa-times-circle text-danger'\"></i>\n" +
    "                        </a>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a class=\"action\" tooltip=\"{{item.isBlocked() ? 'Разблокировать' : 'Заблокировать'}}\" ng-click=\"$parent.toggleBlock(item, $index, $event)\">\n" +
    "                            <i ng-class=\"item.isBlocked() ? 'fa fa-circle text-danger' : 'fa fa-circle-o text-success'\"></i>\n" +
    "                        </a>\n" +
    "                    </td>\n" +
    "                    <td></td>\n" +
    "                    <td></td>\n" +
    "                    <td></td>\n" +
    "                    <td>\n" +
    "                        <a class=\"action\" tooltip=\"{{item.isNeedCorrection() ? 'Требуется корректура' : 'Корректура не требуется'}}\" ng-click=\"$parent.toggleCorrection(item, $index, $event)\">\n" +
    "                            <i ng-class=\"item.isNeedCorrection() ? 'fa fa-circle text-danger' : 'fa fa-circle-o text-success'\"></i>\n" +
    "                        </a>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a class=\"action\" ng-switch=\"item.status\" ng-show=\"!item.showStatusChanger\" ng-click=\"$parent.showStatusChanger(item, $index, $event)\">\n" +
    "                            <span ng-switch-when=\"1\">[1] Опубликован</span>\n" +
    "                            <span ng-switch-when=\"2\">[2] Черновик</span>\n" +
    "                            <span ng-switch-when=\"3\">[3] Готов к публикации</span>\n" +
    "                        </a>\n" +
    "                        <select class=\"form-control\" name=\"status\" ng-model=\"item.status\" ng-show=\"item.showStatusChanger\" ng-change=\"$parent.changeStatus(item, $index, $event)\">\n" +
    "                            <option value=\"\">Любой</option>\n" +
    "                            <option value=\"1\">[1] Опубликован</option>\n" +
    "                            <option value=\"3\">[3] Готов к публикации</option>\n" +
    "                            <option value=\"2\">[2] Черновик</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "                    <td>{{item.date_start | date : format : timezone}}</td>\n" +
    "                    <td>{{item.date_finish | date : format : timezone}}</td>\n" +
    "                    <td>{{item.date_update | date : format : timezone}}</td>\n" +
    "                    <td style=\"white-space: nowrap;\">\n" +
    "                        <a class=\"btn btn-sm btn-info btn-transparent action\" tooltip=\"Копировать\" ng-click=\"$parent.copy(item, $index, $event)\"><i class=\"fa fa-copy\"></i></a>\n" +
    "                        <a class=\"btn btn-sm btn-info btn-transparent action\" tooltip=\"Посмотреть историю\" ng-click=\"$parent.history(item, $index, $event)\"><i class=\"fa fa-stack-overflow\"></i></a>\n" +
    "                        <a class=\"btn btn-sm btn-info btn-transparent action\" tooltip=\"Удалить\" ng-click=\"$parent.remove(item, $index, $event)\"><i class=\"fa fa-trash\"></i></a>\n" +
    "                        <a class=\"btn btn-sm btn-info btn-transparent action\" tooltip=\"admin_sendpr_button\" ng-click=\"$parent.history(item, $index, $event)\"><i class=\"fa fa-bullhorn\"></i></a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-6 text-left align-xs-center\">\n" +
    "            <div class=\"grid__info\">\n" +
    "                Показаны\n" +
    "                {{ $parent.currentPage === 1 ? 1 : (($parent.currentPage - 1) * $parent.entryLimit) + 1 }}\n" +
    "                -\n" +
    "                {{ $parent.filtered.length < $parent.entryLimit ? $parent.filtered.length : ($parent.currentPage * $parent.entryLimit) < $parent.filtered.length ? ($parent.currentPage * $parent.entryLimit) : $parent.filtered.length }} из {{ $parent.items.length }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-6  text-right align-xs-center\" ng-show=\"$parent.filtered.length > $parent.entryLimit\">\n" +
    "            <pagination direction-links=\"true\" previous-text=\"«\" next-text=\"»\" ng-model=\"$parent.currentPage\" ng-change=\"$parent.setPage()\" total-items=\"$parent.filtered.length\" items-per-page=\"$parent.entryLimit\"></pagination>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("views/partials/sidebar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partials/sidebar.tpl.html",
    "<section id=\"sidebar\" class=\"sidebar\" ng-controller=\"SidebarCtrl\">\n" +
    "\n" +
    "    <nav role=\"navigation\" id=\"navigation\" class=\"navigation\">\n" +
    "        <ul class=\"navigation__list\">\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/daytheme')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/daytheme\"><i class=\"navigation__link__icon fa fa-bomb\"></i>Тема дня</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/lenta')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/lenta\"><i class=\"navigation__link__icon fa fa-list\"></i>Лента новостей</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/bankpress')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/bankpress\"><i class=\"navigation__link__icon fa fa-bar-chart\"></i>Мониторинг банковской прессы</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/interview')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/interview\"><i class=\"navigation__link__icon fa fa-microphone\"></i>Интервью</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/author')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/author\"><i class=\"navigation__link__icon fa fa-user\"></i>Авторы</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/columnist')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/columnist\"><i class=\"navigation__link__icon fa fa-list\"></i>Колумнисты</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/video')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/video\"><i class=\"navigation__link__icon fa fa-video-camera\"></i>Видеоматериалы</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/pressrelease')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/pressrelease\"><i class=\"navigation__link__icon fa fa-newspaper-o\"></i>Пресс-релизы</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/proetcontra')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/proetcontra\"><i class=\"navigation__link__icon fa fa-question\"></i>Спорный момент</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/stars')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/stars\"><i class=\"navigation__link__icon fa fa-star\"></i>Звёзды в банке</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/bankingnews')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/bankingnews\"><i class=\"navigation__link__icon fa fa-list\"></i>Banking news</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/research')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/research\"><i class=\"navigation__link__icon fa fa-line-chart\"></i>Исследования</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/authorcompany')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/authorcompany\"><i class=\"navigation__link__icon fa fa-user\"></i>Авторы исследований</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/sitenews')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/sitenews\"><i class=\"navigation__link__icon fa fa-align-right\"></i>Новости проекта</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/advnews')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/advnews\"><i class=\"navigation__link__icon fa fa-gift\"></i>Новости рекламы (спецпредложения)</a>\n" +
    "            </li>\n" +
    "            <li class=\"navigation__item\" ng-class=\"{'navigation__item--active': isActive('/news/secularnews')}\">\n" +
    "                <a class=\"navigation__link\" role=\"nav-main\" href=\"#/news/secularnews\"><i class=\"navigation__link__icon fa fa-group\"></i>Светские новости</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </nav>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/settings/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/settings/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Редактирование настроек</h2>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\">\n" +
    "\n" +
    "            <div class=\"padding--vertical\">\n" +
    "\n" +
    "                <h4>Яндекс.Вебмастер:</h4>\n" +
    "\n" +
    "                <hr/>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Статус токена</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"checkbox\">\n" +
    "                            <span class=\"label label-danger\">Неактивный</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Токен истекает</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <div class=\"checkbox\">\n" +
    "                            -\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-offset-1 col-md-8\">\n" +
    "                        <a class=\"btn btn-primary\" href=\"https://oauth.yandex.ru/authorize?response_type=code&amp;client_id=304e683b84ea464c9b55e7280e17ad88\">Обновить токен</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Id сайта</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input type=\"text\" class=\"form-control\" name=\"host_id\" ng-model=\"item.host_id\" required>\n" +
    "                        <div ng-messages=\"form.host_id.$error\">\n" +
    "                            <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-primary save\" ng-click=\"save()\" ng-disabled=\"!canSave()\">Сохранить</button>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/topic/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/topic/edit.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>{{item.id ? 'Редактирование сюжета' : 'Добавление сюжета'}}</h2>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form class=\"form-horizontal\" crud-edit=\"item\" name=\"form\">\n" +
    "\n" +
    "            <div class=\"padding--vertical\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Заголовок</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <textarea class=\"form-control\" name=\"title\" ng-model=\"item.title\" required></textarea>\n" +
    "                        <div ng-messages=\"form.title.$error\">\n" +
    "                            <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Активность</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input type=\"checkbox\" name=\"active\" ng-model=\"item.active\" ui-switch=\"{color: '#64BD63', secondaryColor: '#DB5455'}\" />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Показывать в блоке</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input type=\"checkbox\" name=\"show_in_block\" ng-model=\"item.show_in_block\" ui-switch=\"{color: '#64BD63', secondaryColor: '#DB5455'}\" />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Изображение</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "\n" +
    "                            <div class=\"col-md-12\" ng-show=\"item.image\">\n" +
    "\n" +
    "                                <div class=\"img-thumbnail img-preview\" style=\"margin-bottom: 10px;\">\n" +
    "                                    <img ng-attr-src=\"{{item.image}}\" />\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-12\">\n" +
    "\n" +
    "                                <div class=\"file-input-wrapper\">\n" +
    "                                    <upload-button\n" +
    "                                            class=\"btn btn-primary btn-upload\"\n" +
    "                                            url=\"/upload.php\"\n" +
    "                                            param=\"file\"\n" +
    "                                            accept=\"acceptTypes\"\n" +
    "                                            multiple=\"allowMultiple\"\n" +
    "                                            force-iframe-upload=\"forceIframeUpload\"\n" +
    "                                            data=\"uploadData\"\n" +
    "                                            on-upload=\"onUpload(files)\"\n" +
    "                                            on-success=\"onSuccess(response)\"\n" +
    "                                            on-error=\"onError(response)\"\n" +
    "                                            on-complete=\"onComplete(response)\">\n" +
    "                                        {{ item.image ? 'Заменить' : 'Выбрать' }}\n" +
    "                                    </upload-button>\n" +
    "                                </div>\n" +
    "                                <button type=\"button\" class=\"btn btn-danger\" ng-show=\"item.image\" ng-click=\"removeImage()\">Удалить</button>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"item.image\">\n" +
    "                    <label class=\"control-label col-md-1\">Источник</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input class=\"form-control\" type=\"text\" name=\"source_name\" ng-model=\"item.source_name\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"item.image\">\n" +
    "                    <label class=\"control-label col-md-1\">Ссылка на источник</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <input class=\"form-control\" type=\"url\" name=\"source_url\" ng-model=\"item.source_url\"/>\n" +
    "                        <div ng-messages=\"form.source_url.$error\">\n" +
    "                            <div ng-message=\"url\" class=\"help-block text-danger\">{{messages.validation.invalidUrl}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"control-label col-md-1\">Описание</label>\n" +
    "                    <div class=\"col-md-8\">\n" +
    "                        <textarea class=\"form-control\" name=\"text\" ng-model=\"item.text\" redactor required></textarea>\n" +
    "                        <div ng-messages=\"form.text.$error\">\n" +
    "                            <div ng-message=\"required\" class=\"help-block text-danger\">{{messages.validation.required}}</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <footer class=\"panel-footer\">\n" +
    "\n" +
    "                <crud-buttons></crud-buttons>\n" +
    "\n" +
    "            </footer>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);

angular.module("views/topic/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/topic/list.tpl.html",
    "<section class=\"panel animated fadeInDown\">\n" +
    "\n" +
    "    <header id=\"page-header\">\n" +
    "        <div class=\"panel-heading\">\n" +
    "            <h2>Сюжеты</h2>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <div id=\"page-tools\"></div>\n" +
    "\n" +
    "    <div id=\"page-content\" class=\"panel-body\">\n" +
    "\n" +
    "        <form role=\"form\">\n" +
    "\n" +
    "            <div class=\"row form-group\" ng-show=\"canCreateNew\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <button class=\"btn btn-danger\" ng-click=\"new()\">Добавить</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"grid\">\n" +
    "\n" +
    "                <div class=\"table-big\">\n" +
    "\n" +
    "                    <table class=\"table table-striped\">\n" +
    "                        <thead>\n" +
    "                            <tr>\n" +
    "                                <th class=\"text-center sorting_asc\">\n" +
    "                                    <a ng-click=\"sort('id')\">\n" +
    "                                        # <i ng-class=\"{'fa fa-angle-up' : isSortUp('id'), 'fa fa-angle-down' : isSortDown('id')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th class=\"text-left sorting_asc\">\n" +
    "                                    <a ng-click=\"sort('title')\">\n" +
    "                                        Заголовок <i ng-class=\"{'fa fa-angle-up' : isSortUp('title'), 'fa fa-angle-down' : isSortDown('title')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th class=\"text-center sorting\">\n" +
    "                                    <a ng-click=\"sort('active')\">\n" +
    "                                        Запись активна <i ng-class=\"{'fa fa-angle-up' : isSortUp('active'), 'fa fa-angle-down' : isSortDown('active')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th class=\"text-center sorting\">\n" +
    "                                    <a ng-click=\"sort('show_in_block')\">\n" +
    "                                        Показывать в блоке <i ng-class=\"{'fa fa-angle-up' : isSortUp('show_in_block'), 'fa fa-angle-down' : isSortDown('show_in_block')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th class=\"text-center sorting\">\n" +
    "                                    <a ng-click=\"sort('date_create')\">\n" +
    "                                        Дата создания <i ng-class=\"{'fa fa-angle-up' : isSortUp('date_create'), 'fa fa-angle-down' : isSortDown('date_create')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                                <th class=\"text-center sorting\">\n" +
    "                                    <a ng-click=\"sort('date_update')\">\n" +
    "                                        Дата редактирования <i ng-class=\"{'fa fa-angle-up' : isSortUp('date_update'), 'fa fa-angle-down' : isSortDown('date_update')}\"></i>\n" +
    "                                    </a>\n" +
    "                                </th>\n" +
    "                            </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody align=\"center\">\n" +
    "                            <tr ng-repeat=\"item in filtered = items | orderBy:orderBy:reverse | paginationFilter:(currentPage-1)*entryLimit | limitTo:entryLimit\">\n" +
    "                                <td>{{item.id}}</td>\n" +
    "                                <td class=\"text-left\">\n" +
    "                                    <a ng-click=\"edit(item.$id())\">{{item.title}}</a>\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "                                    <a class=\"action\" tooltip=\"{{item.active == 1 ? 'Деактивировать' : 'Активировать'}}\" ng-click=\"toggleActive(item, $index, $event)\">\n" +
    "                                        <i ng-class=\"item.active == 1 ? 'fa fa-check-circle-o text-success' : 'fa fa-times-circle text-danger'\"></i>\n" +
    "                                    </a>\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "                                    <a class=\"action\" tooltip=\"{{item.show_in_block == 1 ? 'Деактивировать' : 'Активировать'}}\" ng-click=\"toggleShowInBlock(item, $index, $event)\">\n" +
    "                                        <i ng-class=\"item.show_in_block == 1 ? 'fa fa-check-circle-o text-success' : 'fa fa-times-circle text-danger'\"></i>\n" +
    "                                    </a>\n" +
    "                                </td>\n" +
    "                                <td>{{item.date_create | date : format : timezone}}</td>\n" +
    "                                <td>{{item.date_update | date : format : timezone}}</td>\n" +
    "                            </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-lg-6 text-left align-xs-center\">\n" +
    "                        <div class=\"grid__info\">\n" +
    "                            Показаны\n" +
    "                            {{ currentPage === 1 ? 1 : ((currentPage - 1) * entryLimit) + 1 }}\n" +
    "                            -\n" +
    "                            {{ filtered.length < entryLimit ? filtered.length : (currentPage * entryLimit) < filtered.length ? (currentPage * entryLimit) : filtered.length }} из {{ items.length }}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-lg-6  text-right align-xs-center\" ng-show=\"filtered.length > entryLimit\">\n" +
    "                        <pagination direction-links=\"true\" previous-text=\"«\" next-text=\"»\" ng-model=\"currentPage\" ng-change=\"setPage()\" total-items=\"filtered.length\" items-per-page=\"entryLimit\"></pagination>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"page-footer\"></div>\n" +
    "\n" +
    "    <div class=\"page__flip\"></div>\n" +
    "\n" +
    "</section>");
}]);
