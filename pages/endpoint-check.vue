<template>
  <v-container grid-list-md>
    <div class="mx-12">
      <v-card>
        <v-tabs>
          <v-tab>
            Description
          </v-tab>
          <v-tab>
            Query
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
            Body
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
            Response
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
            Submit
          </v-tab>
          <v-tab-item>
            <v-card flat class="v-tabs__content">
              <v-layout row class="pa-5">
                <v-flex xs12 md6>
                  <div class="subtitle-1 grey--text pb-1">Name</div>
                  <v-text-field
                    v-model="name"
                    :rules="[(v) => !!v || 'Name is required']"
                    required
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="subtitle-1 grey--text pb-1">
                    Type
                  </div>
                  <v-select
                    v-model="type"
                    :rules="[(v) => !!v || 'Type is required']"
                    :items="typeItems"
                    dense
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Description
                  </div>
                  <v-text-field
                    v-model="description"
                    :rules="[(v) => !!v || 'Description is required']"
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text text--primary pb-1">
                    Url
                  </div>
                  <v-text-field
                    v-model="url"
                    :rules="[(v) => !!v || 'Url is required']"
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md12>
                  <p>
                    Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                    egestas, lacus ante convallis tellus, vitae iaculis lacus
                    elit id tortor. Sed mollis, eros et ultrices tempus, mauris
                    ipsum aliquam libero, non adipiscing dolor urna a orci.
                    Curabitur ligula sapien, tincidunt non, euismod vitae,
                    posuere imperdiet, leo. Nunc sed turpis.
                  </p>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content">
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
                  <v-layout row v-for="row in rows" :key="row.id">
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="row.parameter"
                        placeholder="Parameter"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="row.value"
                        placeholder="value"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn outlined grey @click="addRow">Add New parameter</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content">
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content">
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content">
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    rows: [{ parameter: '', value: '' }],
    items: [
      {
        id: 1,
        name: 'Applications :',
        children: [
          { id: 2, name: 'querry : input' },
          { id: 3, name: 'Chrome : app' },
          { id: 4, name: 'Webstorm : app' }
        ]
      },
      {
        id: 5,
        name: 'Documents :',
        children: [
          {
            id: 6,
            name: 'vuetify :',
            children: [
              {
                id: 7,
                name: 'src :',
                children: [
                  { id: 8, name: 'index : ts' },
                  { id: 9, name: 'bootstrap : ts' }
                ]
              }
            ]
          },
          {
            id: 10,
            name: 'material2 :',
            children: [
              {
                id: 11,
                name: 'src :',
                children: [
                  { id: 12, name: 'v-btn : ts' },
                  { id: 13, name: 'v-card : ts' },
                  { id: 14, name: 'v-window : ts' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 15,
        name: 'Downloads :',
        children: [
          { id: 16, name: 'October : pdf' },
          { id: 17, name: 'November : pdf' },
          { id: 18, name: 'Tutorial : html' }
        ]
      },
      {
        id: 19,
        name: 'Videos :',
        children: [
          {
            id: 20,
            name: 'Tutorials :',
            children: [
              { id: 21, name: 'Basic layouts : mp4' },
              { id: 22, name: 'Advanced techniques : mp4' },
              { id: 23, name: 'All about app : dir' }
            ]
          },
          { id: 24, name: 'Intro : mov' },
          { id: 25, name: 'Conference introduction : avi' }
        ]
      }
    ],
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    isFormValid: false,
    body: '',
    bodyItem: '',
    type: '',
    bodyPlace: {
      name: 'firstname',
      lastname: 'manzi',
      email: 'manzif60@gmail.com'
    },
    typeItems: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'COPY',
      'HEAD',
      'OPTIONS'
    ],
    name: '',
    description: '',
    url: '',
    lazy: false
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    addRow() {
      console.log('\n\n\n\n', 'nahageze')
      this.rows.push({ parameter: '', value: '' })
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createEndpoint() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        console.log('\n\n\n\n\n', this.rows)
        await this.$store.dispatch('endpoint/createEndpoint', {
          name: this.name,
          type: this.type,
          body: this.rows,
          url: this.url,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.name = null
        this.type = null
        this.url = null
        this.body = null
        this.description = null
      } catch (e) {
        return e
      }
    }
  }
}
</script>
<style scoped>
.disable-events {
  pointer-events: none;
}
.create-center {
  text-align: center;
}
.line {
  width: 123px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
  text-align: center;
}
.v-tabs__content {
  height: 70vh;
}
</style>
