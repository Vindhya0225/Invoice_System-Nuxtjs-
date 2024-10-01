<template>
  <div class="invoice-container">
    <h1>Invoice</h1>

    <!-- Business Information (From Section) -->
    <div class="info-section from-section">
      <h2>From</h2>
      <p><strong>Business Name:</strong> Your Business</p>
      <p><strong>Address:</strong> 1234 Street Name, City, Country</p>
      <p><strong>Email:</strong> business@example.com</p>
      <p><strong>Phone:</strong> 123-456-7890</p>
    </div>

    <!-- Customer Information (To Section) -->
    <div class="info-section to-section" v-if="customer">
      <h2>To</h2>
      <p><strong>Name:</strong> {{ customer.name }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Phone:</strong> {{ customer.phone }}</p>
      <p><strong>Address:</strong> {{ customer.address }}</p>
    </div>

    <!-- Selected Products List -->
    <div class="products-section" v-if="products.length">
      <h2>Selected Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.price * product.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Price Summary -->
    <div class="total-section">
      <h2>Total Price</h2>
      <p>Rs. {{ totalPrice }}</p>
      <p>In Words: {{ totalPriceInWords }}</p>
    </div>

<!-- Payment Status Section -->
    <div class="payment-section">
      <h2>Payment Status</h2>
      <select v-model="selectedStatus" @change="handleStatusChange">
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
      </select>
      <div v-if="showDueDateInput">
        <label for="dueDate">Due Date:</label>
        <input type="date" v-model="dueDate" @change="updateDueDate" />
      </div>
    </div>

    <!-- Payment Options Section -->
    <div class="payment-options-section" v-if="selectedStatus === 'pending'">
      <h2>Payment Options</h2>
      <select v-model="selectedPaymentOption">
        <option value="credit_card">Credit/Debit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank_transfer">Bank Transfer</option>
      </select>
    </div>

    <!-- Status Indicator and Progress -->
    <div class="status-container">
      <div v-if="displayStatusBadge" class="status-badge" :class="selectedStatus">{{ statusLabel }}</div>
      <div v-if="displayProgressBar" class="status-progress">
        <div class="progress-bar">
          <div class="progress" :style="progressStyle"></div>
        </div>
        <p class="status-label">{{ statusLabel }}</p>
      </div>
    </div>

    <!-- Final Summary Section -->
    <div class="final-summary">
      <p v-if="dueDate && (selectedStatus === 'pending' || selectedStatus === 'overdue')">
        <strong>Due Date:</strong> {{ dueDate }}
      </p>
    </div>

    <!-- Action Buttons -->
    <!-- Action Buttons -->
<div class="action-buttons">
  <button class="send-invoice" @click="sendInvoice">Send Invoice</button>
  <button class="pay-now" @click="handlePayment">Pay Now</button>
</div>

  </div>
</template>

<script>
import { convertNumberToWords } from '@/utils/numberToWords';

export default {
  data() {
    return {
      selectedStatus: this.paymentStatus,
      dueDate: this.dueDate,
      selectedPaymentOption: 'credit_card'
    };
  },
  computed: {
    customer() {
      return this.$store.getters.getCustomer;
    },
    products() {
      return this.$store.getters.getProducts;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    totalPriceInWords() {
      return convertNumberToWords(this.totalPrice);
    },
    paymentStatus() {
      return this.$store.getters.getPaymentStatus;
    },
    dueDate() {
      return this.$store.getters.getDueDate;
    },
    showDueDateInput() {
      return this.selectedStatus === 'pending' || this.selectedStatus === 'overdue';
    },
    statusLabel() {
      const today = new Date().toISOString().split('T')[0];
      if (this.selectedStatus === 'paid') return 'Paid';
      if (this.selectedStatus === 'overdue') return 'Overdue';
      if (this.selectedStatus === 'pending') {
        if (this.dueDate && this.dueDate < today) return 'Overdue';
        if (this.dueDate && this.dueDate >= today) return 'Due Soon';
        return 'Pending';
      }
      return 'Pending';
    },
    progressStyle() {
      let width;
      switch (this.selectedStatus) {
        case 'paid':
          width = '100%';
          break;
        case 'overdue':
          width = '100%';
          break;
        case 'pending':
          width = '25%';
          break;
        default:
          width = '0%';
      }
      return `width: ${width};`;
    },
    displayStatusBadge() {
      return this.selectedStatus && this.selectedStatus !== 'pending';
    },
    displayProgressBar() {
      return this.selectedStatus === 'pending';
    }
  },
  methods: {
    handleStatusChange(event) {
      const newStatus = event.target.value;
      this.$store.commit('setPaymentStatus', newStatus);

      // Show success notification
      this.$toast.success(`The payment status has been updated to ${newStatus}.`, {
        position: 'top-right',
        timeout: 2000
      });

      // Reset due date if payment is completed
      if (newStatus === 'paid') {
        this.dueDate = '';
        this.$store.commit('setDueDate', '');
      }

      // Check due date and update status if needed
      this.checkDueDate();
    },
    updateDueDate(event) {
      const newDueDate = event.target.value;
      this.$store.commit('setDueDate', newDueDate);
      this.checkDueDate();
    },
    checkDueDate() {
      const today = new Date().toISOString().split('T')[0];
      if (this.selectedStatus === 'pending' && this.dueDate && this.dueDate < today) {
        this.$store.commit('setPaymentStatus', 'overdue');
      } else if (this.selectedStatus === 'overdue' && this.dueDate && this.dueDate >= today) {
        this.$store.commit('setPaymentStatus', 'pending');
      }
    },
    sendInvoice() {
      // Add loading state and error handling
      this.$toast.success('Invoice sent successfully!', {
        position: 'top-right',
        timeout: 2000
      });
    },
  handlePayment() {
    if (this.selectedStatus === 'pending' || this.selectedStatus === 'overdue') {
      this.$store.commit('setPaymentStatus', 'paid');
      this.$toast.success('Payment processed successfully!', {
        position: 'top-right',
        timeout: 2000
      });
    } else {
      this.$toast.info('No pending or overdue payment to process.', {
        position: 'top-right',
        timeout: 2000
      });
    }
  }
  },
  mounted() {
    this.checkDueDate();
  }
};
</script>

<style scoped>
.invoice-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  background-color: #ffffff;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
}

.products-section table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.products-section th, .products-section td {
  border: 1px solid #ddd;
  padding: 10px;
}

.products-section th {
  background-color: #f1f1f1;
}

.status-badge.paid {
  background-color: #28a745;
}

.status-badge.pending {
  background-color: #ffc107;
}

.status-badge.overdue {
  background-color: #dc3545;
}

@media (min-width: 769px) {
  .info-section {
    display: flex;
    justify-content: space-between;
  }
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}

.action-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: white; /* Set the text color to white for better contrast */
}

.action-buttons button.send-invoice {
  background-color: #007bff; /* Blue color for Send Invoice button */
}

.action-buttons button.send-invoice:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.action-buttons button.pay-now {
  background-color: #28a745; /* Green color for Pay Now button */
}

.action-buttons button.pay-now:hover {
  background-color: #218838; /* Darker green on hover */
}

.payment-options-section {
  margin-top: 20px;
  text-align: center;
}

.payment-options-section select {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
}
</style>
