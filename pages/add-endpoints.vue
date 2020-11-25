<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8">
        <v-container grid-list-md>
          <v-card text class="pa-7">
            <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
              <v-layout row wrap class="pa-5">
                <v-flex xs12 sm12 md12 class="pb-3">
                  <h2 class="headline black--text pb-1 font-weight-bold">
                    Create API
                  </h2>
                  <div class="line"></div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="subtitle-1 grey--text pb-1">Name</div>
                  <v-text-field
                    v-model="name"
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
                  <div class="subtitle-1 grey--text pb-1">
                    Headers
                  </div>
                  <v-layout row v-for="row in headers" :key="row.id">
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
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="addHeaders"
                    ><v-icon center dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeRow('this.headers')"
                  >
                    <v-icon center dark> mdi-minus </v-icon></v-btn
                  >
                </v-flex>
                <v-flex xs12 md12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Query Parameters
                  </div>
                  <v-layout row v-for="row in query" :key="row.id">
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
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="addQuery"
                    ><v-icon center dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeRow('this.query')"
                  >
                    <v-icon center dark> mdi-minus </v-icon></v-btn
                  >
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Query Data description
                  </div>
                  <v-layout row v-for="row in queryDescription" :key="row.id">
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.parameter"
                        placeholder="Parameter"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.description"
                        placeholder="Data Description"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.value"
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="addqueryDescription"
                    ><v-icon center dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeRow('this.queryDescription')"
                  >
                    <v-icon center dark> mdi-minus </v-icon></v-btn
                  >
                </v-flex>
                <v-flex xs12 md12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Body
                  </div>
                  <v-textarea
                    v-model="body"
                    :placeholder="bodyPlace"
                    dense
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Body Data description
                  </div>
                  <v-layout row v-for="row in bodyDescription" :key="row.id">
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.parameter"
                        placeholder="Parameter"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.description"
                        placeholder="Data Description"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.value"
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="addbodyDescription"
                    ><v-icon center dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeRow('this.bodyDescription')"
                  >
                    <v-icon center dark> mdi-minus </v-icon></v-btn
                  >
                </v-flex>
                <v-flex xs12 md12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Sucess
                  </div>
                  <v-textarea
                    v-model="success"
                    :placeholder="bodyPlace"
                    dense
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Success Data description
                  </div>
                  <v-layout row v-for="row in successDescription" :key="row.id">
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.parameter"
                        placeholder="Parameter"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.description"
                        placeholder="Data Description"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.value"
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="addsuccessDescription"
                    ><v-icon center dark> mdi-plus </v-icon></v-btn
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeRow('this.successDescription')"
                  >
                    <v-icon center dark> mdi-minus </v-icon></v-btn
                  >
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Failure
                  </div>
                  <v-textarea
                    v-model="failure"
                    :placeholder="bodyPlace"
                    dense
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 md12>
                  <div class="subtitle-1 grey--text pb-1">
                    Failure Data description
                  </div>
                  <v-layout row v-for="row in failureDescription" :key="row.id">
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.parameter"
                        placeholder="Parameter"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.description"
                        placeholder="Data Description"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="row.value"
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn outlined grey @click="addfailureDescription"
                    >Add New Description</v-btn
                  >
                </v-flex>
                <v-flex xs12 12>
                  <v-btn
                    :disabled="!isFormValid"
                    :loading="isLoading"
                    @click="createEndpoint"
                    color="primary"
                    block
                    >Save</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    isFormValid: false,
    headers: [{ parameter: '', value: '', description: '' }],
    query: [{ parameter: '', value: '', description: '' }],
    queryDescription: [{ parameter: '', value: '', description: '' }],
    body: '',
    rows: [{ parameter: '', value: '', description: '' }],
    bodyItem: '',
    bodyDescription: [{ parameter: '', value: '', description: '' }],
    successDescription: [{ parameter: '', value: '', description: '' }],
    failureDescription: [{ parameter: '', value: '', description: '' }],
    type: '',
    failure: '',
    bodyPlace: JSON.stringify(
      {
        name: 'firstname',
        lastname: 'manzi',
        email: 'manzif60@gmail.com'
      },
      undefined,
      4
    ),
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
    success: '',
    url: '',
    lazy: false
  }),
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  },
  created() {
    try {
      if (
        !(this.authUser.role === 'admin' || this.authUser.role === 'developer')
      ) {
        this.$router.push('/')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    addRow() {
      this.rows.push({ parameter: '', value: '', description: '' })
    },
    addQuery() {
      this.query.push({ parameter: '', value: '', description: '' })
    },
    addqueryDescription() {
      this.queryDescription.push({ parameter: '', value: '', description: '' })
    },
    addHeaders() {
      this.headers.push({ parameter: '', value: '', description: '' })
    },
    addbodyDescription() {
      this.bodyDescription.push({ parameter: '', value: '', description: '' })
    },
    removeRow(item) {
      if (item === 'this.query') {
        if (this.query.length !== 1) {
          this.query.splice(this.query.length - 1)
        }
      } else if (item === 'this.bodyDescription') {
        if (this.bodyDescription.length !== 1) {
          this.bodyDescription.splice(this.bodyDescription.length - 1)
        }
      } else if (item === 'this.successDescription') {
        if (this.successDescription.length !== 1) {
          this.successDescription.splice(this.successDescription.length - 1)
        }
      } else if (item === 'this.failureDescription') {
        if (this.failureDescription.length !== 1) {
          this.failureDescription.splice(this.failureDescription.length - 1)
        }
      } else if (item === 'this.headers') {
        if (this.headers.length !== 1) {
          this.headers.splice(this.headers.length - 1)
        }
      } else if (item === 'this.queryDescription') {
        if (this.queryDescription.length !== 1) {
          this.queryDescription.splice(this.queryDescription.length - 1)
        }
      }
    },
    addsuccessDescription() {
      this.successDescription.push({
        parameter: '',
        value: '',
        description: ''
      })
    },
    addfailureDescription() {
      this.failureDescription.push({
        parameter: '',
        value: '',
        description: ''
      })
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createEndpoint() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        const applicationId = this.$route.params.applicationId
        await this.$store.dispatch('endpoint/createEndpoint', {
          name: this.name,
          type: this.type,
          body: this.body,
          bodyDescription: this.bodyDescription,
          queryDescription: this.queryDescription,
          successDescription: this.successDescription,
          failureDescription: this.failureDescription,
          success: this.success,
          url: this.url,
          failure: this.failure,
          headers: this.headers,
          query: this.query,
          description: this.description,
          applicationId
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
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
