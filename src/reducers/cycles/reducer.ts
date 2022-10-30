import { CycleData } from '../../interfaces/Cycles';
import { CyclesReducerTypesEnum } from '../../interfaces/enums';

interface CycleStateData {
  cycles: CycleData[];
  activeCycleId: string | null;
}

interface CycleActionType {
  type: CyclesReducerTypesEnum;
  payload?: any;
}

export function cycleReducers(state: CycleStateData, action: CycleActionType) {
  if (action.type === CyclesReducerTypesEnum.ADD_NEW_CYCLE) {
    return {
      ...state,
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id,
    };
  }

  switch

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

  if (action.type === CyclesReducerTypesEnum.MARK_CURRENT_CYCLE_AS_FINISHED) {
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
}
