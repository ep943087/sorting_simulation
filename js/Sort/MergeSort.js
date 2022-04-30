import AbstractSort from "./AbstractSort.js";

class MergeSort extends AbstractSort
{
  initialize()
  {
    const { simulation: sim } = this;
    sim.tempList = [...sim.list];
    sim.lowHighMids = [];
    sim.lowHighMidIndex = 0;
    this.preMergeSort(0, sim.tempList.length - 1);
    this.resetMergeSortVariables();
  }

  update()
  {
    const { simulation: sim } = this;

    if (sim.lowHighMidIndex >= sim.lowHighMids.length) {
      sim.sorting = false;
      return;
    }

    if (!sim.merging && sim.i <= sim.mid && sim.j <= sim.high) {
      if (sim.list[sim.i] < sim.list[sim.j]) {
        sim.copyList[sim.k++] = sim.list[sim.i++];
      } else {
        sim.copyList[sim.k++] = sim.list[sim.j++];
      }
    } else if (!sim.merging && sim.i <= sim.mid) {
      sim.copyList[sim.k++] = sim.list[sim.i++];
    } else if (!sim.merging && sim.j <= sim.high) {
      sim.copyList[sim.k++] = sim.list[sim.j++];
    } else if (!sim.merging) {
      sim.merging = true;
    }

    if (sim.merging && sim.m <= sim.high) {
      sim.list[sim.m] = sim.copyList[sim.m];
      sim.m++;
    } else if (sim.merging) {
      sim.lowHighMidIndex++;
      if (sim.lowHighMidIndex >= sim.lowHighMids.length) {
        sim.sorting = false;
        return;
      }
      this.resetMergeSortVariables();
    }
  }

  resetMergeSortVariables()
  {
    const { simulation: sim } = this;
    
    sim.low = sim.lowHighMids[sim.lowHighMidIndex].low;
    sim.high = sim.lowHighMids[sim.lowHighMidIndex].high;
    sim.mid = sim.lowHighMids[sim.lowHighMidIndex].mid;

    sim.i = sim.low;
    sim.j = sim.mid + 1;
    sim.k = sim.low;
    sim.m = sim.low;
    sim.copyList = [...sim.list];
    sim.merging = false;
  }

  preMergeSort(low, high)
  {
    const { simulation: sim } = this;
    if (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      this.preMergeSort(low, mid);
      this.preMergeSort(mid+1, high);
      sim.lowHighMids.push({low, high, mid});
      this.merge(low, high, mid)
    }
  }

  merge(low, high, mid)
  {
    const { simulation: sim } = this;
    let i = low;
    let j = mid+1;
    let k = low;
    const copyList = [...sim.tempList];
    
    while (i <= mid && j <= high) {
      if (sim.tempList[i] < sim.tempList[j]) {
        copyList[k++] = sim.tempList[i++];
      } else {
        copyList[k++] = sim.tempList[j++];
      }
    }

    while (i <= mid) {
      copyList[k++] = sim.tempList[i++];
    }

    while (j <= high) {
      copyList[k++] = sim.tempList[j++];
    }

    for (let m=low; m <= high; m++) {
      sim.tempList[m] = copyList[m];
    }
  }
}

export default MergeSort;