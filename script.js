// Set up chart dimensions
const width = 800;
const height = 500;
const margin = { top: 20, right: 30, bottom: 40, left: 50 };

// Create SVG container
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from CSV
d3.csv("data.csv").then(data => {
  // Convert string values to numbers
  data.forEach(d => {
    d.Total_years_present_job = +d.Total_years_present_job;
    d.Total_years_dispatcher = +d.Total_years_dispatcher;
  });

  // Set up scales
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.Total_years_present_job)])
    .range([0, width - margin.left - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.Total_years_dispatcher)])
    .range([height - margin.top - margin.bottom, 0]);

  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add points
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.Total_years_present_job))
    .attr("cy", d => y(d.Total_years_dispatcher))
    .attr("r", 5)
    .attr("fill", "#4CAF50");

  // Add axis labels
  svg.append("text")
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("y", height - margin.bottom + 20)
    .style("text-anchor", "middle")
    .text("Total Years in Present Job");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height - margin.top - margin.bottom) / 2)
    .attr("y", -margin.left + 15)
    .style("text-anchor", "middle")
    .text("Total Years as Dispatcher");
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});
