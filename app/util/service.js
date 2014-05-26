Ext.define('COO.util.service',{
		
	requires:[
		'Ext.util.Cookies'
	],

	statics: {

		fillCookiesIsAuth: function() {
            Ext.Ajax.request({
                method: 'GET',
                //url: VQ.Config.getHosts().rest + VQ.Config.getServices().isAuth,
                url: '/SFO/rest/authentication/isauthenticated',
                async: false,

                failure: function(conn, response, options, eOpts) {
                    Ext.util.Cookies.set("isAuth", 0);
                },

                success : function(conn, response, options, eOpts) {
                    if (conn.responseText === 'true') {
                    	debugger;
                        Ext.util.Cookies.set("isAuth", 1);
                    } else {
                        Ext.util.Cookies.set("isAuth", 0);
                    }
                }
            })
        },
	}
});