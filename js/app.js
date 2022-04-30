import DrawHelper from './DrawHelper.js';
import Simulation from './Simulation.js';
import EventHelper from './EventHelper.js';

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const simulation = new Simulation(canvas);
  const drawHelper = new DrawHelper(simulation);
  const eventHelper = new EventHelper(simulation, drawHelper);
  eventHelper.initialize();

  setInterval(() => {
    const isSorting = simulation.sorting;
    simulation.update();
    if (!simulation.sorting && isSorting) {
      eventHelper.initializeSimulation();
    }
    requestAnimationFrame(drawHelper.draw);
  }, 20);
}