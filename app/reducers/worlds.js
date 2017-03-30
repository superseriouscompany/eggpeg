import base from '../styles/base'

const initialState = [
  { name: 1, maxScore: 69, beaten: true, score: 50, color: base.colors.green },
  { name: 2, maxScore: 100, color: base.colors.yellow },
  { name: 3, maxScore: 420, locked: true, color: base.colors.orange },
  { name: 4, comingSoon: true, color: base.colors.red },
]

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state
  }
}
