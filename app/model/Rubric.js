Ext.define('COO.model.Rubric', {
    extend: 'Ext.data.Model',
    
	//idProperty: 'rubricId',
	
    fields: [
       { name: 'rubricId', type: 'int' },
       { name: 'mainRubricId', type: 'int' },
	   { name: 'name', type: 'string'}
    ]

});
