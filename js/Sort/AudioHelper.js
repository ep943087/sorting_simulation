import Simulation from "../Simulation.js";

class AudioHelper
{
  constructor(simulation)
  {
    this.audioCtx = null;
    this.oscillator = null;
    this.simulation = simulation;
  }

  initialize()
  {
    if (this.oscillator !== null) return;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = "square";
    this.oscillator.connect(this.audioCtx.destination);
    this.oscillator.start();
  }

  calculateHertzByValue(value)
  {
    const { simulation: sim } = this;

    const maxValue = 150;
    const minValue = 500;
    const range = maxValue - minValue;

    return (minValue + range * (value / sim.list.length))
  }

  getHertz()
  {
    const { simulation: sim } = this;

    let index = 0;

    switch (sim.sortType) {
      case Simulation.BUBBLE_SORT:
      case Simulation.ODD_EVEN_SORT:
      case Simulation.COCK_TAIL_SHAKER_SORT:
      case Simulation.QUICK_SORT:
        index = sim.i;
        break;
      case Simulation.SELECTION_SORT:
      case Simulation.INSERTION_SORT:
        index = sim.j;
        break;
      case Simulation.MERGE_SORT:
        if (sim.merging) {
          index = sim.m;
        } else {
          index = sim.j;
        }
        break;
    }
    return this.calculateHertzByValue(index);
  }

  stop()
  {
    if (this.oscillator === null) return;
    this.oscillator.stop();
    this.oscillator = null;
  }

  playSound()
  {
    if (!this.simulation.sorting || this.oscillator === null) return this.stop();
    this.oscillator.frequency.value = this.getHertz();;
  }
}

export default AudioHelper;