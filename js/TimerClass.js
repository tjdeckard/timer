// Extension method for String class
String.prototype.zeroFill = function (length) {
    var str = this;
    while (str.length < length)
        str = '0' + str;

    return str;
}

// Timer class
function Timer() {
    // Class properties
    this.Id = null;
    this.Description = '';
    this.Duration = null;
    this.Offset = 0;
    this.StartTime = new Date();
    this.EndTime = new Date();
    this.PreCountdownOffset = 21 * 1000; // in milliseconds
    this.FinalCountdownOffset = 21 * 1000; // in milliseconds
    this.Label = null;
    this.Panel = null;
    this.CountdownLabel = null;
    this.IsStarted = false;
    this.IsStarting = false;
    this.IsFinishing = false;
    this.IsFinished = false;
    this.IsAnimating = false;
    this.AnimateClass = 'timer2';
}

/* Timer class methods */

// Method to shift timer to the next spot on screen
Timer.prototype.Bump = function () {
    if (this.Panel.hasClass('top-half'))
    {
        this.Panel.removeClass('top-half');
        this.Panel.addClass('bottom-right-quad');
    }
    else if (this.Panel.hasClass('bottom-left-quad'))
    {
        this.Panel.removeClass('bottom-left-quad');
        this.Panel.addClass('top-half');
    }
    else if (this.Panel.hasClass('bottom-right-quad'))
    {
        this.Panel.removeClass('bottom-right-quad');
        this.Panel.addClass('bottom-left-quad');
    }
};

// Method to get remaining time as a formatted string
Timer.prototype.GetRemainingTime = function () {
    var now = new Date();

    // Update timer status properties
    this.IsStarting = now < this.StartTime && now.getTime() >= this.StartTime.getTime() - this.PreCountdownOffset;
    this.IsStarted = now >= this.StartTime;
    this.IsFinishing = now < this.EndTime && now.getTime() >= this.EndTime.getTime() - this.FinalCountdownOffset;
    this.IsFinished = now >= this.EndTime;

    // If timer has started or is within 21 seconds of starting and hasn't expired...
    if ((this.IsStarting || this.IsStarted) && !this.IsFinished)
    {
        var totalSeconds;

        // If timer has started, return normal countdown
        if (this.IsStarted)
        {
            // Date substraction returns the difference in milliseconds, and Date.setTime() gives us a weird result
            //   So we'll have to parse it out manually
            totalSeconds = ~~((this.EndTime - now) / 1000);  // convert from milliseconds to seconds, drop remainder
        }
        // Otherwise, if we are close to starting, return a pre-countdown
        else
        {
            totalSeconds = ~~((this.StartTime - now) / 1000);  // convert from milliseconds to seconds, drop remainder

            // Make sure timer is visible
            this.CountdownLabel.removeClass('hidden');
        }

        var totalMinutes = ~~(totalSeconds / 60);  // get total minutes, drop remainder
        var totalHours = ~~(totalMinutes / 60); // get total hours, drop remainder

        var minutes = totalMinutes - (totalHours * 60);
        var seconds = totalSeconds - (totalMinutes * 60);

        return totalHours + ':' + String(minutes).zeroFill(2) + ':' + String(seconds).zeroFill(2);
    }
    else
        return '0:00:00';
};

// Method to update the timer label span
Timer.prototype.UpdateLabel = function (value) {
    this.Label.html(value);
};

// Method to update the timer countdown span
Timer.prototype.Refresh = function () {
    this.CountdownLabel.html(this.GetRemainingTime());

    // If timer is in Finishing state, add a 'flashing' animation
    if (this.IsFinishing && !this.IsFinished)
    {
        if (!this.IsAnimating)
        {
            if (this.CountdownLabel.hasClass(this.AnimateClass))
            {
                this.IsAnimating = true;
                this.CountdownLabel.removeClass(
                    this.AnimateClass,
                    'slow',
                    function () { this.IsAnimating = false; }
                );
            }
            else
            {
                this.IsAnimating = true;
                this.CountdownLabel.addClass(
                    this.AnimateClass,
                    'slow',
                    function () { this.IsAnimating = false; }
                );
            }
        }
    }
};