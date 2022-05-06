class EventHelper
{
  static START = "start";
  static STOP = "stop";
  static CONTINUE = "continue";

  constructor(simulation, drawHelper, audioHelper)
  {
    this.simulation = simulation;
    this.drawHelper = drawHelper;
    this.audioHelper = audioHelper;
  }

  initialize()
  {
    this.initializeSelectors();
    this.initializeEventListener();
    this.initializeSimulation();
  }

  initializeSelectors()
  {
    this.startButton = document.querySelector("#startButton");
    this.continueButton = document.querySelector("#continueButton");
    this.stopButton = document.querySelector("#stopButton");
    this.scrambleButton = document.querySelector("#scrambleButton");
    this.sortType = document.querySelector("#sortType");
    this.drawType = document.querySelector("#drawType");
    this.listSize = document.querySelector("#listSize");
    this.speed = document.querySelector('#speed');
    this.image = document.querySelector('#image');
  }

  initializeEventListener()
  {
    this.startButton.addEventListener('click', this.handleStartButtonClicked);
    this.stopButton.addEventListener('click', this.handleStopButtonClicked);
    this.continueButton.addEventListener('click', this.handleContinueButtonClicked);
    this.scrambleButton.addEventListener('click', this.handleScrambleButtonClicked); 
    this.sortType.addEventListener('change', this.handleSortTypeChange);
    this.drawType.addEventListener('change', this.handleDrawTypeChange);
    this.listSize.addEventListener('change', this.handleListSizeChange);
    this.speed.addEventListener('change', this.handleSpeedChange);
    this.image.addEventListener('change', this.handleImageChange);
    window.addEventListener('resize', () => {
      this.drawHelper.initializeImages();
    })
  }

  handleStartButtonClicked = () =>
  {
    this.audioHelper.initialize();
    this.simulation.start();
    this.showStopButton();
  }

  handleContinueButtonClicked = () =>
  {
    this.audioHelper.initialize();
    this.simulation.continue();
    this.showStopButton();
  }

  handleStopButtonClicked = () =>
  {
    this.simulation.stop(() => {
      this.showContinueButton();
    });
  }

  handleScrambleButtonClicked = () => 
  {
    this.simulation.scramble();
    this.showStartButton();
  }

  handleSortTypeChange = (event) => 
  {
    this.simulation.stop(() => {
      this.simulation.scramble();
      this.simulation.setSortType(event.target.value)
      this.showStartButton();
    });
  }

  handleDrawTypeChange = (event) =>
  {
    this.drawHelper.setDrawType(event.target.value);
  }

  handleListSizeChange = (event) =>
  {
    const listSize = parseInt(event.target.value)
    this.simulation.setListSize(listSize);
    this.showStartButton();
  }

  handleSpeedChange = (event) =>
  {
    const speed = parseInt(event.target.value);
    this.simulation.setSpeed(speed);
  }

  handleImageChange = (event) =>
  {
    this.drawHelper.setImage(event.target.value);
  }

  initializeSimulation()
  {
    this.showStartButton();
  }

  showStartButton()
  {
    this.showButtons([EventHelper.START]);
  }

  showStopButton()
  {
    this.showButtons([EventHelper.STOP]);
  }

  showContinueButton()
  {
    this.showButtons([EventHelper.CONTINUE]);
  }

  showButtons(buttonsToShow)
  {
    this.showButton(this.startButton, buttonsToShow, EventHelper.START);
    this.showButton(this.stopButton, buttonsToShow, EventHelper.STOP);
    this.showButton(this.continueButton, buttonsToShow, EventHelper.CONTINUE);
  }

  showButton(button, buttonsToShow, buttonName) {
    if (buttonsToShow.includes(buttonName)) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  }
}

export default EventHelper;