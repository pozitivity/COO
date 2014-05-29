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
    		},
            "#cancel-login": {
                click: this.onButtonCancelClick
            }
    	});
    },
    onButtonSubmitClick: function(button, e, options) {
    	console.log('Button submit click');
    	password = this.getLoginFormRef().getForm().getValues().password;
    	login = this.getLoginFormRef().getForm().getValues().login;
    	dialog = Ext.WindowManager.getActive();
        console.log(dialog);
        console.log(login);
        //debugger;
    	COO.util.service.login(login, password, dialog);
    },
    onButtonCancelClick: function(button, e, options) {
        console.log('Button cancel click');
        dialog = Ext.WindowManager.getActive();
        dialog.close();
    }
});
