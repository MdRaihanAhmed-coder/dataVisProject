d3.csv('./data/vgsales.csv').then(data => {
  data = data.filter(d => !(isNaN(parseInt(d.Year)) || d.Year > 2018 || d.Platform == "Series" || d.Platform == "All"));
  console.log(data);
  let barChart = StackedBarChart(
    d3.rollup(data, g => g.length, d => parseInt(d.Year), d => {
      return (d.ESRB_Rating == "N/A" || d.ESRB_Rating == "RP") ? "Unrated" : d.ESRB_Rating;
    }),
    d3.select("#bar-chart"),
    900,
    300,
    d3.scaleOrdinal()
      .domain(["Unrated", "EC", "E", "E10", "T", "M", "AO"])
      .range([0, 1, 2, 3, 4, 5, 6, 7]),
    d3.scaleOrdinal().domain(["Unrated", "EC", "E", "E10", "T", "M", "AO"]).range(d3.schemeSet3)
  );
  barChart.draw();
});
