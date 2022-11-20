class waffleChart{
    constructor(vc, data){
        console.log(data)
        this.vc = vc
        this.categorizer = vc.categorizer
        let width=900
        let height=650
        this.waffleSize = 600
        let padding = ({x: 10, y: 40})
        let whole = true;
        // let cs = d3.scaleOrdinal(d3.schemeTableau10)
        //         .domain(sequence(data.length))
        let sequence = (length) => Array.apply(null, {length: length}).map((d, i) => i);
        this.color = d3.scaleOrdinal().domain(Object.keys(this.categorizer["Platform"])).range(d3.schemeSet3)
        // let this.color = this.vc.cs
        let scale = d3.scaleBand()
            .domain(sequence(10))
            .range([0, this.waffleSize])
            .padding(0.1)

        this.waffles = []
        let obj = data.entries()
        let keys = Array.from(data.keys())
        console.log("keys:",keys[0])
        console.log(d3.max(data.values()))
        let maxValue = d3.max(data.values())
        // const max = data.keys().length; 
        let total = vc.data.rolled.get(2012);
        let index = 0, waffle = [];
        let ratio=0;
        
        for (let y = 9; y >= 0; y--){
            for (let x = 0; x < 10; x ++) {
                if(ratio < 1){
                    ratio=Math.round(data.get(keys[index])/total*100);
                    // console.log("r:",ratio,"value:",data.get(keys[index]),"keys:",data.get(keys[index])/total*100, "total:",total)
                    if(data.get(keys[index]) === maxValue)ratio+=1
                    index+=1;
                }
                let key = keys[index-1]
                waffle.push({key, x, y, index});
                ratio-=1;
            }
        }
        console.log("waffle:",waffle)
        this.waffles.push(waffle);
        console.log("waffles:",this.waffles)
        this.waffleSvg = d3.select("#waffleChart")
            .style("cursor", "default")
            .attr("width",width)
            .attr("height",height)
            // .attr("viewBox", [0, 0, width, height]);
        
        const g = this.waffleSvg.selectAll(".waffle")  
            .data(this.waffles)
            .join("g")
            .attr("class", "waffle");
        const cellSize = scale.bandwidth();
        // const cellSize = d3.scaleBand();
        const half = cellSize / 2;
        // const cells = g.append("g")
        const cells = g
            .selectAll("whole")
            .data(d => {
                // console.log("undefined:",d)
                return d
            })
            .join("rect")
            // .attr("fill", )
            .attr("fill", d => this.color(d.key));
        
        // cells.attr("x", d => scale(d.x))
        cells.attr("x", (d,i) => scale(d.x))
            .attr("y", d =>  scale(d.y))
        // cells.attr("x",10)
            // .attr("y", d =>  100)
            .attr("rx", 3).attr("ry", 3)
            .attr("width", cellSize).attr("height", cellSize)
            // .attr("width", cellSize).attr("height", cellSize)
        // cells.append("title").text(d => {
        //     const cd = chartData[d.index];
        //     return `${cd.territory}\n${toCurrency(cd.profit)} (${cd.ratio.toFixed(1)}%)`;
        // cells.attr("y", d => scale(d.y*100));
        this.drawLegend(keys);
    }
    drawLegend(keys){
        console.log(keys)
        // let legendG = this.waffleSvg.append('g').attr('class','legenG')
        const legend = this.waffleSvg.selectAll(".legend")
            .data(keys)
            .join("g")
            .attr("opacity", 1)
            .attr("transform", (d, i) => `translate(${this.waffleSize + 20},${i * 40})`)
            // .on("mouseover", highlight)
            // .on("mouseout", restore);
        
        legend.append("rect")
            .attr("rx", 3).attr("ry", 3)
            .attr("width", 30).attr("height", 20)
            .attr("fill", (d, i) => this.color(d));  
        legend.append("text")
            .attr("dx", 40)
            .attr("alignment-baseline", "hanging")
            // .text((d, i) => `${d} (${chartData[i].ratio.toFixed(1)}%)`);
            .text((d) => d)
    }
}