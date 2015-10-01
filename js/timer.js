/**
 * NOTE:  TimerClass.js and TimerCollectionClass.js must be loaded in order for this
 *        script to work.
 */

/********************
 * Script variables *
 *******************/

// Timer collection instance
var timers = new TimerCollection();

// Interval function reference variable
var handle;

// Interval function invertal in milliseconds
var INTERVAL = 100;


/********************
 * Script functions *
 *******************/

// Function to create a new timer and update setup view
function registerTimer(txtId, txtLabel, txtDuration, txtOffset)
{
    // Get the ID value
    id = parseInt($(txtId).val());

    // The id value is required for this function and it needs to be an integer > 0 && <= 3
    if (typeof id == 'number' && isFinite(id) && id % 1 === 0 && id > 0 && id <= 3)
    {
        // Make a new timer
        var timer = timers.Create();

        // Set timer values
        timer.Id = id;
        timer.Description = $(txtLabel).val();
        timer.Duration = parseInt($(txtDuration).val()) * 60 * 1000; // convert to milliseconds
        timer.Offset   = parseInt($(txtOffset).val()) * 60 * 1000;   // convert to milliseconds

        // Clear contents of current Add Timer panel
        $('#pnlAddTimer' + id).html('');

        // Show next Add Timer panel, if we haven't reached our limit
        if (id + 1 <= 3)
        {
            // Set next Add Timer panel contents from template div
            $('#pnlAddTimer' + (id + 1)).html($('#tmplAddTimer').html());

            // Increment ID of Add Timer panel
            $('#txtId').val(id + 1);
        }
    }

    // Replace contents of current Add Timer panel
    var html = '<div class="panel panel-default">';
    html += '\n<div class="panel-heading">';
    html += '\n<h3 class="panel-title">Timer ' + id + '</h3>';
    html += '\n</div>';
    html += '\n<div class="panel-body">';
    html += '\n<form>';
    html += '\n<input type="hidden" name="txtId' + id + '" id="txtId' + id + '" value="' + id + '">';
    html += '\n<div class="form-group">';
    html += '\n<input type="text" class="form-control" disabled name="txtLabel' + id + '" id="txtLabel' + id + '" value="' + timer.Description + '">';
    html += '\n</div>';
    html += '\n<div class="form-group">';
    html += '\n<input type="text" class="form-control" disabled name="txtDuration' + id + '" id="txtDuration' + id + '" value="' + (timer.Duration / 60 / 1000) + '">';
    html += '\n</div>';
    html += '\n<div class="form-group">';
    html += '\n<input type="text" class="form-control" disabled name="txtOffset' + id + '" id="txtOffset' + id + '" value="' + (timer.Offset / 60 / 1000) + '">';
    html += '\n</div>';
    html += '\n</form>';
    html += '\n</div>';
    html += '\n</div>';

    $('#pnlAddTimer' + id).html(html);

    // Return false for onclick
    return false;
}

// Function to show/hide Timer View
function toggleView()
{
    // Get timer view div
    var view = $('#pnlTimerView');

    // Toggle visibility via CSS and bind timers to their html elements
    if (view.hasClass('hidden'))
    {
        bindTimers();
        view.removeClass('hidden');
    }
    else
        view.addClass('hidden');
}

// Function to link timers to their html elements
function bindTimers()
{
    // Call TimerCollection.Bind method with CSS selector prefixes for html elements
    timers.Bind('#pnlTimer', '#lblDescription', '#lblCountDown');
}

// Function to bump and show next timer
function showNextTimer()
{
    // Rotate timers on-screen
    var timer = timers.Bump();

    // Show label for top-half div
    if (timer)
        timer.Panel.removeClass('hidden');

    // Return false for onclick
    return false;
}

// Function to start all timers
function startTimers()
{
    // Only start if not running already (i.e. no reference to setInterval)
    if (!handle)
    {
        // Call Timers.Start method to set end times
        timers.Start();

        // Set interval function to update timers
        handle = setInterval(function () { timers.Refresh(); }, 100);

        // Make sure at least first timer is showing
        $('#pnlTimer1').removeClass('hidden');
        $('#lblCountDown1').removeClass('hidden');

        // Hide start button, show stop button
        $('#btnStartTimers').addClass('hidden');
        $('#btnStopTimers').removeClass('hidden');
    }

    // Return false for onclick
    return false;
}

// Function to stop all timers
function stopTimers()
{
    clearInterval(handle);
    handle = null;

    // Hide stop button, show start button
    $('#btnStopTimers').addClass('hidden');
    $('#btnStartTimers').removeClass('hidden');

    // Return false for onclick
    return false;
}