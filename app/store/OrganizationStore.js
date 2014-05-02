Ext.define('COO.store.OrganizationStore',{
	extend: 'Ext.data.Store',
	alias: 'store.organizations',
	model:'COO.model.Organization', 
    //autoLoad: true,

	proxy: {
		type: 'rest',
		url: '/SFO/rest/organizationService/organizations',
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