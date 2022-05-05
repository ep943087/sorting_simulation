import AbstractSort from "./AbstractSort.js";

class CockTailShakerSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.isSorted = true;
    sim.startIndex = 0;
    sim.end = sim.list.length - 1;
    sim.i = sim.startIndex;
    sim.startToEnd = true;
  }

  update()
  {
    const { simulation: sim } = this;

    if (sim.startToEnd && sim.i >= sim.end ||
       !sim.startToEnd && sim.i <= sim.startIndex) {
      if (sim.isSorted) {
        sim.sorting = false;
        return;
      }

      sim.isSorted = true;
      sim.startToEnd = !sim.startToEnd;
      if (sim.startToEnd) {
        sim.startIndex++;
        sim.i = sim.startIndex;
      } else {
        sim.end--;
        sim.i = sim.end;
      }
    }

    if (sim.startToEnd) {
      if (sim.list[sim.i] > sim.list[sim.i+1]) {
        sim.swap(sim.i, sim.i+1);
        sim.isSorted = false;
      }
      sim.i++;
    } else {
      if (sim.list[sim.i] < sim.list[sim.i-1]) {
        sim.swap(sim.i, sim.i-1);
        sim.isSorted = false;
      }
      sim.i--;
    }
  }

  performSort()
  {
    const { simulation: sim } = this;

    while (!isSorted) {
      isSorted = true;

      for (let i=start;i<end;i++) {
        if (sim.list[i] < sim.list[i+1]) {
          sim.swap(i, i+1);
          isSorted = false;
        }
      }

      end--;

      for (let i=end;i>start;i--) {
        if (sim.list[i] > sim.list[i-1]) {
          sim.swap(i, i-1);
          isSorted = false;
        }
      }
      start++;
    }
  }
}

export default CockTailShakerSort;