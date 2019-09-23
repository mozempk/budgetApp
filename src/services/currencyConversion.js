export default class CurrencyConversion {
    constructor(rates = undefined, base=undefined) {
        this.rates = rates
        this.base = base
        this.errors = {
            noRates: {
                type: "ENORATES",
                message: "No currency rates specified, call setRates"
            },
            noBase: {
                type: "ENOBASE",
                message: "No base currency specified, call setBase"
            },
            noAmount: {
                type: "ENOAMOUNT",
                message: "null or negative amount"
            },
            noCurency: {
                type: "ENOCURRENCY",
                message: "Specified currency not found"
            }
        }
    }

    toBase(from,amount){
        if (this.rates === undefined) throw this.errors.noRates
        if (this.base === undefined) throw this.errors.noBase
        let rate = this.rates[from]
        if (rate === undefined) throw this.errors.noCurency
        return amount / rate
    }
    fromBase(to, amount){
        if (this.rates === undefined) throw this.errors.noRates
        if (this.base === undefined) throw this.errors.noBase
        let rate = this.rates[to]
        if (rate === undefined) throw this.errors.noCurency
        return amount * rate
    }
    setRates(rates){
        this.rates = rates
    }
    setBase(base){
        this.base = base
    }
}