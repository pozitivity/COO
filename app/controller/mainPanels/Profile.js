Ext.define('COO.controller.mainPanels.Profile',{
	extend: 'Ext.app.Controller',

	views: [
		'COO.view.regPanels.Profile'
	],
	refs: [
		{
			ref: 'profileUserFormRef',
			selector: '#profile-user-form-id'
		},
		{
			ref: 'profileComboCityRef',
			selector: '#profile-choose-city-id'
		}
	],
	init: function(application) {
		console.log('[OK] Init controller Profile');
		this.control(
			{
				"button#save-profile-form-id": {
					click: this.onButtonSaveProfileFormClick
				}
			}
		);
	},
	onButtonSaveProfileFormClick: function(button, e, options) {
		console.log('Button profile save was clicked');
		values = {},
		values.email = this.getProfileUserFormRef().getForm().getValues().email;
		values.password = this.getProfileUserFormRef().getForm().getValues().password;
		values.cityName = this.getProfileComboCityRef().displayTplData[0].cityName;
		values.userId = Ext.util.Cookies.get('userId');
		console.log(values);
		Ext.Ajax.request({
			url: '/SFO/rest/user/updateUser',
			method: 'GET',
			params: values,
			success: function(conn, response) {
				//console.log(conn.responseText);
				Ext.Msg.show(
					{
						title: 'Уведомление',
                        msg: 'Ваши данные сохранены.<br/>Вам отправлено письмо с измененными данными.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
					}
				);
				this.sendMail(values.email, values.password, values.cityName, Ext.decode(conn.responseText).login);

			},
			scope: this
		});
	},
	sendMail: function(email, password, cityName, login) {
		var subject_change_profile = 'Ваши личные данные изменены';
		var body_change_profile = 'Оповещаем вас, что ваши личные данные были изменены.'+
		'  Ваш логин: ' + login + '  Ваш пароль: ' + password + '  Ваш E-mail: '  + email + '  Ваш город: ' + cityName;
		Ext.Ajax.request({
            url: '/SFO/rest/sendmail/sendMailReg',
            method: 'GET',
            params: {
                to: email,
                subject: subject_change_profile,
                text: body_change_profile
            },
            success: function(conn, response) {
                console.log('mail success send');
            }
        });
	}
});