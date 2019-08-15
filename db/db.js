const invoices =  [
    {
      id: 1,
      storeId: 1,
      buyerId: 999999, 
      details: "iPhone X",
      amount: 1000
    }
];

const timeout = 3000;

export default {
  create: function(invoice) {
    const delay = new Promise(resolve => setTimeout(resolve, timeout));

    invoice.id = invoices.length + 1;

    return delay.then(() => invoices.push(invoice));
  },

  get: function() {
    return Promise.resolve(invoices);
  }
};
