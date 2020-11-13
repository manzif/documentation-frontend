<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-avatar size="45">
          <img src="~/static/images/defaultProfile.png" alt="John" />
        </v-avatar>

        <v-list-item-title>@{{ authUser.username }}</v-list-item-title>

        <v-btn @click.stop="mini = !mini" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-if="authUser.role === 'admin'" to="/admin/usersview">
          <v-list-item-icon>
            <v-icon>fa-users</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-group prepend-icon="fa-cog" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configurations</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Apps</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/user/user-apps">
              <v-list-item-content>
                <v-list-item-title>Create App</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/user/apps">
              <v-list-item-content>
                <v-list-item-title>View Apps</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Providers</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/user/user-providers">
              <v-list-item-content>
                <v-list-item-title>Choose Provider</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/user/providers">
              <v-list-item-content>
                <v-list-item-title>View Providers</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Operators</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/user/user-operator">
              <v-list-item-content>
                <v-list-item-title>Choose Operator</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/user/operators">
              <v-list-item-content>
                <v-list-item-title>View Operators</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group> -->
        <v-list-group prepend-icon="mdi-stack-exchange" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Apps</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/add-app">
            <v-list-item-content>
              <v-list-item-title>Create App</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="item in allApps"
            :key="item.title"
            @click="goToAction(item.id)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/view-apps">
            <v-list-item-content>
              <v-list-item-title>View all App</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-all-inclusive" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>General</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/add-apis">
            <v-list-item-content>
              <v-list-item-title>Add Api</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/view-apis">
            <v-list-item-content>
              <v-list-item-title>View Apis</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data() {
    return {
      drawer: true,
      urlImage: 'https://client-api.transax.rw/uploads/',
      itemss: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ],
      mini: true
    }
  },
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    allApps() {
      return this.$store.getters['app/allApps']
    }
  },
  created() {
    try {
      if (this.allApps.length === 0) {
        this.$store.dispatch('app/fetchApps')
      }
    } catch (e) {
      return e
    }
  },
  methods: {
    async goToAction(applicationId) {
      await this.$store.dispatch('endpoint/fetchEndpoints', applicationId)
      this.$router.push({
        name: 'app-admin',
        params: { applicationId }
      })
    }
  }
}
</script>
