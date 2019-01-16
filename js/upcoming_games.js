/* jshint node: true */
/* jshint browser: true */
"use strict";

/* 
   Calender for upcoming-games
   Author: James Jutt
*/

// Set Date According to computers Date
// Today variable works with "date" arguement for init(date), gameCaption(date), and tableRows(date)
let today = new Date();

// Write finished games calender to page ("upcoming-games")
document.getElementById("upcoming-games").innerHTML = init(today);

// Function to run all functions to create games calender
function init(date) {
   let tableStart = "<table id='games-table'>";
   // Run gameCaption(date) to tableStart to calcualte current month and year
   tableStart += gameCaption(date);
   // Run gameAbb() to tableStart to create weekday table header
   tableStart += gameAbb();
   // Run tableRows(date) to tableStart to create table rows for each day
   tableStart += tableRows(date);
   // Close table element after every function starts
   tableStart += "</table>";
   // Return tableStart value
   return tableStart;
}

// Function to find current month and year based on machines local time
function gameCaption(date) {
   // Array of the months 
   let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   // Find the current month to correspond with monthArray array
   let currentMonth = date.getMonth();
   // Finds the current year according to machines local time
   let currentYear = date.getFullYear();
   // Writes current Month and Year at the top of the "games-table"
   return "<caption>" + monthArray[currentMonth] + " " + currentYear + "</caption>";
}

// Function to create table header weekday abbreviations
function gameAbb() {
   // Array of day names abbreviations
   let dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   // Initialize table row <tr> for days of week
   let rowHTML = "<tr>";
   // dayOfWeek arrays length is 7
   // Loops through array and creates table header for each day of the week
   for (let i = 0; i < dayOfWeek.length; i++) {
      // Creates 7 table headers for each day of the week
      rowHTML += "<th class='game-weekdays'>" + dayOfWeek[i] + "</th>"; 
   }
   // After i is equal to 6 table row <tr> closes
   rowHTML += "</tr>";
   // Return too hold value after the loop is done and table row is close 
   return rowHTML;
}

// Calculate thenumber of days in the month
function daysInMonth(date) {
   // Array of days in each month
   let days = [31,28,31,30,31,30,31,31,30,31,30,31];
   // Current month according to machines local time
   let currentMonth = date.getMonth();
   // Returns the number of days for the current month
   return days[currentMonth];
}

// Function to write table rows for each day of the month
function tableRows(date) {
   // Sets the first day of each month
   let findDay = new Date(date.getFullYear(), date.getMonth());
   // Finds current day accord to "findDay" variable
   let weekDay = findDay.getDay(); 
   // Create table cells for each day   
   let cells = "<tr>";
      for (let i = 0; i < weekDay; i++) {
         cells += "<td></td>";
      }
      // totalDays stores the amount of days in current month [0-30] with 0 equaling 1st day
      let totalDays = daysInMonth(date);
      let currentDay = date.getDate();
      // Loops through total days
      for (let i = 1; i <= totalDays; i++) {
         findDay.setDate(i);
         // Determines the weekday on which each day falls on
         weekDay = findDay.getDay();
         // If the day is Sunday the first day of the week, create 
         if (weekDay === 0) cells += "<tr>";
         // Conditional if statement to check if i is equal to current day
         if (i === currentDay) {
            // If "i" day is current day than highlight day and create table cell 
            cells += "<td class='game-dates' id='game-today'>" + i + gameDay[i] + "</td>"; 
         } else {
            // gameDay[0-30] variable is from games.js file to write the games in the table cells
            cells += "<td class='game-dates'>" + i + gameDay[i] + "</td>";
         }
      // Once weekDay is equal to 6 the last day of the week close out table row
      if (weekDay === 6) cells += "</tr>";
      }
      // Return cells value after every pass though the loop
      return cells;
}