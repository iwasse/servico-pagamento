class ServicoPagamento {
    constructor() {
        this.pagamentos = [];
    }

    pagar(codigoBarras, empresa, valor) {

        if(valor <= 0) {
            throw new Error('Valor do pagamento nao pode ser negativo ou zero');
        }
        
        let pagamento = { 
            codigoBarras, 
            empresa, 
            valor,
        }

        if(valor > 100) {
            pagamento.categoria = 'cara';
        } else {
            pagamento.categoria = 'padrão';
        }

        this.pagamentos.push(pagamento);
        return pagamento;
    }

    consultarUltimoPagamento() {
        return this.pagamentos[this.pagamentos.length - 1];
    }
}

export default ServicoPagamento;