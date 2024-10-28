<script setup>
    import { computed, ref } from "vue";

    const side = ref(0);

    const area = computed(()=>{
        const length = parseFloat(side.value);
        return isNaN(length) ? 0: length * length;
    })
</script>

<template>
    <div class="square-calculator">
        <h2>Tính diện tích hình Vuông</h2>

        <div class="input-group">
            <label for="side">Chiều dài cạnh (cm):</label>
            <input id="side" type="number" v-model="side" min="0" />
        </div>

        <div class="result">
            <p>Diện tích: {{ area }} cm²</p>
        </div>
    </div>
</template>

<style scoped>
    .square-calculator {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        margin-top: 20px;
        border-radius: 10px;
    }

    .input-group {
     margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="number"] {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    .result {
        font-size: 1.2em;
        font-weight: bold;
    }
</style>