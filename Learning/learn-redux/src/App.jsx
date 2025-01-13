import AddTodo from './components/addTodo'
import Todos from './components/Todos'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <AddTodo />
      <Todos />
    </Provider>
  )
}

export default App
