export function formatPrice(n, status) {
  let v
  if (n >= 1e7) v = `₹${+(n / 1e7).toFixed(2)} Cr`
  else if (n >= 1e5) v = `₹${+(n / 1e5).toFixed(1)} L`
  else v = `₹${n.toLocaleString('en-IN')}`
  return status === 'rent' ? `${v}/month` : v
}
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
