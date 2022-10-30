export interface CreateCycleFormData {
  task: string;
  minutesAmount: number;
}

export interface CycleData {
  id: string;
  task: string;
  startDate: Date;
  minutesAmount: number;
  finishedCycleDate?: Date;
  interruptedCycleDate?: Date;
}
