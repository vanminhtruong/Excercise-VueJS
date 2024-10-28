<script setup>

    import {ref} from 'vue';
    const isChecked = ref(false);

</script>

<template>
    <div>
        <label>
            <input type="checkbox" v-model="isChecked">
            Please Select your choose
        </label>

        <p :class="isChecked? 'text-blue-bold' : 'text-red-normal'">This is all it change </p>
    </div>
</template>

<style scoped>
    div{
        max-width: 400px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .text-blue-bold {
        color: blue;
        font-weight: bold;
    }

    .text-red-normal {
        color: red;
        font-weight: normal;
    }

    input{
        cursor: pointer;
    }
</style>