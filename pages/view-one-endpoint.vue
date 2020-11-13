<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" sm="8">
        <v-container grid-list-md>
          <v-card text class="pa-10" flat>
            <v-layout row wrap class="pa-5">
              <v-flex xs12 sm12 md12 class="pb-3">
                <h2 class="headline black--text pb-1 font-weight-bold">
                  {{ name }}
                </h2>
              </v-flex>
              <v-flex xs12 sm12 md12 class="pb-3">
                <p class="pb-1">
                  {{ description }}
                </p>
              </v-flex>
              <v-flex xs12 sm12 md12 class="pb-3">
                <h2 class="headline black--text pb-1 font-weight-bold">
                  {{ url }} : {{ type }}
                </h2>
                <v-divider></v-divider>
              </v-flex>
              <v-flex v-if="headers[0].parameter" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Headers
                </h3>
              </v-flex>
              <v-flex v-if="headers[0].parameter" xs12 sm12 md12 class="pb-3">
                <v-data-iterator :items="headers" hide-default-footer>
                  <template v-slot:default="props">
                    <v-list-item
                      v-for="item in props.items"
                      :key="item.name"
                      class="pa-0"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-star-four-points</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ item.parameter }}: {{ item.value }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-data-iterator>
              </v-flex>
              <v-flex v-if="query[0].parameter" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Query Params
                </h3>
              </v-flex>
              <v-flex
                v-if="query[0].parameter !== null"
                xs12
                sm12
                md12
                class="pb-3"
              >
                <template>
                  <v-data-table
                    :headers="headersQuery"
                    :items="query"
                    :items-per-page="5"
                    hide-default-footer
                    item-key="name"
                    class="elevation-2"
                  ></v-data-table>
                </template>
              </v-flex>
              <v-flex v-if="body" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Body
                </h3>
              </v-flex>
              <v-flex v-if="body" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="px-5 pt-5 pb-0">
                  <v-textarea
                    id="custom-placeholer-color"
                    :placeholder="body"
                    filled
                    disabled
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-card>
              </v-flex>
              <v-flex
                v-if="bodyDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-1"
              >
                <h3 class="pb-1">
                  Body Data Description
                </h3>
              </v-flex>
              <v-flex
                v-if="bodyDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-3"
              >
                <template>
                  <v-data-table
                    :headers="headersDescrition"
                    :items="bodyDescription"
                    :items-per-page="5"
                    hide-default-footer
                    item-key="name"
                    class="elevation-2"
                  ></v-data-table>
                </template>
              </v-flex>
              <v-flex xs12 sm12 md12 class="pb-3">
                <h2 class="headline black--text pb-1 font-weight-bold">
                  Expected Response
                </h2>
                <v-divider></v-divider>
              </v-flex>
              <v-flex v-if="success" xs12 sm12 md12>
                <p>
                  if the request was successfull you will receive response
                  similar to these below
                </p>
              </v-flex>
              <v-flex v-if="success" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="px-5 pt-5 pb-0">
                  <v-textarea
                    id="custom-placeholer-color"
                    :placeholder="success"
                    filled
                    disabled
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-card>
              </v-flex>
              <v-flex
                v-if="successDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-1"
              >
                <h3 class="pb-1">
                  Success Data Description
                </h3>
              </v-flex>
              <v-flex
                v-if="successDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-3"
              >
                <template>
                  <v-data-table
                    :headers="headersDescrition"
                    :items="successDescription"
                    :items-per-page="5"
                    hide-default-footer
                    item-key="name"
                    class="elevation-2"
                  ></v-data-table>
                </template>
              </v-flex>
              <v-flex v-if="failure" xs12 sm12 md12>
                <p>
                  if the request was not successfull you will receive response
                  similar to these below
                </p>
              </v-flex>
              <v-flex v-if="failure" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="px-5 pt-5 pb-0">
                  <v-textarea
                    id="custom-placeholer-color"
                    :placeholder="failure"
                    filled
                    disabled
                    auto-grow
                    single-line
                    outlined
                  ></v-textarea>
                </v-card>
              </v-flex>
              <v-flex
                v-if="failureDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-1"
              >
                <h3 class="pb-1">
                  Failure Data Description
                </h3>
              </v-flex>
              <v-flex
                v-if="failureDescription[0].parameter"
                xs12
                sm12
                md12
                class="pb-3"
              >
                <template>
                  <v-data-table
                    :headers="headersDescrition"
                    :items="failureDescription"
                    :items-per-page="5"
                    hide-default-footer
                    item-key="name"
                    class="elevation-2"
                  ></v-data-table>
                </template>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    name: '',
    description: '',
    headersQuery: [
      {
        text: 'Parameter',
        align: 'start',
        value: 'parameter'
      },
      { text: 'Values', value: 'value' }
    ],
    headersDescrition: [
      {
        text: 'Parameter',
        align: 'start',
        value: 'parameter'
      },
      { text: 'Data Type', value: 'value' }
    ],
    query: [{ parameter: '', value: '' }],
    bodyDescription: [{ parameter: '', value: '' }],
    successDescription: [{ parameter: '', value: '' }],
    failureDescription: [{ parameter: '', value: '' }],
    url: '',
    headers: [{ parameter: '', value: '' }],
    body: {},
    test: '',
    success: {},
    failure: {}
  }),
  created() {
    if (this.$route.params.item === undefined) {
      this.$router.push('/')
    } else {
      this.name = this.$route.params.item.name
      this.description = this.$route.params.item.description
      this.type = this.$route.params.item.type
      this.url = this.$route.params.item.url
      this.headers = this.$route.params.item.headers
      this.success = this.$route.params.item.success
      this.bodyDescription = this.$route.params.item.bodyDescription
      this.successDescription = this.$route.params.item.successDescription
      this.failureDescription = this.$route.params.item.failureDescription
      this.failure = this.$route.params.item.failure
      this.query = this.$route.params.item.query
      this.body = this.$route.params.item.body
    }
  }
}
</script>
<style>
.disable-events {
  pointer-events: none;
}
.create-center {
  text-align: center;
}
#custom-placeholer-color {
  color: red !important;
  opacity: 1;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 15px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 15px !important;
}
</style>
