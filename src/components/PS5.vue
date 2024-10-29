<script setup>
import { ref, computed, watch } from 'vue'
const cart = ref([])
const products = ref([
  {
    id: 1,
    name: "PS5",
    price: 5555,
    publicDate: "05-05-2021",
    image: "https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg",
    hot: true,
  },
  {
    id: 2,
    name: "PS4",
    price: 4444,
    publicDate: "04-04-2021",
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
    hot: true,
  },
  {
    id: 3,
    name: "PS3",
    price: 3333,
    publicDate: "03-03-2021",
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
    hot: false,
  },
])

const hotProducts = computed(() => {
  return products.value.filter(product => product.hot)
})

const addToCart = (product) => {
  cart.value.push(product)
  alert(`${product.name} đã được thêm vào giỏ hàng.`)
}

const paymentMethods = ref([
  { text: "COD", value: 1 },
  { text: "Banking", value: 2 },
  { text: "Ứng dụng bên thứ 3", value: 3 },
])
const selectedPayment = ref(2) 

watch(selectedPayment, (newVal) => {
  const method = paymentMethods.value.find(m => m.value === newVal)
  if (method) {
    alert(`Phương thức thanh toán đã được thay đổi thành: ${method.text}`)
  }
})
</script>

<template>
  <div class="container">
    <!-- Yêu cầu 1: Đổ danh sách sản phẩm sử dụng v-for -->
    <section class="product-section">
      <h2>Danh sách sản phẩm</h2>
      <div class="products-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">Giá: {{ product.price.toLocaleString() }} ₫</p>
          <p class="product-date">Ngày phát hành: {{ product.publicDate }}</p>
          <button class="add-to-cart-btn" @click="addToCart(product)">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </section>

    <!-- Yêu cầu 2: Sử dụng v-for kèm computed để đổ ra danh sách sản phẩm hot -->
    <section class="hot-products-section">
      <h2>Sản phẩm Hot</h2>
      <div class="products-grid">
        <div class="product-card" v-for="product in hotProducts" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">Giá: {{ product.price.toLocaleString() }} ₫</p>
          <p class="product-date">Ngày phát hành: {{ product.publicDate }}</p>
          <button class="add-to-cart-btn" @click="addToCart(product)">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </section>

    <!-- Yêu cầu 3: Sử dụng v-if, v-else để hiển thị sản phẩm đắt rẻ -->
    <section class="classified-products-section">
      <h2>Phân loại sản phẩm theo giá</h2>
      <div class="products-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">Giá: {{ product.price.toLocaleString() }} ₫</p>
          <p :class="['product-classification', product.price > 4000 ? 'expensive' : 'cheap']">
            {{ product.price > 4000 ? 'Sản phẩm đắt' : 'Sản phẩm rẻ' }}
          </p>
          <button class="add-to-cart-btn" @click="addToCart(product)">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </section>

    <!-- Yêu cầu 5: Đổ ra phương thức thanh toán và set giá trị ban đầu là “Banking” -->
    <section class="payment-section">
      <h2>Phương thức thanh toán</h2>
      <div class="payment-method">
        <label for="payment">Chọn phương thức thanh toán:</label>
        <select id="payment" v-model="selectedPayment">
          <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
            {{ method.text }}
          </option>
        </select>
      </div>
    </section>
  </div>
</template>

<style src="../assets/styles/Today.css"></style>