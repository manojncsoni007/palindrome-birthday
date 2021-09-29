const showBtn = document.querySelector('#show');
const inputDate = document.querySelector('#input-date');
const outputBox = document.querySelector('.output-container');

function reverseString(str) {
    return str.split('').reverse().join('');
}

function isPalindrome(str) {
    const reverse = reverseString(str);
    if (str === reverse) {
        return true;
    }
    return false;
}

function convertDateToString(date) {
    let dateStr = { day: '', month: '', year: '' }
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;

}

function getAllDateFormats(date) {
    let dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormates(date) {
    let palindromeList = getAllDateFormats(date);
    let isItPalindrome = false;

    for (let i = 0; i < palindromeList.length; i++) {
        if (isPalindrome(palindromeList[i])) {
            isItPalindrome = true;
            break;
        }
    }
    return isItPalindrome;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const dayInMonths = [31, 28, 31, 30, 31, 30, 31, 37, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > dayInMonths[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindromeForAllDateFormates(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate]
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    const dayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            day = dayInMonths[month - 1];
            month--;
        }
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date) {
    let counter = 0;
    let priviousDate = getPreviousDate(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindromeForAllDateFormates(priviousDate);
        if (isPalindrome) {
            break;
        }
        priviousDate = getPreviousDate(priviousDate);
    }
    return [counter, priviousDate];
}


var date = {
    day: 31,
    month: 12,
    year: 2020
}

// console.log(getPreviousDate(date));
// console.log(date)
// console.log(getNextDate(date))



showBtn.addEventListener('click', () => {
    let bdayInput = inputDate.value;
    console.log(bdayInput);

    if (bdayInput !== '') {
        let listOfDate = bdayInput.split('-');

        const date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        let isPalindrome = checkPalindromeForAllDateFormates(date);

        if (isPalindrome) {
            outputBox.innerText = 'Yes, your birthday is palindrome 🥳🥳';
        } else {
            const [counter, nextDate] = getNextPalindromeDate(date);
            const [counter1, previousDate] = getPreviousPalindromeDate(date);
            outputBox.innerHTML = `<p>The Next palindrome date is <span>${nextDate.day}-${nextDate.month}-
            ${ nextDate.year}</span>, you missed it by ${counter} days 🥺</p><br>
            <p>The Previous Palindrome date is <span>${previousDate.day}-${previousDate.month}-${previousDate.year}</span></p>`;
        }
    }
    // outputBox.innerText = input;
});