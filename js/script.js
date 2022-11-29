d3.csv('./data/vgsales.csv').then(data => {
  let vc;
  let handleBarClick = e => {
    vc.waffleChart.draw(vc.data.active.subrolled, vc.data.active.rolled, e.target.__data__.year, vc.cs);
  }
  let categorizer = new Categorizer();
  //let subrolledData = d3.rollup(vc.data.raw, g => g.length, d => parseInt(d.Year), d => categorizer.generalize("Platform", d["Platform"]));
  vc = new VisController(
    //Filtered Data
    data.filter(d =>
      !(isNaN(parseInt(d.Year)) ||
      d.Year < 1977 ||
      d.Year > 2018 ||
      d.Platform == "Series" ||
      d.Platform == "All" ||
      d.Platform == ""
    )),
    //legend
    new Legend(d3.select("#legend"), 270, 150),
    //Bar Chart
    new StackedBarChart(d3.select("#bar-chart"), 900, 300, handleBarClick),
    //Zoom Chart
    new StackedBarChart(d3.select("#zoom-chart"), 900, 300, handleBarClick),
    //Waffle Chart
    new WaffleChart(d3.select("#waffle-chart"), 500, 300, 300),
    //Categorizer
    categorizer
  );





  let nav = new NavBar(vc, categorizer);
});
