const state = () => {
    return {
        name : 'moduleA'
    }
}
const mutations = {
    SET_NAME : (state, name) => {
        state.name = name
    }
}
const getters = {
    name : (state) =>{
        return state.name
    }
}
const actions = {
    getName : (context) =>{
        context.commit('SET_NAME', 'my name')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}