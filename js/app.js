import DrawHelper from './DrawHelper.js';
import Simulation from './Simulation.js';
import EventHelper from './EventHelper.js';
import AudioHelper from './Sort/AudioHelper.js';

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const simulation = new Simulation(canvas);
  const drawHelper = new DrawHelper(simulation);
  const audioHelper = new AudioHelper(simulation);
  const eventHelper = new EventHelper(simulation, drawHelper, audioHelper);
  eventHelper.initialize();

  setInterval(() => {
    const isSorting = simulation.sorting;
    simulation.update();
    if (!simulation.sorting && isSorting) {
      eventHelper.initializeSimulation();
    }
    requestAnimationFrame(drawHelper.draw);
    audioHelper.playSound();
  }, 20);
}