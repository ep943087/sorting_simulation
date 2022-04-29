import AbstractSort from "./AbstractSort.js";

class SelectionSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.i = 0;
    sim.j = 0;
    sim.s = 0;
  }

  update()
  {
    const { simulation: sim } = this;
    if (sim.i >= sim.list.length) {
      sim.sorting = false;
      return;
    }
    if (sim.j >= sim.list.length) {
      sim.swap(sim.i, sim.s);
      sim.i++;
      sim.s = sim.i;
      sim.j = sim.i;
    }
    if (sim.i >= sim.list.length) {
      sim.sorting = false;
      return;
    }

    if (sim.list[sim.j] < sim.list[sim.s]) {
      sim.s = sim.j;
    }

    sim.j++;
  }
}

export default SelectionSort;