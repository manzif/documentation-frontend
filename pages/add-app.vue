<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">
            Create Apps.
          </h2>
          <div class="line"></div>
          <h4 class="my-6">
            At this page you can create applications. Within applications you
            can different APIs related to them. Only Admin and developers are
            allowed to create, edit, and delete applications.
          </h4>
          <v-btn class="" color="#0087ff" outlined to="/view-apps" nuxt
            ><v-icon>mdi-play</v-icon> See all applications</v-btn
          >
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Create App
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="title"
                :rules="[(v) => !!v || 'Title is required']"
                label="Title"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="description"
                :rules="[(v) => !!v || 'Description is required']"
                label="Description"
                required
                dense
                single-line
                outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-btn
                @click="createApp"
                :loading="isLoading"
                :disabled="isDisabled"
                color="primary"
                block
                >Create</v-btn
              >
            </v-flex>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      isFormValid: false,
      lazy: false,
      description: ''
    }
  },
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
    async createApp() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('app/createApp', {
          title: this.title,
          description: this.description
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
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
.line {
  width: 63px;
  border-bottom: 5px solid #0087ff;
  position: absolute;
}
</style>
