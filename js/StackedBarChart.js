let StackedBarChart = function(data, svg, width, height, orderScale, colorScale) {
  /*public members*/
  this.data = data;
  this.svg = svg;

  /*constants*/
  let WIDTH = width;
  let HEIGHT = height;
  let MARGIN = 30;
  let PADDING = 30;
  let maxBarHeight = d3.max(data, d => d3.sum(d[1].values()));

  /*private members*/
  let xs = d3.scaleBand()
    .domain([...data.keys()].sort())
    .range([PADDING, width - PADDING])
    .padding([0.2]);
  let ys = d3.scaleLinear()
    .domain([0, maxBarHeight])
    .range([0, HEIGHT - PADDING]);
  let os = orderScale;
  let cs = colorScale


  /*public methods*/
  this.draw = () => {
    this.svg
      .attr("height", HEIGHT)
      .attr("width", WIDTH)
      .style("margin", MARGIN);


    let barGroups = this.svg.selectAll("g").data(this.data).join("g")
      .attr("transform", (d, i) => "translate(" + xs(d[0]) + ", 0)");

    {
      let barHeight = 0;
      barGroups.selectAll("rect")
        .data(d => d3.map(d[1], m => ({
          year: d[0],
          label: m[0],
          value: ys(m[1])
        })).sort((a, b) => os(a.label) - os(b.label)))
        .join("rect")
        .attr("y", (d, i) => {
          barHeight = (i == 0) ? d.value : barHeight + d.value;
          return HEIGHT - barHeight - PADDING;
        })
        .attr("height", d => d.value)
        .attr("width", xs.bandwidth)
        .attr("fill", d => cs(d.label))
        .on("click", e => console.log(e.target.__data__));
    }
  }

  /*execution space*/ {

  }
  return this;
}
