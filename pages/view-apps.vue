<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#0087ff">
        Apps Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group id="element" active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="allApps"
          :single-expand="true"
          :expanded.sync="expanded"
          :search="search"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ totalApp }} Apps</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <template>
                <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="280" flat>
                  <template>
                    <v-dialog v-model="dialogDelete" persistent max-width="390">
                      <template v-slot:activator="{ on }">
                        <v-chip
                          v-on="on"
                          class="ma-2"
                          color="primary"
                          outlined
                          pill
                        >
                          App Delete
                          <v-icon right>mdi-delete</v-icon>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title class="headline"
                          >Delete {{ item.title }}</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to delete this App</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialogDelete = false" color="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn
                            @click="deleteApp(item.id)"
                            :loading="isLoading"
                            :disabled="isDisabled"
                            color="success"
                            >Delete</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogEdit" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-chip v-on="on" class="ma-2" color="success" outlined>
                          <v-icon left>mdi-pencil</v-icon>
                          App Edit
                        </v-chip>
                      </template>
                      <v-card>
                        <v-toolbar class="mb-6">
                          <v-spacer />
                          <h3 class="headline">Edit {{ item.title }}</h3>
                          <v-progress-linear
                            :active="isProgressLoader"
                            :indeterminate="isProgressLoader"
                            absolute
                            bottom
                            color="primary"
                          ></v-progress-linear>
                          <v-spacer />
                        </v-toolbar>

                        <v-card-text class="pb-0">
                          <v-form v-model="isFormValid">
                            <v-layout align-center justify-center>
                              <v-flex xs12 sm8>
                                <v-text-field
                                  v-model="title"
                                  :label="item.title"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="description"
                                  label="Description"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                              <v-btn @click="dialogEdit = false" color="cancel">
                                Cancel</v-btn
                              >
                              <v-btn
                                @click="editApp(item.id)"
                                :disabled="!isFormValid"
                                color="success"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-card>
              </template>
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" class="disable-events"
              >There is no any APP</v-btn
            >
          </template>
        </v-data-table>
      </div>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      isFormValid: false,
      Delete: 'Delete',
      dialogEdit: false,
      dialog1: false,
      dialogDelete: false,
      title: '',
      description: '',
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: 'Description', value: 'description' },
        { text: 'CreatedBY', value: 'userName' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'upatedAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    allApps() {
      return this.$store.getters['app/allApps']
    },
    totalApp() {
      return this.$store.getters['app/totalApp']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  created() {
    try {
      if (this.allApps.length === 0) {
        this.$store.dispatch('app/fetchApps')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    async deleteApp(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('app/deleteApp', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
      } catch (e) {
        return e
      }
    },
    async editApp(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        await this.$store.dispatch('app/updateApp', {
          title: this.title,
          description: this.description,
          id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.dialogEdit = false
        this.title = null
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
.users-center {
  text-align: center;
}
</style>
