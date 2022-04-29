class AbstractSort
{
  constructor(simulation)
  {
    if (this.constructor === AbstractSort) {
      throw new Error('Abstract classes can\'t be instantiated');
    }
    this.simulation = simulation;
  }

  update()
  {
    throw new Error('Method \'sortIteration()\' must be implemented.');
  }

  initialize()
  {
    throw new Error('Method \'initialize()\' must be implemented.');
  }
}

export default AbstractSort;