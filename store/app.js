/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  apps: [],
  totalApp: ''
})

export const mutations = {
  GET_APPS(state, apps) {
    state.apps = apps
  },
  GET_TOTAL_APP: (state, totalApp) => {
    state.totalApp = totalApp
  }
}

export const actions = {
  async fetchApps({ commit }) {
    try {
      const { data } = await this.$axios.get('/applications/applications')
      commit('GET_APPS', data.Applications)
      commit('GET_TOTAL_APP', data.total)
    } catch (error) {
      if (error.response) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: error.response.data.message
        })
      }
    }
  },

  async createApp({ commit }, { title, description }) {
    try {
      const { data } = await this.$axios.post('applications', {
        title,
        description
      })
      if (data.message === 'Application successfully created') {
        await this.dispatch('app/fetchApps')
        await this.$router.push('/view-apps')
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: data.message
        })
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  },
  async deleteApp({ commit }, id) {
    try {
      const { data } = await this.$axios.delete(
        `/applications/applications/${id}`
      )
      this.dispatch('app/fetchApps')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: data.message
      })
    } catch (error) {
      if (error.response) {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'error',
          message: error.response.data.message
        })
      }
    }
  },
  async updateApp({ commit }, { id, title, description }) {
    try {
      const { data } = await this.$axios.patch(
        `/applications/applications/${id}`,
        {
          title,
          description
        }
      )
      if (data.message === 'Application updated successfuly') {
        this.dispatch('helper/showingMessage', {
          visible: true,
          type: 'success',
          message: data.message
        })
        await this.dispatch('app/fetchApps')
      }
    } catch (error) {
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  }
}

export const getters = {
  allApps(state) {
    return state.apps
  },
  totalApp(state) {
    return state.totalApp
  }
}
