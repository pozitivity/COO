Ext.define('COO.controller.Login', {
    extend: 'Ext.app.Controller',
    views: [
    	'COO.view.login.Login'
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
