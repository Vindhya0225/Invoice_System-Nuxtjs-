<template>
  <div class="nav">
    <nuxt-link to="/" class="brand">Home</nuxt-link>
    <nav class="nav-links">
      <nuxt-link to="/addCustomers" class="nav-button">Add Customers</nuxt-link>
      <nuxt-link to="/viewCustomers" class="nav-button">View Customers/Invoices</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navBar',
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.brand {
  font-weight: bold;
  font-size: 1.5em;
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
}

.nav-button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #fff;
  color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #f1f1f1;
}
</style>
