import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id) => {
  console.log('vote', id)
  return async dispatch => {
    const voted = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: voted,
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdotes,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      return state.map(a => 
        a.id === action.data.id 
        ? {...votedAnecdote, votes:votedAnecdote.votes + 1} 
        : a
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer 
