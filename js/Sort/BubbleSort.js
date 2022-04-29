import AbstractSort from "./AbstractSort.js";

class BubbleSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.i = 0;
    sim.last = sim.list.length - 1;
  }

  update()
  {
    const { simulation: sim } = this;
    if (sim.i >= sim.last) {
      sim.i = 0;
      sim.last--;
    }
    if (sim.last < 0) {
      sim.sorting = false;
      return;
    }

    if (sim.list[sim.i] > sim.list[sim.i+1]) {
      sim.swap(sim.i, sim.i + 1);
    }

    sim.i++;
  }
}

export default BubbleSort;