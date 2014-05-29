Ext.define('COO.view.regPanels.EditCompany',{
	extend: 'Ext.window.Window',
	alias: 'widget.editCompany',

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

	title: 'Редактирование организации',
	items: [
		{
			xtype: 'form',
			itemId: 'edit-company-form-id',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
				{
					xtype: 'hidden',
					name: 'organizationId'
				},
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
							displayField: 'name',
							itemId: 'edit-combo-choose-mainRubric-id',
							store: 'RubricStore',
							padding: '0 20 0 0',
							flex: 1,
							labelWidth: 140,
							editable: false,
							emptyText:'Выберите рубрику',
							allowBlank: false
						},
						{
							displayField: 'name',
							itemId: 'edit-combo-choose-subRubric-id',
							store: 'RubricStore',
							//disabled: true,
							flex: 1,
							editable: false,
							emptyText: 'Выберите подрубрику',
							allowBlank: false
						}
					]
				},
				{
					xtype: 'combo',
					itemId: 'edit-company-combo-choose-city-id',
					store: 'CityStore',
					displayField: 'cityName',
					padding: '10 10',
					editable: false,
					emptyText:'Выберите город',
					allowBlank: false
				},
				{
					xtype: 'textarea',
					name: 'info',
					padding: '10 10',
					itemId: 'textarea-info-id',
					fieldLabel: 'Дополнительная информация',
					labelWidth: 130
				},
				{
					xtype: 'form',
					itemId: 'edit-upload-logo-form-id',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							flex: 3,
							xtype: 'filefield',
							itemId: 'edit-field-upload-logo-id',
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
					itemId: 'edit-image-upload-logo-id',
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
							itemId: 'save-edit-company-id',
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