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
            Body
          </v-tab>
          <v-tab>
            Success
          </v-tab>
          <v-tab>
            Failure
          </v-tab>
          <v-tab>
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
            <v-card flat class="v-tabs__content_test">
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
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
                  <v-btn outlined grey @click="addQuery"
                    >Add New parameter</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content_test">
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
                  <v-layout row v-for="row in bodies" :key="row.id">
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
                  <v-btn outlined grey @click="addBodies"
                    >Add New parameter</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content_test">
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
                  <v-layout row v-for="row in success" :key="row.id">
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
                  <v-btn outlined grey @click="addSuccess"
                    >Add New parameter</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat class="v-tabs__content_test">
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
                  <v-layout row v-for="row in failure" :key="row.id">
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
                  <v-btn outlined grey @click="addFailure"
                    >Add New parameter</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-layout row class="pa-5">
                <v-flex xs12 md12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 md6>
                  <v-btn @click="createEndpoint" color="primary" block
                    >Create</v-btn
                  >
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
        </v-tabs>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    query: [{ parameter: '', value: '' }],
    bodies: [{ parameter: '', value: '' }],
    success: [{ parameter: '', value: '' }],
    failure: [{ parameter: '', value: '' }],
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
    addQuery() {
      this.query.push({ parameter: '', value: '' })
    },
    addBodies() {
      this.bodies.push({ parameter: '', value: '' })
    },
    addSuccess() {
      this.success.push({ parameter: '', value: '' })
    },
    addFailure() {
      this.failure.push({ parameter: '', value: '' })
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async createEndpoint() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('endpoint/createEndpoint', {
          name: this.name,
          type: this.type,
          body: this.bodies,
          query: this.query,
          success: this.success,
          failure: this.failure,
          url: this.url,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.name = null
        this.type = null
        this.url = null
        this.bodies = [{ parameter: '', value: '' }]
        this.success = [{ parameter: '', value: '' }]
        this.failure = [{ parameter: '', value: '' }]
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
.v-tabs__content_test {
  min-height: 70vh;
}
</style>
