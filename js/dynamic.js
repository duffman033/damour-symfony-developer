document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            const title = document.querySelector("h1");
            if (title)
                title.innerHTML = `${data.about.prenom} <span class="text-primary">${data.about.nom}</span>`;

            const subheading = document.querySelector("#about .subheading");
            if (subheading)
                subheading.innerText = `${data.about.adresse} · ${data.about.telephone} · ${data.about.email}`;

            const description = document.querySelector("#about p.lead");
            if (description)
                description.innerText = data.about.description;

            const socialLinks = document.querySelectorAll("#about .social-icons a.js-social");
            const urls = Object.values(data.about.socials);
            socialLinks.forEach((el, i) => {
                if (urls[i]) el.href = urls[i];
            });

            const generateEntry = (title, items, formatter) => {
                let html = `<h2 class="mb-5 fw-bold text-uppercase section-title">${title}</h2>`;
                items.forEach((item) => {
                    html += `
                        <div class="entry-block">
                          <div class="entry-main">
                            ${formatter(item)}
                          </div>
                          <div class="entry-aside">${item.date}</div>
                        </div>
                    `;
                });
                return html;
            };

            const expContainer = document.querySelector("#experience .resume-section-content");
            if (expContainer && data.experiences) {
                let html = `<h2 class="mb-5 fw-bold text-uppercase section-title">Expérience</h2>`;
                const main = data.experiences.slice(0, 3);
                const hidden = data.experiences.slice(3);

                main.forEach((exp) => {
                    html += `
                        <div class="entry-block mb-4">
                          <div class="entry-main">
                            <h3 class="mb-1">${exp.poste}</h3>
                            <div class="subheading text-muted mb-2">${exp.entreprise}</div>
                            <p class="text-body">${exp.description}</p>
                          </div>
                          <div class="entry-aside">${exp.date}</div>
                        </div>
                    `;
                });

                if (hidden.length > 0) {
                    html += `<div id="extra-experiences" class="d-none">`;
                    hidden.forEach((exp) => {
                        html += `
                            <div class="entry-block mb-4">
                              <div class="entry-main">
                                <h3 class="mb-1">${exp.poste}</h3>
                                <div class="subheading text-muted mb-2">${exp.entreprise}</div>
                                <p class="text-body">${exp.description}</p>
                              </div>
                              <div class="entry-aside">${exp.date}</div>
                            </div>
                        `;
                    });
                    html += `</div>
                        <div class="text-center mt-3">
                          <button id="toggle-exp" class="btn btn-outline-primary">Afficher plus</button>
                        </div>`;
                }

                expContainer.innerHTML = html;

                const btn = document.getElementById("toggle-exp");
                const extra = document.getElementById("extra-experiences");
                if (btn && extra) {
                    btn.addEventListener("click", () => {
                        const isHidden = extra.classList.contains("d-none");
                        extra.classList.toggle("d-none");
                        btn.innerText = isHidden ? "Afficher moins" : "Afficher plus";
                    });
                }
            }

            const eduContainer = document.querySelector("#education .resume-section-content");
            if (eduContainer && data.education) {
                eduContainer.innerHTML = generateEntry("Éducation", data.education, (edu) => `
                    <h3 class="mb-1">${edu.ecole}</h3>
                    <div class="subheading text-muted mb-1">${edu.diplome}</div>
                    <div>${edu.specialite}</div>
                    <p>${edu.notes}</p>
                `);
            }

            const skillsContainer = document.querySelector("#skills .resume-section-content");
            if (skillsContainer && data.skills) {
                let skillsHtml = `<h2 class="mb-5 fw-bold text-uppercase section-title">Compétences</h2>`;
                skillsHtml += `<div class="subheading mb-3">Langages & Outils</div><ul class="list-inline dev-icons">`;
                data.skills.tools.forEach((tool) => {
                    skillsHtml += `<li class="list-inline-item"><i class="${tool}"></i></li>`;
                });
                skillsHtml += `</ul>`;

                skillsHtml += `<div class="subheading mb-3">Workflow</div><ul class="fa-ul mb-0">`;
                data.skills.workflow.forEach((step) => {
                    skillsHtml += `<li><span class="fa-li"><i class="fas fa-check"></i></span>${step}</li>`;
                });
                skillsHtml += `</ul>`;

                skillsContainer.innerHTML = skillsHtml;
            }

            const interestsContainer = document.querySelector("#interests .resume-section-content");
            if (interestsContainer && data.interests) {
                let interestsHtml = `<h2 class="mb-5 fw-bold text-uppercase section-title">Centres d’intérêt</h2>`;
                data.interests.forEach((interest) => {
                    interestsHtml += `<p>${interest}</p>`;
                });
                interestsContainer.innerHTML = interestsHtml;
            }

            const awardsContainer = document.querySelector("#awards .resume-section-content");
            if (awardsContainer && data.awards) {
                let awardsHtml = `<h2 class="mb-5 fw-bold text-uppercase section-title">Récompenses & Certifications</h2><ul class="fa-ul mb-0">`;
                data.awards.forEach((award) => {
                    awardsHtml += `<li><span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>${award}</li>`;
                });
                awardsHtml += `</ul>`;
                awardsContainer.innerHTML = awardsHtml;
            }

            AOS.refresh();

            const sideNav = document.querySelector('#sideNav');
            if (sideNav) {
                bootstrap.ScrollSpy.getInstance(document.body)?.dispose();
                new bootstrap.ScrollSpy(document.body, {
                    target: '#sideNav',
                    offset: 100
                });
            }
        });
});
