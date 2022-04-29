import AbstractSort from "./AbstractSort.js";

class QuickSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.tempList = [...sim.list];
    sim.lowHighs = [];

    sim.lowHighIndex = 0;
    this.preQuickSort(0, sim.tempList.length - 1);
    this.resetQuickSortVariables();
  }
  
  update()
  {
    const { simulation: sim } = this;
    if (sim.i >= sim.high) {
      sim.swap(sim.j, sim.high);
      sim.lowHighIndex++;

      if (sim.lowHighIndex >= sim.lowHighs.length) {
        sim.sorting = false;
        return;
      }
      this.resetQuickSortVariables();
    }

    if (sim.lowHighIndex >= sim.lowHighs.length) {
      sim.sorting = false;
      return;
    }

    if (sim.list[sim.i] < sim.pivot) {
      sim.swap(sim.i, sim.j);
      sim.j++;
    }

    sim.i++;
  }

  resetQuickSortVariables()
  {
    const { simulation: sim } = this;
    sim.low = sim.lowHighs[sim.lowHighIndex].low;
    sim.high = sim.lowHighs[sim.lowHighIndex].high;
    sim.pivot = sim.list[sim.high];
    sim.i = sim.low;
    sim.j = sim.low;
  }

  preQuickSort(low, high)
  {
    if (low < high) {
      const j = this.partitionQuickSort(low, high);
      this.preQuickSort(low, j - 1);
      this.preQuickSort(j + 1, high);
    }
  }

  partitionQuickSort(low, high)
  {
    const { simulation: sim } = this;
    sim.lowHighs.push({low, high});
    const pivot = sim.tempList[high];
    let j = low;
    for (let i=low;i<high;i++) {
      if (sim.tempList[i] < pivot) {
        sim.swapTempList(i, j);
        j++;
      }
    }
    sim.swapTempList(j, high);
    return j;
  }
}

export default QuickSort;