// Add this array at the beginning of your app.js file
const services = [
    { 
        name: "House Cleaning", 
        description: "Professional cleaning services to keep your home spotless.",
        icon: "fas fa-broom",
        features: [
            "Deep cleaning of all rooms",
            "Dusting and vacuuming",
            "Bathroom and kitchen sanitization",
            "Window cleaning"
        ]
    },
    { 
        name: "Gardening", 
        description: "Expert gardening services to maintain and beautify your outdoor spaces.",
        icon: "fas fa-leaf",
        features: [
            "Lawn mowing and edging",
            "Shrub trimming and pruning",
            "Tree care and maintenance",
            "Landscaping and design"
        ]
    },
    { 
        name: "Caregiving", 
        description: "Compassionate caregiving services for seniors and those in need.",
        icon: "fas fa-hand-holding-heart",
        features: [
            "Assistance with daily activities",
            "Medication management",
            "Companionship and socialization",
            "Light housekeeping"
        ]
    }
];

// Add this function to create service cards
function createServiceCard(service) {
    const card = document.createElement('div');
    card.classList.add('service-card');
    card.innerHTML = `
        <i class="${service.icon}"></i>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <a href="service-details.html?service=${encodeURIComponent(service.name)}" class="btn btn-primary">Learn More</a>
    `;
    return card;
}

// Add this function to load services
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        services.forEach(service => {
            servicesGrid.appendChild(createServiceCard(service));
        });
    }
}

// Helper profiles data (replace with dynamic data in a real application)
const helperProfiles = [
    { name: "Priya Sharma", bio: "Experienced house cleaner with attention to detail.", rating: 4.5, service: "House Cleaning" },
    { name: "Rahul Patel", bio: "Professional gardener with a green thumb.", rating: 4.0, service: "Gardening" },
    { name: "Anjali Gupta", bio: "Certified caregiver specializing in elderly care.", rating: 5.0, service: "Caregiving" },
];

// Function to create helper profile cards
function createHelperCard(helper) {
    const card = document.createElement('div');
    card.classList.add('helper-card');
    card.innerHTML = `
        <h3>${helper.name}</h3>
        <p>${helper.bio}</p>
        <p>Service: ${helper.service}</p>
        <p>Rating: ${helper.rating}/5</p>
        <a href="service-details.html?service=${encodeURIComponent(helper.service)}" class="btn btn-primary">View Service Details</a>
    `;
    return card;
}

// Load helper profiles on the homepage
function loadHelperProfiles() {
    const helperGrid = document.getElementById('helper-grid');
    if (helperGrid) {
        helperProfiles.forEach(helper => {
            helperGrid.appendChild(createHelperCard(helper));
        });
    }
}

// Function to load service details
function loadServiceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service');
    
    if (serviceName) {
        const service = services.find(s => s.name === serviceName);
        
        if (service) {
            document.getElementById('service-title').textContent = service.name;
            document.getElementById('service-description').innerHTML = `<p>${service.description}</p>`;
            document.getElementById('service-name').value = service.name;
            
            // Add features (you may need to add a features array to your services)
            const featuresList = document.getElementById('service-features-list');
            service.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            document.getElementById('service-pricing').textContent = getServicePricing(service.name);
        } else {
            document.querySelector('.service-details-content').innerHTML = '<p>Service details not found.</p>';
        }
    }
}

// Function to show the booking form
function showBookingForm() {
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('show-booking-form').style.display = 'none';
}

// Function to handle service booking
function handleServiceBooking(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingData = Object.fromEntries(formData.entries());

    bookingData.id = Date.now();
    bookingData.timestamp = new Date().toISOString();
    bookingData.status = 'Pending';

    const existingBookings = JSON.parse(localStorage.getItem('serviceBookings')) || [];
    existingBookings.push(bookingData);
    localStorage.setItem('serviceBookings', JSON.stringify(existingBookings));

    console.log('Service Booking:', bookingData);
    alert('Your service booking has been submitted successfully!');
    event.target.reset();

    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('service-details').innerHTML += '<p>Thank you for your booking! We will confirm your appointment shortly.</p>';
}

// Helper functions for service description and pricing
function getServiceDescription(service) {
    const descriptions = {
        "Caregiving": "Professional caregiving services for seniors and individuals with special needs.",
        "Gardening": "Expert gardening services to maintain and beautify your outdoor spaces.",
        "House Cleaning": "Thorough house cleaning services to keep your home spotless."
    };
    return descriptions[service] || "Description not available.";
}

function getServicePricing(service) {
    const pricing = {
        "Caregiving": "Starting at $25/hour. Packages available for daily, weekly, or monthly care.",
        "Gardening": "Starting at $50/hour. Custom quotes available for larger projects.",
        "House Cleaning": "Starting at $30/hour. Discounts available for regular bookings."
    };
    return pricing[service] || "Pricing information not available.";
}

