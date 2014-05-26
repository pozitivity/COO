/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('COO.Application', {
    extend: 'Ext.app.Application',
    
    name: 'COO',

    splashscreen:{},

    views: [
        'Container',
        'welcomePanel.WelcomePanel'
    ],

    controllers: [
		'Container',
		'RubricList',
		'OrganizationList',
        'WelcomePanel',
        'Header',
        'Login',
        'Registration',
        'mainPanels.RegHeader',
        'mainPanels.MyCompanies'
    ],

    stores: [
        'RubricStore',
		'OrganizationStore',
        'CityStore',
        'MyOrganizationStore'
    ],

    requires: [
        'COO.util.service'
    ],
    

    init: function(){
   debugger;
        COO.util.service.fillCookiesIsAuth();
        var isAuth = Ext.util.Cookies.get("isAuth");

        if (isAuth === undefined || isAuth == 'null' || isAuth == null || isAuth.length <= 0 || isAuth != 1) {
            splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
            splashscreen.addCls('splashscreen');
            Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
                cls: 'x-splash-icon'
            });
        }
        console.log('Init application');
    },

    launch: function () {
        console.log('Launch application');

        var isAuth = Ext.util.Cookies.get("isAuth");


        if (isAuth === undefined || isAuth == 'null' || isAuth == null || isAuth.length <= 0 || isAuth != 1) {
            var task = new Ext.util.DelayedTask(function() {
                splashscreen.fadeOut({
                    duration: 500,
                    remove: true
                });
                
                splashscreen.next().fadeOut({
                    duration: 500,
                    remove: true,
                    listeners: {
                        afteranimate: function(el, startTime, eOpts) {
                            //Ext.widget('welcomePanel');
                            Ext.create('COO.view.Container');
                            //Ext.widget('welcomePanel');
                        }
                    }
                });
            });
        } else {
            Ext.widget('welcomePanel');
        }

            task.delay(1000);
    },

});
