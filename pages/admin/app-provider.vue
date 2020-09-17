<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row justify="center" align="center">
        <v-col cols="12" md="5" sm="6">
          <v-item>
            <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
              <v-layout row wrap class="pa-5">
                <v-flex xs12 md12 class="pb-7">
                  <h2 class="headline black--text pb-1 font-weight-bold">
                    Create Provider
                  </h2>
                  <div class="line"></div>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="name"
                    :rules="[(v) => !!v || 'Name is required']"
                    label="Name"
                    required
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="description"
                    label="Description"
                    dense
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 12>
                  <v-btn
                    @click="createProvider"
                    :loading="isLoading"
                    :disabled="isDisabled"
                    color="primary"
                    block
                    >Create</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-form>
          </v-item>
        </v-col>
        <v-col cols="12" md="7" sm="6">
          <v-item>
            <v-layout row wrap class="pa-5">
              <v-flex xs12 md12 class="pb-2">
                <h2 class="pb-1" color="#0087ff">
                  Create Provider to be used on transactions.
                </h2>
                <div class="line"></div>
                <h4 class="my-6">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  suscipit a. Debitis placeat asperiores corrupti dolores? Vel
                  voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
                  officia at natus mollitia iure?
                </h4>
                <v-btn
                  class=""
                  color="#0087ff"
                  outlined
                  to="/admin/providers"
                  nuxt
                  ><v-icon>mdi-play</v-icon> See all available providers</v-btn
                >
              </v-flex>
            </v-layout>
          </v-item>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      isFormValid: false,
      description: '',
      myImage: require('~/static/images/provider.png'),
      typeItems: ['web app', 'mobile app', 'desktop app']
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  methods: {
    async createProvider() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('admin/createProvider', {
          name: this.name,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.name = null
        this.description = null
      } catch (e) {
        return e
      }
    }
  }
}
</script>
<style scoped>
.line {
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
