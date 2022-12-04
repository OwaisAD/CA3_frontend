function isValidDate(dateString)
{
    const date = new Date()
    const currentYear = date.getUTCFullYear()
    const currentDay = date.getUTCDate()
    const currentMonth = date.getUTCMonth()+1

    // First check for the pattern
    if(!(/^\d{4}-\d{2}-\d{2}$/.test(dateString))) { //THIS DOESN'T WORK
        return false;
    }
    
    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    
    // Check the ranges of month and year
    if(year < currentYear || year > 2030 || month == 0 || month > 12) {
        return false;
    }

    if(month < currentMonth && year <= currentYear) {
        return false;
    }

    if(day < currentDay && year <= currentYear) {
        return false;
    }

    return true;    
}
export {
    isValidDate,
}