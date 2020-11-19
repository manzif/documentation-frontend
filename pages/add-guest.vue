<template>
  <v-container fill-height fluid>
    <div class="mx-12">
      <v-row align="center" justify="center">
        <v-col cols="12" md="7" sm="6">
          <h2 class="pb-1" color="#0087ff">
            Add a Guest.
          </h2>
          <div class="line"></div>
          <h4 class="my-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut,
            suscipit a. Debitis placeat asperiores corrupti dolores? Vel
            voluptatibus aut animi, quas doloribus, itaque molestiae ipsum
            officia at natus mollitia iure?
          </h4>
          <v-btn class="" color="#0087ff" outlined to="/admin/usersview" nuxt
            ><v-icon>mdi-play</v-icon> See all available users</v-btn
          >
        </v-col>
        <v-col cols="12" md="5" sm="6">
          <v-form ref="form" v-model="isFormValid" :lazy-validation="lazy">
            <v-flex xs12 md12 class="pb-7">
              <h2 class="headline black--text pb-1 font-weight-bold">
                Add Guest
              </h2>
              <div class="line"></div>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-if="allUsers"
                v-model="userId"
                :rules="[(v) => !!v || 'Name is required']"
                :items="allUsers"
                item-text="lastname"
                item-value="id"
                label="FirstName"
                dense
                outlined
              ></v-select>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-if="allApps"
                v-model="assignedItems"
                :rules="[(v) => !!v || 'App is required']"
                :items="allApps"
                item-text="title"
                item-value="id"
                label="App"
                dense
                outlined
              ></v-select>
            </v-flex>
            <v-flex xs12 md12>
              <v-btn
                @click="addGuest"
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
      assignedItems: [],
      userId: '',
      lazy: false,
      isFormValid: false
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters['users/allUsers']
    },
    allApps() {
      return this.$store.getters['app/allApps']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    },
    isDisabled() {
      return this.$store.getters['helper/isDisabled']
    }
  },
  methods: {
    async addGuest() {
      this.$store.dispatch('helper/loading')
      this.$store.dispatch('helper/disabling')
      try {
        await this.$store.dispatch('users/editUser', {
          assignedItems: this.assignedItems,
          id: this.userId
        })
        this.$store.dispatch('helper/loading')
        this.$store.dispatch('helper/disabling')
        this.assignedItems = null
        this.userId = null
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
