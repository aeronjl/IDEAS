// automated-experiment-design.ts

import { v4 as uuidv4 } from "uuid";

interface Variables {
  [key: string]: any;
}

class Experiment {
  id: string;
  name: string;
  conditions: Condition[];
  trials: Trial[];
  staircases: Staircase[];

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.conditions = [];
    this.trials = [];
    this.staircases = [];
  }

  addCondition(condition: Condition): void {
    this.conditions.push(condition);
  }

  addTrial(trial: Trial): void {
    this.trials.push(trial);
  }

  addStaircase(staircase: Staircase): void {
    this.staircases.push(staircase);
  }
}

class Condition {
  id: string;
  name: string;
  variables: Variables;

  constructor(name: string, variables: Variables) {
    this.id = uuidv4();
    this.name = name;
    this.variables = variables;
  }
}

class Trial {
  id: string;
  conditionId: string;
  stimuli: string;
  response: string | null;
  reactionTime: number | null;

  constructor(conditionId: string, stimuli: string) {
    this.id = uuidv4();
    this.conditionId = conditionId;
    this.stimuli = stimuli;
    this.response = null;
    this.reactionTime = null;
  }

  setResponse(response: string, reactionTime: number): void {
    this.response = response;
    this.reactionTime = reactionTime;
  }
}

class Staircase {
  id: string;
  name: string;
  currentValue: number;
  stepSizes: number[];
  reversalLimit: number;
  reversals: number;
  direction: "up" | "down" | null;

  constructor(
    name: string,
    initialValue: number,
    stepSizes: number[],
    reversalLimit: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.currentValue = initialValue;
    this.stepSizes = stepSizes;
    this.reversalLimit = reversalLimit;
    this.reversals = 0;
    this.direction = null;
  }

  update(correct: boolean): void {
    if (correct) {
      this.currentValue -=
        this.stepSizes[Math.min(this.reversals, this.stepSizes.length - 1)];
      if (this.direction === "up") {
        this.reversals++;
      }
      this.direction = "down";
    } else {
      this.currentValue +=
        this.stepSizes[Math.min(this.reversals, this.stepSizes.length - 1)];
      if (this.direction === "down") {
        this.reversals++;
      }
      this.direction = "up";
    }
  }

  isComplete(): boolean {
    return this.reversals >= this.reversalLimit;
  }
}

function randomizeTrial(experiment: Experiment): Trial {
  const condition =
    experiment.conditions[
      Math.floor(Math.random() * experiment.conditions.length)
    ];
  return new Trial(condition.id, generateStimuli(condition));
}

function generateStimuli(condition: Condition): string {
  // Implement stimuli generation based on condition
  // This is a placeholder and should be customized based on experiment needs
  return `Stimuli for ${condition.name}`;
}

export { Experiment, Condition, Trial, Staircase, randomizeTrial, Variables };
