const margin = {top: 700, right: 30, bottom: 20, left: 100}
const width = 1500 - margin.left - margin.right
const height = 1200 - margin.top - margin.bottom;

class barChart{

    constructor(vgsales, platformGrouped){
        this.vgsales = vgsales;
        this.platformGrouped = platformGrouped;

        // console.log(this.vgsales,this.platformGrouped,this.platformGrouped.keys())
        // console.log(this.platformGrouped)
        // let values = this.platformGrouped.values()
        // console.log("values:",values[0])

    //stacked data

        let group = d3.groups(vgsales, d => d.Platform)
        // console.log("keys:",group)
        // console.log(group[0][1][0])
        let keyData = group.map((d,i) => { 
                        return {key:d[0], value: i};
                    })
        console.log(keyData[0].key)
        let subGroups = keyData.map((d,i) => d.key)
        console.log("subgroups:",subGroups)

    // x axis
        // let years = d3.map(vgsales, (d,i) => console.log(d.Year,i))
        let years = d3.map(vgsales, (d,i) => parseInt(d.Year))
        console.log(years)

    // drawing bar chart
        let barSvg = d3.select("#barChart-div")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");


        years.sort();
        console.log("years: ",years);
        let x = d3.scaleBand()
            .domain(years)
            .range([0, width+60])
            .padding([0.2])
        barSvg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));

    // y-axis should contain the total number of games published that year. So, from the data it should be collected based on the years
    // let yMaxDomain = 
        let totalGamesWithPlatform = d3.rollup(vgsales, g => g.length, d => d.Year, d => d.Platform);
        console.log("totalGames:",totalGamesWithPlatform)
        let rolled_data = d3.rollup(vgsales, g => g.length, d => d.Year)
        console.log("rolled data:",rolled_data) // From rolled data got the max - 664
        let maxData = d3.max(rolled_data, d => d.Year)
        console.log("max data:",maxData)

        let y = d3.scaleLinear()
            .domain([0, 664])
            .range([ height, 0 ]);
        barSvg.append("g")
            .call(d3.axisLeft(y));

        let stackedData = d3.stack()
            // .keys(subGroups)
            .keys(rolled_data)
            (vgsales)

        console.log("stackedData:",stackedData)

        barSvg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            //   .attr("fill", function(d) { return color(d.key); })
              .selectAll("rect")
              .data(function(d) { return d; })
              .enter().append("rect")
                .attr("x", function(d) { 
                    console.log(d.data);
                    return x(parseInt(d.data.Year)); 
                })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
    }

}