// Persists which questions have already been answered, so a random draw keeps
// pulling fresh material across reloads instead of resetting every session.
//
// Entries are the stable `uid` from useQuestions (a hash of source + question
// text), never the array index — indices shift whenever questions are inserted
// or removed, which would silently mismark unrelated questions as seen.

const STORAGE_KEY = 'prepmcq.seen.v1'

export function loadSeen() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((uid) => typeof uid === 'string'))
  } catch {
    // Private mode, disabled storage, or a corrupt payload — start clean.
    return new Set()
  }
}

export function saveSeen(seen) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]))
  } catch {
    // Storage unavailable or over quota; tracking degrades to this session.
  }
}
