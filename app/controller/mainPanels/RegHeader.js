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
        'COO.view.regPanels.MyCompanies'
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
    			}
    		}
    	);
    },
    onButtonProfileClick: function(button, e, options) {
    	console.log('button profile was clicked');
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        Ext.ComponentQuery.query('#info-company-id')[0].hide();
        this.getRubricListGridPanelRef().getStore().load();
    }, 
    onButtonMyCompaniesClick: function(button, e, options) {
    	console.log('button my companies was clicked');
        Ext.ComponentQuery.query('#organization-list-gridpanel')[0].hide();
        Ext.ComponentQuery.query('#info-company-id')[0].hide();
        this.getRubricListGridPanelRef().getStore().load();
        var wrc = Ext.ComponentQuery.query('#center-panel-id')[0];
        wrc.removeAll();
        wrc.add(Ext.widget('myCompaniesPanel'));
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
                    }
                }
            });
        });
        task.delay(1000);
    }
});
