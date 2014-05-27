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
    		},
            "#cancel-registration": {
                click: this.onButtonCancelClick
            }
    	});
    },
    onButtonCancelClick: function(button, e, options) {
        console.log('Button cancel click');
        dialog = Ext.WindowManager.getActive();
        dialog.close();
    },
    onButtonSubmitClick: function(button, e, options){
    	console.log('Button submit click');
    	password = this.getRegistrationFormRef().getForm().getValues().password;
    	login = this.getRegistrationFormRef().getForm().getValues().login;
        email = this.getRegistrationFormRef().getForm().getValues().email;
    	cityName = Ext.ComponentQuery.query('#registration-choose-city-id')[0].value;
    	dialog = Ext.WindowManager.getActive();
    	COO.util.service.registration(login, password, dialog, cityName, email);
    }
});