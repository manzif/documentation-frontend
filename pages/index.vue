<template>
  <div>
    <SuccessAlert />

    <VSubHeader header="Quick actions" />
    <v-item-group active-class="secondary">
      <div class="mx-md-12">
        <v-row>
          <v-col v-for="n in pageActions" :key="n.name" cols="12" md="3" sm="6">
            <v-item>
              <v-card :ripple="false" class="pa-6">
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  <v-icon color="primary" large>{{ n.icon }}</v-icon>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                  class="ma-2 primary--text font-weight-black"
                >
                  {{ n.name }}
                </v-row>

                <v-card-text class="text-center">
                  {{ n.description }}
                </v-card-text>
                <v-card-actions class="white justify-center">
                  <v-btn
                    :loading="false"
                    :disabled="false"
                    @click="goToAction(n.action)"
                    color="primary"
                    class="ma-2 white--text"
                  >
                    <span>{{ n.punchline }}</span>
                    <v-icon right small>{{ n.icon }}</v-icon>
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
        description: 'Use this action to create a super admin',
        action: '/admin/register',
        icon: 'fa-user-secret'
      },
      {
        name: 'Create Developer',
        punchline: 'Create',
        description: 'Use this action to create an Aggregator manager admin',
        action: '/admin/add-developer',
        icon: 'fa-user-tie'
      },
      {
        name: 'Create Guest',
        punchline: 'Create',
        description: 'Use this action to create an Aggregator client',
        action: '/admin/add-guest',
        icon: 'fa-user-plus'
      },
      {
        name: 'View Users',
        punchline: 'View',
        description: 'Use this action to view Aggregator clients',
        action: '/admin/usersview',
        icon: 'fa-users'
      }
    ]
  }),
  methods: {
    goToAction(action) {
      console.log(this)
      this.$router.push(action)
    }
  }
}
</script>

<style></style>
