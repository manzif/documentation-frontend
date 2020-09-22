<template>
  <div>
    <VSubHeader header="Quick actions" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row align="center" justify="center">
          <v-col v-if="authUser.role === 'admin'" cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>fa-user-secret</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Create Admin
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create admin
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/admin/register')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Create</span>
                    <v-icon right small>fa-user-secret</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col v-if="authUser.role === 'developer'" cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>mdi-application</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Create App
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create an app
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/add-app')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Create</span>
                    <v-icon right small>mdi-application</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col v-if="authUser.role === 'admin'" cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>fa-user-tie</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Create Developer
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create a developer
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/admin/add-developer')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Create</span>
                    <v-icon right small>fa-user-tie</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col v-if="authUser.role === 'admin'" cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>fa-user-plus</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  Create Guest
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create a guest
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/admin/add-guest')"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>Create</span>
                    <v-icon right small>fa-user-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
          <v-col v-if="authUser.role === 'developer'" cols="12" md="3" sm="6">
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
                  Add Endpoint
                </v-row>

                <v-card-text class="text-center">
                  Use this action to create an endpoint
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/add-endpoints')"
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
          <v-col v-if="authUser.role === 'admin'" cols="12" md="3" sm="6">
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
                  View Users
                </v-row>

                <v-card-text class="text-center">
                  Use this action to view all available users
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction('/admin/usersview')"
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
        name: ' Create Admin',
        punchline: 'Create',
        description: 'Use this action to create an admin',
        action: '/admin/register',
        icon: 'fa-user-secret'
      },
      {
        name: 'Create Developer',
        punchline: 'Create',
        description: 'Use this action to create a developer',
        action: '/admin/add-developer',
        icon: 'fa-user-tie'
      },
      {
        name: 'Create Guest',
        punchline: 'Create',
        description: 'Use this action to create a guest for mobi-documentatin',
        action: '/admin/add-guest',
        icon: 'fa-user-plus'
      },
      {
        name: 'View Users',
        punchline: 'View',
        description: 'Use this action to view all available users',
        action: '/admin/usersview',
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
      console.log(this)
      this.$router.push(action)
    }
  }
}
</script>

<style></style>
