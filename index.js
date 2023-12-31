const container = document.getElementById("calendar-container");
const monthE = document.getElementById("month");
const weekdayE = document.getElementById("weekday");
const TODAY = new Date();

const diff = 357;
const START_DATE = new Date(TODAY.getTime() - diff * 24 * 60 * 60 * 1000);

function renderHeatmap(data) {
    // Размеры календаря
    const daysPerWeek = 7;
    const weeks = Math.ceil((TODAY - START_DATE) / (7 * 24 * 60 * 60 * 1000));
    const totalDays = weeks * daysPerWeek;

    // Месяцы
    let currentMonth = START_DATE.getMonth();
    for (let i = 0; i < weeks; i++) {
        if (currentMonth !== START_DATE.getMonth() + Math.floor(i / 4)) {
            const monthLabel = document.createElement("span");
            monthLabel.classList.add("month-label");

            const monthNames = ["Янв.","Фев.","Март","Апр.","Май","Июнь","Июль","Авг.","Сент.","Ост.","Нояб.","Дек."];
            const theMonthLabel = new Date(
                START_DATE.getTime() + i * 7 * 24 * 60 * 60 * 1000
            ).getMonth();
            monthLabel.textContent = monthNames[theMonthLabel]

            // monthLabel.textContent = new Date(
            //     START_DATE.getTime() + i * 7 * 24 * 60 * 60 * 1000
            // ).toLocaleString("default", { month: "short" });

            monthE.appendChild(monthLabel);
            currentMonth = START_DATE.getMonth() + Math.floor(i / 4);


        }
    }

    // Недели
    for (let i = 0; i < weeks; i++) {
        // const weekLabel = document.createElement("span");
        // weekLabel.classList.add("week-label");
        // weekLabel.textContent = `Week ${i + 1}`;
        // container.appendChild(weekLabel);

        for (let j = 0; j < daysPerWeek; j++) {
            const day = document.createElement("div");
            day.classList.add("day");

            const currentDate = new Date(
                START_DATE.getTime() + (i * 7 + j) * 24 * 60 * 60 * 1000
            );
            const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD format

            // количество коммитов при наведении мышки
            const commitCount = data[formattedDate] || 0;

            day.style.backgroundColor = getCommitColor(commitCount);

            day.addEventListener("mouseover", () => {
                // day.textContent = commitCount;
                // day.textContent = formattedDate;

                // const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                const weekdayNames = ["Вс","Пн","Вт","Ср","Чт","Пт","Суб"];
                const theDay = weekdayNames[currentDate.getDay()];

                // const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const monthNames = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Остябрь","Ноябрь","Декабрь"];
                const theMonth = monthNames[currentDate.getMonth()];

                day.innerHTML += `<div id="tk1" class="pop-up"><span>${commitCount} contributions</span>,<br> ${theDay}, ${theMonth} ${currentDate.getDate()}, ${currentDate.getFullYear()}</div>`;
                // day.style.color='green'">Click for green</button>

                const divStyle = document.getElementById("tk1");
                divStyle.setAttribute("style", "background-color: black; opacity: .8;");
            });

            day.addEventListener("mouseout", () => {
                day.textContent = "";
                // day.innerHTML = "";
            });

            if (currentDate.toDateString() === TODAY.toDateString()) {
                day.classList.add("today");
            }

            container.appendChild(day);


        }
    }
}

function getCommitColor(commitCount) {
    if (commitCount === 0) {
        return "#EDEDED";
    } else if (commitCount <= 9) {
        return "#ACD5F2";
    } else if (commitCount <= 19) {
        return "#7FA8C9";
    } else if (commitCount <= 29) {
        return "#527BA0";
    } else {
        return "#254E77";
    }
}



// Дата из json file

