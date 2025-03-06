
export const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const data = [
  {
    title: 'Improve Shape',
    details: 'I have a low amount of body fat and need / want to build more muscle',
    images: {
      dark: require('../assets/images/Illustrations/signin/avatar-male-3.png'),
      light: require('../assets/images/Illustrations/signin/avatar-male-3-light.png'),
    }
  },
  {
    title: 'Lean & Tone',
    details: 'I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way',
    images: {
      dark: require('../assets/images/Illustrations/signin/avatar-male-4.png'),
      light: require('../assets/images/Illustrations/signin/avatar-male-4-light.png'),
    }
  },
  {
    title: 'Lose a Fat',
    details: 'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass',
    images: {
      dark: require('../assets/images/Illustrations/signin/avatar-male-5.png'),
      light: require('../assets/images/Illustrations/signin/avatar-male-5-light.png'),
    }
  },
]

export const calculateBMI = (weight, heightCm) => {
   // Convert height from cm to meters
   const heightM = heightCm / 100;
  
   // Calculate BMI
   const bmi = weight / (heightM * heightM);
   
   // Determine the health range
   let healthRange;
   if (bmi < 18.5) {
     healthRange = 'Low';
   } else if (bmi >= 18.5 && bmi < 24.9) {
     healthRange = 'Normal';
   } else {
     healthRange = 'High';
   }
   
   return {
     bmi: bmi.toFixed(2), // Round the BMI to 2 decimal places
     healthRange: healthRange
   };
};

export const getFirstDecimalPlace = (num) => {
  // Convert the number to a string
  const numStr = num.toString();

  // Split the string at the decimal point
  const parts = numStr.split('.');

  // Check if there's a decimal part
  if (parts.length === 2) {
    // Get the first character of the decimal part
    const firstDecimalPlace = parts[1].charAt(0);
    return firstDecimalPlace;
  } else {
    // No decimal part, return 0 or any other default value you prefer
    return '0';
  }
};

export const notificationActions = [
  {action: 'lunch', image: require('../assets/images/lunch.png')}, 
  {action: 'workout', image: require('../assets/images/workout.png')}, 
  {action: 'exercise', image: require('../assets/images/workout-ended.png')}, 
  {action: 'meal', image: require('../assets/images/meal.png')},
  {action: 'drink', image: require('../assets/images/glass.png')},
]

export const dailyTargets = [
  {target: 'drink', image: require('../assets/images/glass.png'), action: '8L', title: 'Water Intake'}, 
  {target: 'steps', image: require('../assets/images/boots.png'), action: '2400', title: 'Foot Steps'}, 
  {target: 'snack', image: require('../assets/images/lunch.png'), action: 'Fitbar', title: 'Eat Snack'}, 
  {target: 'meal', image: require('../assets/images/meal.png'), action: 'Full Meal', title: 'Consume Meal'},
  {target: 'exercise', image: require('../assets/images/workout.png'), action: 'Full Body', title: 'Start Exercise'},
]

export const localNotifs = [
  {action: 'lunch', message: 'Hey, it’s time for lunch', date: 'About 1 minute ago'},
  {action: 'workout', message: 'Don’t miss your lowerbody workout', date: 'About 3 hours ago'},
  {action: 'meal', message: 'Hey, let’s add some meals for your body to energize your day', date: 'About 3 hours ago'},
  {action: 'exercise', message: 'Congratulations, You have finished A milestone you set 2 weeks ago', date: '29 May'},
  {action: 'lunch', message: 'Hey, it’s time for lunch', date: '8 April'},
  {action: 'workout', message: 'Ups, You have missed your Lowerbody exercise', date: '3 April'},
]

export const localNotifs2 = [
  {action: 'lunch', message: 'Eat Snack (Protein Shake)', date: 'About 1 minute ago'},
  {action: 'drink', message: 'Drinking 400ml water', date: 'About 40 minutes ago'},
  {action: 'workout', message: 'Lowerbody workout completed', date: 'About 3 hours ago'},
  {action: 'meal', message: ' Creating meals to energize your day', date: 'About 3 hours ago'},
  {action: 'exercise', message: 'Finished A milestone you set 2 weeks ago', date: '29 May'},
]

export function getDayOfWeek(timestamp) {
  const date = new Date(Math.floor(timestamp));
  return date.getDay();
}

export const processWeeklyData = (data, trackerType) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  

  let barData = days.map((label, index) => ({
    label,
    value: 100, 
    barVal: 5,
    frontColor: index%2 !== 0 ?  '#9F2E6E' : '#0F828A',
    gradientColor: index%2 !== 0 ?  '#9C23D7' : '#0F8A40',
  }))

  

  data.forEach((item) => {
    const dayIndex = item.day_of_week
    if(dayIndex >= 0 && dayIndex < 7) {
      barData[dayIndex].barVal = item.progress
    }
  })

  return barData
}

