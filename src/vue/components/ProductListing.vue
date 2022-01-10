<template>
    <div>
        <h1>{{ products.length }} products found:</h1>

        <ul :class="gridClasses">
            <li v-for="product in products" :key="product.name">
                <img :alt="product.name" :src="`/media/${product.imageUrl}`"/>
                <h2>{{ product.name }}</h2>
                <div class="price">{{ product.price.toFixed(2) }} €</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Product } from '../../model/Product';

@Component
export default class ProductListing extends Vue {
    private products: Product[] = [];

    created(): void {
        const xhr = new XMLHttpRequest();
        const self = this;
        xhr.addEventListener('load', function () {
            self.products = JSON.parse(xhr.responseText);
        });
        xhr.open('GET', '/api/products');
        xhr.send();
    }

    get gridClasses(): { [className: string]: boolean } {
        return {
            'product-grid': true,
            'dark': window.localStorage.nbbNightMode === '1',
        };
    }
};
</script>

<style lang="scss" scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-gap: 2rem;
    padding: 0;
    list-style: none;

    & > li {
        padding: 2rem;
        background: white;
        text-align: center;
    }

    &.dark > li {
        background: #111;
    }

    img {
        max-height: 150px;
    }

    .price {
        text-align: right;
    }
}


</style>
