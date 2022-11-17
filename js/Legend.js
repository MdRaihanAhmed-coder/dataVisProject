class Legend {
  svg;
  #os;
  #cs;
  #ys;
  width;
  height;
  margin = 30;
  padding = 15;

  constructor(svg, width, height) {
    this.svg = svg;
    this.width = width;
    this.height = height;
  }

  draw(colorScale) {
    //Set the color scale, if provided
    this.setColorScale(colorScale);
    //Set the SVG appropriately
    this.svg
      .attr("height", this.height)
      .attr("width", this.width)
      .style("margin", this.margin);
    //Make a group for each legend entry
    let symbolGroups = this.svg.selectAll(".symbolGroup").data(this.cs.domain().reverse()).join("g")
      .classed("symbolGroup", true)
      .attr("transform", (d, i) => {
        let x = ((i % 2) == 0) ? this.padding : (this.padding * 2) + (this.width / 2);
        let y = ((2 * this.height) / this.cs.domain().length) * Math.floor(i / 2);
        return "translate(" + x + ", " + y + ")"
      });
    //Draw every symbol
    symbolGroups.selectAll(".symbol").data(d => [d]).join("rect")
      .classed("symbol", true)
      .attr("x", 0)
      .attr("height", 15)
      .attr("width", 15)
      .attr("fill", d => this.cs(d))
    //Draw every label
    symbolGroups.selectAll(".label").data(d => [d]).join("text")
      .classed("label", true)
      .attr("x", this.padding * 2)
      .attr("y", 7.5)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")
      .style("font", "15px Arial")
      .text(d => d);
  }

  setOrderScale(os) {
    this.os = os ? os : this.os;
  }

  setColorScale(cs) {
    this.cs = cs ? cs : this.cs;
    this.ys = d3.scalePoint()
      .domain(this.cs.domain())
      .range([this.height - this.padding, this.padding])
  }
}
