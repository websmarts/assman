<template>
    <div>
        Filter: <b-input v-model="dataFilter" ></b-input>

        <div v-text="filteredData.length"></div>

        <b-modal :active.sync="isComponentModalFormActive" scroll="clip" has-modal-card>
            
            <modal-form v-bind:item="itemSelectedForEdit" @update="updateitem" ></modal-form>
        </b-modal>

        <b-table
            :data="filteredData" 
            :selected.sync="selected"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="barcode"
            v-on:select="selectrow"
            >

            <template slot-scope="props">
                <b-table-column field="barcode" label="Barcode" width="40" sortable >
                    {{ props.row.barcode }}
                </b-table-column>

                <b-table-column field="cost_centre" label="Cost Centre" sortable>
                    {{ props.row.cost_centre }}
                </b-table-column>

                <b-table-column field="vendor" label="Vendor" sortable>
                    {{ props.row.vendor }}
                </b-table-column>

                <b-table-column field="vendor_part_reference" label="Vendor Part" sortable>
                    {{ props.row.vendor_part_reference }}
                </b-table-column>

                <b-table-column field="wash_count" label="Wash Count" sortable numebic>
                    {{ props.row.wash_count }}
                </b-table-column>

                <b-table-column  label="Action" >
                    <a @click="edititem(props.row)">Edit</a>
                </b-table-column>


            </template>

            
        </b-table>
    </div>
</template>

<script>

    const ModalForm = {
        props: ['item'],
        data() {
            return {
                newitem: _.clone(this.item)
            }
        },
        template: `
            <form action="" v-on:submit.prevent="onSubmit">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit record</p>
                    </header>
                    <section class="modal-card-body">
                    <div style="display: flex;">
                    <div style="width:360px; margin-right:10px">
                        <b-field label="Barcode">
                            <b-input
                                type="text"
                                :value="item.barcode"
                                placeholder="Barcode"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Commissioned date">
                            <b-input
                                type="text"
                                :value="item.commissioned_date"
                                placeholder="Commissioned date">
                            </b-input>
                        </b-field>
                        </div>
                        <div >

                        <b-field label="Select a date">
                            <b-datepicker
                                placeholder="Click to select..."
                                inline
                                :date="item.commissioned_date"
                                icon="calendar-today">
                            </b-datepicker>
                        </b-field>

                        <b-field label="Wash count">
                            <b-input

                                type="number"
                                :value="item.wash_count"
                                @input="update($event,'wash_count')"
                                placeholder="Wash count">
                            </b-input>
                        </b-field>
                        </div>
                        </div>

                    
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary" >Update</button>
                    </footer>
                </div>
            </form>
        `,
        methods: {
            update(v,f) {
                console.log('input value=',v,'for field',f)
                this.newitem[f]=v
            },
            onSubmit() {
                console.log('Update the form data via xhr and notify the datatable of changed record')
                this.$emit('update',this.newitem) 
            }
        }
    }
    export default {
        components: {
            ModalForm
        },
        
        data() {
            const data = []
    	return{
            data,
            selected: data[2],
            isPaginated: true,
            isPaginationSimple: false,
            defaultSortDirection: 'asc',
            currentPage: 1,
            perPage: 10,
            dataFilter: null,
            isComponentModalFormActive: false,
            itemSelectedForEdit:{},
            formProps: {
                    email: 'evan@you.com',
                    password: 'testing'
            }
            
            
    	}
    	
    },
    computed: {
        filteredData() {
            

            let filterTerm = this.dataFilter

            if(!filterTerm){
               return this.data 
            }

            let results =   _.filter(this.data, function(o) {
                
                        if (o.barcode.includes(filterTerm) ) return o;
                    });
                        
            return results
            
            
        }
    },

    methods: {
    	getSlings() {
                axios.get('/api/slings')
                        .then(response => {
                            //console.log(response.data)
                            this.data = response.data
                        });
            },
    
        selectrow(rowObj,oldRowObj) {
            console.log('row selected, obj and old obj', rowObj,oldRowObj)
        },
        edititem(i) {
            console.log('edititem', i)
            this.itemSelectedForEdit = i
            this.isComponentModalFormActive = true
        },
        updateitem(i) {
            // replace the data item with the id=i.id with i
            var index = _.findIndex(this.data, {id: i.id});

            // Replace item at index using native splice
            this.data.splice(index, 1, i);
        }
    },
    mounted() { 
    	this.getSlings();
    }
    }
</script>