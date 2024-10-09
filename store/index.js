export const state = () => ({
  products: [],
  customer: null, 
  paymentStatus: 'pending',
  dueDate: null,
  invoices: [] // New state for invoices
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setCustomer(state, customer) {
    state.customer = customer;
  },
  setPaymentStatus(state, status) {
    state.paymentStatus = status;
  },
  setDueDate(state, dueDate) {
    state.dueDate = dueDate;
  },
  addInvoice(state, invoice) { // New mutation for adding an invoice
    state.invoices.push(invoice);
  }
};

export const getters = {
  getProducts(state) {
    return state.products;
  },
  getCustomer(state) {
    return state.customer;
  },
  getPaymentStatus(state) {
    return state.paymentStatus;
  },
  getDueDate(state) {
    return state.dueDate;
  },
  getTotalPrice(state) {
    return state.products.reduce((total, product) => total + product.price * product.quantity, 0);
  },
  getInvoices(state) { // New getter for invoices
    return state.invoices;
  }
};
