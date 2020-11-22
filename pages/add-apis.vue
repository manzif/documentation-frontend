<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="10">
        <v-container grid-list-md>
          <v-card text class="pa-7">
            <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
              <v-layout row wrap class="pa-5">
                <v-flex xs12 sm12 md12 class="pb-3">
                  <h2 class="headline black--text pb-1 font-weight-bold">
                    Create General API
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
                  <v-btn outlined grey @click="addHeaders"
                    >Add New Header</v-btn
                  >
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
                  <v-btn outlined grey @click="addQuery">Add New Query</v-btn>
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
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn outlined grey @click="addbodyDescription"
                    >Add New Description</v-btn
                  >
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
                        placeholder="Data Type"
                        dense
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md3>
                  <v-btn outlined grey @click="addsuccessDescription"
                    >Add New Description</v-btn
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
                    @click="createApi"
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
    headers: [{ parameter: '', value: '' }],
    query: [{ parameter: '', value: '' }],
    body: '',
    rows: [{ parameter: '', value: '' }],
    bodyDescription: [{ parameter: '', value: '' }],
    successDescription: [{ parameter: '', value: '' }],
    failureDescription: [{ parameter: '', value: '' }],
    bodyItem: '',
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
      this.rows.push({ parameter: '', value: '' })
    },
    addQuery() {
      this.query.push({ parameter: '', value: '' })
    },
    addHeaders() {
      this.headers.push({ parameter: '', value: '' })
    },
    addbodyDescription() {
      this.bodyDescription.push({ parameter: '', value: '' })
    },
    addsuccessDescription() {
      this.successDescription.push({ parameter: '', value: '' })
    },
    addfailureDescription() {
      this.failureDescription.push({ parameter: '', value: '' })
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createApi() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('api/createApi', {
          name: this.name,
          type: this.type,
          body: this.body,
          bodyDescription: this.bodyDescription,
          successDescription: this.successDescription,
          failureDescription: this.failureDescription,
          success: this.success,
          url: this.url,
          failure: this.failure,
          headers: this.headers,
          query: this.query,
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
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