// const testData = {
//     "2022-10-26": 13,
//     "2022-10-27": 6,
//     "2022-10-28": 11,
//     "2022-10-29": 2,
//     "2022-11-02": 3,
//     "2022-11-03": 1,
//     "2022-11-07": 4,
//     "2022-11-08": 11,
//     "2022-11-09": 1,
//     "2022-11-10": 9,
//     "2022-11-11": 10,
//     "2022-11-15": 4,
//     "2022-11-16": 1,
//     "2022-11-17": 2,
//     "2022-11-18": 3,
//     "2022-11-21": 8,
//     "2022-11-22": 2,
//     "2022-11-23": 3,
//     "2022-11-24": 5,
//     "2022-11-25": 8,
//     "2022-11-29": 3,
//     "2022-11-30": 6,
//     "2022-12-01": 5,
//     "2022-12-02": 3,
//     "2022-12-05": 4,
//     "2022-12-06": 1,
//     "2022-12-07": 5,
//     "2022-12-08": 5,
//     "2022-12-09": 2,
//     "2022-12-12": 1,
//     "2022-12-13": 10,
//     "2022-12-15": 3,
//     "2022-12-19": 1,
//     "2022-12-20": 2,
//     "2022-12-27": 1,
//     "2022-12-28": 1,
//     "2022-12-29": 6,
//     "2022-12-30": 9,
//     "2023-01-09": 7,
//     "2023-01-10": 2,
//     "2023-01-11": 5,
//     "2023-01-12": 14,
//     "2023-01-13": 3,
//     "2023-01-16": 7,
//     "2023-01-17": 9,
//     "2023-01-18": 2,
//     "2023-01-20": 6,
//     "2023-01-23": 6,
//     "2023-01-24": 2,
//     "2023-01-26": 6,
//     "2023-01-27": 1,
//     "2023-01-30": 4,
//     "2023-01-31": 1,
//     "2023-02-02": 5,
//     "2023-02-03": 4,
//     "2023-02-06": 6,
//     "2023-02-07": 5,
//     "2023-02-08": 4,
//     "2023-02-09": 4,
//     "2023-02-10": 2,
//     "2023-02-13": 5,
//     "2023-02-14": 1,
//     "2023-02-15": 2,
//     "2023-02-17": 6,
//     "2023-02-20": 7,
//     "2023-02-21": 6,
//     "2023-02-22": 8,
//     "2023-02-27": 3,
//     "2023-02-28": 1,
//     "2023-03-01": 2,
//     "2023-03-03": 39,
//     "2023-03-06": 14,
//     "2023-03-07": 6,
//     "2023-03-09": 7,
//     "2023-03-10": 7,
//     "2023-03-13": 19,
//     "2023-03-14": 21,
//     "2023-03-15": 8,
//     "2023-03-17": 1,
//     "2023-03-20": 8,
//     "2023-03-21": 8,
//     "2023-03-22": 7,
//     "2023-03-23": 7,
//     "2023-03-24": 4,
//     "2023-03-27": 1,
//     "2023-03-28": 7,
//     "2023-03-29": 4,
//     "2023-03-30": 12,
//     "2023-03-31": 5,
//     "2023-04-03": 1,
//     "2023-04-04": 2,
//     "2023-04-05": 1,
//     "2023-04-06": 7,
//     "2023-04-07": 1,
//     "2023-04-10": 5,
//     "2023-04-11": 2,
//     "2023-04-12": 1,
//     "2023-04-13": 1,
//     "2023-04-14": 2,
//     "2023-04-17": 1,
//     "2023-04-18": 2,
//     "2023-04-19": 4,
//     "2023-04-20": 1,
//     "2023-04-21": 1,
//     "2023-04-24": 3,
//     "2023-04-25": 1,
//     "2023-04-26": 1,
//     "2023-05-02": 1,
//     "2023-05-04": 4,
//     "2023-05-05": 1,
//     "2023-05-11": 1,
//     "2023-05-12": 2,
//     "2023-05-16": 1,
//     "2023-05-18": 2,
//     "2023-05-23": 2,
//     "2023-05-25": 1,
//     "2023-05-26": 2,
//     "2023-05-29": 1,
//     "2023-06-06": 1,
//     "2023-06-07": 7,
//     "2023-06-08": 5,
//     "2023-06-13": 2,
//     "2023-06-14": 2,
//     "2023-06-15": 1,
//     "2023-06-16": 5,
//     "2023-06-19": 2,
//     "2023-06-20": 1,
//     "2023-06-21": 1,
//     "2023-06-22": 5,
//     "2023-06-23": 3,
//     "2023-06-26": 2,
//     "2023-06-27": 3,
//     "2023-06-28": 6,
//     "2023-06-29": 8,
//     "2023-06-30": 8,
//     "2023-07-03": 5,
//     "2023-07-04": 2,
//     "2023-07-05": 2,
//     "2023-07-06": 1,
//     "2023-07-07": 10,
//     "2023-07-10": 4,
//     "2023-07-11": 3,
//     "2023-07-13": 2,
//     "2023-07-14": 1,
//     "2023-07-25": 1,
//     "2023-07-28": 5,
//     "2023-07-31": 3,
//     "2023-08-01": 3,
//     "2023-08-03": 3,
//     "2023-08-04": 8,
//     "2023-08-15": 1,
//     "2023-08-16": 3,
//     "2023-08-17": 2,
//     "2023-08-23": 1,
//     "2023-08-25": 2,
//     "2023-08-29": 5,
//     "2023-08-30": 5,
//     "2023-08-31": 3,
//     "2023-09-01": 1,
//     "2023-09-02": 3,
//     "2023-09-04": 1,
//     "2023-09-06": 9,
//     "2023-09-07": 19,
//     "2023-09-08": 13,
//     "2023-09-10": 3,
//     "2023-09-15": 1,
//     "2023-09-19": 1,
//     "2023-09-20": 1,
//     "2023-10-02": 1,
//     "2023-10-06": 2,
//     "2023-10-08": 1,
//     "2023-10-09": 3,
//     "2023-10-10": 7,
//     "2023-10-11": 2,
//     "2023-10-12": 1,
//     "2023-10-18": 2,
//     "2023-10-19": 7,
//     "2023-10-20": 13,
//     "2023-10-23": 4,
//     "2023-10-24": 3,
//     "2023-10-25": 2
//   }

