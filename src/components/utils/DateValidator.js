function isValidDate(dateString)
{
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentDay = date.getDay()
    const currentMonth = date.getMonth()

    // First check for the pattern
    if(!(/^\d{4}-\d{2}-\d{2}$/.test(dateString))) { //THIS DOESN'T WORK
        return false;
    }
    console.log("HERE")


    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)

    // Check the ranges of month and year
    if(year < currentYear || year > 2060 || month == 0 || month > 12)
        return false;

    if(month < currentMonth || day < currentDay)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

export {
    isValidDate,
}