function formatearMoneda(numero) {
  if (isNaN(numero) || numero === undefined || numero === null) {
    numero = 0;
  }

  if (typeof numero === 'string') {
    numero = parseFloat(numero.replace(/[^\d.-]/g, '')) || 0;
  }

  let numeroRedondeado = Math.round(numero);

  let formatoMoneda = new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(numeroRedondeado);

  return formatoMoneda;
}

export default formatearMoneda;