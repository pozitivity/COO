Ext.define('COO.controller.mainPanels.RegHeader', {
    extend: 'Ext.app.Controller',

    views: [
    	'COO.view.regPanels.RegHeader',
    	'COO.view.Header'
    ],

    init: function(application){
    	console.log('[OK] Init RegHeader controller');
    	this.control(
    		{
    			"button#button-logout-id": {
    				click: this.onButtonLogoutClick
    			}
    		}
    	);
    },

    onButtonLogoutClick: function(button, e, options){
    	console.log('button logout was clicked');
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/SFO/rest/authentication/logout'
    	});
    	var wrc = Ext.ComponentQuery.query('#header-panel-id')[0];
        wrc.removeAll();
        wrc.add(Ext.widget('headerpanel'));
        //Ext.create('COO.view.Container');
    }
});
