Ext.define("COO.view.Footer", {
	extend: 'Ext.panel.Panel',
	alias: 'widget.footerpanel',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'stretch'
	},
	minWidth:1300,
	items: [
		{
			html: '<div>© 2014 COO, Tatyana Gorbunova and Elina Komaleva,  Contacts: tatiana.gorbunova@outlook.com</div>'
		}
	]

});