export const processMonthlyData = (data, trackerType) => {
  const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  

  let barData = months.map((label, index) => ({
    label,
    value: 100*60, 
    barVal: 5,
    frontColor: index%2 !== 0 ?  '#9F2E6E' : '#0F828A',
    gradientColor: index%2 !== 0 ?  '#9C23D7' : '#0F8A40',
  }))

  

  data.forEach((item) => {
    const monthIndex = item.month
    
    if(monthIndex >= 1 && monthIndex < 13) {
      barData[monthIndex - 1].barVal = item.totalProgress
    }
  })

  return barData
}

export function getMonthAndYear(timestamp) {
  const date = new Date(Math.floor(timestamp));
  return { month: date.getMonth() + 1, year: date.getFullYear() }; // getMonth() returns 0-11, so +1 to make it 1-12
}

export const generateDate = () => {
  const date = new Date();
  let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let weekDays = []
  for(let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i *24*60*60*1000).getDate(),
      day: weekDay[new Date(date.getTime() + i *24*60*60*1000).getDay()]
    };
    weekDays.push(tempDate)
  }
  return weekDays
}

// Function to format time in 12-hour AM/PM format
const formatTime = (hour) => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hourIn12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hourIn12}:00 ${suffix}`;
};

// Function to generate remaining hours for the current day and 24 hours for future days
export const generateHoursForWeek = () => {
  const today = new Date();
  const currentHour = today.getHours();
  let hoursList = [];

  for (let i = 0; i < 7; i++) {
    let dayHours = [];
    // If it's the current day, get the remaining hours
    if (i === 0) {
      for (let hour = currentHour + 1; hour < 24; hour++) {
        dayHours.push(formatTime(hour));
      }
    } else {
      // For other days, get the full 24-hour range
      for (let hour = 0; hour < 24; hour++) {
        dayHours.push(formatTime(hour));
      }
    }
    hoursList.push(dayHours);
  }
  return hoursList;
};

// Function to pair weekDays with weekHours
export const matchDaysWithHours = () => {
  const weekDays = generateDate();
  const weekHours = generateHoursForWeek();

  // Map each week day to its corresponding hours using the same index
  return weekDays.map((day, index) => ({
    day: day.day,         // e.g. 'Mon', 'Tue'
    date: day.date,       // e.g. 15, 16
    hours: weekHours[index], // Corresponding hours for that day
  }));
};

export const workoutData = [
  {key:'1', value:'Upperbody Workout',},
  {key:'2', value:'Lowerbody Workout'},
  {key:'3', value:'Fullbody Workout'},
]

export const difficultyData = [
  {key:'1', value:'Beginner'},
  {key:'2', value:'Intermediate'},
  {key:'3', value:'Advanced'},
]

export const repsData = [
  {key:'1', value:2},
  {key:'2', value:3},
  {key:'3', value: 4},
]

export const weightData = [
  {key:'1', value:'10 KG'},
  {key:'2', value:'15 KG'},
  {key:'3', value: '20 KG'},
  {key:'4', value: '25 KG'},
]


// Utility to normalize time, remove seconds if present

export const normalizeTime = (time) => {
    const [hourPart, minutePart] = time.split(':'); // Split the time into hours and minutes
    const isPM = time.toLowerCase().includes('pm'); // Check if it's AM or PM

    let formattedHour = hourPart.trim(); // Get the hour part
    let formattedMinutes = '00'; // Default minutes to '00' if none provided

    if (minutePart) {
        // Extract the minutes and AM/PM part
        const [minutes, ampm] = minutePart.split(' ');

        // If minutes exist, use them
        formattedMinutes = minutes ? minutes.padStart(2, '0') : '00';
    }

    // Return the time in HH:mm AM/PM format
    return `${formattedHour}:${formattedMinutes} ${isPM ? 'PM' : 'AM'}`;
};


export const scheduleFormat = (day) => {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const actualDay = date.getDay()

  const constructDate = new Date(year, month, day).getDay()
  let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  if(weekDay[constructDate] === weekDay[actualDay]){
    return `Today`
  } else if (weekDay[constructDate] === weekDay[actualDay + 1]){
    return `Tomorrow`
  } else {
    return `This ${weekDay[constructDate]}`
  }
  
}

export const barData = [
  {label: 'Sun', value: 5},
  {label: 'Mon', value: 47},
  {label: 'Tue', value: 70},
  {label: 'Wed', value: 99},
  {label: 'Thu', value: 45},
  {label: 'Fri', value: 51},
  {label: 'Sat', value: 91},
];