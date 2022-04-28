class Simulation
{
  static BUBBLE_SORT = "bubbleSort";
  static SELECTION_SORT = "selectionSort";
  static INSERTION_SORT = "insertionSort";
  static QUICK_SORT = "quickSort";

  constructor(canvas)
  {
    this.canvas = canvas;
    this.listSize = 100;
    this.speed = 1;
    this.list = [];
    this.sortType = Simulation.BUBBLE_SORT;
    this.sorting = false;
    this.initializeSimulation();
  }

  start()
  {
    this.sorting = true;
    switch (this.sortType) {
      case Simulation.BUBBLE_SORT:
        return this.initializeBubbleSort();
      case Simulation.SELECTION_SORT:
        return this.initializeSelectionSort();
      case Simulation.INSERTION_SORT:
        return this.initializeInsertionSort();
      case Simulation.QUICK_SORT:
        return this.initializeQuickSort();
    }
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
      switch (this.sortType) {
        case Simulation.BUBBLE_SORT:
          this.bubbleSort();
          break;
        case Simulation.SELECTION_SORT:
          this.selectionSort();
          break;
        case Simulation.INSERTION_SORT:
          this.insertionSort();
          break;
        case Simulation.QUICK_SORT:
          this.quickSort();
      }
    }
  }

  initializeBubbleSort()
  {
    this.i = 0;
    this.last = this.list.length - 1;
  }

  bubbleSort()
  {
    if (this.i >= this.last) {
      this.i = 0;
      this.last--;
    }
    if (this.last < 0) {
      this.sorting = false;
      return;
    }

    if (this.list[this.i] > this.list[this.i+1]) {
      this.swap(this.i, this.i + 1);
    }

    this.i++;
  }

  initializeSelectionSort()
  {
    this.i = 0;
    this.j = 0;
    this.s = 0;
  }

  selectionSort()
  {
    if (this.i >= this.list.length) {
      this.sorting = false;
      return;
    }
    if (this.j >= this.list.length) {
      this.swap(this.i, this.s);
      this.i++;
      this.s = this.i;
      this.j = this.i;
    }
    if (this.i >= this.list.length) {
      this.sorting = false;
      return;
    }

    if (this.list[this.j] < this.list[this.s]) {
      this.s = this.j;
    }

    this.j++;
  }

  initializeInsertionSort()
  {
    this.i = 0;
    this.j = 0;
  }

  insertionSort()
  {
    if (this.i >= this.listSize) {
      this.sorting = false;
      return;
    }
    
    if (this.j > 0 && this.list[this.j] < this.list[this.j-1]) {
      this.swap(this.j, this.j-1);
      this.j--;
    } else {
      this.i++;
      this.j = this.i;
    }
  }

  initializeQuickSort()
  {
    this.tempList = [...this.list];
    this.lowHighs = [];

    this.lowHighIndex = 0;
    this.preQuickSort(0, this.tempList.length - 1);
    this.resetQuickSortVariables();
  }

  quickSort()
  {
    if (this.i >= this.high) {
      this.swap(this.j, this.high);
      this.lowHighIndex++;

      if (this.lowHighIndex >= this.lowHighs.length) {
        this.sorting = false;
        return;
      }
      this.resetQuickSortVariables();
    }

    if (this.lowHighIndex >= this.lowHighs.length) {
      this.sorting = false;
      return;
    }

    if (this.list[this.i] < this.pivot) {
      this.swap(this.i, this.j);
      this.j++;
    }

    this.i++;
  }

  resetQuickSortVariables()
  {
    this.low = this.lowHighs[this.lowHighIndex].low;
    this.high = this.lowHighs[this.lowHighIndex].high;
    this.pivot = this.list[this.high];
    this.i = this.low;
    this.j = this.low;
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
    this.lowHighs.push({low, high});
    const pivot = this.tempList[high];
    let j = low;
    for (let i=low;i<high;i++) {
      if (this.tempList[i] < pivot) {
        this.swapTempList(i, j);
        j++;
      }
    }
    this.swapTempList(j, high);
    return j;
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