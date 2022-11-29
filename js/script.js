d3.csv('./data/vgsales.csv').then(data => {

  let categorizer = new Categorizer();
  //let subrolledData = d3.rollup(vc.data.raw, g => g.length, d => parseInt(d.Year), d => categorizer.generalize("Platform", d["Platform"]));
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
    //legend
    new Legend(d3.select("#legend"), 270, 150),
    //Bar Chart
    new StackedBarChart(d3.select("#bar-chart"), 900, 300),
    //Zoom Chart
    new StackedBarChart(d3.select("#zoom-chart"), 900, 300),
    //Waffle Chart
    new WaffleChart(d3.select("#waffle-chart"), 900, 650, 600),
    //Categorizer
    categorizer
  );





  let nav = new NavBar(vc, categorizer);
});
