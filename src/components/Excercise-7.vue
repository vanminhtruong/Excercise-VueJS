<script setup>
import { ref, computed, watch } from 'vue';

// Các hằng số
const MIN_PASSWORD_LENGTH = 8;

// Form data
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const rePassword = ref('');

// Form state
const formCompleted = ref(false);
const showMessage = ref(false);

// Tính toán validation
const isPasswordValid = computed(() => {
  return password.value.length >= MIN_PASSWORD_LENGTH;
});

const isFormValid = computed(() => {
  return (
    name.value &&
    email.value &&
    phone.value &&
    password.value &&
    rePassword.value &&
    isPasswordValid.value &&
    password.value === rePassword.value
  );
});

// Theo dõi thay đổi form
watch([name, email, phone, password, rePassword], () => {
  formCompleted.value = isFormValid.value;
});

// Xử lý đăng ký
const register = () => {
  if (formCompleted.value) {
    showMessage.value = true;
  }
};
</script>

<template>
  <div class="registration-container">
    <div class="registration-form">
      <h1>Đăng Ký</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Họ Tên:</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            placeholder="Nhập họ tên của bạn" 
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Nhập email của bạn" 
          />
        </div>

        <div class="form-group">
          <label for="phone">Số Điện Thoại:</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="phone" 
            placeholder="Nhập số điện thoại" 
          />
        </div>

        <div class="form-group">
          <label for="password">Mật Khẩu:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Nhập mật khẩu" 
          />
          <small v-if="password && !isPasswordValid">
            Mật khẩu phải có ít nhất 8 ký tự.
          </small>
        </div>

        <div class="form-group">
          <label for="rePassword">Nhập Lại Mật Khẩu:</label>
          <input 
            type="password"
            id="rePassword" 
            v-model="rePassword" 
            placeholder="Nhập lại mật khẩu" 
          />
          <small v-if="rePassword && password !== rePassword">
            Mật khẩu không khớp.
          </small>
        </div>

        <button
          type="submit"
          :class="{ 'disabled-button': !isFormValid }"
          :disabled="!isFormValid"
        >
          Đăng Ký
        </button>
      </form>

      <p v-if="showMessage" class="success-message">
        Form đã hoàn tất
      </p>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  align-items: center;
  background: transparent;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.registration-form {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  padding: 30px 40px;
  width: 100%;
}

.registration-form h1 {
  color: #333333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 25px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  color: #555555;
  font-weight: 500;
  margin-bottom: 5px;
}

.form-group input {
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #66afe9;
  outline: none;
}

.form-group small {
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
}

button {
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 12px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover:not(:disabled) {
  background-color: #218838;
}

.disabled-button {
  background-color: #6c757d;
  cursor: not-allowed;
}

.success-message {
  color: #28a745;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
}
</style>