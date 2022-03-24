<template>
	<div>
		<the-navigation-bar></the-navigation-bar>
		<router-view></router-view>
	</div>
</template>

<script>
import TheNavigationBar from "./components/layout/TheNavigationBar.vue";

export default {
	components: {
		TheNavigationBar,
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	font-family: "Roboto Mono", sans-serif;
}
</style>
