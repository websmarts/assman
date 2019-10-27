<template>

<div>
<h1>Sling Index</h1>

Filter: <input v-model="filterKey" type="text" name="filter">

<table class="table">
  <thead>
    <tr>
      <th>Barcode<sort-control :direction="barcode.direction" :column="barcode.column" :order="barcode.order" @update="updateSorter"></sort-control></th>
      <th>Vendor</th>
      <th>Part No</sort-control></th>
      <th>Site</th>
      <th>Dept</th>
      <th>Description</th>
      <th>Commissioned</th>
      <th>Wash count<sort-control :direction="wash_count.direction" :column="wash_count.column" :order="wash_count.order" @update="updateSorter"></sort-control></th>
      <th>Next audit</th>
      <th>&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="sling in displayList" :key="sling.id">
      <td>{{ sling.barcode }}</td>
      <td>{{ sling.vendor }}</td>
      <td>{{ sling.vendor_part_reference }}</td>
      <td>{{ sling.site_id }}</td>
      <td>{{ sling.department_id }}</td>
      <td>{{ sling.description }}</td>
      <td>{{ sling.commissioned_date }}</td>
      <td>{{ sling.wash_count }}</td>
      <td>{{ sling.next_audit_due }}</td>
      <td>&nbsp;</td>

    </tr>

  </tbody>
</table>

</div>
</template>

<script>

export default {

  props: ['listitems'],
  data () {
    return {
      filterKey: '',
     
      sorters: [
        {column: 'barcode', direction: 0},
        {column: 'wash_count', direction: 0},
      ],
      activeSorters: [],

    }
  },
  methods: {

    updateSorter(column,val){
      // Find the sorter object and set thge direction value
      let sorter = _.find(this.sorters,{'column': column })  
      sorter.direction = val

      // Update the activeSorters array. We do it this way to provide 
      // an implicit order to the various sorters to be the same as 
      // the order the user applied them
      if (val == 0) {
        // remove any activeSorter for the column if one exists
        for(var i = 0; i < this.activeSorters.length; i++) {
          if(this.activeSorters[i].column == column) {
              this.activeSorters.splice(i, 1);
              break;
          }
        }
      } else {
        // push the new sorter to activeSorters list 
        var found = _.find(this.activeSorters,{'column':column})
        if(found){
          found.direction = val
        } else {
          this.activeSorters.push({'column': column, 'direction': val})
        }
      }
    },
  },
  computed : {

    barcode() {
      let barcode =  _.find(this.sorters,{'column': 'barcode' })
      barcode.order = _.findIndex(this.activeSorters,{'column': 'barcode' }) + 1
      return barcode
    },
    wash_count() {
      let wash_count =  _.find(this.sorters,{'column': 'wash_count' })
      wash_count.order = _.findIndex(this.activeSorters,{'column': 'wash_count' }) + 1
      return wash_count
    },

    filteredList() {
      let list = this.listitems
    
      if( !this.filterKey.length  ){
        return list
      }

      return _.filter(list, o => {

        // This filter returns items that macth any of the following filters

        // Barcode filter
        if (o.barcode && o.barcode.indexOf(this.filterKey) == 0) {
          return o
        }

        // vendor_part_reference filter
        if (o.vendor_part_reference && o.vendor_part_reference.indexOf(this.filterKey) !== -1) {
          return o
        }

      })
    },

    sortedList() {
    
      let list =  this.filteredList
      let sortfields = []
      let sortdirections = []

      // Apply each sorter in order
      _.each(this.activeSorters, s => {
            sortfields.push(s.column)
            sortdirections.push(s.direction == 1 ? 'asc' : 'desc')
      }) 

      return _.orderBy(list,sortfields,sortdirections)
    },

    displayList() {
      return this.sortedList
    }
  }

  
}

</script>