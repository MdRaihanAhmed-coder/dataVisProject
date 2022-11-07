Promise.all([d3.csv('./data/vgsales.csv')]).then( data =>
    {
        let vgsales = data[0];
        //let wordNoForceData = data[1];

        //console.log("d", wordNoForceData);
        // let groupedData = d3.groups(wordPositionsData, d => {
        //     return d.category;
        // })
        // console.log("groupedData:",groupedData.keys())

        // grouped it using array

        // let table = new Table(wordPositionsData, 'loadOnce', colorScale);
        // table.drawTable();

        let platformGrouped = d3.group(vgsales, d => d.Platform)
        // console.log(platformGrouped)
        let bar = new barChart(vgsales,platformGrouped);

        // console.log(vgsales)

        
    });