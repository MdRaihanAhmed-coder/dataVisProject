class VisController {
  data;
  legend;
  barChart;
  zoomChart;
  waffleChart;
  categorizer;
  cs;
  activeYear;

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
    this.activeYear = 2009;
  }
  draw(stratum) {
    let filteredData = this.filter(this.data.raw);
    this.data.active.rolled = d3.rollup(filteredData, g => g.length, d => parseInt(d.Year));
    this.data.active.subrolled = d3.rollup(filteredData, g => g.length, d => parseInt(d.Year), d => this.categorizer.generalize(stratum, d[stratum]))
    this.cs = d3.scaleOrdinal().domain(Object.keys(this.categorizer[stratum])).range(d3.schemeCategory10);
    this.legend.draw(this.cs, stratum == "ESRB_Rating" ? "ESRB Rating" : stratum);
    this.barChart.draw(this.data.active.subrolled, this.data.active.rolled, this.activeYear, this.cs, false);
    this.waffleChart.draw(this.data.active.subrolled, this.data.active.rolled, this.activeYear, stratum, this.cs);
  }
  filter(data) {
    data = this.#filterByType(data, "Platform");
    data = this.#filterByType(data, "Genre");
    data = this.#filterByType(data, "ESRB_Rating");
    return data
  }
  #filterByType(data, type) {
    let inactive = Object.entries(this.categorizer[type]).filter(d => !d[1].active);
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
