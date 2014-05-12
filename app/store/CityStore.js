/**
 * Created by tatiana.gorbunova on 5/6/2014.
 */
Ext.define('COO.store.CityStore',{
    extend: 'Ext.data.Store',
    alias: 'store.cities',
    model:'COO.model.City',
    //autoLoad: true,

    proxy: {
        type: 'rest',
        url: '/SFO/rest/city/cities',
        method: 'GET',


        headers: {
            'accept': 'application/json'
        },

        reader: {
            type: 'json',
            rootProperty: 'city'
        }
    }
});
