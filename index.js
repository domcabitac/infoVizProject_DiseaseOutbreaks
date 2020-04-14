// Initially we load the first week of data 
load("Jan22.csv", 1);




// The load function takes both the dataset file and the index of the timeline circle to hightlight.
function load(dataFile, circleIndex) {
  
  // removes the previous svg
  d3.select("svg").remove();

  var dateCircles = document.getElementsByClassName("date-circle");

  // iterates through all the timeline circles to highlight
  for(var i = 0; i < circleIndex; i++) {
    dateCircles.item(i).style.backgroundColor = "#9E9E9E";
  }
  // iterates through all the timeline circles to unselect 
  for(var i = circleIndex; i < dateCircles.length; i++) {
    dateCircles.item(i).style.backgroundColor = "#222";
  }

  var format = d3.format(",");

  // Setting the tooltip to display country name, confirmed, recovered, and deaths. 
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + 
                "<strong>Confirmed: </strong><span class='details'>" + format(d.confirmed) + "<br></span>" + 
                "<strong>Recovered: </strong><span class='details'>" + format(d.recovered) + "<br></span>" +
                "<strong>Deaths: </strong><span class='details'>" + format(d.deaths) + "</span>";
              })

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 960 - margin.left - margin.right,
              height = 650 - margin.top - margin.bottom;

  // Custom colorScale
  var colorScale = d3.scaleThreshold()
      .domain([0, 1, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 250000, 500000])
      .range(["rgb(247,247,247)", "rgb(247,247,247)" ,"rgb(243,217,218)", "rgb(240,183,184)", "rgb(238,148,149)", "rgb(235,121,121)", "rgb(233,87,87)", "rgb(231,54,54)", "rgb(228,24,24)", "rgb(179,3,3)", "rgb(138,2,2)", "rgb(92,1,1)", "rgb(53,1,1)"]);     

  // defining the svg, path, and projection for the map
  var path = d3.geoPath();

  var svg = d3.select("#vis")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map');

  var projection = d3.geoMercator()
         .scale(130)
        .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);
  svg.call(tip);

  // The function then loads in the corresponding week data and json map object
  queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.csv, `weekdata/${dataFile}`)
    .await(ready);

    function ready(error, JsonData, csvData) {
      var casesById = {};
      var recoveredById = {};
      var deathById = {};

      // To assign the 3 new attributes to each item in the jsonData, we first created 3 individual maps
      // NOTE: since our covid-19 dataset didnt use country Id's we classified each using country names.
      csvData.forEach(function(d) {casesById[d.Country] = +d.Confirmed;});
      csvData.forEach(function(d) {recoveredById[d.Country] = +d.Recovered;});
      csvData.forEach(function(d) {deathById[d.Country] = +d.Deaths;});

      // We then added the attributes to the JsonData by grabbing its value from the map using the country name as the key.
      JsonData.features.forEach(function(d) {d.confirmed = casesById[d.properties.name]});
      JsonData.features.forEach(function(d) {d.recovered = recoveredById[d.properties.name]});
      JsonData.features.forEach(function(d) {d.deaths = deathById[d.properties.name]});

      // Drawing the svg
      svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(JsonData.features)
        .enter()
          .append("path")
          .attr("d", path)
          .style("fill", function(d) { return colorScale(d.confirmed); })
          .style('stroke', 'white')
          .style('stroke-width', 1.5)
          .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);
            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);
            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });
    }
}

// After the DOM is loaded, the following event listeners handle the loading for each dataset.
// On each click, the timeline bar width is also adjusted.
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("j22").addEventListener('click', function(){
    load("Jan22.csv", 1);
    document.getElementById("bar").style.width = "0%";
  })
  document.getElementById("j29").addEventListener('click', function(){
    load("Jan29.csv", 2);
    document.getElementById("bar").style.width = "10%";
  })
  document.getElementById("f5").addEventListener('click', function(){
    load("Feb5.csv", 3);
    document.getElementById("bar").style.width = "20%";
  })
  document.getElementById("f12").addEventListener('click', function(){
    load("Feb12.csv", 4);
    document.getElementById("bar").style.width = "28%";
  })
  document.getElementById("f19").addEventListener('click', function(){
    load("Feb19.csv", 5);
    document.getElementById("bar").style.width = "37%";
  })
  document.getElementById("f26").addEventListener('click', function(){
    load("Feb26.csv", 6);
    document.getElementById("bar").style.width = "46%";
  })
  document.getElementById("m4").addEventListener('click', function(){
    load("Mar4.csv", 7);
    document.getElementById("bar").style.width = "55%";
  })
  document.getElementById("m11").addEventListener('click', function(){
    load("Mar11.csv", 8);
    document.getElementById("bar").style.width = "64%";
  })
  document.getElementById("m18").addEventListener('click', function(){
    load("Mar18.csv", 9);
    document.getElementById("bar").style.width = "73%";
  })
  document.getElementById("m25").addEventListener('click', function(){
    load("Mar25.csv", 10);
    document.getElementById("bar").style.width = "82%";
  })
  document.getElementById("a1").addEventListener('click', function(){
    load("Apr1.csv", 11);
    document.getElementById("bar").style.width = "91%";
  })
  document.getElementById("a8").addEventListener('click', function(){
    load("Apr8.csv", 12);
    document.getElementById("bar").style.width = "100%";
  })
})

