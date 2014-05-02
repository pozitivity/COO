Ext.define('COO.model.Organization', {
    extend: 'Ext.data.Model',
    
	idProperty: 'organizationId',
	
    fields: [
       { name: 'organizationId', type: 'int' },
	   { name: 'name', type:'string'}
    ]

});
