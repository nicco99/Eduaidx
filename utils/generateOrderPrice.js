const generateOrderPrice = (noOfPages, level, deadlineTime) => {
    // Prices based on level
    let levelPrices = {
        college: 7,
        undergraduate: 10,
        masters: 15,
        phd: 20
    };

    // Deadlines multipliers
    let deadlines = {
        hours24: 0.5,
        hours48: 0.25,
    };

    // Get the current time
    const currentTime = new Date();

    // Parse the provided deadline time (assuming deadlineTime is in hours)
    let deadlineDate = new Date(currentTime);
    deadlineDate.setHours(currentTime.getHours() + parseInt(deadlineTime.replace('hours', '')));

    // Calculate the time difference (in milliseconds)
    let timeDiff = deadlineDate - currentTime;
    
    // Convert time difference to hours
    let hoursLeft = timeDiff / (1000 * 60 * 60); // Convert from milliseconds to hours

    // Determine the deadline factor based on hours left
    let deadlineFactor = 1; // Default factor if the time is over
    if (hoursLeft > 0) {
        // Determine deadline factor based on hours remaining
        if (hoursLeft <= 24) {
            deadlineFactor = deadlines.hours24;
        } else if (hoursLeft <= 48) {
            deadlineFactor = deadlines.hours48;
        }
    } else {
        console.log("Deadline has passed. Cannot process the order.");
        return;
    }

    // Use a switch statement to calculate the price based on level
    let levelPrice;

    switch (level) {
        case "college":
            levelPrice = levelPrices.college;
            break;
        case "undergraduate":
            levelPrice = levelPrices.undergraduate;
            break;
        case "masters":
            levelPrice = levelPrices.masters;
            break;
        case "phd":
            levelPrice = levelPrices.phd;
            break;
        default:
            levelPrice = 0; // Return 0 if invalid level
            break;
    }

    // Calculate the final price
    const price = noOfPages * levelPrice * deadlineFactor;

    console.log(`Time left: ${hoursLeft.toFixed(2)} hours`);
    console.log(`Price: $${price.toFixed(2)}`);
};

// Example usage:
generateOrderPrice(1, "college", "hours24");
