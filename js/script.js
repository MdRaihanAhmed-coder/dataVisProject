d3.csv('./data/vgsales.csv').then(data => {
  let vc = new VisController(
    //Filtered Data
    data.filter(d =>
      !(isNaN(parseInt(d.Year)) ||
      d.Year < 1977 ||
      d.Year > 2018 ||
      d.Platform == "Series" ||
      d.Platform == "All" ||
      d.Platform == ""
    )),
    //Bar Chart
    new StackedBarChart(d3.select("#bar-chart"), 900, 300),
    new StackedBarChart(d3.select("#zoom-chart"), 900, 300)
  );
  vc.draw("ESRB_Rating");
});
