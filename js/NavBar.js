class NavBar {

	vc;

	constructor(vc) {

		this.vc = vc;

		d3.selectAll(".navtoggle").on("change", e => {
			console.log(e.target.checked);
			// var isChecked = this.checked;
			// console.log(isChecked);


		})

		d3.selectAll(".arrow").on("click",  e => {
		  let arrowParent = e.target.parentElement.parentElement;
		  arrowParent.classList.toggle("showMenu");
		});

		d3.select(".bx-menu").on("click", e => {
		  let sidebar = d3.select(".sidebar");
		  sidebar.classed("close", sidebar.classed("close") ? false : true);
		});

		let radios = d3.selectAll(".category-radio");
		d3.selectAll(".category-radio").on("click", e => {
			radios.property("checked", false);
			e.target.checked = true;
			console.log(e);
		})
	}
}
