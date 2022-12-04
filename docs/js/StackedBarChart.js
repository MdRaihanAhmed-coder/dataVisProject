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

  margin = 0;
  padding = 40;
  width;
  height;

  proportional = false;

  #child;

  #handleBarClick;

  activeYear;

  brush = d3.brushX()
    .on("brush end", ({selection}) => {
    if (selection) {
      const [x0, x1] = selection;
      let filteredBars = this.svg.selectAll(".barGroup").filter(d => x0 < (this.xs(d[0]) + this.xs.bandwidth()) && this.xs(d[0]) < x1);
      this.#child.draw(new Map(filteredBars.data()), this.data.rolled, this.activeYear, this.cs, true);
    }
  }).on("start", ({selection}) => {
    if (selection[0] == selection[1]) {
      this.#child.draw(new Map(), this.data.rolled, this.activeYear, this.cs, true);
    }

  });

  constructor(svg, width, height, handleBarClick) {
    this.data = {
      subrolled: null,
      rolled: null
    }
    this.svg = svg;
    this.width = width;
    this.height = height;
    this.handleBarClick = handleBarClick;
    this.activeYear = 2009;
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
    this.svg.select(".x-axis-label")
      .text(`Year`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("x", this.padding + ((this.width - this.padding) / 2))
      .attr("y", this.height - 10);
    if (this.proportional) {
      this.svg.select(".y-axis")
        .attr("transform", "translate(" + this.padding * 2 + ", " + this.padding + ")")
        .call(d3.axisLeft().scale(this.#ysProportional).tickFormat(d3.format("~%")));
      this.svg.select(".y-axis-label")
        .text("Proportion of Games Published")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("x", 30)
        .attr("y", this.height / 2)
        .attr("transform",`rotate(-90, 30, ${this.height / 2})`);
    } else {
      this.svg.select(".y-axis")
        .attr("transform", "translate(" + this.padding * 2 + ", " + this.padding + ")")
        .call(d3.axisLeft().scale(this.#ysDisplay));
      this.svg.select(".y-axis-label")
        .text("Total Number of Games Published")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("x", 20)
        .attr("y", this.height / 2)
        .attr("transform",`rotate(-90, 20, ${this.height / 2})`);
    }
  }

  /*public methods*/
  draw(subrolledData, rolledData, activeYear, colorScale, proportional) {
    //If optional parameters are present, update chart members
    this.activeYear = activeYear;
    this.setSubrolledData(subrolledData);
    this.setRolledData(rolledData);
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
      .classed("active", d => d[0] == activeYear)
      .attr("transform", (d, i) => "translate(" + this.xs(d[0]) + ", 0)")
      .on("click", this.handleBarClick);

    { //Draw rectangles within each group
      let barHeight = 0;
      barGroups.selectAll("rect")
        .data(d => d3.map(d[1], m => ({
          year: d[0],
          label: m[0],
          value: m[1],
          marketsales: this.data.rolled.get(d[0]),
          marketshare: (m[1] / this.data.rolled.get(d[0])),
          proportionalHeight: (m[1] / this.data.rolled.get(d[0])) * (this.height - (2 * this.padding))
        })).sort((a, b) => this.cs.domain().indexOf(a.label) - this.cs.domain().indexOf(b.label)))
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

    }
    //If there is a brush selection, draw this bar chart's child using that selection
    let selection;
    if (selection = this.svg.select(".brush-group")?.node()?.__brush.selection) {
      const [[x0, y0], [x1, y1]] = selection;
      let filteredBars = this.svg.selectAll(".barGroup").filter(d => x0 < (this.xs(d[0]) + this.xs.bandwidth()) && this.xs(d[0]) < x1);
      this.#child.draw(new Map(filteredBars.data()), this.data.rolled, this.activeYear, this.cs, true);
    } else if (this.#child) {
      this.#child.draw(new Map(), this.data.rolled, this.activeYear, this.cs, true);
    }
    //If the bar chart is empty, make the chart's annotation visible
    let annotation;
    if (annotation = this.svg.select(".annotation")) {
      if (this.data.subrolled.size == 0) {
        annotation
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .style("display", "block")
          .style("font-size", "1.2em")
          .attr("x", this.padding + ((this.width - this.padding) / 2))
          .attr("y", this.height / 2);
      } else {
        annotation
          .style("display", "none")
      }
    }
  }

  setSubrolledData(data) {
    if (data) {
      this.data.subrolled = data;
      this.maxBarHeight = d3.max(data, d => d3.sum(d[1].values()));
      this.xs = d3.scaleBand()
        .domain([...data.keys()].sort())
        .range([this.padding * 2, this.width])
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

  setColorScale(cs) {
    this.cs = cs ? cs : this.cs;
  }

  setChild(childBarChart) {
    this.#child = childBarChart;
    this.brush.extent([[this.padding * 2, this.padding - 5], [this.width, this.height - this.padding]])
    this.svg.select(".brush-group").call(this.brush);
  }

}
