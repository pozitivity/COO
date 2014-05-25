Ext.define('COO.store.MyOrganizationStore',{
	extend: 'Ext.data.Store',
	alias: 'store.myOrganizations',
	model:'COO.model.Organization', 
    //autoLoad: true,

	proxy: {
		type: 'rest',
		url: '/SFO/rest/organization/byUser',
		method: 'GET',


		headers: {
			'accept': 'application/json'
		},
		
		reader: {
			type: 'json',
           rootProperty: 'organization'
		}
	}
});