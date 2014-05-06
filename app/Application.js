/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('COO.Application', {
    extend: 'Ext.app.Application',
    
    name: 'COO',

    views: [
        'Container'
    ],

    controllers: [
		'Container',
		'RubricList',
		'OrganizationList'
    ],

    stores: [
        'RubricStore',
		'OrganizationStore',
        'CityStore'
    ],
    
    launch: function () {
        console.log('Launch application');
    }
});
