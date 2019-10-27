
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import Router from 'vue-router';
import Vuetify from 'vuetify';





Vue.use(Router)

// Helpers
import colors from 'vuetify/es5/util/colors'
//import apiService from './components/app/lib/apiService';
Vue.use(Vuetify, {
    theme: {
      primary: colors.indigo.darken1, // #E53935
      secondary: colors.indigo.lighten4, // #FFCDD2
      accent: colors.indigo.base // #3F51B5
    }
  })

Vue.component(
    'asset-toolbar',
    require('./components/app/AssetToolbar.vue')
);

const Dashboard = {template:'<div>Dashboard</div>'};
const AddAsset = require('./components/app/AssetAdd.vue');
const ViewAsset = require('./components/app/AssetView.vue');
const Reports = {template:'<div>Reports</div>'};

const assetEditForm = require('./components/app/AssetEditForm.vue');
Vue.component('assetEditForm',assetEditForm);

const assetAudit = require('./components/app/AssetAudit.vue');
Vue.component('assetAudit',assetAudit);

const auditHistory = require('./components/app/AuditHistory.vue');
Vue.component('auditHistory',auditHistory);

const routes = [
    { path: '/', component: Dashboard },
    { path: '/view/:barcode', component: ViewAsset },
    { path: '/add/:assettype', component: AddAsset },
    { path: '/reports', component: Reports }
  ];

const router = new Router({
    routes
    
});

const App = require('./components/app/App.vue');


Vue.config.productionTip = false

// import api from './components/app/lib/apiService.js';
import apiService from './components/app/lib/apiServiceClass.js';

const api =  new apiService;

Vue.prototype.$api = api;



new Vue(
    { 
        el: '#app',
        router,
        template:'<App/>',
        components: { App },
        data() {
            return {
                clientname: $Clientdata.name
               
            }
        }
        

    }
);



