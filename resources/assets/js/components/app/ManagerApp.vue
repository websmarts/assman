<template>

    <v-app id="inspire">
    
        
        <v-toolbar color="blue" height="85" dark fixed app class="no-print">
        
            <v-toolbar-title class="no-print">
                <img src="images/logo-with-tick-white.png" height="45"  /><br />
                <span style="font-size:13px">Safety Audit &amp; Asset Management</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="title" >{{ clientname }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items >
                <v-btn href="/logout" flat><span  style="color:white;text-decoration: none">Logout<br /><small>{{ user.name }}</small></span></v-btn>
            </v-toolbar-items>
            
        </v-toolbar>
        





        <v-content>
            <v-toolbar tile dark flat  color="blue lighten-1" height="84" class="no-print">
                
                    
                <v-layout row align-center justify-center >
                    <v-flex xs12 sm11 md7 style="padding-top:1px">

                    <asset-toolbar :currentroute="currentroute"></asset-toolbar>
                            
                    </v-flex>
                </v-layout>

            </v-toolbar>
        
            
        <v-progress-linear :indeterminate="true" v-if="store.isActive()" style="margin-top:0"></v-progress-linear>
        
        <v-container fluid >
        
            <v-layout row align-center>
            <v-flex text-xs-center>
                
                
                <transition name="fade" >
                    <router-view :key="$route.params.assetid"></router-view>
                </transition>
            </v-flex>
            


            </v-layout>
        </v-container>
        </v-content>

        <v-footer color="blue-grey darken-2" app class="no-print">
        <span class="white--text">&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>

import store from './lib/store'


export default {
    data() {
        return {
            store,
            clientname: $Clientdata['name'],
            user: $User,
            currentroute: '',
            loading: window.loading
        }
    },
    methods: {
        setCurrentRoute(){
            let action = this.$route.path
            let res = action.match(/\/([^\/]*)/)
            this.currentroute = res[1]

        }
    },
    watch: {
        '$route' (to, from) {
            // react to route changes...
            // console.log('re-routed to: ',to.path)
            this.assetId = to.params.assetid

            this.setCurrentRoute()
        }
    },
    mounted() {
        this.setCurrentRoute()
    }
}

</script>