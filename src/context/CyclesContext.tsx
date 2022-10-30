import {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from 'react';

import { cycleReducers } from '../reducers/cycles/reducer';
import { LocalStorageApplicationName } from '../interfaces/enums';
import { CycleData, CreateCycleFormData } from '../interfaces/Cycles';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface CyclesContextType {
  cycles: CycleData[];
  amountSecondsPassed: number;
  activeCycleId: string | null;
  activeCycle: CycleData | undefined;
  interruptCurrentCycle: () => void;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleFormData) => void;
}

interface CreateCycleProviderProps {
  children: React.ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

function CycleContextProvider({ children }: CreateCycleProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cycleReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        LocalStorageApplicationName.APPLICATION_STORAGE_ID
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return {
        cycles: [],
        activeCycleId: null,
      };
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  const createNewCycle = (data: CreateCycleFormData) => {
    const { task, minutesAmount } = data;
    const id = String(new Date().getTime());

    const newCycle: CycleData = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setAmountSecondsPassed(0);

    dispatch(addNewCycleAction(newCycle));
  };

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cyclesState);

    localStorage.setItem(
      LocalStorageApplicationName.APPLICATION_STORAGE_ID,
      cyclesStateJSON
    );
  }, [cycles]);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        setSecondsPassed,
        amountSecondsPassed,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

function useCycles(): CyclesContextType {
  const context = useContext(CyclesContext);

  if (!context) {
    throw new Error('useCycles must be used within an CycleProvider');
  }

  return context;
}

export { useCycles, CycleContextProvider };
