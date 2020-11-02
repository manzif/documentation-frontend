<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="8">
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
                  https://app.mcash.rw/electricity/getMeterNumberDetails.php :
                  GET
                </h2>
                <v-divider></v-divider>
              </v-flex>
              <v-flex v-if="headers" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Headers
                </h3>
              </v-flex>
              <v-flex v-if="headers" xs12 sm12 md12 class="pb-3">
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
              <v-flex v-if="query" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Query Params
                </h3>
              </v-flex>
              <v-flex v-if="query" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="pa-5">
                  <h3 class="pb-1">
                    {
                  </h3>
                  <v-data-iterator :items="query" hide-default-footer>
                    <template v-slot:default="props">
                      <v-list-item
                        v-for="item in props.items"
                        :key="item.name"
                        class="px-6"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            >"{{ item.parameter }}" : "{{
                              item.value
                            }}"</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-data-iterator>
                  <h3>
                    }
                  </h3>
                </v-card>
              </v-flex>
              <v-flex v-if="body" xs12 sm12 md12 class="pb-1">
                <h3 class="pb-1">
                  Body
                </h3>
              </v-flex>
              <v-flex v-if="body" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="pa-5">
                  <h3 class="pb-1">
                    {
                  </h3>
                  <v-list-item
                    v-for="(item, i) in itemsResponse"
                    :key="i"
                    class="px-6"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        >"content-type" : "Application/Json"</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <h3>
                    }
                  </h3>
                </v-card>
              </v-flex>
              <v-flex xs12 sm12 md12 class="pb-3">
                <h2 class="headline black--text pb-1 font-weight-bold">
                  Expected Response
                </h2>
                <v-divider></v-divider>
              </v-flex>
              <v-flex v-if="success" xs12 sm12 md12>
                <p>
                  if the request was sucessfull you will receive response
                  similar to these below
                </p>
              </v-flex>
              <v-flex v-if="success" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="pa-5">
                  <h3 class="pb-1">
                    {
                  </h3>
                  <v-data-iterator :items="success" hide-default-footer>
                    <template v-slot:default="props">
                      <v-list-item
                        v-for="item in props.items"
                        :key="item.name"
                        class="px-6"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            >"{{ item.parameter }}" : "{{
                              item.value
                            }}"</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-data-iterator>
                  <h3>
                    }
                  </h3>
                </v-card>
              </v-flex>
              <v-flex v-if="failure" xs12 sm12 md12>
                <p>
                  if the request was not sucessfull you will receive response
                  similar to these below
                </p>
              </v-flex>
              <v-flex v-if="failure" xs12 sm12 md12 class="pb-3">
                <v-card color="#385F73" dark class="pa-5">
                  <h3 class="pb-1">
                    {
                  </h3>
                  <v-data-iterator :items="failure" hide-default-footer>
                    <template v-slot:default="props">
                      <v-list-item
                        v-for="item in props.items"
                        :key="item.name"
                        class="px-6"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            >"{{ item.parameter }}" : "{{
                              item.value
                            }}"</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-data-iterator>
                  <h3>
                    }
                  </h3>
                </v-card>
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
    type: '',
    query: [],
    url: '',
    headers: [],
    success: [],
    failure: [],
    items: [{ text: 'Real-Time', icon: 'mdi-star-four-points' }],
    itemsResponse: [
      {
        text: 'Real-Time',
        icon: 'mdi-star-four-points'
      },
      {
        text: 'Real',
        icon: 'mdi-star-four-points'
      },
      {
        text: 'Time',
        icon: 'mdi-star-four-points'
      }
    ]
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
      this.failure = this.$route.params.item.failure
      this.query = this.$route.params.item.query
      console.log('\n\n\n\n\n\n', this.$route.params.item.query)
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
</style>
