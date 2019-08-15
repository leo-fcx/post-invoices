class Invoice {
  constructor(data) {
    this.storeId = data.storeId;
    this.buyerId = data.buyerId;
    this.details = data.details;
    this.amount = data.amount;
  }
}

export default Invoice;
