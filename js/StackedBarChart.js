class StackedBarChart {
  svg;
  data;

  #maxBarHeight;
  #xs;
  #ys;
  #os;
  #cs;

  #ysDisplay;
  #ysProportional;

  margin = 30;
  padding = 40;
  width;
  height;

  proportional = false;

  #child;

  brush = d3.brushX().on("brush end", ({selection}, category) => {
    if (selection) {
      const [x0, x1] = selection;
      let filteredBars = this.svg.selectAll(".barGroup").filter(d => x0 < this.xs(d[0] + 1) && this.xs(d[0]) < x1);
      this.#child.draw(new Map(filteredBars.data()), this.os, this.cs, true);
    }
  });

  constructor(svg, width, height) {
    this.data = {
      subrolled: null,
      rolled: null
    }
    this.svg = svg;
    this.width = width;
    this.height = height;

  }

  /*private methods*/
  #drawAxes() {
    this.svg.select(".x-axis")
      .attr("transform", "translate(0, " + (this.height - this.padding) + ")")
      .call(
        d3.axisBottom()
          .scale(this.xs)
          .tickValues(this.xs.domain().filter(d => d % 2 == 0))
      );
    if (this.proportional) {
      this.svg.select(".y-axis")
        .attr("transform", "translate(" + this.padding + ", " + this.padding + ")")
        .call(d3.axisLeft().scale(this.#ysProportional).tickFormat(d3.format("~%")));
    } else {
      this.svg.select(".y-axis")
        .attr("transform", "translate(" + this.padding + ", " + this.padding + ")")
        .call(d3.axisLeft().scale(this.#ysDisplay));
    }
  }


  /*public methods*/
  draw(data, orderScale, colorScale, proportional) {
    //If optional parameters are present, update chart members
    this.setSubrolledData(data);
    this.setOrderScale(orderScale);
    this.setColorScale(colorScale);
    this.proportional = proportional ? true : false;
    //Ensure that the SVG's attributes are correctly set
    this.svg
      .attr("height", this.height)
      .attr("width", this.width)
      .style("margin", this.margin);
    //Draw axes
    this.#drawAxes();
    //Create one group per year
    let barGroups = this.svg.selectAll(".barGroup").data(this.data.subrolled).join("g")
      .classed("barGroup", true)
      .attr("transform", (d, i) => "translate(" + this.xs(d[0]) + ", 0)");

    { //Draw rectangles within each group
      let barHeight = 0;
      barGroups.selectAll("rect")
        .data(d => d3.map(d[1], m => ({
          year: d[0],
          label: m[0],
          value: m[1],
          proportionalHeight: (m[1] / this.data.rolled.get(d[0].toString())) * (this.height - (2 * this.padding))
        })).sort((a, b) => this.os(a.label) - this.os(b.label)))
        .join("rect")
        .attr("y", (d, i) => {
          if (proportional) {
            barHeight = (i == 0) ? d.proportionalHeight : barHeight + d.proportionalHeight;
          } else {
            barHeight = (i == 0) ? this.ys(d.value) : barHeight + this.ys(d.value);
          }
          return this.height - barHeight - this.padding;
        })
        .attr("height", d => proportional ? d.proportionalHeight : this.ys(d.value))
        .attr("width", this.xs.bandwidth)
        .attr("fill", d => this.cs(d.label))
        .on("click", e => console.log(e.target.__data__));
    }
  }

  setSubrolledData(data) {
    if (data) {
      /*public member*/
      this.data.subrolled = data;
      /*private members*/
      this.maxBarHeight = d3.max(data, d => d3.sum(d[1].values()));
      this.xs = d3.scaleBand()
        .domain([...data.keys()].sort())
        .range([this.padding, this.width - this.padding])
        .padding([0.2]);
      this.ys = d3.scaleLinear()
        .domain([0, this.maxBarHeight])
        .range([0, this.height - (2 * this.padding)]);
      this.#ysDisplay = d3.scaleLinear()
        .domain([0, this.maxBarHeight])
        .range([this.height - (2 * this.padding), 0]);
      this.#ysProportional = d3.scaleLinear()
        .domain([0, 1])
        .range([this.height - (2 * this.padding), 0]);
    }
  }

  setRolledData(data) {
    if (data) {
      this.data.rolled = data;
    }
  }

  setOrderScale(os) {
    this.os = os ? os : this.os;
  }

  setColorScale(cs) {
    this.cs = cs ? cs : this.cs;
  }

  setChild(childBarChart) {
    this.#child = childBarChart;
    this.brush.extent([[this.padding, 0], [this.width - this.padding, this.height - this.padding]])
    this.svg.select(".brush-group").call(this.brush);
  }

}
