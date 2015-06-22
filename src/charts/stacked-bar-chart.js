import d3 from 'd3';

const hour   = 3600000; // 1 hour = (60 * 60 * 1000)
const bucket = hour * 3;
function StackedBarChart() {};

StackedBarChart.prototype.update = function update(data) {
  const {xAxis, yAxis, svg, width, height} = this;

  const x = d3.time.scale()
      .range([0, width]);

  const y = d3.scale.linear()
      .rangeRound([height, 0]);

  const color = d3.scale.category20();

  xAxis.scale(x).ticks(d3.time.day);
  yAxis.scale(y);

  d3.tsv("./public/models/data.tsv", function (error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(key => { return key !== "date"; }));

    // aggregates data into buckets
    // creates y values for stacking each separate data type
    const nested = d3.nest()
      .key(d => { return d.date - (d.date % bucket)})
      .rollup(data => {
        let y = 0;
        let total = 0;
        let values = color.domain().map(type => {
          let y0 = y;
          let y1 = total = y += d3.sum(data, d => { return d[type]; });
          return {type, y0, y1};
        });
        values.total = total;
        return values;
      })
      .entries(data);
    const extents = d3.extent(nested, d => { return +d.key; });

    x.domain(extents);
    y.domain([0, d3.max(nested, d => { return d.values.total; })]);

    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    const padding   = 0.1;                        // horizontal space between bars
    const step      = bucket * (1 - padding * 2); // corrected for padding
    const offset    = step / 2;                   // center bar over the tick
    const bandWidth = x(extents[0] - step) * -1;  // x func translates the step to chart proportions

    let g = svg.selectAll(".g")
        .data(nested)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", d => { return `translate(${x(d.key - offset)}, 0)`; });

    g.selectAll("rect")
        .data(d => { return d.values; })
      .enter().append("rect")
        .attr("width", bandWidth)
        .attr("y", d => { return y(d.y1); })
        .attr("height", d => { return y(d.y0) - y(d.y1); })
        .style("fill", d => { return color(d.type); });

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => { return `translate(0, ${i * 20})`; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => { return d; });

  });
};

export default StackedBarChart;
