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
        'mainPanels.MyCompanies',
        'mainPanels.Profile',
        'admPanel.AdmHeader',
        //'mainPanels.EditCompany'
    ],

    stores: [
        'RubricStore',
		'OrganizationStore',
        'CityStore',
        'MyOrganizationStore',
        'AdmOrganizationStore'
    ],

    requires: [
        'COO.util.service'
    ],
    

    init: function(){
        COO.util.service.fillCookiesIsAuth();
        var isAuth = Ext.util.Cookies.get("isAuth");

        if (isAuth === undefined || isAuth == 'null' || isAuth == null || isAuth.length <= 0 || isAuth != 1) {
            /*splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
            splashscreen.addCls('splashscreen');
            Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
                cls: 'x-splash-icon'
            });*/
        }
        console.log('Init application');
    },

    launch: function () {
        console.log('Launch application');

        var isAuth = Ext.util.Cookies.get("isAuth");
        var userId = Ext.util.Cookies.get("userId");

        if (isAuth === undefined || isAuth == 'null' || isAuth == null || isAuth.length <= 0 || isAuth != 1) {

            COO.util.service.initApp();
            Ext.widget('welcomePanel');
        } else {
            if(userId === '2') {
                COO.util.service.initAdmApp();
            } else {
                COO.util.service.initRegApp();
            }
        }
    },

});
