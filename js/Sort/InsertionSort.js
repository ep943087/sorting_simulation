import AbstractSort from "./AbstractSort.js";

class InsertionSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.i = 0;
    sim.j = 0;
  }

  update()
  {
    const { simulation: sim } = this;
    if (sim.i >= sim.listSize) {
      sim.sorting = false;
      return;
    }
    
    if (sim.j > 0 && sim.list[sim.j] < sim.list[sim.j-1]) {
      sim.swap(sim.j, sim.j-1);
      sim.j--;
    } else {
      sim.i++;
      sim.j = sim.i;
    }
  }
}

export default InsertionSort;