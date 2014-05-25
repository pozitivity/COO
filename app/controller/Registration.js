Ext.define('COO.controller.Registration', {
    extend: 'Ext.app.Controller',

    views: [
    	'COO.view.registration.RegistrationForm'
    ],

    refs: [
    	{
    		ref: 'registrationFormRef',
    		selector: '#registration-form-id'
    	}
    ],
    init: function(application){

    	console.log('[OK] Init Registration controller');
    	this.control({
    		"#submit-registration": {
    			click: this.onButtonSubmitClick
    		}
    	});
    },
    onButtonSubmitClick: function(button, e, options){
    	console.log('Button submit click');
    	password = this.getRegistrationFormRef().getForm().getValues().password;
    	login = this.getRegistrationFormRef().getForm().getValues().login;
    	cityName = Ext.ComponentQuery.query('#registration-choose-city-id')[0].value;
    	dialog = Ext.WindowManager.getActive();
    	this.registration(login, password, cityName, dialog);
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
    },
    registration: function(login, password, cityName, dialog){
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/user/registration',
    		params: {
    			login: login,
    			password: password,
    			cityName: cityName
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
    			dialog.close();
    			Ext.Ajax.request({
    				method: 'POST',
    				url: '/SFO/rest/authentication/login',
    				params: {
    					login: login,
    					password: password
    				}
    			});
    		}
    	});
    }
});