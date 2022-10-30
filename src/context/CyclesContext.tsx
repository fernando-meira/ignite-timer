import { createContext, useState, useReducer, useContext } from 'react';

import { CyclesReducerTypesEnum } from '../interfaces/enums';
import { CycleData, CreateCycleFormData } from '../interfaces/Cycles';

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

interface CycleStateData {
  cycles: CycleData[];
  activeCycleId: string | null;
}

interface CycleActionType {
  type: CyclesReducerTypesEnum;
  payload?: any;
}

export const CyclesContext = createContext({} as CyclesContextType);

function CycleContextProvider({ children }: CreateCycleProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const [cyclesState, dispatch] = useReducer(
    (state: CycleStateData, action: CycleActionType) => {
      if (action.type === CyclesReducerTypesEnum.ADD_NEW_CYCLE) {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      }

      if (action.type === CyclesReducerTypesEnum.INTERRUPTED_CURRENT_CYCLE) {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedCycleDate: new Date() };
            } else {
              return state;
            }
          }),
          activeCycleId: null,
        };
      }

      if (
        action.type === CyclesReducerTypesEnum.MARK_CURRENT_CYCLE_AS_FINISHED
      ) {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedCycleDate: new Date() };
            } else {
              return state;
            }
          }),
          activeCycleId: null,
        };
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

    dispatch({
      type: CyclesReducerTypesEnum.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });
  };

  function markCurrentCycleAsFinished() {
    dispatch({
      type: CyclesReducerTypesEnum.MARK_CURRENT_CYCLE_AS_FINISHED,
    });
  }

  function interruptCurrentCycle() {
    dispatch({
      type: CyclesReducerTypesEnum.INTERRUPTED_CURRENT_CYCLE,
    });
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

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
