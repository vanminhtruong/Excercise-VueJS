<script setup>

    import {ref, watch} from 'vue';
    const num1 = ref(0);
    const num2 = ref(0);
    const sum = ref(0);
    const difference = ref(0);
    const product = ref(0);
    const quotient = ref(0);

    // watch() nhận vào 2 tham số:
    // - Tham số 1: Mảng các ref cần theo dõi sự thay đổi [num1, num2]
    // - Tham số 2: Callback function nhận vào mảng giá trị mới [newNum1, newNum2]
    //   của các ref tương ứng khi chúng thay đổi
    watch([num1,num2], ([newNum1, newNum2]) => {
        const a = parseFloat(newNum1) || 0;
        const b = parseFloat(newNum2) || 0;

        sum.value = a + b;
        difference.value = a - b;
        product.value = a * b;
        quotient.value = b !== 0 ? a / b : 'Không chia được';
    })
    
</script>

<template>
    <div class="math">
        <div>
            <label for="num1">The Number 1:</label>
            <input type="number" id="num1" v-model="num1">
        </div>
        <div>
            <label for="num2">The Number 2:</label>
            <input type="number" id="num2" v-model="num2">
        </div>
        <p>Sum is: {{sum}}, Difference is: {{difference}}, Product is: {{product}}, Quotient is: {{quotient}}</p>
    </div>
</template>

<style scoped>
    .math {
        border: 1px solid #ccc;
        max-width: 400px;
        padding: 10px;
        margin: 0 auto;
        border-radius: 10px;
    }

    label {
        margin-right: 5px;
    }

    input {
        padding: 5px;
        width: 200px;
    }

    p {
        font-weight: bold;
    }
</style>