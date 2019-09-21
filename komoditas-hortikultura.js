const widthBarChart = 500;
const heightBarChart = 220;
const marginBarChart = 10;
const xAxisSpace = 20;
const barPadding = 4;
const hortikulturaData = [
  { period: "Jan 2017", data: [7, 14, 19, 22, 15] },
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
let heightPerCount =
  (heightBarChart - 2 * marginBarChart - xAxisSpace) / biggestDataSum;

let svg = d3
  .select("#bar-chart-svg")
  .attr("width", widthBarChart)
  .attr("height", heightBarChart);

let dataBarChart = svg.selectAll("g").data(hortikulturaData);
let groupBarChart = dataBarChart.enter().append("g");

groupBarChart
  .append("rect")
  .classed("first-color-bar", true)
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr("y", d => heightBarChart - marginBarChart - d.data[0] - xAxisSpace)
  .attr("height", d => d.data[0] * heightPerCount)
  .attr("width", barWidth);
groupBarChart
  .append("rect")
  .classed("second-color-bar", true)
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr(
    "y",
    d =>
      heightBarChart -
      marginBarChart -
      sum([...d.data].splice(0, 2)) -
      xAxisSpace
  )
  .attr("height", d => d.data[1] * heightPerCount)
  .attr("width", barWidth);
groupBarChart
  .append("rect")
  .classed("third-color-bar", true)
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr(
    "y",
    d =>
      heightBarChart -
      marginBarChart -
      sum([...d.data].splice(0, 3)) -
      xAxisSpace
  )
  .attr("height", d => d.data[2] * heightPerCount)
  .attr("width", barWidth);
groupBarChart
  .append("rect")
  .classed("fourth-color-bar", true)
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr(
    "y",
    d =>
      heightBarChart -
      marginBarChart -
      sum([...d.data].splice(0, 4)) -
      xAxisSpace
  )
  .attr("height", d => d.data[3] * heightPerCount)
  .attr("width", barWidth);
groupBarChart
  .append("rect")
  .classed("fifth-color-bar", true)
  .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
  .attr("y", d => heightBarChart - marginBarChart - sum(d.data) - xAxisSpace)
  .attr("height", d => d.data[4] * heightPerCount)
  .attr("width", barWidth);

groupBarChart
  .append("text")
  .text(d => sum(d.data))
  .attr(
    "x",
    (d, i) => (barWidth + barPadding) * i + barWidth * 0.5 + marginBarChart
  )
  .attr(
    "y",
    d => heightBarChart - marginBarChart - sum(d.data) - 2 - xAxisSpace
  )
  .attr("text-anchor", "middle");

let xAxis = groupBarChart.append("g").classed("x-axis", true);

xAxis
  .append("text")
  .text(d => d.period.split(" ")[0])
  .attr(
    "x",
    (d, i) => (barWidth + barPadding) * i + barWidth * 0.5 + marginBarChart
  )
  .attr("y", heightBarChart - 20)
  .attr("text-anchor", "middle");
xAxis
  .append("text")
  .text(d => d.period.split(" ")[1])
  .attr(
    "x",
    (d, i) => (barWidth + barPadding) * i + barWidth * 0.5 + marginBarChart
  )
  .attr("y", heightBarChart - 8)
  .attr("text-anchor", "middle");
