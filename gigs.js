$(document).ready(function(){
    fetch("gigs.json")
        .then(response => response.json())
        .then(response => response.forEach(parseGigs));

    if (!document.cookie.includes("ga_consent=")) {
        $('#gaConsentModal').modal('show');
    } else if (document.cookie.includes("ga_consent=true")) {
        loadGoogleAnalytics(); // Load GA if user already consented
    }

    $('#acceptGa').click(function() {
        let expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = "ga_consent=true; expires=" + expires.toUTCString() + "; path=/";
        
        $('#gaConsentModal').modal('hide');
        loadGoogleAnalytics(); // Load GA after accepting
    });

    // Handle "Decline" button click
    $('#declineGa').click(function() {
        // Set a cookie indicating no consent
        let expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = "ga_consent=false; expires=" + expires.toUTCString() + "; path=/";
        
        $('#gaConsentModal').modal('hide');
        deleteGaCookies(); // Remove GA cookies
    });
});

function parseGigs(gig) {
    let date = new Date(gig.Date + "T00:00:00");
    let today = new Date();
    if (today.getTime() <= date.getTime()) {
        $(".wrapper.watch").append(
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

function collapseNavbarAndScroll(section) {
    // Collapse the navbar (assuming Bootstrap)
    $('.navbar-collapse').collapse('hide');
  
    // Smooth scrolling to the #about section
    $('html, body').animate({
      scrollTop: $(section).offset().top
    }, 500); // Adjust the animation duration as needed
}

// Function to load Google Analytics dynamically
function loadGoogleAnalytics() {
    let gtagScript = document.createElement('script');
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-KN83X6ZDX8";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KN83X6ZDX8');
}

// Function to delete Google Analytics cookies
function deleteGaCookies() {
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function showCookieBanner() {
    $('#gaConsentModal').modal('show');
}