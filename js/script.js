d3.csv('./data/vgsales.csv').then(data => {
  let categorizer = new Categorizer();
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
    //Categorizer
    categorizer
  );
  let subrolledData = d3.rollup(vc.data.raw, g => g.length, d => parseInt(d.Year), d => vc.categorizer.generalize("Platform", d["Platform"]))
  // console.log(vc.data.subrolled.get(1994))
  // console.log("sub:",subrolledData)
  new waffleChart(vc,subrolledData.get(1994));



  let nav = new NavBar(vc, categorizer);
});
