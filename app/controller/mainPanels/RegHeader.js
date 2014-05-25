Ext.define('COO.controller.mainPanels.RegHeader', {
    extend: 'Ext.app.Controller',

    views: [
    	'COO.view.regPanels.RegHeader'
    ],
    requires: [
        'COO.view.Header',
        'COO.view.infoCompany.InfoCompany',
        'COO.view.organizationList.OrganizationList',
        'COO.view.rubricList.RubricList',
        'COO.view.regPanels.MyCompanies',
        'COO.view.Main'
    ],
    refs: [
        {
            ref: 'myOrganizationGridPanelRef',
            selector: '#my-organization-list-gridpanel'
        },
        {
            ref: 'rubricListGridPanelRef',
            selector: '#rubric-list-gridpanel'
        }
    ],
    splashscreen: {},
    init: function(application){
    	console.log('[OK] Init RegHeader controller');
    	this.control(
    		{
    			"button#button-logout-id": {
    				click: this.onButtonLogoutClick
    			},
    			"button#my-companies-id": {
    				click: this.onButtonMyCompaniesClick
    			},
    			"button#profile-id": {
    				click: this.onButtonProfileClick
    			},
                "#regheader-combo-choose-city-id": {
                    change: this.onChangeCityInRegHeader
                }
    		}
    	);
    },
    onButtonProfileClick: function(button, e, options) {
    	console.log('button profile was clicked');
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        Ext.ComponentQuery.query('#info-company-id')[0].hide();
        this.getRubricListGridPanelRef().getStore().load();
        this.setPressedToolbarButton(button);
    }, 
    onButtonMyCompaniesClick: function(button, e, options) {
    	console.log('button my companies was clicked');
        //console.log(Ext.ComponentQuery.query('#field-back-rubricId')[0].getForm().getValues().mainRubricId);
        if(Ext.ComponentQuery.query('#info-companu-id')[0] != undefined){
            Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
            console.log(Ext.ComponentQuery.query('#info-company-id')[0]);
            Ext.ComponentQuery.query('#info-company-id')[0].destroy();
            this.getRubricListGridPanelRef().getStore().load();
        }
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        wrc.add(Ext.widget('myCompaniesPanel'));
        userId = Ext.ComponentQuery.query('#field-userId')[0].getForm().getValues();
        console.log(userId);
        this.loadMyCompanies(userId);

        this.setPressedToolbarButton(button);

    },
    loadMyCompanies: function(userId){
        this.getMyOrganizationGridPanelRef().getStore().load({
            params: {
                userId: userId
            }
        });
    },
    onButtonLogoutClick: function(button, e, options){
    	console.log('button logout was clicked');
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/authentication/logout'
    	});
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
        				wrc.add(Ext.widget('headerpanel'));
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
                                Ext.ComponentQuery.query('#header-combo-choose-city-id')[0].setValue(cityName);
                            }
                        });
                    }
                }
            });
        });
        task.delay(1000);

        this.setPressedToolbarButton(button);
    },
    setPressedToolbarButton: function(button) {
        var pressed_classname = "pressed-button";
        //this.getButtonConfigurationRef().removeCls(pressed_classname);
        //this.getButtonFinancialsRef().removeCls(pressed_classname);
        //this.getButtonManageAccountRef().removeCls(pressed_classname);
        button.addCls(pressed_classname);
    },
    onChangeCityInRegHeader: function(oldValue, newValue, eOpts){
        Ext.ComponentQuery.query('#field-cityId')[0].getForm().setValues(Ext.ComponentQuery.query('#regheader-combo-choose-city-id')[0].displayTplData[0]);
        console.log(Ext.ComponentQuery.query('#field-cityId')[0].getForm().getValues());
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
    }
});
