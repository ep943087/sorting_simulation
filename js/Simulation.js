class Simulation
{
  static BUBBLE_SORT = "bubbleSort";
  static SELECTION_SORT = "selectionSort";
  static INSERTION_SORT = "insertionSort";

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

  swap(i, j)
  {
    const temp = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = temp;
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