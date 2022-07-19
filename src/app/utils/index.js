/**
 * 
 * @param {String} value 
 */
export const normalizeCOPCurrencyValue = (moneyValue) => {
    // Esta funcion normaliza alguna cadena a formato de moneda COP example 10.000,00

    // Removemos todos los puntos y
    // Reemplazamos la coma por un punto, para poder convertir a numero valido
    const newNumber = Number(moneyValue.replaceAll('.', '').trim().split(',').join('.')) || 0

    // Convertimos a formato de moneda COP
    const newPrice = newNumber.toLocaleString("es-CO", { style: "currency", currency: "COP" })

    // Si el numero no es cero, retornamos el valor con el formato de moneda COP
    return newNumber ? newPrice.slice(1).trim() : ''
}

// function conver currency to number
export const convertCurrencyToNumber = (moneyValue) => {
    const newNumber = Number(moneyValue.replaceAll('.', '').trim().split(',').join('.')) || 0
    return newNumber
}


// function to conver number to currency
export const convertNumberToCOPCurrency = (numberValue) => {
    return Number(numberValue) ? Number(numberValue).toLocaleString("es-CO", { style: "currency", currency: "COP" }).slice(1).trim() : ''
}