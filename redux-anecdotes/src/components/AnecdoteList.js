import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort((a,b) => b.votes-a.votes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const votem = async (a) => {
    dispatch(vote(a.id))
    dispatch(setNotification(`you voted '${a.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filter)).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => votem(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default AnecdoteList
