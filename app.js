import ServicoPagamento from "./src/servicoPagamento.js";

const servicoPagamento = new ServicoPagamento();

servicoPagamento.pagar("123456789", "Thoughtworks", 100.00);

servicoPagamento.pagar("123456666", "Accenture", 120.00);

servicoPagamento.pagar("123456666", "NVDIA", 100.01);

const pagamentos = servicoPagamento.consultarUltimoPagamento();
console.log(`Último pagamento: ${JSON.stringify(pagamentos)}`);