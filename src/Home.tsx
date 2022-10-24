import { createContext, useContext, useState } from 'react';

const HomeContext = createContext({} as any);

function Countdown() {
  const { count, setCount } = useContext(HomeContext);

  return (
    <>
      <h1>Countdown: {count}</h1>

      <button onClick={() => setCount((oldState: number) => oldState - 1)}>
        Decrementar
      </button>
    </>
  );
}

function Form() {
  const { count, setCount } = useContext(HomeContext);

  return (
    <>
      <h1>Form: {count}</h1>

      <button onClick={() => setCount((oldState: number) => oldState + 1)}>
        Incrementar
      </button>
    </>
  );
}

export function Home() {
  const [count, setCount] = useState(0);

  return (
    <HomeContext.Provider value={{ count, setCount }}>
      <Countdown />

      <Form />
    </HomeContext.Provider>
  );
}
