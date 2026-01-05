// Shorten wallet addresses to format: 0xuy7...987
export const shortenAddress = (address: string): string => {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Shorten transaction hashes to format: 0xuy7...987
export const shortenHash = (hash: string): string => {
  if (!hash || hash.length < 10) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}
