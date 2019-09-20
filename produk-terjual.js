var width = 200;
height = 200;
margin = 10;

var radius = Math.min(width, height) / 2 - margin;

const names = ["TANAMAN PANGAN", "TANAMAN HORTIKULTURA", "PERKEBUNAN"];
const data = [
  [301246, 674309, 487234],
  [375, 654, 494],
  [112, 125, 133],
  [20, 16, 8]
];

var paired = data[1].reduce((acc, next, idx) => {
  acc[names[idx]] = next;
  return acc;
}, {});

var colorScale = d3
  .scaleOrdinal()
  .domain(paired)
  .range(["#FE0000", "#FFA300", "#00A9E0"]);

d3.select("#produk-terjual-chart")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`)
  .classed("chart", true);

d3.select("#produk-terjual-select").on("change", function() {
  let idx = d3.select(this).property("value");
  setData(idx);
});

setData(d3.select("#produk-terjual-select").property("value"));

function setData(idx) {
  const totalData = data[idx].reduce((acc, next) => acc + next, 0);

  let paired = data[idx].reduce((acc, next, idx) => {
    acc[names[idx]] = next;
    return acc;
  }, {});

  let arcs = d3.pie().value(d => d.value)(d3.entries(paired));

  let path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  let updateChart = d3
    .select(".chart")
    .selectAll(".arc")
    .data(arcs);

  updateChart.exit().remove();

  updateChart
    .enter()
    .append("path")
    .classed("arc", true)
    .merge(updateChart)
    .transition()
    .duration(1000)
    .attr("fill", d => colorScale(d.data.key))
    .attr("d", path);

  let updateText = d3
    .select(".chart")
    .selectAll("text")
    .data(arcs);

  updateText
    .enter()
    .append("text")
    .merge(updateText)
    .transition()
    .duration(1000)
    .text(d => Math.round((d.data.value / totalData) * 100) + "%")
    .attr("transform", function(d) {
      return "translate(" + path.centroid(d) + ")";
    })
    .attr("fill", "#C8C8C8")
    .style("text-anchor", "middle")
    .style("font-size", 17);

  for (let i = 0; i < data[idx].length; i++) {
    d3.select(`#produk-terjual #total-${i + 1}`).text(
      numberWithCommas(data[idx][i])
    );
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
