<template>
    <div class="container">
        <NightModeToggler/>
        <ProductListing/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductListing from './components/ProductListing.vue';
import NightModeToggler from "./components/NightModeToggler.vue";

@Component({ components: { NightModeToggler, ProductListing } })
export default class App extends Vue {
    created(): void {
        if (window.localStorage.getItem('nbbNightMode') === '1') {
            document.body.classList.add('dark');
        }
    }
};
</script>

<style lang="scss">
body {
    font-family: sans-serif;
    background: #f0f0f0;

    &.dark {
        background: #222;
        color: #fff;
    }
}
</style>

<style lang="scss" scoped>
.container {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
