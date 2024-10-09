<template>
  <div class="view-customers-container">
    <h1>Customers and Invoices</h1>
    <div v-if="customers.length === 0">
      <p>No customers added yet.</p>
    </div>
    <div v-for="(invoice, index) in invoices" :key="index" class="invoice-card">
      <h3>Invoice for {{ invoice.customer.name }}</h3>
      <p><strong>Email:</strong> {{ invoice.customer.email }}</p>
      <p><strong>Payment Status:</strong> {{ invoice.paymentStatus }}</p>
      <p><strong>Total Price:</strong> Rs. {{ invoice.totalPrice }}</p>
      <p><strong>Due Date:</strong> {{ invoice.dueDate }}</p>
      <h4>Products:</h4>
      <ul>
        <li v-for="(product, index) in invoice.products" :key="index">
          {{ product.name }} - Quantity: {{ product.quantity }} - Price: Rs. {{ product.price }}
        </li>
      </ul>
      <p><strong>Created At:</strong> {{ new Date(invoice.createdAt).toLocaleString() }}</p>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    invoices() {
      return this.$store.getters.getInvoices;
    },
    customers() {
      return this.$store.getters.getCustomer ? [this.$store.getters.getCustomer] : []; // Modify if you store customers differently
    }
  }
};
</script>

<style scoped>
.view-customers-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.invoice-card {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
</style>