var testData2 = {};

fetch("https://dpg.gg/test/calendar.json")
  .then(response => response.json())
  .then(data => {
    // console.log('Data fetched:', data);
    testData2 = data;
    
    // testData2 = Object.assign({"2022-12-25": 13,}, testData2);

    // return testData2;
    renderHeatmap(testData2);

    const margin = 18.4;
    // const margin = 0;
    if (START_DATE.getDay() < 1){
        var dayDiff = 6
    } else if (START_DATE.getDay() > 1)
        dayDiff = START_DATE.getDay() - 1;
    
    if (START_DATE.getDay() !== 1) {
        // console.log(START_DATE.getDay());
        // console.log(container.firstElementChild);
        container.firstElementChild.style.marginTop=`${margin*dayDiff}px`;
    } 

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// function stringifyKeys(data2) {
//     var newObj = {};
//     for (const key in data2) {
//       newObj[key.toString()] = data2[key]; // Convert key to string using toString()
//     }
//     return newObj;
//   }
// var stringifiedData = stringifyKeys(testData2);

// renderHeatmap(testData);

// const margin = 18.4;
// // const margin = 0;
// if (START_DATE.getDay() < 1){
//     var dayDiff = 6
// } else if (START_DATE.getDay() > 1)
//     dayDiff = START_DATE.getDay() - 1;

// if (START_DATE.getDay() !== 1) {
//     // console.log(START_DATE.getDay());
//     // console.log(container.firstElementChild);
//     container.firstElementChild.style.marginTop=`${margin*dayDiff}px`;
// } 
