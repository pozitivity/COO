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
        'WelcomePanel'
    ],

    stores: [
        'RubricStore',
		'OrganizationStore',
        'CityStore'
    ],
    

    init: function(){
        splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
        splashscreen.addCls('splashscreen');
            Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
                cls: 'x-splash-icon'
            });
        console.log('Init application');
    },

    launch: function () {
        console.log('Launch application');
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
                        }
                    }
                });
            });

            task.delay(1000);
    },

});
