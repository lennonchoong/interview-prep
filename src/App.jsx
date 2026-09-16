import { useMemo, useState } from 'react'
import './App.css'
import { useQuestions, buildSelectionTree } from './useQuestions'
import { shuffle } from './random'
import { loadSeen, saveSeen } from './seen'
import StartScreen, { RANDOM_SAMPLE_SIZE } from './components/StartScreen'
import QuestionCard from './components/QuestionCard'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const { status, questions, error, skipped } = useQuestions()

  // Selection tree for the start-screen picker, plus each question's leaf key.
  const selection = useMemo(() => buildSelectionTree(questions), [questions])

  const [phase, setPhase] = useState('start') // 'start' | 'quiz' | 'results'
  const [order, setOrder] = useState([]) // question indices in play order
  const [current, setCurrent] = useState(0) // pointer into `order`
  const [responses, setResponses] = useState([]) // selected key per order position
  const [groups, setGroups] = useState(null) // leaf keys the session was drawn from
  // Question uids answered in any past session, restored from localStorage.
  const [seen, setSeen] = useState(loadSeen)

  // Every question index inside the given selection groups (leaf keys of the
  // selection tree); a null/empty selection means the whole bank.
  function poolFor(groupKeys) {
    const allow = groupKeys && groupKeys.length ? new Set(groupKeys) : null
    return questions
      .map((_, i) => i)
      .filter((i) => !allow || allow.has(selection.leafKeyById.get(questions[i].id)))
  }

  // Draw `size` indices from `pool`, exhausting everything unseen before
  // falling back to questions already answered. `alsoSeen` marks extra indices
  // as used up for this draw (the batch just played, whose answers may not
  // have landed in `seen` yet).
  function sampleUnseenFirst(pool, size, alsoSeen) {
    const isSeen = (i) =>
      seen.has(questions[i].uid) || (alsoSeen ? alsoSeen.has(i) : false)
    const picked = shuffle(pool.filter((i) => !isSeen(i))).slice(0, size)
    if (picked.length < size) {
      const reused = shuffle(pool.filter(isSeen))
      picked.push(...reused.slice(0, size - picked.length))
    }
    return shuffle(picked)
  }

  // Record a question as answered and persist it.
  function markSeen(uid) {
    setSeen((prev) => {
      if (prev.has(uid)) return prev
      const next = new Set(prev)
      next.add(uid)
      saveSeen(next)
      return next
    })
  }

  function resetSeen() {
    const empty = new Set()
    saveSeen(empty)
    setSeen(empty)
  }

  // Start a new quiz over the questions in the chosen groups. A `sampleSize`
  // draws that many questions at random from the pool instead of playing it
  // in full.
  function startQuiz(shuffleEnabled, groupKeys, sampleSize) {
    const indices = poolFor(groupKeys)
    setGroups(groupKeys)
    const ordered = sampleSize
      ? sampleUnseenFirst(indices, sampleSize)
      : shuffleEnabled
        ? shuffle(indices)
        : indices
    setOrder(ordered)
    setResponses(new Array(ordered.length).fill(null))
    setCurrent(0)
    setPhase('quiz')
    window.scrollTo({ top: 0 })
  }

  // Replay the current selection in the same order with fresh responses.
  function retrySame() {
    setResponses(new Array(order.length).fill(null))
    setCurrent(0)
    setPhase('quiz')
  }

  // Reshuffle the current selection (same questions, new order).
  function reshuffle() {
    const ordered = shuffle(order)
    setOrder(ordered)
    setResponses(new Array(ordered.length).fill(null))
    setCurrent(0)
    setPhase('quiz')
  }

  // Draw a fresh random batch from the same selection, skipping anything
  // already answered here or in a previous session.
  function nextRandom() {
    const ordered = sampleUnseenFirst(
      poolFor(groups),
      RANDOM_SAMPLE_SIZE,
      new Set(order),
    )
    setOrder(ordered)
    setResponses(new Array(ordered.length).fill(null))
    setCurrent(0)
    setPhase('quiz')
    window.scrollTo({ top: 0 })
  }

  function selectChoice(key) {
    if (responses[current] != null) return // already answered → locked
    setResponses((prev) => {
      if (prev[current] != null) return prev
      const next = [...prev]
      next[current] = key
      return next
    })
    markSeen(questions[order[current]].uid)
  }

  function goNext() {
    if (current < order.length - 1) setCurrent((c) => c + 1)
    else setPhase('results')
  }

  function goPrev() {
    if (current > 0) setCurrent((c) => c - 1)
  }

  if (status === 'loading') {
    return (
      <main className="app">
        <div className="state-msg">Loading…</div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="app">
        <div className="state-msg error">⚠ {error}</div>
      </main>
    )
  }

  if (phase === 'start') {
    return (
      <StartScreen
        questions={questions}
        tree={selection.nodes}
        skipped={skipped}
        seenCount={seen.size}
        onResetSeen={resetSeen}
        onStart={startQuiz}
      />
    )
  }

  if (phase === 'results') {
    const items = order.map((qi, pos) => ({
      question: questions[qi],
      selected: responses[pos],
    }))
    const score = items.filter((it) => it.selected === it.question.answer).length
    const nextRandomSize = Math.min(RANDOM_SAMPLE_SIZE, poolFor(groups).length)
    return (
      <ResultsScreen
        total={order.length}
        score={score}
        items={items}
        onRetry={retrySame}
        onReshuffle={reshuffle}
        onNextRandom={nextRandom}
        nextRandomSize={nextRandomSize}
        onHome={() => setPhase('start')}
      />
    )
  }

  // phase === 'quiz'
  const question = questions[order[current]]
  const selected = responses[current]
  const isLast = current === order.length - 1

  return (
    <main className="app">
      <header className="topbar">
        <button className="link-btn" onClick={() => setPhase('start')}>
          ← Exit
        </button>
        <span className="counter">
          {current + 1} / {order.length}
        </span>
      </header>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / order.length) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={question}
        selected={selected}
        onSelect={selectChoice}
      />

      <nav className="actionbar">
        <button className="btn ghost" onClick={goPrev} disabled={current === 0}>
          Previous
        </button>
        <button
          className="btn primary"
          onClick={goNext}
          disabled={selected == null}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </nav>
    </main>
  )
}
