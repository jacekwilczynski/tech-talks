<template>
    <button @click="toggleNightMode">Toggle night mode</button>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class NightModeToggler extends Vue {
    public toggleNightMode(): void {
        if (window.localStorage.getItem('nbbNightMode') === '1') {
            window.localStorage.removeItem('nbbNightMode');
        } else {
            window.localStorage.setItem('nbbNightMode', '1');
        }

        window.location.reload();
    }
};
</script>
