import AbstractSort from "./AbstractSort.js";

class OddEvenSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.i = 1;
    sim.isSorted = true;
    sim.isOdd = true;
  }

  update()
  {
    const { simulation: sim } = this;

    if (sim.i >= sim.list.length - 1) {
      if (sim.isSorted) {
        sim.sorting = false;
        return;
      }
      sim.isOdd = !sim.isOdd;
      sim.i = sim.isOdd ? 1 : 0;
      sim.isSorted = true;
    }

    if (sim.list[sim.i] > sim.list[sim.i+1]) {
      sim.swap(sim.i, sim.i+1);
      sim.isSorted = false;
    }
    sim.i += 2;
  }
}

export default OddEvenSort;