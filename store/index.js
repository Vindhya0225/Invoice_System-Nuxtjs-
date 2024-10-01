// Vuex Store (store/index.js)
export const state = () => ({
  products: [],
  customer: null, 
  paymentStatus: 'pending',
  dueDate: null
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
  }
};
