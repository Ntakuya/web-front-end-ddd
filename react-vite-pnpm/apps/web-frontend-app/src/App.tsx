import './App.css'
import { GraphQLProvider } from './app/graphql-provider'
import { DisplayLocations } from './components/apollo'
import { ViteComponent } from './components/vite'

function App() {
  return (
    <div className="App">
      <GraphQLProvider>
        <ViteComponent />
        <DisplayLocations />
      </GraphQLProvider>
    </div>
  )
}

export default App
