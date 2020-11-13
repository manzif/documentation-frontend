<template>
  <div>
    <VSubHeader header="Quick actions" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row align="center" justify="center">
          <v-col
            v-if="authUser.role === 'developer' || authUser.role === 'admin'"
            cols="12"
            md="3"
            sm="6"
          >
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>fa-fast-forward</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Add API
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create an endpoint
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('add-endpoints')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Create</span>
                    <v-icon right small>fa-fast-forward</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>fa-users</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  View APIs
                </v-row>

                <v-card-text class="text-center">
                  Use this action to view all available APIs
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('view-endpoints')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>View</span>
                    <v-icon right small>fa-users</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </div>
    </v-item-group>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    pageActions: [
      {
        name: 'Create API',
        punchline: 'Create',
        description: 'Use this action to create a APIs',
        action: '/admin/add-guest',
        icon: 'fa-user-plus'
      },
      {
        name: 'View APIs',
        punchline: 'View',
        description: 'Use this action to view all available APIs',
        action: '/view-endpoints',
        icon: 'fa-users'
      }
    ]
  }),
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    }
  },
  methods: {
    goToAction(action) {
      const applicationId = this.$route.params.applicationId
      this.$router.push({
        name: action,
        params: { applicationId }
      })
    }
  }
}
</script>

<style></style>
