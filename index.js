
load("Jan22.csv");
document.getElementById("j22").style.backgroundColor = "#9E9E9E";

function load(dataFile) {
  d3.select("svg").remove();
  document.get

  var format = d3.format(",");

  // Set tooltips
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

  var color = d3.scaleThreshold()
      .domain([0, 1, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 250000, 500000])
      .range(["rgb(247,247,247)", "rgb(247,247,247)" ,"rgb(243,217,218)", "rgb(240,183,184)", "rgb(238,148,149)", "rgb(235,121,121)", "rgb(233,87,87)", "rgb(231,54,54)", "rgb(228,24,24)", "rgb(179,3,3)", "rgb(138,2,2)", "rgb(92,1,1)", "rgb(53,1,1)"]);     

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

  queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.csv, `weekdata/${dataFile}`)
    .await(ready);

    function ready(error, data, cases) {
      var casesById = {};
      var recoveredById = {};
      var deathById = {};
      cases.forEach(function(d) {casesById[d.Country] = +d.Confirmed;});
      cases.forEach(function(d) {recoveredById[d.Country] = +d.Recovered;});
      cases.forEach(function(d) {deathById[d.Country] = +d.Deaths;});

      data.features.forEach(function(d) {d.confirmed = casesById[d.properties.name]});
      data.features.forEach(function(d) {d.recovered = recoveredById[d.properties.name]});
      data.features.forEach(function(d) {d.deaths = deathById[d.properties.name]});

      svg.append("g")
        .attr("class", "countries")
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(casesById[d.properties.name]); })
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

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("j22").addEventListener('click', function(){
    load("Jan22.csv");
    document.getElementById("bar").style.width = "0%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#222";
    document.getElementById("f5").style.backgroundColor = "#222";
    document.getElementById("f12").style.backgroundColor = "#222";
    document.getElementById("f19").style.backgroundColor = "#222";
    document.getElementById("f26").style.backgroundColor = "#222";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";
  })
  document.getElementById("j29").addEventListener('click', function(){
    load("Jan29.csv");
    document.getElementById("bar").style.width = "10%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#222";
    document.getElementById("f12").style.backgroundColor = "#222";
    document.getElementById("f19").style.backgroundColor = "#222";
    document.getElementById("f26").style.backgroundColor = "#222";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";
  })
  document.getElementById("f5").addEventListener('click', function(){
    load("Feb5.csv");
    document.getElementById("bar").style.width = "20%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#222";
    document.getElementById("f19").style.backgroundColor = "#222";
    document.getElementById("f26").style.backgroundColor = "#222";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("f12").addEventListener('click', function(){
    load("Feb12.csv");
    document.getElementById("bar").style.width = "28%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#222";
    document.getElementById("f26").style.backgroundColor = "#222";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("f19").addEventListener('click', function(){
    load("Feb19.csv");
    document.getElementById("bar").style.width = "37%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#222";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("f26").addEventListener('click', function(){
    load("Feb26.csv");
    document.getElementById("bar").style.width = "46%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#222";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("m4").addEventListener('click', function(){
    load("Mar4.csv");
    document.getElementById("bar").style.width = "55%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#222";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("m11").addEventListener('click', function(){
    load("Mar11.csv");
    document.getElementById("bar").style.width = "64%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#9E9E9E";
    document.getElementById("m18").style.backgroundColor = "#222";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("m18").addEventListener('click', function(){
    load("Mar18.csv");
    document.getElementById("bar").style.width = "73%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#9E9E9E";
    document.getElementById("m18").style.backgroundColor = "#9E9E9E";
    document.getElementById("m25").style.backgroundColor = "#222";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("m25").addEventListener('click', function(){
    load("Mar25.csv");
    document.getElementById("bar").style.width = "82%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#9E9E9E";
    document.getElementById("m18").style.backgroundColor = "#9E9E9E";
    document.getElementById("m25").style.backgroundColor = "#9E9E9E";
    document.getElementById("a1").style.backgroundColor = "#222";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("a1").addEventListener('click', function(){
    load("Apr1.csv");
    document.getElementById("bar").style.width = "91%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#9E9E9E";
    document.getElementById("m18").style.backgroundColor = "#9E9E9E";
    document.getElementById("m25").style.backgroundColor = "#9E9E9E";
    document.getElementById("a1").style.backgroundColor = "#9E9E9E";
    document.getElementById("a8").style.backgroundColor = "#222";

  })
  document.getElementById("a8").addEventListener('click', function(){
    load("Apr8.csv");
    document.getElementById("bar").style.width = "100%";
    document.getElementById("j22").style.backgroundColor = "#9E9E9E";
    document.getElementById("j29").style.backgroundColor = "#9E9E9E";
    document.getElementById("f5").style.backgroundColor = "#9E9E9E";
    document.getElementById("f12").style.backgroundColor = "#9E9E9E";
    document.getElementById("f19").style.backgroundColor = "#9E9E9E";
    document.getElementById("f26").style.backgroundColor = "#9E9E9E";
    document.getElementById("m4").style.backgroundColor = "#9E9E9E";
    document.getElementById("m11").style.backgroundColor = "#9E9E9E";
    document.getElementById("m18").style.backgroundColor = "#9E9E9E";
    document.getElementById("m25").style.backgroundColor = "#9E9E9E";
    document.getElementById("a1").style.backgroundColor = "#9E9E9E";
    document.getElementById("a8").style.backgroundColor = "#9E9E9E";

  })
})

