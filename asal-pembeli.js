const widthMap = 500;
const heightMap = 280;

d3.queue()
  .defer(d3.json, `${window.location.href}/../province-data.json`)
  .await(function(error, provinceData) {
    if (error) throw error;

    let geoData = topojson.feature(provinceData, provinceData.objects.provinces)
      .features;
    buyerData.forEach(row => {
      let province = geoData.find(d => d.properties.provinsi == row.province);
      province.properties = row;
    });

    console.log(geoData);

    const projection = d3
      .geoMercator()
      .scale(600)
      .translate([-995, 70]);

    const path = d3.geoPath().projection(projection);

    const colorScale = d3
      .scaleLinear()
      .domain([0, 600])
      .range(["#E5BF27", "#1B6176"]);

    let mapSvg = d3
      .select("#map-svg")
      .attr("width", widthMap)
      .attr("height", heightMap);

    mapSvg
      .selectAll(".province")
      .data(geoData)
      .enter()
      .append("path")
      .classed("province", true)
      .attr("d", path)
      .attr("fill", d => colorScale(d.properties.buyer));

    const legendScale = d3
      .scaleLinear()
      .domain([0, 199])
      .range(["#E5BF27", "#1B6176"]);

    for (let i = 0; i < 200; i++) {
      mapSvg
        .append("rect")
        .attr("width", 1)
        .attr("height", 20)
        .attr("x", widthMap / 2 - 100 + i)
        .attr("y", 220)
        .attr("fill", legendScale(i));
    }

    mapSvg
      .append("text")
      .text("0")
      .attr("x", widthMap / 2 - 100 - 5)
      .attr("y", 255);

    mapSvg
      .append("text")
      .text("600")
      .attr("x", widthMap / 2 + 100 - 5)
      .attr("y", 255);
  });
