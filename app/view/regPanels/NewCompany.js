Ext.define('COO.view.regPanels.NewCompany',{
	extend: 'Ext.window.Window',

	alias: 'widget.newCompany',

	resizable: true,
	shadow: false,
	modal: true,
	closable: true,

	autoscroll: true,

	width: 700,
	minHeight: 550,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		padding: 20
	},

	title: 'Новая организация',
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
							allowBlank: true
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
							//fieldLabel: 'Главная рубрика',
							displayField: 'name',
							itemId: 'combo-choose-mainRubric-id',
							store: 'RubricStore',
							padding: '0 20 0 0',
							flex: 1,
							labelWidth: 140,
							editable: false,
							emptyText:'Выберите рубрику',
							allowBlank: false
						},
						{
							//fieldLabel: 'Подрубрика',
							displayField: 'name',
							itemId: 'combo-choose-subRubric-id',
							store: 'RubricStore',
							disabled: true,
							flex: 1,
							editable: false,
							emptyText: 'Выберите подрубрику',
							allowBlank: false
						}
					]
				},
				{
					xtype: 'combo',
					itemId: 'new-company-combo-choose-city-id',
					store: 'CityStore',
					displayField: 'cityName',
					//fieldLabel: 'Город',
					padding: '10 10',
					editable: false,
					emptyText:'Выберите город',
					allowBlank: false
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
					layout: {
						type: 'hbox'
					},
					items: [
						{
							flex: 3,
							xtype: 'filefield',
							itemId: 'field-upload-logo-id',
        					name: 'logo',
        					emptyText: 'Логотип',
        					labelWidth: 50,
        					msgTarget: 'side',
        					allowBlank: true,
        					anchor: '80%',
        					padding: '10 10',
        					buttonText: 'Выберите логотип ...',
        					readOnly: true,
        					fileUpload: true
						}
					]
				},
				{
					xtype: 'image',
					itemId: 'image-upload-logo-id',
					//width: 150,
					//height: 200
					cls: 'logo_company position'
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
							margin: '20 10 0 0',
							formBind: true
						}
					]
				}
			]
		}
	]
});