addEventListener("load", (event) => load_feature_projects());

//featch featured project infos and create a card for each one
function load_feature_projects() {
	fetch('featured_projects.json')
	.then(response => response.json())
	.then(cards => {
		const container = document.getElementById('cards-container');

		cards.forEach(card => {
			const tags = card.tags.map(tag => `<span class="tag is-small">${tag}</span>`).join(' ');
			container.innerHTML += `
				<div class="col-4">
				<div class="card project">
					<img src="${card.image}" alt="${card.title}">
					<div class="project-body">
					<h5>${card.title}</h5>
					<div class="description-hider">
						<p class="project-description">${card.text}</p>
					</div>
					<a href="${card.link}" class="button primary">Learn More</a>
					<div>${tags}</div>
					</div>
				</div>
				</div>
			`;
		});
		enableHoverDescriptionAnimation();
	});
}

//manually compute the description fold animation distance because
function enableHoverDescriptionAnimation() {
	document.querySelectorAll(".project").forEach(project => {
		const description = project.querySelector(".project-description");

		project.addEventListener("mouseenter", () => {
			description.style.maxHeight = description.scrollHeight + "px";
		});
		project.addEventListener("mouseleave", () => {
			if (window.innerWidth >= 600) {
				description.style.maxHeight = "0px";
			}
		});
	});
}
