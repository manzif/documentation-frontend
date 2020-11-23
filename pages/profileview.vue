<template>
  <v-container grid-list-md>
    <div class="mb-4 create-center">
      <v-btn class="disable-events" rounded x-large dark block color="indigo"
        ><v-icon outlined class="mr-10">mdi-account-circle-outline </v-icon>View
        {{ authUser.username }}<v-spacer></v-spacer
        ><v-icon>fa-question</v-icon></v-btn
      >
    </div>
    <v-item-group active-class="secondary">
      <v-layout row wrap class="pa-2">
        <v-flex xs12 md4>
          <v-card :ripple="false" class="pa-1">
            <div class="create-center mb-1">
              <v-avatar size="195" class="mb-1">
                <img src="~/static/images/defaultProfile.png" alt="John" />
              </v-avatar>
              <v-list-item-content class="pb-0 mb-0">
                <h4 class="mb-1">@{{ authUser.username }}</h4>
              </v-list-item-content>
            </div>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
              <v-dialog v-model="dialogEdit" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" color="primary" block outlined rounded>
                    <v-icon left>mdi-pencil</v-icon>
                    change Password
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="mb-6">
                    <v-spacer />
                    <h3 class="headline">Edit {{ authUser.username }} info</h3>
                    <v-progress-linear
                      :active="isProgressLoader"
                      :indeterminate="isProgressLoader"
                      absolute
                      bottom
                      color="primary"
                    ></v-progress-linear>
                    <v-spacer />
                  </v-toolbar>

                  <v-card-text class="pb-0">
                    <v-form v-model="isFormValid">
                      <v-layout align-center justify-center>
                        <v-flex xs12 sm8>
                          <v-text-field
                            id="password"
                            ref="password"
                            v-model="oldPassword"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="
                              showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                            name="Password"
                            label="Old Password"
                            required
                            dense
                            outlined
                          />
                          <v-text-field
                            id="password"
                            ref="password"
                            v-model="newPassword"
                            :type="viewPassword ? 'text' : 'password'"
                            :append-icon="
                              viewPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="viewPassword = !viewPassword"
                            name="Password"
                            label="New Password"
                            required
                            dense
                            outlined
                          />
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-card-actions class="justify-center">
                        <v-btn @click="dialogEdit = false" color="cancel">
                          Cancel</v-btn
                        >
                        <v-btn
                          @click="editUser(authUser.id)"
                          :disabled="!isFormValid"
                          color="success"
                          >Save</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <v-card :ripple="false" class="pa-1" max-height="600">
            <v-layout row wrap class="pa-5">
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  FirstName
                </div>
                <v-text-field
                  :label="authUser.firstname"
                  disabled
                  dense
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  LastName
                </div>
                <v-text-field
                  :label="authUser.lastname"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Email
                </div>
                <v-text-field
                  :label="authUser.email"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <div class="subtitle-1 grey--text text--primary pb-1">
                  Username
                </div>
                <v-text-field
                  :label="authUser.username"
                  dense
                  disabled
                  single-line
                  outlined
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-item-group>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialogEdit: false,
      isFormValid: false,
      username: '',
      firstname: '',
      oldPassword: '',
      newPassword: '',
      viewPassword: false,
      showPassword: false,
      lastname: '',
      password: '',
      email: ''
    }
  },
  computed: {
    authUser() {
      return this.$store.getters['users/loggedInUser']
    },
    isProgressLoader() {
      return this.$store.getters['helper/isProgressLoader']
    },
    userProfile() {
      return this.$store.getters['users/userProfile']
    },
    isLoading() {
      return this.$store.getters['helper/isLoading']
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async editUser(id) {
      this.$store.dispatch('helper/isProgressLoader')
      try {
        await this.$store.dispatch('users/updatePassword', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          id
        })
        this.$store.dispatch('helper/isProgressLoader')
        this.dialogEdit = false
        this.oldPassword = null
        this.newPassword = null
      } catch (e) {
        return e
      }
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
