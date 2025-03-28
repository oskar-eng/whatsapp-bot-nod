// whatsapp-web.js + express server listo para Render

const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode-terminal');

const app = express();
const port = process.env.PORT || 3000;

// Crear cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('📱 Escanea este QR para iniciar sesión:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp listo.');
});

client.on('message', async (message) => {
  const texto = message.body.toLowerCase();
  if (texto === 'hola') {
    await message.reply('Hola! Soy Lía 🤖, tu asistente.');
  } else {
    await message.reply('Comando no reconocido. Escribe *hola* para empezar.');
  }
});

client.initialize();

// Servidor express (opcional para pruebas Render)
app.get('/', (_, res) => {
  res.send('Bot de WhatsApp activo 🚀');
});

app.listen(port, () => {
  console.log(`🌐 Servidor express activo en http://localhost:${port}`);
});
