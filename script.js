document.querySelector('.login-btn').addEventListener('click', () => {
    // Redirect to the login screen (You can implement actual logic later)
    alert('Redirecting to Login...');
  });
  
  document.querySelector('.signup-btn').addEventListener('click', () => {
    // Redirect to the signup screen (You can implement actual logic later)
    alert('Redirecting to Sign Up...');
  });
  

const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const seatCount = document.getElementById('seat-count');

let seats = 1;

decreaseBtn.addEventListener('click', () => {
  if (seats > 1) {
    seats--;
    seatCount.textContent = seats;
  }
});

increaseBtn.addEventListener('click', () => {
  seats++;
  seatCount.textContent = seats;
});

// Global variables for the map and directions services
let map, directionsService, directionsRenderer;

function initMap() {
  // Initialize Google Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 19.0760, lng: 72.8777 }, // Set default location (Mumbai, India)
    zoom: 12,
  });

  // Initialize directions service and renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function findShortestPath() {
  // Get the values from the input fields
  const fromLocation = document.getElementById('from').value;
  const toLocation = document.getElementById('to').value;

  // Geocoder to convert addresses to lat/lng
  const geocoder = new google.maps.Geocoder();
  
  if (fromLocation && toLocation) {
    // Geocode the 'from' and 'to' locations
    geocoder.geocode({ address: fromLocation }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        const fromLatLng = results[0].geometry.location;
        
        geocoder.geocode({ address: toLocation }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            const toLatLng = results[0].geometry.location;
            
            // Create a Directions Request to find the shortest path
            const request = {
              origin: fromLatLng,
              destination: toLatLng,
              travelMode: google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, function(response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
              } else {
                alert('Unable to find the shortest path');
              }
            });
          } else {
            alert('Unable to geocode destination address');
          }
        });
      } else {
        alert('Unable to geocode origin address');
      }
    });
  } else {
    alert('Please enter both locations');
  }
}

// Initialize the map once the API is loaded
window.initMap = initMap;
