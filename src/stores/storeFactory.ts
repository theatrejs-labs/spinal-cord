import produce from 'immer'
import { Action, AnyAction, createStore, Reducer, Store } from 'redux'

function create<A extends Action<any> = AnyAction, S = any>(
  initialState: S,
  reducerFunction: (draft: S, action: A) => S,
): Store {
  const reducer: Reducer<S, A> = (state, action) => {
    return produce(state, (draft: S) => reducerFunction(draft, action)) as S
  }
  return createStore(reducer, initialState as any)
}

export const storeFactory = { create }
