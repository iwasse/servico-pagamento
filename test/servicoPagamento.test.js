import assert from 'assert';

import ServicoPagamento from '../src/servicoPagamento.js'

describe('Testes da classe ServicoPagamento', function() {
    let servicoPagamento;

    beforeEach(function() {
        servicoPagamento = new ServicoPagamento();
    });

    it('deve criar um pagamento com os atributos e categoria corretos', function() {
        const pagamento = servicoPagamento.pagar("123456789", "Thoughtworks", 100.00);
        // Usar deepStrictEqual para comparar objetos é mais conciso e robusto.
        assert.deepStrictEqual(pagamento, {
            codigoBarras: "123456789",
            empresa: "Thoughtworks",
            valor: 100.00,
            categoria: 'padrão'
        });
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
        // É uma boa prática usar deepStrictEqual para comparar o conteúdo de objetos, não apenas suas referências.
        assert.deepStrictEqual(servicoPagamento.consultarUltimoPagamento(), pagamento2);
    });

});