Ext.define('COO.store.RubricStore',{
	extend: 'Ext.data.Store',

	alias: 'store.rubrics',
	model:'COO.model.Rubric',
    //sorters: ['name'],
	autoLoad: true,
	proxy: {
		type: 'rest',
		url: '/SFO/rest/rubric/rubrics',
		method: 'GET',

		headers: {
			'accept': 'application/json'
		},
		
		reader: {
			type: 'json',
            rootProperty: 'rubric'
		}
	}
});