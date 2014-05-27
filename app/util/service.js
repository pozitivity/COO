Ext.define('COO.util.service',{
		
	requires:[
		'Ext.util.Cookies',
        'COO.view.Main',
        'COO.view.regPanels.RegHeader',
        'COO.view.Header',
	],

	statics: {

		fillCookiesIsAuth: function() {
            Ext.Ajax.request({
                method: 'GET',
                url: '/SFO/rest/authentication/isauthenticated',
                async: false,

                failure: function(conn, response, options, eOpts) {
                    Ext.util.Cookies.set("isAuth", 0);
                },

                success : function(conn, response, options, eOpts) {
                    if (conn.responseText === 'true') {
                        Ext.util.Cookies.set("isAuth", 1);
                    } else {
                        Ext.util.Cookies.set("isAuth", 0);
                    }
                }
            })
        },

        login: function(login, password, dialog){
            Ext.Ajax.request({
                url: '/SFO/rest/authentication/login',
                method: 'POST',
                params: {
                    login: login,
                    password: password
                }, 
                failure: function(){
                    Ext.util.Cookies.set("isAuth", 0);
                    Ext.Msg.show({
                        title: 'Ошибка',
                        msg: 'Неверный логин или пароль',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },
                success: function(conn, response){
                    if(dialog != undefined || dialog != null) {
                        dialog.close();
                    }
                    Ext.util.Cookies.set("isAuth", 1);
                    this.setFieldUserId(login);
                },
                scope: this
            });
        },
        mailSender: function(email, login, password) {
            var subject_registration = "Регистрация";
            var body_registration = 'Вы успешно прошли регистрацию на сайте coo.com!  Ваш логин: ' + login + '  Ваш пароль: ' + password;
            Ext.Ajax.request({
                url: '/SFO/rest/sendmail/sendMailReg',
                method: 'GET',
                params: {
                    to: email,
                    subject: subject_registration,
                    text: body_registration
                },
                success: function(conn, response) {
                    console.log('mail success send');
                }
            });
        },
        registration: function(login, password, dialog, cityName, email){
            Ext.Ajax.request({
                url: '/SFO/rest/user/registration',
                method: 'POST',
                params: {
                    login: login,
                    password: password,
                    cityName: cityName,
                    email: email
                },
                failure: function(){
                Ext.Msg.show({
                        title: 'Ошибка',
                        msg: 'Неверные данные',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },          
                success: function(conn, response, success){
                    if(dialog != undefined || dialog != null) {
                        dialog.close();
                    }
                    this.login(login, password, dialog);
                    this.mailSender(email, login, password);
                },
                scope: this
            });
        },

        setFieldUserId: function(login){
            Ext.Ajax.request({
                    method: 'GET',
                    url: '/SFO/rest/user/byLogin',
                    params: {
                        login: login
                    },
                    success: function(conn, response){
                        console.log(Ext.decode(conn.responseText));
                        Ext.util.Cookies.set('userId', Ext.decode(conn.responseText).userId);
                        this.destroyContainer();
                        this.initRegApp();
                    },
                    failure: function(){

                    },
                    scope: this
                });
        },

        initApp: function() {
            splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
            splashscreen.addCls('splashscreen');
            Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
                cls: 'x-splash-icon'
            });
            var task = new Ext.util.DelayedTask(function() {
                splashscreen.fadeOut({
                    duration: 500,
                    remove: true
                });
                
                splashscreen.next().fadeOut({
                    duration: 500,
                    remove: true,
                    listeners: {
                        afteranimate: function(el, startTime, eOpts) {
                            Ext.create('COO.view.Container');
                            var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
                            //wrc.removeAll();
                            wrc.add(Ext.widget('headerpanel'));
                            //wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
                            //wrc.removeAll();
                            //Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();

                            var cityId = Ext.util.Cookies.get('cityId');
                            if(cityId != null || cityId != '' || cityId != undefined) {
                                cityId = Ext.util.Cookies.get('cityId');
                            
                                Ext.Ajax.request({
                                    url: '/SFO/rest/city/city',
                                    method: 'GET',
                                    params: {
                                    cityId: cityId
                                    },
                                    success: function(conn, response){
                                        var cityName = Ext.decode(conn.responseText).cityName;
                                        Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].setValue(cityName);
                                    }
                                });
                            }
                        }
                    }
                });
            });
            task.delay(1000);
        },
        destroyContainer: function() {
            var container = Ext.ComponentQuery.query('#main-container-id')[0];
            container.destroy();
        },
        initRegApp: function() {
            splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
            splashscreen.addCls('splashscreen');
            Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
                cls: 'x-splash-icon'
            });
            var task = new Ext.util.DelayedTask(function() {
                splashscreen.fadeOut({
                    duration: 500,
                    remove: true
                });
                
                splashscreen.next().fadeOut({
                    duration: 500,
                    remove: true,
                    listeners: {
                        afteranimate: function(el, startTime, eOpts) {
                            Ext.create('COO.view.Container');
                            var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
                            //wrc.removeAll();
                            wrc.add(Ext.widget('regHeader'));
                            //wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
                            //wrc.removeAll();
                            //Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
                        
                            cityId = Ext.util.Cookies.get("cityId");
                            if(cityId != null || cityId != '' || cityId != undefined) {
                                Ext.Ajax.request({
                                    url: '/SFO/rest/city/city',
                                    method: 'GET',
                                    params: {
                                        cityId: cityId
                                    },
                                    success: function(conn, response){
                                        var cityName = Ext.decode(conn.responseText).cityName;
                                        Ext.ComponentQuery.query('#regheader-combo-choose-city-id')[0].setValue(cityName);
                                    }
                                });
                            }
                        }
                    }
                });
            });
            task.delay(1000);
        },

        initAdminApp: function() {

        }
	}
});