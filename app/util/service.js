Ext.define('COO.util.service',{
		
	requires:[
		'Ext.util.Cookies',
        'COO.view.Main',
        'COO.view.regPanels.RegHeader',
        'COO.view.Header',
        'COO.view.regPanels.RegHeader',
        'COO.view.admPanel.adminPanel',
        //'COO.view.regPanels.EditCompany'
        'COO.view.admPanel.viewPanel'
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
                    dialog.removeAll();
                    dialog.close();
                    Ext.util.Cookies.set("isAuth", 1);
                    this.setFieldUserId(login, password);
                },
                scope: this
            });
        },
        mailSender: function(email, login, password, cityName) {
            var subject_registration = "Регистрация";
            var body_registration = 'Вы успешно прошли регистрацию на сайте coo.com! ↵↵'+
            ' Ваш логин: ' + login + '↵↵  Ваш пароль: ' + password + '↵↵  Ваш E-mail: ' + email + 
            '↵↵  Ваш город: ' + cityName;
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
                        dialog.removeAll();
                        dialog.close();
                    }
                    this.login(login, password, dialog);
                    this.mailSender(email, login, password, cityName);
                },
                scope: this
            });
        },

        setFieldUserId: function(login, password){
            Ext.Ajax.request({
                    method: 'GET',
                    url: '/SFO/rest/user/byLogin',
                    params: {
                        login: login
                    },
                    success: function(conn, response){
                        Ext.util.Cookies.set('userId', Ext.decode(conn.responseText).userId);
                        if(Ext.Number.from(Ext.decode(conn.responseText).typeUser.typeUserId, 1) === 2) {
                            this.initAdmApp();
                        } else {
                            this.initRegApp();
                        }
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
                        beforeanimate: function(el, startTime, eOpts) {
                            var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
                            wrc.removeAll();
                            wrc.add(Ext.widget('headerpanel'));

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
                                        Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].setValue(cityName, true);
                                    }
                                });
                            }
                        }
                    }
                });
            });
            task.delay(1000);
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
                        beforeanimate: function(el, startTime, eOpts) {
                            var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
                            wrc.removeAll();
                            wrc.add(Ext.widget('regHeader'));
                            //this.setLoginForm();
                            var userId = Ext.util.Cookies.get('userId');
                            Ext.Ajax.request({
                                url: '/SFO/rest/user/byId',
                                method: 'GET',
                                params: {
                                    userId: userId
                                },
                                success: function(conn, response) {
                                Ext.ComponentQuery.query('#form-login-user-id')[0].update('<div>' + Ext.decode(conn.responseText).login + '</div>');
                                }
                            });
                        
                            cityId = Ext.util.Cookies.get('cityId');
                            if(cityId != null || cityId != '' || cityId != undefined) {
                                Ext.Ajax.request({
                                    url: '/SFO/rest/city/city',
                                    method: 'GET',
                                    params: {
                                        cityId: cityId
                                    },
                                    success: function(conn, response){
                                        var cityName = Ext.decode(conn.responseText).cityName;
                                        Ext.ComponentQuery.query('#regheader-combo-choose-city-id')[0].setValue(cityName, true);
                                    }
                                });
                            }
                        }
                    }
                });
            });
            task.delay(1000);
        },
        initAdmApp: function() {
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
                        beforeanimate: function(el, startTime, eOpts) {
                            var wrcheader = Ext.ComponentQuery.query('#header-panel-id')[0];
                            wrcheader.removeAll();
                            wrccenter = Ext.ComponentQuery.query('#center-panel-id')[0];
                            wrccenter.removeAll();
                            wrcheader.add(Ext.widget('admHeader'));
                            //wrccenter.add(Ext.widget('adminPanel'));
                            
                            var userId = Ext.util.Cookies.get('userId');
                            Ext.Ajax.request({
                                url: '/SFO/rest/user/byId',
                                method: 'GET',
                                params: {
                                    userId: userId
                                },
                                success: function(conn, response) {
                                //Ext.ComponentQuery.query('#form-login-user-id')[0].getForm().setValues(Ext.decode(conn.responseText));
                                    Ext.ComponentQuery.query('#form-login-user-id')[0].update('<div>' + Ext.decode(conn.responseText).login + '</div>');

                                }
                            });
                            //wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
                            //wrc.removeAll();
                            //Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
                            //Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().load();
                            cityId = Ext.util.Cookies.get('cityId');
                            if(cityId != null || cityId != '' || cityId != undefined) {
                                Ext.Ajax.request({
                                    url: '/SFO/rest/city/city',
                                    method: 'GET',
                                    params: {
                                        cityId: cityId
                                    },
                                    success: function(conn, response){
                                        var cityName = Ext.decode(conn.responseText).cityName;
                                        Ext.ComponentQuery.query('#admheader-combo-choose-city-id')[0].setValue(cityName, true);
                                        //Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().load();
                                    }
                                });
                            }
                            
                        }
                    }
                });
            });
            task.delay(1000);
            //Ext.ComponentQuery.query('#adm-organization-list-gridpanel')[0].getStore().load();
        },
        setLoginForm: function() {
            var userId = Ext.util.Cookies.get('userId');
            Ext.Ajax.request({
                url: '/SFO/rest/user/byId',
                method: 'GET',
                params: {
                    userId: userId
                },
                success: function(conn, response) {
                    Ext.ComponentQuery.query('#form-login-user-id')[0].getForm.setValues(Ext.decode(conn.responseText));
                }
            });
        },
        onIconMyCompaniesDeleteClick: function(grid, rowIndex, colIndex){
            console.log('On my companies icon delete click');
            //debugger;
            var rec = grid.getStore().getAt(rowIndex);
            var organizationId = rec.get('organizationId');
            console.log(organizationId);
            Ext.Ajax.request({
                url: '/SFO/rest/organization/deleteOrganization',
                method: 'DELETE',
                params: {
                    organizationId: organizationId
                },
                success: function(conn, response) {
                    console.log('Organization successed deleted');
                }
            });
            grid.getStore().load({
                params: {
                    userId: Ext.Number.from(Ext.util.Cookies.get('userId'),0)
                }
            });
        },
        onIconMyCompaniesEditClick: function(grid, rowIndex, colIndex) {
            console.log('On my companies icon edit click');
            //debugger;
            var rec = grid.getStore().getAt(rowIndex);
            var organizationId = rec.get('organizationId');
            console.log(organizationId);
            var config = {
                xtype: 'editCompany'
            }
            var win = Ext.ComponentMgr.create(config);
            win.show();
            console.log(rec.data);
            Ext.ComponentQuery.query('#edit-company-form-id')[0].getForm().setValues(rec.data);
            Ext.ComponentQuery.query('#edit-company-combo-choose-city-id')[0].setValue(rec.data.city.cityName);
            Ext.ComponentQuery.query('#textarea-info-id')[0].setValue(rec.data.info.info);
            Ext.ComponentQuery.query('#hidden-info-id')[0].setValue(rec.data.info.infoId);
            Ext.ComponentQuery.query('#hidden-logo-id')[0].setValue(rec.data.logo.logoId);
            console.log(rec.data.info.info);
            console.log(Ext.ComponentQuery.query('#hidden-info-id')[0].getValue());

            Ext.Ajax.request({
                url: '/SFO/rest/rubric/mainRubric',
                method: 'GET',
                params: {
                    mainRubricId: rec.data.rubric.mainRubricId
                },
                success: function(conn, response, text) {
                    Ext.ComponentQuery.query('#edit-combo-choose-mainRubric-id')[0].setValue(Ext.decode(conn.responseText).name);
                    Ext.ComponentQuery.query('#edit-combo-choose-subRubric-id')[0].setValue(rec.data.rubric.name);
                }
            });
            Ext.ComponentQuery.query('#edit-image-upload-logo-id')[0].setSrc('/SFO/rest/logo/byId?logoId='+rec.data.logo.logoId);
        },
        onIconAdminViewClick: function(grid, rowIndex, colIndex) {
            console.log('On admin icon view');

            var rec = grid.getStore().getAt(rowIndex);
            console.log(rec.data);
            var config = {
                xtype: 'admView'
            }
            var win = Ext.ComponentMgr.create(config);
            win.show();

            console.log(rec.data);
            Ext.ComponentQuery.query('#view-name-company-id')[0].getForm().setValues(rec.data);
            Ext.ComponentQuery.query('#view-info-form-company-id')[0].getForm().setValues(rec.data);
            Ext.ComponentQuery.query('#view-logo-company-id')[0].setSrc('/SFO/rest/logo/byId?logoId=' + rec.data.logo.logoId);
        }
	}
});