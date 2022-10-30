import { CycleData } from '../../interfaces/Cycles';
import { CyclesReducerTypesEnum } from '../../interfaces/enums';

export function addNewCycleAction(newCycle: CycleData) {
  return {
    type: CyclesReducerTypesEnum.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markCurrentCycleAsFinishedAction() {
  return { type: CyclesReducerTypesEnum.MARK_CURRENT_CYCLE_AS_FINISHED };
}

export function interruptCurrentCycleAction() {
  return { type: CyclesReducerTypesEnum.INTERRUPTED_CURRENT_CYCLE };
}
