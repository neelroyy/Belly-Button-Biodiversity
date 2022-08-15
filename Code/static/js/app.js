

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){
    console.log("the init() function ran")

    d3.json(url).then((data) => {
    let selector = d3.select('#selDataset');
    selector.html("")
    // create dropdown
    for (let i=0; i<data.names.length; i++){
        let selOptions = selector.append("option")
        selOptions.property("value", data.names[i]);
        selOptions.text(`OTU ${data.names[i]}`);
    }

    // generate plots
    createScatter('940')
    createBar('940')
    createSummary('940')
})}

function optionChanged(newID){
     createScatter(newID)
     createBar(newID)
     createSummary(newID)  
}

function createScatter(id){
    d3.json(url).then((data) => {
        // code for scatter plot goes here
        let myData = data.samples.filter(i => i.id == id)[0]

        let trace1 = {
            x: myData.otu_ids,
            y: myData.sample_values,
            mode: "markers",
            marker: {
                color: myData.otu_ids,
                size: myData.sample_values
            }

        };
        let bdata = [trace1];

        let layout = {
            title: "",
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Values"
            }
        };

        Plotly.newPlot('bubble', bdata, layout);
    
    console.log(`This function generates scatter plot of ${id}`)

    });
}

function createBar(id){
    d3.json(url).then((data) => {
        let myData = data.samples.filter(i => i.id == id)
        // console.log(myData[0].otu_labels)
        let trace = {
            y: myData[0].otu_ids.slice(0, 10).map(i => `OTU ${i}`).reverse(),
            x: myData[0].sample_values.slice(0, 10).reverse(),
            text: myData[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let barData = [trace];

        let barLayout = {
            title: "Top 10 OTU's",
            xaxis: {
                title: "Sample Values"
            }
        };

        Plotly.newPlot('bar', barData, barLayout);

    console.log(`This function generates bar chart of ${id}`)

    });
}

function createSummary(id){
    d3.json(url).then((data) => {
        let myData = data.metadata.filter(i => i.id == id)[0]
        console.log(myData)
        let summary = d3.select('#sample-metadata');
        summary.html("")
        Object.entries(myData).forEach(([k, v]) => {
        summary.append("p").text(`${k}:${v}`)    
        })

    console.log(`This function generates summary info of ${id}`)
    
    })
}

init() 