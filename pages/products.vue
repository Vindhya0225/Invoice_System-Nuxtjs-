<template>
  <div class="products-container">
    <h2 class="title">Add Products</h2>
    <div v-for="(product, index) in products" :key="index" class="product-item">
      <h4 class="product-title">Product {{ index + 1 }}</h4>
      
      <label>Name:</label>
      <input type="text" v-model="product.name" placeholder="Enter product name" />

      <label>Description:</label>
      <input type="text" v-model="product.description" placeholder="Enter product description" />

      <label>Quantity:</label>
      <input type="number" v-model="product.quantity" placeholder="Enter quantity" />

      <label>Price:</label>
      <input type="number" v-model="product.price" placeholder="Enter price" />

      <button class="remove-button" @click="removeProduct(index)">Remove</button>
    </div>

    <div class="action-buttons">
      <button class="add-product-button" @click="addProduct">Add Another Product</button>
      <button class="submit-button" @click="submitProducts">Submit Products</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { name: '', description: '', quantity: 0, price: 0 }
      ]
    };
  },
  methods: {
    addProduct() {
      this.products.push({ name: '', description: '', quantity: 0, price: 0 });
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    submitProducts() {
      // Save products to Vuex
      this.$store.commit('setProducts', this.products);
      // Navigate to invoice page
      this.$router.push('/invoice');
    }
  }
};
</script>

<style scoped>
.products-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.product-item {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.product-title {
  margin-bottom: 15px;
  color: #555;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-product-button {
  background-color: #007bff; /* Bootstrap primary color */
  color: white;
  margin-right: 10px;
}

.add-product-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.submit-button {
  background-color: #2ecc71; /* Success color */
  color: white;
}

.submit-button:hover {
  background-color: #27ae60; /* Darker shade on hover */
}

.remove-button {
  background-color: #dc3545; /* Danger color */
  color: white;
  margin-top: 10px;
}

.remove-button:hover {
  background-color: #c82333; /* Darker shade on hover */
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}
</style>
