import assert from 'node:assert';
import mocha from 'mocha';
import ServicoPagamento from '../src/servicoPagamento.js'

describe('Testes da classe ServicoPagamento', function() {
    let servicoPagamento;

    beforeEach(function() {
        servicoPagamento = new ServicoPagamento();
    });

    it('deve criar um pagamento com os atributos corretos', function() {
        const pagamento = servicoPagamento.pagar("123456789", "Thoughtworks", 100.00);
        assert.strictEqual(pagamento.codigoBarras, "123456789");
        assert.strictEqual(pagamento.empresa, "Thoughtworks");
        assert.strictEqual(pagamento.valor, 100.00);
    });

    it('nao deve aceitar pagamentos com valor zero', function() {
        assert.throws(() => {
            servicoPagamento.pagar("123456789", "Thoughtworks", 0);
        }, Error);
    });

    it('nao deve aceitar pagamentos com valor negativo', function() {
        assert.throws(() => {
            servicoPagamento.pagar("123456789", "Thoughtworks", -100.00);
        }, Error);
    });


    it('nao deve adicionar o valor padrao para atributo categoria para pagamentos com valor menor que 100', function() {
        const pagamento = servicoPagamento.pagar("123456789", "Thoughtworks", 100.00);
        assert.strictEqual(pagamento.categoria, 'padrão');
    });
    
    it('deve adicionar o valor caro para categoria para pagamentos com valor maior que 100', function() {
        const pagamento = servicoPagamento.pagar("123456789", "Thoughtworks", 100.01);
        assert.strictEqual(pagamento.categoria, 'cara');
    });

    it('deve retornar undefined quando consultar o último pagamento sem nenhum pagamento adicionado', function() {
        assert.strictEqual(servicoPagamento.consultarUltimoPagamento(), undefined);
    });

    it('deve retornar o último pagamento adicionado', function() {
        const pagamento = servicoPagamento.pagar("123456789", "Thoughtworks", 100.00);
        const pagamento2 = servicoPagamento.pagar("987654321", "Thoughtworks", 50.00);
        assert.strictEqual(servicoPagamento.consultarUltimoPagamento(), pagamento2);
    });

});