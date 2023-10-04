export default {
    state: {
        character:[]
    },
    getters: {
        getCharacter(state) {
            return state.character
        },
    },
    mutations: {
        updateCharacter(state, character){
            state.character = character
        }

    },
    actions: {
        async fetchCharacter(ctx, name, status, species, type, gender) {
            const res = await fetch(`https://rickandmortyapi.com/api/character?name=rick&status=alive`)
            const characters = await res.json();
            ctx.commit('updateCharacter', characters.results)
        },
    },
}