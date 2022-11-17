class NavBar {

	vc;

	radios = {};

	active_radio = "";

	switches = {};

	populateNavBar() {

		let platforms = ["Atari", "Nintendo", "Sega", "Microsoft", "Sony", "PC", "Other"]
		platforms.forEach(d => this.switches[d] = true)

		let ratings = ["Unrated", "EC", "E", "E10", "T", "M", "AO"]
		ratings.forEach(d => this.switches[d] = true)

		// let genre = [""]
		// genre.forEach(d => this.switches[d] = false)

		let category = ["Platform", "Genre", "ESRB"]
		category.forEach(d => this.radios[d] = false)


	}

	toggleRadio(name) {

			d3.selectAll(".category-radio").property("checked", false);
			
			d3.select("#" + name).target.checked = true;

			this.active_radio = name;

	}

	toggleSwitch(name) {

			this.switches[name] = this.switches[name] ? false : true;

	}

	redraw() {

			let catergory = active_radio == "ESRB" ? "ESRB_Rating" : active_radio;
			// let filterFunction = d => {
			// 	Object.entries(switches).forEach([key, value] => {
			// 		if(!value) {
			// 			if(d.Platform == key) {
			// 				return false;
			// 			}
			// 		}
			// 	});
			// 	return true;
			// }
	}

	constructor(vc) {

		this.vc = vc;

		d3.selectAll(".navtoggle").on("change", e => {
			this.toggleSwitch(e.target.name)
			//console.log(e.target.name);

			// var isChecked = this.checked;
			// console.log(isChecked);
			vc.barChart.draw(active_radio, )

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
			this.toggleRadio(e.target.id)
		})

	this.populateNavBar()
	//console.log(this.radios)
	//console.log(this.switches)
	}
}
