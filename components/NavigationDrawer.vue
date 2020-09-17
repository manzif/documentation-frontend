<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-avatar size="65">
          <img src="~/static/images/defaultProfile.png" alt="John" />
        </v-avatar>

        <v-list-item-title>@{{ authUser.username }}</v-list-item-title>

        <v-btn @click.stop="mini = !mini" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-if="authUser.privilege === 1"
          prepend-icon="fa-cog"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin-config</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Currency</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/admin/app-currency">
              <v-list-item-content>
                <v-list-item-title>Create Currency</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/admin/currency">
              <v-list-item-content>
                <v-list-item-title>View Currency</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Providers</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item to="/admin/app-provider">
              <v-list-item-content>
                <v-list-item-title>Create Provider</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/admin/providers">
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
            <v-list-item to="/admin/app-operator">
              <v-list-item-content>
                <v-list-item-title>Create Operator</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/admin/operators">
              <v-list-item-content>
                <v-list-item-title>View Operators</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-list-item v-if="authUser.role === 'admin'" to="/admin/usersview">
          <v-list-item-icon>
            <v-icon>fa-users</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="authUser.role === 'admin'" to="/emails">
          <v-list-item-icon>
            <v-icon>fa-envelope</v-icon>
          </v-list-item-icon>
          <v-list-item-content prepend-icon="mdi-home-city">
            <v-list-item-title>Emails</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="fa-cog" no-action>
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
        </v-list-group>
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
          <v-list-item to="/view-apps">
            <v-list-item-content>
              <v-list-item-title>View Apps</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="fa-key" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Keys</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/user/user-keys">
            <v-list-item-content>
              <v-list-item-title>Generate Key</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/user/keys">
            <v-list-item-content>
              <v-list-item-title>View Keys</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
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
    isComplete() {
      return this.$store.getters['users/isComplete']
    },
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    userProfile() {
      return this.$store.getters['users/userProfile']
    }
  }
}
</script>
