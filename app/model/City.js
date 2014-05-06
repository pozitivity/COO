/**
 * Created by tatiana.gorbunova on 5/6/2014.
 */
Ext.define('COO.model.City', {
    extend: 'Ext.data.Model',

    idProperty: 'cityId',

    fields: [
        { name: 'cityId', type: 'int' },
        { name: 'cityName', type:'string'}
    ]

});