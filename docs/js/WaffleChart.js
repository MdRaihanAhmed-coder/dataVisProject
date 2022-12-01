class WaffleChart {
  data;
  categorizer;
  svg;
  width;
  height;
  constructor(svg, width, height, waffleSize) {
    this.svg = svg;
    this.width = width;
    this.height = height;
    this.waffleSize = waffleSize;
  }
  draw(subrolledData, rolledData, year, stratum, cs) {
    subrolledData = subrolledData.get(year);
    rolledData = rolledData;
    let padding = ({x: 10, y: 40})
    let whole = true;
    let sequence = (length) => Array.apply(null, {length: length}).map((d, i) => i);
    let scale = d3.scaleBand()
      .domain(sequence(10))
      .range([0, this.waffleSize])
      .padding(0.1);

    this.waffles = [];
    let obj = subrolledData.entries()
    let keys = Array.from(d3.intersection(cs.domain(), subrolledData.keys()));
    let maxValue = d3.max(subrolledData.values())
    let total = rolledData.get(year);
    let index = 0;
    let waffle = [];
    let ratio = 0;
    for (let y = 9; y >= 0; y--) {
      for (let x = 0; x < 10; x++) {
        if (ratio < 1) {
          ratio = Math.round(subrolledData.get(keys[index]) / total * 100);
          if (subrolledData.get(keys[index]) === maxValue) ratio += 1;
          index += 1;
        }
        let key = keys[index - 1];
        key = key ? key : keys[index - 2];
        waffle.push({key, x, y, index});
        ratio -= 1;
      }
    }
    this.waffles.push(waffle);
    this.svg
      .style("cursor", "default")
      .style("background-color", "white")
      .style("outline", "thin solid black")
      .attr("width", this.width)
      .attr("height", this.height)
    this.svg.select(".axis-label")
      .text(`${year} Publication Proportions`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("x", this.waffleSize / 2)
      .attr("y", 25);
    const g = this.svg.selectAll(".waffle")
      .data(this.waffles)
      .join("g")
      .attr("class", "waffle")
      .attr("transform", `translate(0, 50)`);
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
    keys.reverse();
    const legend = this.svg.select(".legend");
    let symbolGroups = legend.selectAll(".symbolGroup");

    let highlight = (e) => {
      const i = symbolGroups.nodes().reverse().indexOf(e.path[1]);
      cells.transition().duration(500)
        .attr("fill", d => {
          return d.index === (i + 1) ? cs(d.key) : "#ccc";
        });
    }
    let restore = () => {
      cells.transition().duration(500).attr("fill", d => cs(d.key))
    }

    symbolGroups = symbolGroups
      .data(keys)
      .join("g")
      .attr("opacity", 1)
      .attr("transform", (d, i) => `translate(${this.waffleSize + 20}, ${20 + i * 28})`)
      .classed("symbolGroup", true)
      .on("mouseover", highlight)
      .on("mouseout", restore);
    symbolGroups.selectAll(".symbol").data(d => [d]).join("rect")
      .classed("symbol", true)
      .attr("rx", 3).attr("ry", 3)
      .attr("width", 30).attr("height", 20)
      .attr("fill", (d, i) => cs(d));
    symbolGroups.selectAll(".label").data(d => [d]).join("text")
      .classed("label", true)
      .attr("dx", 40)
      .attr("alignment-baseline", "hanging")
      .text((d) => d)

  }
}
