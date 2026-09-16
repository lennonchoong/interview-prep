// Unbiased random numbers drawn from the platform CSPRNG.
//
// Math.random() is already uniform (not Gaussian) and V8's xorshift128+ is
// statistically sound, so this is correctness polish rather than a fix: it
// swaps a per-page-load seeded PRNG for the OS entropy pool, and removes the
// modulo bias that `% n` on a raw 32-bit word would introduce.

const POOL_SIZE = 256

let pool = null
let poolNext = POOL_SIZE // force a refill on first use

const hasCrypto =
  typeof globalThis.crypto !== 'undefined' &&
  typeof globalThis.crypto.getRandomValues === 'function'

// Words are pulled in batches — one getRandomValues() call per draw would be
// wasteful when shuffling a few thousand questions.
function nextUint32() {
  if (!hasCrypto) return Math.floor(Math.random() * 0x100000000) // ancient browser
  if (poolNext >= POOL_SIZE) {
    if (!pool) pool = new Uint32Array(POOL_SIZE)
    globalThis.crypto.getRandomValues(pool)
    poolNext = 0
  }
  return pool[poolNext++]
}

// Uniform integer in [0, n).
//
// 2^32 is not usually a multiple of n, so the last partial block of the uint32
// range would map onto the low outcomes twice and make them likelier. Draws
// landing in that block are rejected and retried, leaving every outcome backed
// by exactly the same number of words.
export function randInt(n) {
  if (n <= 1) return 0
  const limit = Math.floor(0x100000000 / n) * n
  let v
  do {
    v = nextUint32()
  } while (v >= limit)
  return v % n
}

// Fisher–Yates shuffle, returns a new array.
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
