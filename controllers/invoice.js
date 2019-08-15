import db from "../db/db";

class InvoiceController {

  create(invoice) {
    return Promise.resolve(db.create(invoice));
  }

  get() {
    return Promise.resolve(db.get());
  }
}

export default InvoiceController;
