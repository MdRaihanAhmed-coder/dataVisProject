class VisController {
  data;
  legend;
  barChart;
  zoomChart;
  waffleChart;
  categorizer;

  constructor(data, legend, barChart, zoomChart, waffleChart, categorizer) {
    this.data = {
      raw: data,
      rolled: d3.rollup(data, g => g.length, d => parseInt(d.Year))
    };
    this.legend = legend;
    this.barChart = barChart;
    this.zoomChart = zoomChart;
    this.waffleChart = waffleChart;
    this.categorizer = categorizer;
    this.barChart.setChild(zoomChart);
  }
  draw(category) {
    let data = this.filter(this.data.raw);
    let rolledData = d3.rollup(data, g => g.length, d => parseInt(d.Year));
    let subrolledData = d3.rollup(data, g => g.length, d => parseInt(d.Year), d => this.categorizer.generalize(category, d[category]))
    let cs = d3.scaleOrdinal().domain(Object.keys(this.categorizer[category])).range(d3.schemeSet3)
    this.barChart.draw(subrolledData, rolledData, cs, false);
    this.waffleChart.draw(subrolledData, rolledData, 2006, cs);
    this.legend.draw(cs);
  }
  filter(data) {
    data = this.#filterByType(data, "Platform");
    data = this.#filterByType(data, "Genre");
    data = this.#filterByType(data, "ESRB_Rating");
    return data
  }
  #filterByType(data, type) {
    let inactive = Object.entries(this.categorizer[type]).filter(d => !d[1].active)
    return data.filter(d => {
      for (let [key, value] of inactive) {
        if (value.subcategories.includes(d[type])) {
          return false;
        }
      }
      return true;
    })
  }
}
