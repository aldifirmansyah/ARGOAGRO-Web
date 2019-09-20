const widthBarChart = 500;
const heightBarChart = 220;
const marginBarChart = 10;
const barPadding = 4;
const hortikulturaData = [
  { period: "Feb 2017", data: [4, 20, 15, 30, 10] },
  { period: "Mar 2017", data: [10, 23, 7, 19, 11] },
  { period: "Apr 2017", data: [3, 19, 17, 32, 14] },
  { period: "Mei 2017", data: [22, 3, 19, 11, 17] },
  { period: "Jun 2017", data: [12, 11, 9, 18, 20] },
  { period: "Jul 2017", data: [21, 23, 9, 19, 31] },
  { period: "Aug 2017", data: [23, 24, 12, 20, 33] },
  { period: "Sep 2017", data: [23, 21, 15, 22, 40] },
  { period: "Okt 2017", data: [25, 33, 19, 20, 39] },
  { period: "Nov 2017", data: [28, 33, 24, 22, 42] },
  { period: "Dec 2017", data: [31, 41, 30, 24, 51] }
];

function sum(arr) {
  return arr.reduce((acc, next) => acc + next, 0);
}

const biggestDataSum = hortikulturaData.reduce((acc, next) => {
  let total = sum(next.data);
  if (total > acc) acc = total;
  return acc;
}, 0);

let barWidth =
  (widthBarChart - 2 * marginBarChart) / hortikulturaData.length - barPadding;
let heightPerCount = (heightBarChart - 2 * marginBarChart) / biggestDataSum;

let svg = d3
  .select("#bar-chart-svg")
  .attr("width", widthBarChart)
  .attr("height", heightBarChart);

let barChart = svg.selectAll("rect").data(hortikulturaData);
barChart
  .enter()
  .append("rect")
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr(
    "y",
    d => heightBarChart - marginBarChart - sum(d.data) * heightPerCount
  )
  .attr("height", d => sum(d.data) * heightPerCount)
  .attr("width", barWidth);
