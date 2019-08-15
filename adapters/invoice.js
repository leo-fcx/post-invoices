import amqp from 'amqplib';

const getChannel = function(key, cb) {
  console.log(process.env.USER, process.env.PWD);
  return amqp
    .connect(`amqp://${process.env.USER}:${process.env.PASS}@159.65.220.217:5672`)
    .then(function(connection) {
      console.log('RabbitMQ client opened connection.');
      return connection.createChannel();
    })
    .then(function(channel) {
      console.log('RabbitMQ client created channel.');
      return channel
        .assertQueue(key)
        .then(function(ok) {
          console.log(`RabbitMQ client is using channel: ${key}`);
          cb(channel);
        });
    })
    .catch(console.warn);
};

class InvoiceAdapter {

  constructor(controller) {
    const self = this;

    this.controller = controller;
    this.key = 'invoices';

    getChannel(this.key,channel => this.channel = channel);


  }

  create(invoice) {
    this.initConsumer();
    this.channel.sendToQueue(this.key, Buffer.from(JSON.stringify(invoice)));

    return Promise.resolve({ something: undefined });
  }

  get() {
    return Promise.resolve(this.controller.get());
  }

  initConsumer() {
    if (this.isConsumerInitialized) return;

    this.channel
      .consume(this.key, (msg) => {
        if (msg === null) return;

        const data = msg.content.toString();

        console.log('CONSUMER got:', data);
        this.controller.create(JSON.parse(data));
        this.channel.ack(msg);
      });

    this.isConsumerInitialized = true;
  }
}

export default InvoiceAdapter;