// Function to load user profile
function loadUserProfile() {
    const userDetails = document.getElementById('user-details');
    const userBookingsList = document.getElementById('user-bookings-list');

    if (userDetails && userBookingsList) {
        // In a real application, you would fetch this data from a server
        const user = {
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890"
        };

        userDetails.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        `;

        const bookings = JSON.parse(localStorage.getItem('serviceBookings')) || [];
        
        if (bookings.length === 0) {
            userBookingsList.innerHTML = '<p>You have no bookings at the moment.</p>';
        } else {
            userBookingsList.innerHTML = bookings.map(booking => `
                <div class="booking-card">
                    <h3>${booking['service-name']}</h3>
                    <p><strong>Date:</strong> ${booking['booking-date']}</p>
                    <p><strong>Time:</strong> ${booking['booking-time']}</p>
                    <p><strong>Duration:</strong> ${booking['booking-duration']} days</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
            `).join('');
        }
    }
}

// Function to load helper profile
function loadHelperProfile() {
    const helperDetails = document.getElementById('helper-details');
    const helperApprovedServices = document.getElementById('helper-approved-services');

    if (helperDetails && helperApprovedServices) {
       
        const helper = {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "987-654-3210",
            service: "House Cleaning"
        };

        helperDetails.innerHTML = `
            <p><strong>Name:</strong> ${helper.name}</p>
            <p><strong>Email:</strong> ${helper.email}</p>
            <p><strong>Phone:</strong> ${helper.phone}</p>
            <p><strong>Service:</strong> ${helper.service}</p>
        `;

        const bookings = JSON.parse(localStorage.getItem('serviceBookings')) || [];
        const approvedBookings = bookings.filter(booking => booking.status === 'Approved' && booking['service-name'] === helper.service);
        
        if (approvedBookings.length === 0) {
            helperApprovedServices.innerHTML = '<p>You have no approved services at the moment.</p>';
        } else {
            helperApprovedServices.innerHTML = approvedBookings.map(booking => `
                <div class="booking-card">
                    <h3>${booking['service-name']}</h3>
                    <p><strong>Date:</strong> ${booking['booking-date']}</p>
                    <p><strong>Time:</strong> ${booking['booking-time']}</p>
                    <p><strong>Duration:</strong> ${booking['booking-duration']} days</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
            `).join('');
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadServices(); // Add this line
    loadHelperProfiles();
    loadServiceDetails();

    const serviceBookingForm = document.getElementById('service-booking-form');
    if (serviceBookingForm) {
        serviceBookingForm.addEventListener('submit', handleServiceBooking);
    }

    loadUserProfile();
    loadHelperProfile();

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically clear the session/local storage
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    }

    // Add this to your DOMContentLoaded event listener
    initFAQ();

    const listHelpForm = document.getElementById('list-help-form');
    if (listHelpForm) {
        listHelpForm.addEventListener('submit', handleListHelp);
    }

    loadHelpListings();

    // Add event listener for applying to jobs
    const helpListingsGrid = document.getElementById('help-listings-grid');
    if (helpListingsGrid) {
        helpListingsGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('apply-job')) {
                const jobId = e.target.getAttribute('data-job-id');
                applyForJob(jobId);
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Add this function to your existing app.js file

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });
}

// Handle list help form submission
function handleListHelp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const helpData = Object.fromEntries(formData.entries());
    
    // Add a unique ID and timestamp to the help request
    helpData.id = Date.now();
    helpData.timestamp = new Date().toISOString();
    helpData.status = 'Open';

    // Get existing help listings from localStorage or initialize an empty array
    const existingListings = JSON.parse(localStorage.getItem('helpListings')) || [];

    // Add the new help request to the array
    existingListings.push(helpData);

    // Save the updated array back to localStorage
    localStorage.setItem('helpListings', JSON.stringify(existingListings));

    console.log('Help Request:', helpData);
    alert('Your help request has been submitted successfully!');
    event.target.reset();

    // Redirect to the help listings page
    window.location.href = 'help-listings.html';
}

// Function to load help listings on the help listings page
function loadHelpListings() {
    const helpListingsGrid = document.getElementById('help-listings-grid');
    if (helpListingsGrid) {
        // Clear existing listings
        helpListingsGrid.innerHTML = '';

        // Get help listings from localStorage
        const helpListings = JSON.parse(localStorage.getItem('helpListings')) || [];

        if (helpListings.length === 0) {
            helpListingsGrid.innerHTML = '<p>No help requests available at the moment.</p>';
        } else {
            helpListings.forEach(listing => {
                const card = createHelpListingCard(listing);
                helpListingsGrid.appendChild(card);
            });
        }
    }
}

// Function to create a help listing card
function createHelpListingCard(listing) {
    const card = document.createElement('div');
    card.classList.add('help-listing-card');
    card.innerHTML = `
        <h3>${listing['help-title']}</h3>
        <p><strong>Category:</strong> ${listing['help-category']}</p>
        <p><strong>Description:</strong> ${listing['help-description']}</p>
        <p><strong>Date:</strong> ${listing['help-date']}</p>
        <p><strong>Time:</strong> ${listing['help-time']}</p>
        <p><strong>Location:</strong> ${listing['help-location']}</p>
        <p><strong>Status:</strong> ${listing.status}</p>
        <button class="btn btn-primary apply-job" data-job-id="${listing.id}">Apply for Job</button>
    `;
    return card;
}

// Function to handle job application
function applyForJob(jobId) {
    // In a real application, you would send this to a server
    // For now, we'll just update the local storage
    const helpListings = JSON.parse(localStorage.getItem('helpListings')) || [];
    const updatedListings = helpListings.map(listing => {
        if (listing.id.toString() === jobId) {
            listing.status = 'Applied';
        }
        return listing;
    });

    localStorage.setItem('helpListings', JSON.stringify(updatedListings));
    alert('You have successfully applied for this job!');
    loadHelpListings(); // Reload the listings to reflect the change
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would typically send this data to a server for authentication
    // For this example, we'll use a simple check
    if (email.trim() !== '' && password.trim() !== '') {
        console.log('Login:', { email, password });
        alert('Login successful!');
        // Redirect to the home page after successful login
        window.location.href = 'index.html';
    } else {
        alert('Please enter both email and password.');
    }
}