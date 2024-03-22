$(document).ready(function(){
    fetch("gigs.json")
        .then(response => response.json())
        .then(response => response.forEach(parseGigs));
  });

function parseGigs(gig) {
    let date = new Date(gig.Date + "T00:00:00");
    let today = new Date();
    if (today.getTime() <= date.getTime()) {
        $(".wrapper").append(
            `<div class="item">
                    <div class="card" style="width: 18rem; background-color:#fefae0">
                        <div class="card-body">
                            <h5 class="card-title">${gig.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${date.toDateString()}, ${gig.Time}</h6>
                            <p class="card-text">${gig.Description}</p>
                            <a href="${gig.LocationURL}" class="card-link">Directions</a>
                            <a href="${gig.WebsiteURL}" class="card-link">Website Link</a>
                        </div>
                    </div>
                </div>`
        )
    }
}