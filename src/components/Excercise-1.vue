<script setup>
  import { ref, computed } from "vue";
  const product = ref({
    image: 'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
    imageAlt: 'PS5 Alt Text',
    product: 'PlayStation 5',
    productLink: 'https://bachtungps.com.vn/may-sony-playstation-5-ps5-1',
    quantity: 10,
    price: 10000,
    discount: 0.2,
    inStock: true,
    classObject: {
      'bg-green': true,
      'bg-blue': false
    }
  })

  // Hàm tính giá sau khi giảm giá
  // - Lấy giá gốc (price) nhân với (1 - tỷ lệ giảm giá)
  // - Format kết quả thành định dạng tiền tệ USD
  function calculatePrice() {
    return (product.value.price * (1 - product.value.discount)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }
  
  // Computed property để hiển thị trạng thái tồn kho của sản phẩm
  // - Kiểm tra biến inStock, nếu true thì hiển thị có hàng, ngược lại hết hàng
  const productDescription = computed(() => {
    return product.value.inStock ? 'This product is available!' : 'Currently out of stock.'
  })

  // Hàm format một số thành định dạng tiền tệ USD
  // - Nhận vào một giá trị số
  // - Trả về chuỗi đã được format theo định dạng tiền USD
  function formatPrice(value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }
</script>

<template>
  <div class="product-container">
    <h1 :class="product.inStock ? 'text-green-500' : 'text-red-500'">
      {{ product.product }}
    </h1>

    <img :src="product.image" :alt="product.imageAlt" class="product-image" />
    <div :class="product.classObject">
      <p>This div has dynamic classes based on 'classObject'.</p>
    </div>

    <p>Price after discount: {{ calculatePrice() }}</p>
    
    <p>{{ productDescription }}</p>
    
    <p>Original Price: {{ formatPrice(product.price) }}</p>
    
    <a :href="product.productLink" target="_blank" class="product-link">
      Buy {{ product.product }}
    </a>
  </div>
</template>

<style scoped>
  .product-container {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 400px; /* Giới hạn chiều rộng tối đa */
    margin: 0 auto; /* Căn giữa container */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .product-image {
    width: 200px;
    height: auto;
  }

  .text-green-500 {
    color: green;
  }

  .text-red-500 {
    color: red;
  }

  .bg-green {
    background-color: #10b981;
  }

  .bg-blue {
    background-color: #3b82f6;
  }

  .product-link {
    display: inline-block;
    margin-top: 10px;
    color: #1d4ed8;
    text-decoration: none;
  }

  .product-link:hover {
    text-decoration: underline;
  }
</style>
