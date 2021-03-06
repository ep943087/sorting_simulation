import BubbleSort from "./Sort/BubbleSort.js";
import OddEvenSort from "./Sort/OddEvenSort.js";
import CockTailShakerSort from "./Sort/CockTailShakerSort.js";
import SelectionSort from "./Sort/SelectionSort.js";
import InsertionSort from "./Sort/InsertionSort.js";
import QuickSort from "./Sort/QuickSort.js";
import MergeSort from "./Sort/MergeSort.js";

class Simulation
{
  static BUBBLE_SORT = "bubbleSort";
  static ODD_EVEN_SORT = "oddEvenSort";
  static COCK_TAIL_SHAKER_SORT = "cockTailShakerSort";
  static SELECTION_SORT = "selectionSort";
  static INSERTION_SORT = "insertionSort";
  static QUICK_SORT = "quickSort";
  static MERGE_SORT = "mergeSort";

  constructor(canvas)
  {
    this.canvas = canvas;
    this.listSize = 100;
    this.speed = 1;
    this.list = [];
    this.sortType = Simulation.BUBBLE_SORT;
    this.sorting = false;
    this.bubbleSort = new BubbleSort(this);
    this.oddEvenSort = new OddEvenSort(this);
    this.cockTailShakerSort = new CockTailShakerSort(this);
    this.selectionSort = new SelectionSort(this);
    this.insertionSort = new InsertionSort(this);
    this.quickSort = new QuickSort(this);
    this.mergeSort = new MergeSort(this);
    this.initializeSimulation();
  }

  getCurrentSortingAlgo()
  {
    switch (this.sortType) {
      case Simulation.BUBBLE_SORT:
        return this.bubbleSort;
      case Simulation.ODD_EVEN_SORT:
        return this.oddEvenSort;
      case Simulation.COCK_TAIL_SHAKER_SORT:
        return this.cockTailShakerSort;
      case Simulation.SELECTION_SORT:
        return this.selectionSort;
      case Simulation.INSERTION_SORT:
        return this.insertionSort;
      case Simulation.QUICK_SORT:
        return this.quickSort;
      case Simulation.MERGE_SORT:
        return this.mergeSort;
    }
  }

  start()
  {
    this.sorting = true;
    this.getCurrentSortingAlgo().initialize();
  }

  stop(callback)
  {
    this.sorting = false;
    if (typeof callback === 'function') {
      callback();
    }
  }

  continue()
  {
    this.sorting = true;
  }

  update = () =>
  {
    if (!this.sorting) return;
    for (let i=0;i<this.speed;i++) {
      this.getCurrentSortingAlgo().update();
    }
  }

  swap(i, j)
  {
    const temp = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = temp;
  }

  swapTempList(i, j)
  {
    const temp = this.tempList[i];
    this.tempList[i] = this.tempList[j];
    this.tempList[j] = temp;
  }

  scramble()
  {
    this.stop();
    for (let i=0;i<10;i++) {
      for (let j=0;j<this.listSize;j++) {
        const index = Math.floor(Math.random()*this.listSize);
        this.swap(j, index);
      }
    }
  }

  initializeSimulation()
  {
    this.sorting = false;
    this.list = [];
    for (let i=1;i<=this.listSize;i++) {
      this.list.push(i);
    }

    this.scramble();
  }

  setSortType(sortType)
  {
    this.sortType = sortType;
  }

  setListSize(listSize) {
    this.stop();
    this.listSize = listSize;
    this.initializeSimulation();
  }

  setSpeed(speed)
  {
    this.speed = speed;
  }
}

export default Simulation;