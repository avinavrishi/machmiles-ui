export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Function to get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

export const formatShortDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });

    return `${weekday}, ${day} ${month} ${year}`;
};

export const formatDateTime12hr = (timestamp) => {
    const date = new Date(timestamp);
    
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digit minutes
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });

    return `${hours}:${minutes}${ampm} ${weekday}, ${day} ${month} ${year}`;
};

//For converting minutes in duration:
export const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };