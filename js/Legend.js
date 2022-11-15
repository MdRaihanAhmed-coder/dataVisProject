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
    let symbolGroups = this.svg.selectAll(".symbolGroup").data(this.cs.domain()).join("g")
      .classed("symbolGroup", true)
      .attr("transform", d => "translate(" + this.padding + ", " + (this.ys(d) - 10) + ")");
    //Draw every symbol
    symbolGroups.selectAll(".symbol").data(d => [d]).join("rect")
      .classed("symbol", true)
      .attr("x", 0)
      .attr("height", 20)
      .attr("width", 20)
      .attr("fill", d => this.cs(d))
    //Draw every label
    symbolGroups.selectAll(".label").data(d => [d]).join("text")
      .classed("label", true)
      .attr("x", this.padding * 2)
      .attr("y", 10)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")
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
