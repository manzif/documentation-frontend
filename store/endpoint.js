/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  endpoints: [],
  errorMessage: '',
  totalEndpoint: ''
})

export const mutations = {
  GET_ENDPOINTS(state, endpoints) {
    state.endpoints = endpoints
  },
  GET_ERROR_MESSAGE: (state, message) => {
    state.errorMessage = message
  },
  GET_TOTAL_ENDPOINT: (state, totalEndpoint) => {
    state.totalEndpoint = totalEndpoint
  }
}

export const actions = {
  async fetchEndpoints({ commit }, applicationId) {
    try {
      const { data } = await this.$axios.get(`/endpoints/${applicationId}`)
      commit('GET_ENDPOINTS', data.Endpoints)
      commit('GET_TOTAL_ENDPOINT', data.total)
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

  async deleteApi({ commit }, id) {
    try {
      const { data } = await this.$axios.delete(`/endpoints/endpoints/${id}`)
      this.dispatch('endpoint/fetchEndpoints', id)
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: data.message
      })
    } catch (e) {
      return e
    }
  },

  async createEndpoint(
    { commit },
    {
      name,
      description,
      type,
      body,
      url,
      bodyDescription,
      successDescription,
      failureDescription,
      success,
      failure,
      headers,
      query,
      applicationId
    }
  ) {
    try {
      const { data } = await this.$axios.post(`endpoints/${applicationId}`, {
        name,
        description,
        url,
        body,
        bodyDescription,
        successDescription,
        failureDescription,
        type,
        success,
        headers,
        query,
        failure
      })
      if (data.message === 'Endpoint successfully created') {
        this.dispatch('endpoint/fetchEndpoints', applicationId)
        await this.$router.push('/view-endpoints')
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
        '/applications/applications',
        id
      )
      this.dispatch('app/fetchApps')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: data.message
      })
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
  allEndpoints(state) {
    return state.endpoints
  },
  errorMessage(state) {
    return state.errorMessage
  },
  totalEndpoint(state) {
    return state.totalEndpoint
  }
}
