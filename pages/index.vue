<template>
  <div class="index-container">
    <h1>Welcome to the Invoicing System</h1>
    <p>Use the navigation bar to manage customers and create invoices.</p>
    <div class="links">
      <nuxt-link to="/addCustomers" class="link-button">Add Customers</nuxt-link>
      <nuxt-link to="/viewCustomers" class="link-button">View Customers/Invoices</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.index-container {
  text-align: center;
  margin: 50px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.index-container h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.index-container p {
  color: #777;
  font-size: 1.2em;
}

.links {
  margin-top: 30px;
}

.link-button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.link-button:hover {
  background-color: #0056b3;
}
</style>
