Ext.define('COO.view.regPanels.NewCompany',{
	extend: 'Ext.window.Window',

	alias: 'widget.newCompany',

	resizable: true,
	shadow: false,
	modal: true,
	closable: true,

	autoscroll: true,

	width: 700,
	height: 700,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		padding: 20
	},

	title: 'Новая компания',
	items: [
		{
			xtype: 'form',
			itemId: 'create-company-form-id',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',
					padding: '10 10',
					items: [
						{
							flex: 1,
							name: 'name',
							emptyText: 'Имя компании',
							padding: '0 20 0 0',
							allowBlank: false
						},
						{
							flex: 1,
							name: 'postcode',
							emptyText: 'Индекс',
							allowBlank: false
						}
					]
				},
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',
					padding: '10, 10',
					items: [
						{
							flex: 1,
							name: 'website',
							emptyText: 'Вебсайт',
							padding: '0 20 0 0',
							allowBlank: false,
						},
						{
							flex: 1,
							name: 'phone',
							emptyText: 'Телефон',
							allowBlank: false
						}
					]
				},
				{
					xtype: 'textfield',
					name: 'address',
					padding: '10 10',
					emptyText: 'Адрес',
					allowBlank: false
				},
				{
					xtype: 'fieldcontainer',
					defaultType: 'combo',
					padding: '10 10',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							fieldLabel: 'Главная рубрика',
							displayField: 'name',
							itemId: 'combo-choose-mainRubric-id',
							store: 'RubricStore',
							padding: '0 20 0 0',
							flex: 1,
							labelWidth: 140
						},
						{
							fieldLabel: 'Подрубрика',
							displayField: 'name',
							itemId: 'combo-choose-subRubric-id',
							store: 'RubricStore',
							disabled: true,
							flex: 1
						}
					]
				},
				{
					xtype: 'combo',
					itemId: 'new-company-combo-choose-city-id',
					store: 'CityStore',
					displayField: 'cityName',
					fieldLabel: 'Город',
					padding: '10 10'
				},
				{
					xtype: 'textarea',
					name: 'info',
					padding: '10 10',
					fieldLabel: 'Дополнительная информация',
					labelWidth: 130
				},
				{
					xtype: 'form',
					itemId: 'upload-logo-form-id',
					items: [
						{
							xtype: 'filefield',
        					name: 'logo',
        					emptyText: 'Логотип',
        					labelWidth: 50,
        					msgTarget: 'qtip',
        					allowBlank: true,
        					anchor: '80%',
        					buttonText: 'Выберите логотип ...'
						}
					],
					buttons: [
						{
							text: 'Upload',
							handler: function() {
								var form = this.up('form').getForm();
								if(form.isValid()) {
									form.submit({
										url: '/SFO/rest/logo/upload',
										waitMsg: 'Ваш логотип загружается...',
										success: function(fp, o) {
											Ext.Msg.alert('Success', o.result.file);
										}
									});
								}
							}
						}
					]
				},
				{
					xtype: 'panel',
					layout: {
						type: 'hbox',
						align: 'middle',
						pack: 'end'
					},
					items: [
						{
							xtype: 'button',
							itemId: 'save-new-company-id',
							text: 'Сохранить',
							margin: '20 10 0 0'
						}
					]
				}
			]
		}
	]
});