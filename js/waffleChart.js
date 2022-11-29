class WaffleChart {
  #cs;
  data;
  categorizer;
  svg;
  width;
  height;
  constructor(svg, width, height, waffleSize) {
    this.data = {
      subrolled: null,
      rolled: null
    }
    this.svg = svg;
    this.width = width;
    this.height = height;
    this.waffleSize = waffleSize;
  }
  draw(subrolledData, rolledData, year, cs) {
    this.data.subrolled = subrolledData.get(year);
    this.data.rolled = rolledData;
    let width=900
    let height=650
    let padding = ({x: 10, y: 40})
    let whole = true;
    let sequence = (length) => Array.apply(null, {length: length}).map((d, i) => i);
    let scale = d3.scaleBand()
      .domain(sequence(10))
      .range([0, this.waffleSize])
      .padding(0.1);

    this.waffles = []
    let obj = this.data.subrolled.entries()
    let keys = Array.from(this.data.subrolled.keys())
    let maxValue = d3.max(this.data.subrolled.values())
    let total = this.data.rolled.get(year);
    let index = 0;
    let waffle = [];
    let ratio = 0;

    for (let y = 9; y >= 0; y--) {
      for (let x = 0; x < 10; x++) {
        if (ratio < 1) {
          ratio = Math.round(this.data.subrolled.get(keys[index]) / total * 100);
          if (this.data.subrolled.get(keys[index]) === maxValue) ratio += 1;
          index += 1;
        }
        let key = keys[index - 1];
        waffle.push({key, x, y, index});
        ratio -= 1;
      }
    }
    this.waffles.push(waffle);
    this.svg
      .style("cursor", "default")
      .attr("width", width)
      .attr("height", height)
    console.log(scale);
    const g = this.svg.selectAll(".waffle")
      .data(this.waffles)
      .join("g")
      .attr("class", "waffle");
    const cellSize = scale.bandwidth();
    const half = cellSize / 2;
    const cells = g
      .selectAll("whole")
      .data(d => d)
      .join("rect")
      .attr("fill", d => cs(d.key));

    cells.attr("x", (d,i) => scale(d.x))
      .attr("y", d =>  scale(d.y))
      .attr("rx", 3).attr("ry", 3)
      .attr("width", cellSize).attr("height", cellSize)
    this.drawLegend(keys, cells, cs);
  }
  drawLegend(keys, cells, cs) {
    const legend = this.svg.select(".legend");
    const symbolGroups = legend.selectAll(".symbolGroup");
    let highlight = (e, d) => {
      const i = symbolGroups.nodes().indexOf(e.path[1]);
      cells.transition().duration(500)
        .attr("fill", d => {
          return d.index === (i + 1) ? cs(d.key) : "#ccc";
        });
    }
    let restore = () => {
      cells.transition().duration(500).attr("fill", d => cs(d.key))
    }

    symbolGroups
      .data(keys)
      .join("g")
      .attr("opacity", 1)
      .attr("transform", (d, i) => `translate(${this.waffleSize + 20}, ${i * 40})`)
      .classed("symbolGroup", true)
      .on("mouseover", highlight)
      .on("mouseout", restore);

    symbolGroups.append("rect")
      .attr("rx", 3).attr("ry", 3)
      .attr("width", 30).attr("height", 20)
      .attr("fill", (d, i) => cs(d));
    symbolGroups.append("text")
      .attr("dx", 40)
      .attr("alignment-baseline", "hanging")
      .text((d) => d)
  }
}
