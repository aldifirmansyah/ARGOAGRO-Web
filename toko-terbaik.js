const bestStoresData = [
  {
    unitName: "pack",
    data: [
      {
        name: "Toko Ullyl Tani",
        productSold: 13345
      },
      {
        name: "Toko Mekartani",
        productSold: 9220
      },
      {
        name: "Toko Sahabat Tani",
        productSold: 5025
      }
    ]
  },
  {
    unitName: "kg",
    data: [
      {
        name: "Toko Maju Tani",
        productSold: 12100
      },
      {
        name: "Toko Sinartani",
        productSold: 8010
      },
      {
        name: "Toko Agro Amira",
        productSold: 6826
      }
    ]
  },
  {
    unitName: "kg",
    data: [
      {
        name: "Toko LMGA Agro",
        productSold: 9176
      },
      {
        name: "Toko Eka Tani",
        productSold: 7219
      },
      {
        name: "Toko Mirasa Agro",
        productSold: 5029
      }
    ]
  }
];

d3.select("#toko-terbaik-select").on("change", function() {
  let idx = d3.select(this).property("value");
  setTable(idx);
});

setTable(d3.select("#toko-terbaik-select").property("value"));

function setTable(idx) {
  let tempData = bestStoresData[idx];
  d3.select("#best-stores #product-unit").text(` (${tempData.unitName})`);
  d3.selectAll("#best-stores .data").remove();
  let table = d3.select("#best-stores .table");

  let updateTable = table.selectAll(".data").data(tempData.data);
  updateTable.exit().remove();

  let tr = updateTable
    .enter()
    .append("tr")
    .classed("data", true);
  tr.append("td").text(d => d.name);
  tr.append("td").text(d => numberWithCommas(d.productSold));
}
