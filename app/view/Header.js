Ext.define("COO.view.Header", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.headerpanel',

    layout: {
		type: 'hbox'
	},
	
	items: [
		{
			html: '<div id = "logo"></div>'
		}
	]
});