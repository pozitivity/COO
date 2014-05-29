Ext.define('COO.store.AdmOrganizationStore',{
	extend: 'Ext.data.Store',
	alias: 'store.admOrganizations',
	model:'COO.model.Organization', 
    //autoLoad: true,

	proxy: {
		type: 'rest',
		url: '/SFO/rest/organization/byPublished',
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