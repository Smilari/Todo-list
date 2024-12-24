function parseExpiry(expiry) {
  const time = parseInt(expiry.slice(0, -1), 10);
  const unit = expiry.slice(-1);
  switch (unit) {
    case 'm': return time * 60 * 1000; // minutos
    case 'h': return time * 60 * 60 * 1000; // horas
    case 'd': return time * 24 * 60 * 60 * 1000; // días
    default: throw new Error('Formato de expiración no soportado.');
  }
}


export const accessTokenMaxAge = parseExpiry(process.env.ACCESS_TOKEN_EXPIRY);
export const refreshTokenMaxAge = parseExpiry(process.env.REFRESH_TOKEN_EXPIRY);