Ext.define("COO.view.Footer", {
	extend: 'Ext.panel.Panel',
	alias: 'widget.footerpanel',
	layout: {
		type: 'hbox',
		pack: 'stretch',
		align: 'stretch'
	},
	items: [
		{
			minWidth:700,
			html: '<div>© 2014 COO, Tatyana Gorbunova and Elina Komaleva,  Contacts: tatiana.gorbunova@outlook.com</div>'
		}
	]

});