<template>
  <div class="form-container">
    <h1>Enter Customer Details</h1>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" placeholder="Enter customer name" required />
      </div>

      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Enter customer email" required />
      </div>

      <div class="input-group">
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="phone" placeholder="Enter customer phone number" required />
      </div>

      <div class="input-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" placeholder="Enter customer address" required />
      </div>

      <button type="submit" class="next-button">Add Customer</button>

      <div v-if="showMessage" class="success-message">
        Customer added successfully!
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      showMessage: false
    };
  },
  methods: {
    submitForm() {
      // Save customer details to Vuex
      this.$store.commit('setCustomer', { name: this.name, email: this.email, phone: this.phone, address: this.address });

      // Show success message and reset form
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.$router.push('/products');  // Navigate to products page
      }, 1000);
    }
  }
};
</script>
<style scoped>
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.next-button {
  width: 100%;
  padding: 15px;
  background-color: #3498db;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.next-button:hover {
  background-color: #2980b9;
}

.success-message {
  margin-top: 20px;
  color: #27ae60;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
input-group {
  display: flex;
  flex-direction: column;
}
</style>
