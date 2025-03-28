// index.js
const { create } = require('@open-wa/wa-automate');

create().then(client => {
  client.onMessage(async message => {
    const texto = message.body.toLowerCase();
    const numero = message.from;

    if (texto === 'hola') {
      await client.sendText(numero, 'Hola, soy Lía 🦹‍♀️. Puedes preguntarme por la batería de una unidad usando: bateria [placa]');
    } else if (texto.startsWith('bateria')) {
      const partes = texto.split(' ');
      if (partes.length >= 2) {
        const placa = partes.slice(1).join(' ').toUpperCase();
        await client.sendText(numero, `⚡ Información de la placa ${placa} está en desarrollo.`); // A futuro conectar a GSheet o API
      } else {
        await client.sendText(numero, 'Por favor escribe: bateria [placa]');
      }
    } else {
      await client.sendText(numero, 'Comando no reconocido. Usa "bateria [placa]" o escribe "hola" para comenzar.');
    }
  });
});
