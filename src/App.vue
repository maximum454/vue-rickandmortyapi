<template>
	<div class="container">
		<nav>
			<router-link to="/">Главная</router-link>
			|
			<router-link to="/about">О Заданий</router-link>
		</nav>
		<router-view/>
		<footer class="footer">
			Karachyov Maxim
		</footer>
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
.footer{
	background-color: rgb(39, 43, 51);
	padding: 20px;
	margin: 0 -20px;
	color: #ffffff;
	font-size: 16px;
}
</style>
