import express from 'express';
import bodyParser from 'body-parser';
import Invoice from './models/invoice';
import InvoiceAdapter from './adapters/invoice';
import InvoiceController from './controllers/invoice';
import InvoiceValidator from './validators/invoice';

// Set up the express app
const app = express();

const invoiceController = process.env.USE_MESSAGE_BROKER
  ? new InvoiceAdapter(new InvoiceController())
  : new InvoiceController();
const invoiceValidator = new InvoiceValidator();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all invoices
app.get('/api/v1/invoices', (req, res) => {
  invoiceController
    .get()
    .then(function(invoices) {
      return res.status(200).send({
        success: 'true',
        message: 'Invoices retrieved successfully',
        invoices
      });
    })
    .catch(function(error) {
      res.status(400).send({
        success: 'false',
        message: 'Something went wrong.',
        error
      })
    })


});

// create an invoice
app.post('/api/v1/invoices', (req, res) => {
  const invoice = new Invoice(req.body);
  const validationResult = invoiceValidator.validate(invoice);

  if (!validationResult.isValid) {
    return res.status(400).send(validationResult.error);
  }

  invoiceController
    .create(req.body)
    .then(function(invoice) {
      return res.status(201).send({
        success: 'true',
        message: 'Invoice added successfully',
        invoice
      });
    })
    .catch(function(error) {
      res.status(400).send({
        success: 'false',
        message: 'Something went wrong.',
        error
      })
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('------------------------------');
  console.log(`server running on port ${PORT}`);
  console.log('------------------------------');
});