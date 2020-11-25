/* eslint-disable no-console */
// import Cookie from 'js.cookie'

export const state = () => ({
  apis: [],
  totalApi: ''
})

export const mutations = {
  GET_APIS(state, apis) {
    state.apis = apis
  },
  GET_TOTAL_API: (state, totalApis) => {
    state.totalApi = totalApis
  }
}

export const actions = {
  async fetchApis({ commit }) {
    try {
      const { data } = await this.$axios.get('/apis/apis')
      commit('GET_APIS', data.Apis)
      commit('GET_TOTAL_API', data.total)
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

  // async deleteApi({ commit }, id) {
  //   try {
  //     await this.$axios.delete(`/apis/${id}`)
  //     this.dispatch('helper/showingMessage', {
  //       visible: true,
  //       type: 'success',
  //       message: 'You have successfully deleted an API'
  //     })

  //     this.dispatch('users/fetchUsers')
  //   } catch (e) {
  //     return e
  //   }
  // },

  async editUser({ commit }, { id, userData }) {
    try {
      await this.$axios.patch(`/users/${id}`, {
        ...userData
      })
      this.dispatch('users/fetchUsers')
    } catch (e) {
      return e
    }
  },
  async createApi(
    { commit },
    {
      name,
      description,
      type,
      body,
      url,
      bodyDescription,
      queryDescription,
      successDescription,
      failureDescription,
      success,
      failure,
      headers,
      query
    }
  ) {
    try {
      const { data } = await this.$axios.post('apis', {
        name,
        description,
        url,
        body,
        bodyDescription,
        queryDescription,
        successDescription,
        failureDescription,
        type,
        success,
        headers,
        query,
        failure
      })
      if (data.message === 'Api successfully created') {
        this.dispatch('api/fetchApis')
        await this.$router.push('/view-apis')
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
  async deleteApi({ commit }, id) {
    try {
      const { data } = await this.$axios.delete(`/apis/apis/${id}`)
      await this.dispatch('api/fetchApis')
      this.dispatch('helper/showingMessage', {
        visible: true,
        type: 'success',
        message: data.message
      })
    } catch (e) {
      return e
    }
  }
}

export const getters = {
  allApis(state) {
    return state.apis
  },
  totalApi(state) {
    return state.totalApi
  }
}
