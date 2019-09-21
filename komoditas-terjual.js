const widthBarChart = 500;
const heightBarChart = 220;
const marginBarChart = 12;
const xAxisSpace = 20;
const barPadding = 4;
const komoditasaData = [
  {
    data: [
      { period: "Jan 2017", data: [32, 10, 17, 19, 12] },
      { period: "Feb 2017", data: [31, 9, 12, 23, 14] },
      { period: "Mar 2017", data: [24, 10, 10, 12, 13] },
      { period: "Apr 2017", data: [32, 3, 17, 19, 14] },
      { period: "Mei 2017", data: [30, 22, 19, 11, 3] },
      { period: "Jun 2017", data: [22, 12, 9, 18, 10] },
      { period: "Jul 2017", data: [31, 21, 9, 19, 22] },
      { period: "Aug 2017", data: [33, 23, 12, 20, 22] },
      { period: "Sep 2017", data: [40, 30, 15, 22, 23] },
      { period: "Okt 2017", data: [39, 29, 19, 20, 33] },
      { period: "Nov 2017", data: [42, 28, 24, 22, 33] },
      { period: "Dec 2017", data: [45, 22, 12, 25, 37] }
    ],
    legend: [
      { name: "Beras", color: "#FE0000" },
      { name: "Jagung", color: "#FFA300" },
      { name: "Kedelai", color: "#00A9E0" },
      { name: "Ubi Kayu", color: "#3FC1AB" },
      { name: "Kacang Hijau", color: "purple" }
    ]
  },
  {
    data: [
      { period: "Jan 2017", data: [7, 30, 19, 22, 15] },
      { period: "Feb 2017", data: [4, 36, 15, 30, 10] },
      { period: "Mar 2017", data: [10, 25, 7, 19, 11] },
      { period: "Apr 2017", data: [3, 32, 17, 19, 14] },
      { period: "Mei 2017", data: [22, 30, 19, 11, 3] },
      { period: "Jun 2017", data: [12, 22, 9, 18, 10] },
      { period: "Jul 2017", data: [21, 31, 9, 19, 22] },
      { period: "Aug 2017", data: [23, 33, 12, 20, 22] },
      { period: "Sep 2017", data: [23, 40, 15, 22, 23] },
      { period: "Okt 2017", data: [25, 39, 19, 20, 33] },
      { period: "Nov 2017", data: [28, 42, 24, 22, 33] },
      { period: "Dec 2017", data: [31, 51, 30, 24, 41] }
    ],
    legend: [
      { name: "Jambu Biji", color: "#FE0000" },
      { name: "Mangga", color: "#FFA300" },
      { name: "Cabe", color: "#00A9E0" },
      { name: "Durian", color: "#3FC1AB" },
      { name: "Bawang Merah", color: "purple" }
    ]
  },
  {
    data: [
      { period: "Jan 2017", data: [15, 4, 4, 7, 9] },
      { period: "Feb 2017", data: [17, 5, 6, 3, 9] },
      { period: "Mar 2017", data: [20, 3, 10, 12] },
      { period: "Apr 2017", data: [22, 10, 12, 14] },
      { period: "Mei 2017", data: [24, 11, 13, 19] },
      { period: "Jun 2017", data: [29, 14, 12, 19] },
      { period: "Jul 2017", data: [20, 17, 11, 20] },
      { period: "Aug 2017", data: [30, 17, 11, 20] },
      { period: "Sep 2017", data: [30, 15, 10, 18] },
      { period: "Okt 2017", data: [27, 13, 9, 17] },
      { period: "Nov 2017", data: [33, 20, 20, 18] },
      { period: "Dec 2017", data: [35, 20, 19, 24] }
    ],
    legend: [
      { name: "Kakao", color: "#FE0000" },
      { name: "Cengkeh", color: "#FFA300" },
      { name: "Kopi", color: "#00A9E0" },
      { name: "Kelapa", color: "#3FC1AB" }
    ]
  }
];

let svg = d3
  .select("#bar-chart-svg")
  .attr("width", widthBarChart)
  .attr("height", heightBarChart);

d3.select("#komoditas-terjual-select").on("change", function() {
  let idx = d3.select(this).property("value");
  setKomoditasTerjual(idx);
});

setKomoditasTerjual(d3.select("#komoditas-terjual-select").property("value"));

function sum(arr) {
  return arr.reduce((acc, next) => acc + next, 0);
}

function setKomoditasTerjual(idx) {
  let temp = komoditasaData[idx];
  let barChartLegends = d3.select(".bar-chart-legends");
  let updateLegends = barChartLegends
    .selectAll(".legend")
    .data(temp.legend, d => d.name + d.color);
  updateLegends.exit().remove();

  let legends = updateLegends
    .enter()
    .append("div")
    .classed("legend", true);

  legends
    .append("div")
    .classed("bar-chart-legend-color", true)
    .style("background-color", d => d.color);
  legends.append("p").text(d => d.name);

  let biggestDataSum = temp.data.reduce((acc, next) => {
    let total = sum(next.data);
    if (total > acc) acc = total;
    return acc;
  }, 0);
  let barWidth =
    (widthBarChart - 2 * marginBarChart) / temp.data.length - barPadding;
  let heightPerCount =
    (heightBarChart - 2 * marginBarChart - xAxisSpace) / biggestDataSum;

  let dataBarChart = svg.selectAll(".item").data(temp.data, d => d.data);
  dataBarChart.exit().remove();
  let groupBarChart = dataBarChart
    .enter()
    .append("g")
    .classed("item", true);

  for (let j = 0; j < temp.legend.length; j++) {
    groupBarChart
      .append("rect")
      .attr("x", (d, i) => (barWidth + barPadding) * i + marginBarChart)
      .attr(
        "y",
        d =>
          heightBarChart -
          marginBarChart -
          sum([...d.data].splice(0, j + 1)) * heightPerCount -
          xAxisSpace
      )
      .attr("height", d => d.data[j] * heightPerCount)
      .attr("width", barWidth)
      .attr("fill", temp.legend[j].color);
  }

  groupBarChart
    .append("text")
    .text(d => sum(d.data))
    .attr(
      "x",
      (d, i) => (barWidth + barPadding) * i + barWidth * 0.5 + marginBarChart
    )
    .attr(
      "y",
      d =>
        heightBarChart -
        marginBarChart -
        sum(d.data) * heightPerCount -
        2 -
        xAxisSpace
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
}
