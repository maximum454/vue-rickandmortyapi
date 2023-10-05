<template>
	<div class="home">
		<header class="header">
			<h1 class="header__title">The Rick and Morty API</h1>
		</header>
		<div class="table-scroll">
			<table class="table">
			<thead>
			<tr>
				<th scope="col" class="sort" @click="sortHandler('id')">Id</th>
				<th scope="col">Аватар</th>
				<th scope="col" class="sort" @click="sortHandler('name')">Имя</th>
				<th scope="col" class="sort" @click="sortHandler('gender')">Пол</th>
				<th scope="col">Происхождение</th>
				<th scope="col" class="sort" @click="sortHandler('status')">Статус персонажа</th>
				<th scope="col">Тип или подвид</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in sortCharacters" :key="item.id">
				<td>{{ item.id }} </td>
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

		<div class="pagination">
			<div class="pagination__body">
				<div class="pagination__item prev" @click="changePage(pages.prev)">Пред.</div>
				<div class="pagination__item" v-for="page in pages.pages" @click="NumPage(page)">
					{{page}}
				</div>
				<div class="pagination__item next" @click="changePage(pages.next)">След.</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'

export default {
	name: 'HomeView',
	components: {},
	setup() {
		const store = useStore();
		const columns = [
			{name: 'id', title: '#', type: 'number'},
			{name: 'image', title: 'Аватар', type: 'string'},
			{name: 'name', title: 'Имя', type: 'string'},
			{name: 'gender', title: 'Пол', type: 'string'},
			{name: 'species', title: 'Происхождение', type: 'string'},
			{name: 'status', title: 'Статус персонажа', type: 'string'},
			{name: 'type', title: 'Тип или подвид', type: 'string'},
		];
		const sortField = ref('id')
		const typeSort = ref('asc')
		const pagesCount = ref(null)


		const allCharacters = computed(() => store.getters.getCharacter);

		const sortCharacters = computed(() => {
			return allCharacters.value.sort((a, b) => {
				let mod = 1;
				if (typeSort.value === 'desc') {
					mod = -1
				}
				if (a[sortField.value] < b[sortField.value]) {
					return -1 * mod
				}
				if (a[sortField.value] > b[sortField.value]) {
					return 1 * mod
				}
				return 0
			})
		})

		const pages = computed(() => store.getters.getPage);

		const NumPage = (page) => {
			store.dispatch('fetchCharacter', page)
		}

		const changePage = (url) => {
			console.log(url)
			if(url === null) return false
			const urlP = new URL(url).searchParams.get('page')
			store.dispatch('fetchCharacter', urlP)
		}


		const sortHandler = (name) => {
			if(sortField.value === name){
				if(typeSort.value === 'asc'){
					typeSort.value = 'desc'
				}else{
					typeSort.value = 'asc'
				}
			}else{
				sortField.value = name
			}
		}

		onMounted(() => {
			store.dispatch('fetchCharacter')
		})

		return {
			allCharacters,
			sortCharacters,
			sortHandler,
			pages,
			NumPage,
			changePage,
			columns
		}
	}
}
</script>

<style scoped lang="scss">
.table-scroll{
	overflow: auto;
}
.table {
	max-width: 900px;
	margin: 30px auto;
	overflow: hidden;
	&__avatar {
		max-width: 70px;
		display: block;
	}
	thead{
		.sort{
			position: relative;
			padding-right: 30px;
			cursor: pointer;
			transition: all .3s ease;
			&:after{
				content: '';
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(0,-50%);
				background-image: url("@/assets/bx-sort-alt-2.svg.svg");
				background-size: 100% 100%;
				width: 16px;
				height: 16px;

			}
			&:hover{
				opacity: .6;
				transition: all .3s ease;
			}
		}
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
