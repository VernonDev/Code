import { createMachine, createActor } from "xstate";

// Define the traffic light state machine
const trafficLightMachine = createMachine({
  id: "trafficLight",
  initial: "red",
  states: {
    red: { on: { NEXT: "green" } },
    green: { on: { NEXT: "yellow" } },
    yellow: { on: { NEXT: "red" } },
  },
});

// Create an actor to run the machine
const actor = createActor(trafficLightMachine);

// Start the actor
actor.start();

// Listen for state transitions
actor.subscribe((state) => {
  console.log(`Current State: ${state.value}`);
});

// Simulate transitions
actor.send({ type: "NEXT" }); // Moves to green
actor.send({ type: "NEXT" }); // Moves to yellow
actor.send({ type: "NEXT" }); // Moves back to red
