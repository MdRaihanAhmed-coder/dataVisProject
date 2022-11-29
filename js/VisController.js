class VisController {
  data;
  legend;
  barChart;
  zoomChart;
  waffleChart;
  categorizer;
  cs;

  constructor(data, legend, barChart, zoomChart, waffleChart, categorizer) {
    this.legend = legend;
    this.barChart = barChart;
    this.zoomChart = zoomChart;
    this.waffleChart = waffleChart;
    this.categorizer = categorizer;
    this.barChart.setChild(zoomChart);
    this.data = {
      raw: data,
      active: {
        rolled: null,
        subrolled: null
      }
    };
  }
  draw(category) {
    let filteredData = this.filter(this.data.raw);
    this.data.active.rolled = d3.rollup(filteredData, g => g.length, d => parseInt(d.Year));
    this.data.active.subrolled = d3.rollup(filteredData, g => g.length, d => parseInt(d.Year), d => this.categorizer.generalize(category, d[category]))
    this.cs = d3.scaleOrdinal().domain(Object.keys(this.categorizer[category])).range(d3.schemeSet3)
    this.barChart.draw(this.data.active.subrolled, this.data.active.rolled, this.cs, false);
    this.waffleChart.draw(this.data.active.subrolled, this.data.active.rolled, 2006, this.cs);
    this.legend.draw(this.cs);
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
