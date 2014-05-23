Ext.define('COO.controller.Login', {
    extend: 'Ext.app.Controller',
    views: [
    	'COO.view.login.Login'
    ],
    requires: [
        'COO.view.regPanels.RegHeader',
        'COO.view.Header'
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
                    }
                }
            });
        });
        task.delay(1000);
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
    			Ext.Msg.show({
						title: 'Ошибка',
						msg: 'Неверный логин или пароль',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
    		},    		
    		success: function(conn, response, success){
    			dialog.close();
    		}
    	});
    }
});
