import { useState } from 'react'
import './App.css'
import { useQuestions, groupKeyOf } from './useQuestions'
import StartScreen from './components/StartScreen'
import QuestionCard from './components/QuestionCard'
import ResultsScreen from './components/ResultsScreen'

// Fisher–Yates shuffle, returns a new array.
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const { status, questions, error, skipped } = useQuestions()

  const [phase, setPhase] = useState('start') // 'start' | 'quiz' | 'results'
  const [order, setOrder] = useState([]) // question indices in play order
  const [current, setCurrent] = useState(0) // pointer into `order`
  const [responses, setResponses] = useState([]) // selected key per order position

  // Start a new quiz over the questions in the chosen groups (category or
  // category+subcategory leaf keys, as produced by groupKeyOf).
  function startQuiz(shuffleEnabled, groups) {
    const allow = groups && groups.length ? new Set(groups) : null
    const indices = questions
      .map((_, i) => i)
      .filter((i) => !allow || allow.has(groupKeyOf(questions[i])))
    const ordered = shuffleEnabled ? shuffle(indices) : indices
    setOrder(ordered)
    setResponses(new Array(ordered.length).fill(null))
    setCurrent(0)
    setPhase('quiz')
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

  function selectChoice(key) {
    setResponses((prev) => {
      if (prev[current] != null) return prev // already answered → locked
      const next = [...prev]
      next[current] = key
      return next
    })
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
      <StartScreen questions={questions} skipped={skipped} onStart={startQuiz} />
    )
  }

  if (phase === 'results') {
    const items = order.map((qi, pos) => ({
      question: questions[qi],
      selected: responses[pos],
    }))
    const score = items.filter((it) => it.selected === it.question.answer).length
    return (
      <ResultsScreen
        total={order.length}
        score={score}
        items={items}
        onRetry={retrySame}
        onReshuffle={reshuffle}
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
