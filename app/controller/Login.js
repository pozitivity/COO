Ext.define('COO.controller.Login', {
    extend: 'Ext.app.Controller',
    views: [
    	'COO.view.login.Login'
    ],
    requires: [
        'COO.view.regPanels.RegHeader',
        'COO.view.Header',
        'COO.view.Main'
    ],

    refs: [
    	{
    		ref: 'loginFormRef',
    		selector: '#login-form-id'
    	}
    ],
    init: function(application){

    	console.log('[OK] Init Login controller');
    	this.control({
    		"#submit-login": {
    			click: this.onButtonSubmitClick
    		}
    	});
    },
    onButtonSubmitClick: function(button, e, options){
    	console.log('Button submit click');
    	password = this.getLoginFormRef().getForm().getValues().password;
    	login = this.getLoginFormRef().getForm().getValues().login;
    	dialog = Ext.WindowManager.getActive();
    	this.login(login, password, dialog);
    },
    login: function(login, password, dialog){
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/authentication/login',
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
    		success: function(conn, response, success){
    			dialog.close();
                //if (conn.responseText === 'true') {
                        Ext.util.Cookies.set("isAuth", 1);
              //      } else {
              //          Ext.util.Cookies.set("isAuth", 0);
             //       }
                Ext.Ajax.request({
                    method: 'GET',
                    url: '/SFO/rest/user/byLogin',
                    params: {
                        login: login
                    },
                    success: function(conn, response){
                        console.log(Ext.decode(conn.responseText));
                        Ext.ComponentQuery.query('#field-userId')[0].getForm().setValues(Ext.decode(conn.responseText));
                        this.loadView();
                    },
                    failure: function(){

                    },
                    scope: this
                });
    		},
            scope: this
    	});
    },
    loadView: function(){
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
                        var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
                        wrc.removeAll();
                        wrc.add(Ext.widget('regHeader'));
                        wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
                        wrc.removeAll();
                        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
                        var cityId = Ext.ComponentQuery.query('#field-cityId')[0].getForm().getValues().cityId;
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
            });
        });
        task.delay(1000);
    }
});
