class VisController {
  data;
  barChart;

  constructor(data, barChart, zoomChart) {
    this.data = {
      raw: data,
      rolled: d3.rollup(data, g => g.length, d => d.Year)
    };
    this.barChart = barChart;
    this.zoomChart = zoomChart;
    this.barChart.setRolledData(this.data.rolled);
    this.zoomChart.setRolledData(this.data.rolled);
    this.barChart.setChild(zoomChart);
  }
  draw(category) {
    if (category == "ESRB_Rating") {
      this.#drawByRating();
    } else if (category == "Platform") {
      this.#drawByPlatform();
    }
  }

  #drawByRating() {
    this.barChart.draw(
      d3.rollup(this.data.raw, g => g.length, d => parseInt(d.Year), d => {
        return (d.ESRB_Rating == "N/A" || d.ESRB_Rating == "RP") ? "Unrated" : d.ESRB_Rating;
      }),
      d3.scaleOrdinal()
        .domain(["Unrated", "EC", "E", "E10", "T", "M", "AO"])
        .range([0, 1, 2, 3, 4, 5, 6, 7]),
      d3.scaleOrdinal().domain(["Unrated", "EC", "E", "E10", "T", "M", "AO"]).range(d3.schemeSet3),
      false
    );
  }
  #drawByPlatform() {
    this.barChart.draw(
      d3.rollup(this.data.raw, g => g.length, d => parseInt(d.Year), d => {
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
      }),
      d3.scaleOrdinal()
        .domain(["Other", "Atari", "Nintendo", "Sega", "Microsoft", "Sony", "PC"])
        .range([0, 1, 2, 3, 4, 5, 6]),
      d3.scaleOrdinal().domain(["Other", "Atari", "Nintendo", "Sega", "Microsoft", "Sony", "PC"]).range(d3.schemeSet3),
      false
    );
  }
}
