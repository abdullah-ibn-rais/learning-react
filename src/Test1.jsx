import React, { createContext, useContext, useReducer } from "react";

// 1️⃣ Reducer
const initialState = {
  count: 0,
  history: [],
};

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
        history: [...state.history, `+1 → ${state.count + 1}`],
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
        history: [...state.history, `-1 → ${state.count - 1}`],
      };
    case "RESET":
      return {
        count: 0,
        history: [...state.history, `Reset → 0`],
      };
    default:
      return state;
  }
}

// 2️⃣ Context Setup
const CounterContext = createContext();

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3️⃣ Main App
export default function Test1() {
  return (
    <>
      <h1>🧮 Simple Counter</h1>
      <CounterProvider>
        <CounterButtons />
        <CounterDisplay />
        <CounterHistory />
      </CounterProvider>
    </>
  );
}

// ➕ ➖ 🔁 Buttons
function CounterButtons() {
  const { dispatch } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>➕</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>➖</button>
      <button onClick={() => dispatch({ type: "RESET" })}>🔁</button>
    </div>
  );
}

// 🔢 Count Display
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return <h2>Count: {state.count}</h2>;
}

// 📜 History
function CounterHistory() {
  const { state } = useContext(CounterContext);
  return (
    <div>
      <h3>📝 History:</h3>
      <ul>
        {state.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
