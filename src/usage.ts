// usage-example.ts

import {
  Experiment,
  Condition,
  Staircase,
  randomizeTrial,
} from "./automated-experiment-design";

// Create an experiment
const myExperiment = new Experiment("Visual Perception Study");

// Add conditions
myExperiment.addCondition(new Condition("High Contrast", { contrast: 0.8 }));
myExperiment.addCondition(new Condition("Low Contrast", { contrast: 0.2 }));

// Add a staircase
myExperiment.addStaircase(
  new Staircase("Contrast Threshold", 0.5, [0.1, 0.05, 0.025], 10)
);

// Generate and run trials
for (let i = 0; i < 50; i++) {
  const trial = randomizeTrial(myExperiment);

  // Simulate presenting the trial to the participant and collecting response
  const simulatedResponse = Math.random() > 0.5 ? "Correct" : "Incorrect";
  const simulatedReactionTime = Math.random() * 1000 + 500; // Random RT between 500-1500ms

  trial.setResponse(simulatedResponse, simulatedReactionTime);

  // Update staircase if necessary
  if (myExperiment.staircases.length > 0) {
    const staircase = myExperiment.staircases[0];
    staircase.update(simulatedResponse === "Correct");

    if (staircase.isComplete()) {
      console.log(`Staircase complete. Final value: ${staircase.currentValue}`);
      break;
    }
  }
}

console.log(`Experiment complete. Total trials: ${myExperiment.trials.length}`);
