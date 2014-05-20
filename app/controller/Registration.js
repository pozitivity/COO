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