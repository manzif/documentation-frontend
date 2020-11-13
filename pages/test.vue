<template>
  <v-container>
    <v-data-table
      :headers="headersBro"
      :items="desserts"
      :pagination.sync="pagination"
      :total-items="totalpatients"
      :loading="loading"
      no-data-text="No patients in this registry"
      class="dataTable elevation-3"
    >
      <template v-slot:items="props">
        <tr
          @click="
            $router.push({ name: 'patient', params: { id: props.item.id } })
          "
          class="row"
          :key="props.index"
        >
          <td class="text-xs-left">
            {{ props.item.lastName }}, {{ props.item.firstName }}
          </td>
          <td class="text-xs-center">{{ props.item.mrn }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    headersBro: [
      {
        text: 'Parameter',
        align: 'start',
        value: 'name'
      },
      { text: 'Values', value: 'calories' }
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159
      },
      {
        name: 'Ice cream sandwich',
        calories: 237
      },
      {
        name: 'Eclair',
        calories: 262
      },
      {
        name: 'Cupcake',
        calories: 305
      },
      {
        name: 'Gingerbread',
        calories: 356
      },
      {
        name: 'Jelly bean',
        calories: 375
      },
      {
        name: 'Lollipop',
        calories: 392
      },
      {
        name: 'Honeycomb',
        calories: 408
      },
      {
        name: 'Donut',
        calories: 452
      },
      {
        name: 'KitKat',
        calories: 518
      }
    ]
  })
}
</script>
