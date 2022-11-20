class waffleChart{
    constructor(vc, data){
        console.log(data)
        this.vc = vc
        this.categorizer = vc.categorizer
        let width=900
        let height=300
        let waffleSize = 600
        let padding = ({x: 10, y: 40})
        let whole = true;
        // let cs = d3.scaleOrdinal(d3.schemeTableau10)
        //         .domain(sequence(data.length))
        let sequence = (length) => Array.apply(null, {length: length}).map((d, i) => i);
        let color = d3.scaleOrdinal().domain(Object.keys(this.categorizer["Platform"])).range(d3.schemeSet3)
        // let color = this.vc.cs
        let scale = d3.scaleBand()
            .domain(sequence(10))
            .range([0, waffleSize])
            .padding(0.1)

        let waffles = []
        let obj = data.entries()
        console.log(typeof(obj))
        let keys = Array.from(data.keys())
        console.log("keys:",keys[0])
        // const max = data.keys().length; 
        let total = vc.data.rolled.get(1994);
        let ratio;
        let index = 0, curr = 1,accu = Math.round(data.get(keys[0])/total*100), waffle = [];
        let r=0;
        // for (key of keys){
        // for(key of keys){
        for (let y = 9; y >= 0; y--){
            for (let x = 0; x < 10; x ++) {
                // if (curr > accu) {
                    // let r = Math.round(chartData[++index].ratio);
                    // let r = Math.round(d[1]/total*100);
                    if(r < 1){
                        r=Math.round(data.get(keys[index])/total*100)
                        console.log("r:",r,"keys:",data.get(keys[index]), "index:",index)
                        index+=1;
                    }
                    r-=1;
                    // while(r === 0 && index < max) r = Math.round(chartData[++index].ratio);
                    // for(key of keys){
                    //     ratio = Math.round(data.get(key)/total*100);
                    //     // firstkey = 
                    //     // console.log("key:",key)
                    //     if(ratio !== 0){
                    //         // firstkey=key;
                    //         r = Math.round(ratio);
                    //         // break;
                    //     }
                    // }
                    // accu += r;
                let key = keys[index-1]
                waffle.push({key, x, y, index});
                curr++;
            }
            // console.log("firstKey:",firstkey);
        }
        console.log("waffle:",waffle)
        waffles.push(waffle);
        console.log("waffles:",waffles)
        // }
        // d3.map(obj,(d, i) => {
        //     let curr = 0, w = [];
        //     // let x;
        //     for (let y = 9; y >= 0; y--)
        //     // x = 9-y;
        //       for(let x = 0; x < 10; x ++) {
        //         w.push(({x, y, index: curr < Math.round(d[1]) ? i : -1}));
        //         curr++;
        //       }
        //     waffles.push(w);
        // })
        // console.log(waffles)

        // let options = ({style:"whole",shape=""})
        const waffleSvg = d3.select("#waffleChart")
            .style("cursor", "default")
            // .attr("viewBox", [0, 0, width, height]);
        
        const g = waffleSvg.selectAll(".waffle")  
            .data(waffles)
            .join("g")
            .attr("class", "waffle");
        // if (!whole) {
        //     const numPerRow = Math.floor(width / (waffleSize + padding.x));
        //     g.attr("transform", (d, i) => {
        //         const r = Math.floor(i / numPerRow);
        //         const c = i - r * numPerRow;
        //         return `translate(${c * (waffleSize + padding.x)},${r * (waffleSize + padding.y)})`
        //     });
        // }
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
            .attr("fill", d => color(d.key));
        
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

    }
}