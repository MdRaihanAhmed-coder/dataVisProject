class NavBar {
	vc;

	populate(list, name, data) {
		list.append("li").append("a")
		  .attr("class", "link_name")
			.attr("href", "#")
			.html(name);
		let switchGroups = list.selectAll(".switchGroup")
		  .data(data)
			.join("li")
			.classed("switchGroup", true);
		switchGroups.append("a").attr("href", "#").html(d => d);
		let labels = switchGroups.append("label").classed("switch", true);
		labels.append("input").attr("type", "checkbox").attr("checked", "true").classed("navtoggle", true);
		labels.append("span").classed("slider", true).attr("name", d => d).attr("parent", name);
	}

	toggleRadio(name) {
		let stratum = (name == "ESRB") ? "ESRB_Rating" : name;
		this.categorizer.activeStratum = stratum;
	  d3.selectAll(".category-radio").property("checked", false);
		d3.select("#" + name).node().checked = true;
		this.vc.draw(stratum);
	}

	constructor(vc, categorizer) {
		this.vc = vc;
		this.categorizer = categorizer;

		this.populate(d3.select("#platform-list"), "Platform", Object.keys(this.categorizer.Platform));
		this.populate(d3.select("#genre-list"), "Genre", Object.keys(this.categorizer.Genre));
		this.populate(d3.select("#esrb-list"), "ESRB Rating", Object.keys(this.categorizer.ESRB_Rating));

		d3.selectAll(".slider").on("click", e => {
			this.categorizer.toggle(e.target.__data__);
			this.vc.draw(this.categorizer.activeStratum);
		});

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
			this.toggleRadio(e.target.id)
		})

		this.toggleRadio("Platform");
	}
}
