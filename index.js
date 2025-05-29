const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

const contato = '5521990719697@c.us';

let historico = {};

// Carrega histórico se existir
if (fs.existsSync('./historico.json')) {
    historico = JSON.parse(fs.readFileSync('./historico.json'));
}

let status = 'pendente';
let ultimaData = '';

function hoje() {
    return new Date().toISOString().split('T')[0];
}

function salvarHistorico() {
    fs.writeFileSync('./historico.json', JSON.stringify(historico, null, 2));
}

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

// Pergunta diária às 16:06
cron.schedule('11 16 * * *', () => {
    ultimaData = hoje();
    status = 'pendente';
    historico[ultimaData] = 'pendente';
    salvarHistorico();
    client.sendMessage(contato, 'Bom dia! 🌞 Já tomou seu remédio hoje?\n\n✅ Sim\n❌ Não\n🚫 Não posso tomar hoje');
}, {
    timezone: "America/Sao_Paulo"
});

// Lembrete de hora em hora
cron.schedule('0 * * * *', () => {
    if (status === 'pendente' && ultimaData === hoje()) {
        client.sendMessage(contato, '⏰ Lembrete: Já tomou seu remédio hoje?\n\n✅ Sim\n❌ Não\n🚫 Não posso tomar hoje');
    }
}, {
    timezone: "America/Sao_Paulo"
});

// Responde às mensagens
client.on('message', message => {
    if (message.from === contato) {
        const texto = message.body.trim().toLowerCase();

        if (texto.includes('✅') || texto.includes('sim')) {
            status = 'tomado';
            historico[hoje()] = 'tomado';
            salvarHistorico();
            client.sendMessage(contato, 'Perfeito! 👏 Até amanhã.');
        } 
        else if (texto.includes('❌') || texto.includes('não')) {
            client.sendMessage(contato, 'Ok! Lembrarei novamente em 1 hora ⏰.');
        } 
        else if (texto.includes('🚫') || texto.includes('impossível') || texto.includes('nao posso')) {
            status = 'impossibilitado';
            historico[hoje()] = 'impossibilitado';
            salvarHistorico();
            client.sendMessage(contato, 'Entendido. Não enviarei mais lembretes hoje 🚫.');
        }
    }
});

client.initialize();
