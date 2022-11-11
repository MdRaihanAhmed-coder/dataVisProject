d3.selectAll(".arrow").on("click",  e => {
  let arrowParent = e.target.parentElement.parentElement;
  arrowParent.classList.toggle("showMenu");
});

d3.select(".bx-menu").on("click", e => {
  let sidebar = d3.select(".sidebar");
  sidebar.classed("close", sidebar.classed("close") ? false : true);
});
