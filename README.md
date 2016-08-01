# Event Timer

## Installation

* Download zip file from GitHub (https://github.com/tjdeckard/timer)
* Extract zip file to a folder on your computer
* Open the index.html file in a web browser

## Usage

The program is setup to run 3 timers, with each timer automatically starting after a fixed time has elapsed from the start of the previous timer. There are 2 'views', setup view and timer view.

### Setup View

On this screen, you can configure the timers with a description, a duration and a start delay. This app was designed to run exactly 3 timers. Running just 1 or 2 timers MAY work but it hasn't been tested and wasn't designed with that scenario in mind. Once the timers are setup, switch to Timer View to begin the timers. Once the timers have been configured, the only way to 'reset' them is to refresh the page in the web browser and start over.

### Timer View

This screen was designed to have a minimal, barely visible UI. Controls are located at the bottom of the screen in dark grey. The app was designed for a very specific flow:

* Begin by clicking Show Next to display the label of the first timer.
* Click Start Timers! to begin the first timer.
* Click the Show Next button to display the label of the second timer.
** This timer will automatically start after the configured time and will display a 20 second countdown before it starts.
* Click the Show Next button to display the label of the third timer.
** Again, the timer will automatically start on its own.
* Click Show Next to cycle back to Timer 1 once all 3 timers have started.
* Once Timer 1 expires, click Show Next to focus Timer 2.
* Once Timer 2 expries, click Show Next to focus Timer 3.