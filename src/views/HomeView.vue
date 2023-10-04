<template>
	<div class="home">
		<header class="header">
			<h1 class="header__title">The Rick and Morty API</h1>
		</header>
		<table class="table">
			<thead>
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Аватар</th>
				<th scope="col" @click="sortField('name')">Имя</th>
				<th scope="col" @click="sortField('gender')">Пол</th>
				<th scope="col" @click="sortField('species')">Происхождение</th>
				<th scope="col">Статус персонажа</th>
				<th scope="col">Тип или подвид</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in allCharacters">
				<td>{{ item.id }}</td>
				<td><img class="table__avatar img-fluid" :src="item.image" width="300" height="300" alt=""></td>
				<td>{{ item.name }}</td>
				<td>{{ item.gender }}</td>
				<td>{{ item.species }}</td>
				<td>{{ item.status }}</td>
				<td>{{ item.type }}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
// @ is an alias to /src
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

export default {
	name: 'HomeView',
	components: {},
	setup() {
		const store = useStore();
		const columns = [
			{ name:   'id', title:    '#', type: 'number' },
			{ name: 'image', title: 'Аватар', type: 'string' },
			{ name: 'name', title: 'Имя', type: 'string' },
			{ name: 'gender', title: 'Пол', type: 'string' },
			{ name: 'species', title: 'Происхождение', type: 'string' },
			{ name: 'status', title: 'Статус персонажа', type: 'string' },
			{ name: 'type', title: 'Тип или подвид', type: 'string' },
		];

		const allCharacters = computed(() => store.getters.getCharacter)

		function sortField(field){
			allCharacters.value = allCharacters.value.name.sort()
		}

		onMounted(() => {
			store.dispatch('fetchCharacter')
		})

		return {
			allCharacters,
			sortField,
			columns
		}
	}
}
</script>

<style scoped lang="scss">
.table {
	max-width: 900px;
	margin: 30px auto;

	&__avatar {
		max-width: 70px;
		display: block;
	}

	tbody {
		tr {
			vertical-align: middle;

			&:nth-child(even) {
				background-color: rgba(#2c3e50, .2);
			}
		}
	}
}
</style>
