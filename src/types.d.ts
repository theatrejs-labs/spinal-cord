declare module 'redux-immer'

interface IAction {
  text: string
  type: 'ADD_TODO'
}

interface IState {
  todos: string[]
}
