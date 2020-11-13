<template>
  <v-container fluid grid-list-md>
    <div class="mb-7 users-center">
      <v-btn class="disable-events" text dark x-large color="#0087ff">
        Apis Overview
        <v-icon right>fa-angle-down</v-icon></v-btn
      >
    </div>
    <v-item-group id="element" active-class="secondary">
      <div class="mx-md-12">
        <v-data-table
          :headers="headers"
          :items="allApis"
          :single-expand="true"
          :expanded.sync="expanded"
          :search="search"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ totalApi }} Apis</v-toolbar-title>
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
                <v-card class="mx-auto mt-5 pl-3 mb-5" max-width="380" flat>
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
                          Api Delete
                          <v-icon right>mdi-delete</v-icon>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title class="headline"
                          >Delete {{ item.name }}</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to delete this Api</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="dialogDelete = false" color="cancel"
                            >Cancel</v-btn
                          >
                          <v-btn
                            @click="deleteApi(item.id)"
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
                                  v-model="email"
                                  :rules="emailRules"
                                  label="Email"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="master"
                                  :rules="[(v) => !!v || 'Master is required']"
                                  label="Master"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="privilege"
                                  :rules="[
                                    (v) => !!v || 'Privilege is required'
                                  ]"
                                  label="privilege"
                                  outlined
                                  clearable
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="username"
                                  :rules="[
                                    (v) => !!v || 'Username is required'
                                  ]"
                                  label="username"
                                  outlined
                                  clearable
                                  dense
                                  class="mb-0"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                              <v-btn @click="dialogEdit = false" color="cancel">
                                Cancel</v-btn
                              >
                              <v-btn
                                @click="editUser(item._id)"
                                :disabled="!isFormValid"
                                color="success"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <v-chip
                      @click="goToAction(item)"
                      class="ma-2"
                      color="success"
                      outlined
                    >
                      <v-icon left>mdi-pencil</v-icon>
                      view
                    </v-chip>
                  </template>
                </v-card>
              </template>
            </td>
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
      reason: '',
      isFormValid: false,
      Delete: 'Delete',
      description: 'are you sure you want to delete this user',
      dialogEdit: false,
      dialog1: false,
      username: '',
      master: '',
      showPassword: false,
      privilege: '',
      application: '',
      password: '',
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      dialogDelete: false,
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Description', value: 'description' },
        { text: 'Url', value: 'url' },
        { text: 'Created At', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    allApis() {
      return this.$store.getters['api/allApis']
    },
    totalApi() {
      return this.$store.getters['api/totalApi']
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
      this.$store.dispatch('api/fetchApis')
    } catch (e) {
      return e
    }
  },
  methods: {
    async deleteApi(id) {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('api/deleteApi', id)
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.dialogDelete = false
      } catch (e) {
        return e
      }
    },
    goToAction(item) {
      this.$router.push({
        name: 'view-one-endpoint',
        params: { item }
      })
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
