/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */					
Ext.define('COO.view.Container', {
    extend: 'Ext.container.Viewport',

	requires:[
		'COO.view.Header',
		'COO.view.Main',
		'COO.view.Footer',
		'COO.view.regPanels.RegHeader'
	],
	
    layout: {
        type: 'vbox'
    },
    minWidth: 1024,
    minHeight: 700,
    autoScroll: true,
    items: [
        {
			//flex: 1,
			height: 130,
            //xtype: 'headerpanel',
            itemId: 'header-panel-id'
        },
        {
        	flex: 6,
            xtype: 'mainpanel'
        },
        {
        	flex: 0.5,
        	//xtype: 'footerpanel'
        	xtype: 'panel',
        	layout: {
        		type: 'vbox',
        		align: 'center',
        		pack: 'center'
        	},
        	//margin: '0 0 0 500',
        	items: [
        		{
        			xtype: 'footerpanel'
        		}
        	]

        } 
    ],
    renderTo: Ext.getBody()
});
