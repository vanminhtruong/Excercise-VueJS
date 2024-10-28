<script setup>
    import {computed, ref} from 'vue';

    const products = ref([
        { id: 1, name: 'Product A', price: 100, quantity: 2 },
        { id: 2, name: 'Product B', price: 200, quantity: 1 },
        { id: 3, name: 'Product C', price: 150, quantity: 3 },
    ]);

    const total = computed(()=>{
        return products.value.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0);
    })
</script>

<template>
    <div class="cart">
        <h1>Shopping cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                <span>{{product.name}}</span>
                <span>Price: ${{product.price}}</span>
                <span>Quantity: {{product.quantity}}</span>
            </li>
        </ul>
        <p>Total: {{total}}</p>
    </div>
</template>

<style scoped>
    .cart {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    .cart h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .cart ul {
        list-style-type: none;
        padding: 0;
    }

    .cart li {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
    }

    .cart h2 {
        text-align: right;
        margin-top: 20px;
    }
</style>