export default {
    state: {
        character:[],
        page: []
    },
    getters: {
        getCharacter(state) {
            return state.character
        },
        getPage(state) {
            return state.page
        },
    },
    mutations: {
        updateCharacter(state, character){
            state.character = character
        },
        updatePage(state, page){
            state.page = page
        }

    },
    actions: {
        async fetchCharacter(ctx,page = 1) {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            const characters = await res.json();
            ctx.commit('updateCharacter', characters.results)
            ctx.commit('updatePage', characters.info)
        },
    },
}