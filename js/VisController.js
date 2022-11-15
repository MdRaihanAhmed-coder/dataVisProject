class VisController {
  data;
  legend;
  barChart;

  constructor(data, legend, barChart, zoomChart) {
    this.data = {
      raw: data,
      rolled: d3.rollup(data, g => g.length, d => d.Year)
    };
    this.legend = legend;
    this.barChart = barChart;
    this.zoomChart = zoomChart;
    this.barChart.setRolledData(this.data.rolled);
    this.zoomChart.setRolledData(this.data.rolled);
    this.barChart.setChild(zoomChart);
  }
  draw(category, filter) {
    if (category == "ESRB_Rating") {
      this.#drawByRating(filter);
    } else if (category == "Platform") {
      this.#drawByPlatform(filter);
    }
  }

  #drawByRating(filter) {
    let data = filter ? this.data.raw.filter(filter) : this.data.raw;
    let rolledData = d3.rollup(this.data.raw, g => g.length, d => parseInt(d.Year), d => {
      return (d.ESRB_Rating == "N/A" || d.ESRB_Rating == "RP") ? "Unrated" : d.ESRB_Rating;
    })
    let cs = d3.scaleOrdinal().domain(["Unrated", "EC", "E", "E10", "T", "M", "AO"]).range(d3.schemeSet3)
    this.barChart.draw(rolledData, cs, false);
    this.legend.draw(cs);
  }
  #drawByPlatform(filter) {
    let data = filter ? this.data.raw.filter(filter) : this.data.raw;
    let rolledData = d3.rollup(this.data.raw, g => g.length, d => parseInt(d.Year), d => {
      return ["2600", "5200", "7800", "AJ", "Lynx", "AST"].includes(d.Platform) ?
          "Atari" :
        ["NES", "SNES", "N64", "GC", "Wii", "WW", "WiiU", "NS", "GB", "GBC", "GBA", "DS", "DSiW", "3DS"].includes(d.Platform) ?
          "Nintendo" :
        ["MS", "GEN", "DC", "SAT", "S32X"].includes(d.Platform) ?
          "Sega" :
        ["XB", "X360", "XOne"].includes(d.Platform) ?
          "Microsoft" :
        ["PS", "PS2", "PS3", "PS4", "PS5", "PSP", "PSV", "PSVR"].includes(d.Platform) ?
          "Sony" :
        ["Amig", "CD32", "ACPC", "APII", "CV", "C128", "C64", "Int", "Linux", "OSX", "PC", "MSD", "MSX", "ZXS"].includes(d.Platform) ?
          "PC" : "Other";
    })
    let cs = d3.scaleOrdinal().domain(["Other", "Atari", "Nintendo", "Sega", "Microsoft", "Sony", "PC"]).range(d3.schemeSet3)
    this.barChart.draw(rolledData, cs, false);
    this.legend.draw(cs);
  }
}
