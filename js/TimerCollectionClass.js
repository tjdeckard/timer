/**
 * NOTE: TimerClass.js must be loaded in order for this class to work
 */

// TimerCollection class
function TimerCollection() {
    // Class properties
    this.Timers = new Array();
}

// TimerCollection class methods

// Method to create new timer
TimerCollection.prototype.Create = function () {
    // Make a new Timer instance
    var timer = new Timer();

    // Start tracking timer
    this.Timers.push(timer);

    // Return the new timer instance
    return timer;
};

// Method to return collection size
TimerCollection.prototype.Count = function () {
    return this.Timers.length;
};

// Method to bind html display elements to each timer
TimerCollection.prototype.Bind = function (panel, label, countdown) {
    // Loop through timers
    this.Timers.forEach(function (timer) {
        // Bind html elements via jQuery by combining CSS selector prefixes with timer Id
        timer.Panel = $(panel + timer.Id);
        timer.Label = $(label + timer.Id);
        timer.CountdownLabel = $(countdown + timer.Id);

        // Set the label text from timer description
        timer.UpdateLabel(timer.Description);

        // Bump to appropriate starting position on screen
        //  Note: These will get bumped one more time before timer starts,
        //        so start one position behind intended starting position.
        switch (timer.Id)
        {
            case 1:
                timer.Panel.addClass('bottom-left-quad');
                break;
            case 2:
                timer.Panel.addClass('bottom-right-quad');
                break;
            default:
                timer.Panel.addClass('top-half');
                break;
        }
    });
};

// Method to shift timers to the next spot on screen
//   and return the timer currently in the top-half div
TimerCollection.prototype.Bump = function () {
    var topTimer;

    this.Timers.forEach(function (timer) {
        timer.Bump();
        if (timer.Panel.hasClass('top-half'))
            topTimer = timer;
    });

    return topTimer;
};

// Method to find a timer by id
TimerCollection.prototype.Find = function (id) {
    var timer;

    this.Timers.forEach(function (t) {
        if (t.Id == id)
            timer = t;
    });

    return timer;
};

// Method to set end times for timers (this effectively initiates the countdown)
TimerCollection.prototype.Start = function () {
    // Get current time
    var now = new Date();

    // Define a variable to reference previous timer
    var previous = null;

    // Set end times for each timer
    this.Timers.forEach(function (timer) {
        // If there is no previous timer set, this is the first timer and won't have an offset
        if (!previous) {
            timer.StartTime.setTime(now.getTime());
            timer.EndTime.setTime(timer.StartTime.getTime() + timer.Duration);
        }
        // Base start/end times off the previous timer
        else
        {
            timer.StartTime.setTime(previous.StartTime.getTime() + timer.Offset);
            timer.EndTime.setTime(timer.StartTime.getTime() + timer.Duration);
        }

        // Cache this timer as previous
        previous = timer;
    });

    // Make sure first timer is visible 
};

// Method to refresh timer view (usually called by a setInterval method)
TimerCollection.prototype.Refresh = function () {
    this.Timers.forEach(function (timer) {
        timer.Refresh();
    });
};
