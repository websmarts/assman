<template>

<v-data-table
    :headers="headers"
    :items="audits"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.meta.audit_date }}</td>
      <td class="text-xs-left">{{ props.item.meta.auditors }}</td>
      <td class="text-xs-left">{{ props.item.meta.audit_notes }}</td>
      <td class="text-xs-left">{{ props.item.meta.next_action }}</td>
      <td class="text-xs-left">{{ props.item.meta.condition }}</td>
      
    </template>
  </v-data-table>

</template>

<script>

export default {
    props: ['audits'],
    data() {
        return {
            headers: [
                {
                    text: 'Date ',
                    align: 'left',
                    sortable: true,
                    value: 'meta.audit_date'
                },
                {
                    text: 'Audtitor ',
                    align: 'left',
                    sortable: false,
                    value: 'created_by'
                },
                {
                    text: 'Notes ',
                    align: 'left',
                    sortable: false,
                    value: 'meta.audit_notes'
                },
                {
                    text: 'Next action ',
                    align: 'left',
                    sortable: false,
                    value: 'meta.netxt_action'
                },
                {
                    text: 'Condition ',
                    align: 'left',
                    sortable: false,
                    value: 'meta.condition'
                }
                
            ]
        }
    }
}

</script>
