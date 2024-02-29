const redis = require('redis');

const client = redis.createClient();

// Conectar ao Redis antes de exportar o cliente
const connectToRedis = async () => {
  await client.connect();
  console.log('Conectado ao Redis');
};

client.on('error', (err) => {
  console.log(`Erro no Redis: ${err}`);
});

// Chamar a função para conectar ao Redis
connectToRedis();

module.exports = {
  client,
};
