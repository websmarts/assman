
Vue.component(
    'sling-index',
    require('./components/manager/slings/Index.vue')
);

Vue.component(
    'sort-control',
    require('./components/SortControl.vue')
);
const app = new Vue({
    el: '#app',
    data() {
    	return{
    		slings: []
    	}
    	
    },

    methods: {
    	getSlings() {
                axios.get('/api/slings')
                        .then(response => {
                            //console.log(response.data)
                            this.slings = response.data
                        });
            },
        },
    mounted() {
    	this.getSlings();
    }

});