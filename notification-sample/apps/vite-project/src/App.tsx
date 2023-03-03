import { useEffect } from 'react'
import './App.css'
import { useEventSource } from './useEventSource'

function App() {
  const { connectToEventSource, closeEventSource } = useEventSource()

  useEffect(() => {
    connectToEventSource("http://localhost:3000/sse")
    return () => {
      closeEventSource()
    }
  }, [])

  return (
    <div className="App">
      <div>smaple</div>
    </div>
  )
}

export default App
