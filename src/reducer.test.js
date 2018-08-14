import { generateAuralUpdate, restartGame, makeGuess} from './actions';
import reducer from './reducer';

describe('unrecognized input', ()=>{
    it('should return current state', ()=>{
        let initialState = {
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: Math.round(Math.random() * 100) + 1
        };
        let state = {}
        state = reducer(state=initialState, {type: 'unknown'})
        expect(state).toEqual(initialState);
    })
})

describe('generateAuralUpdate', ()=>{
    it('should be empty string if there are no guesses', ()=>{
        let state = {
            guesses: [25, 3, 90],
            feedback: "You're Warm.",
            auralStatus: ''
        };

        state = reducer(state, generateAuralUpdate());
        expect(state.auralStatus).toEqual(
            "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25"
        );
    });
})

describe('makeGuess', ()=>{
    it('should add guess to guess array', ()=>{
        let state = {
            guesses: [],
            feedback: 'Make your guess!',
            correctAnswer: 35,
        }
        state = reducer(state, makeGuess(5))
        expect(state.feedback).toEqual("You're Cold...")
        state = reducer(state, makeGuess(10))
        expect(state.feedback).toEqual("You're Warm.")
        state = reducer(state, makeGuess(25))
        expect(state.feedback).toEqual("You're Warm.")
        state = reducer(state, makeGuess(34))
        expect(state.feedback).toEqual("You're Hot!")
        state = reducer(state, makeGuess(35))
        expect(state.feedback).toEqual("You got it!")
        expect(state.guesses).toEqual([5, 10, 25, 34, 35])
        

    })
})

describe('restartGame', ()=>{
    it('should return state to initial settings', ()=>{
        let state = {
            guesses: [1,2,3,4,5],
            feedback: 'some feedback',
            auralStatus: 'some status',
            correctAnswer: -1, // negative just in case we get the same number on a call to the function
        }
        state = reducer(state, restartGame(Math.round(Math.random() * 100) + 1))
        expect(state.guesses).toEqual([])
        expect(state.feedback).toEqual('Make your guess!')
        expect(state.auralStatus).toEqual('')
        expect(state.correctAnswer).toBeGreaterThan(0)
        expect(state.correctAnswer).toBeLessThan(101)
    })
})