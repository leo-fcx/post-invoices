class InvoiceValidator {
  validate(invoice) {
    let error;
    
    if(!invoice.storeId) {
      error = {
        success: 'false',
        message: 'storeId is required'
      };
    } else if(!invoice.buyerId) {
      error = {
        success: 'false',
        message: 'buyerId is required'
      };
    } else if(!invoice.amount) {
      error = {
        success: 'false',
        message: 'amount is required'
      };
    }

    if (error)
      return { isValid: false, error };

    return { isValid: true };
  }
}

export default InvoiceValidator;



