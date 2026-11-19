// Initial Mock Database Array
let eventsData = [
    {
        id: 1,
        title: "Global Tech Summit 2026",
        date: "2026-11-25",
        category: "Tech",
        location: "San Francisco, CA & Virtual",
        desc: "Join global industry innovators exploring Next-Gen AI advancements, cloud framework optimizations, and decentralized infrastructure solutions."
    },
    {
        id: 2,
        title: "Echoes of Jazz Concert",
        date: "2026-12-05",
        category: "Music",
        location: "Symphony Hall, Austin",
        desc: "An ambient evening delivering high-class acoustic jazz arrangements from award-winning ensembles and independent solo artists."
    },
    {
        id: 3,
        title: "SME Scaling & Venture Workshop",
        date: "2026-12-14",
        category: "Business",
        location: "Downtown Hub, New York",
        desc: "Master key corporate fundings mechanics, go-to-market methodologies, and network directly with prominent seed venture capital partners."
    }
];

// DOM Element Registry
const eventsContainer = document.getElementById('events-container');
const categoryFilterButtons = document.querySelectorAll('.filter-btn');
const eventModal = document.getElementById('event-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const createEventForm = document.getElementById('create-event-form');
const toastNotification = document.getElementById('toast-message');

// Core Display Engine
function renderEvents(filterCategory = 'all') {
    eventsContainer.innerHTML = '';

    const targetEvents = filterCategory === 'all'
        ? eventsData
        : eventsData.filter(event => event.category === filterCategory);

    if(targetEvents.length === 0) {
        eventsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">No events found in this category.</p>`;
        return;
    }

    targetEvents.forEach(event => {
        const cardElement = document.createElement('div');
        cardElement.className = 'event-card';
        cardElement.innerHTML = `
            <div class="event-card-body">
                <span class="badge">${event.category}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <div><strong>📅 Date:</strong> ${formatDate(event.date)}</div>
                    <div><strong>📍 Venue:</strong> ${event.location}</div>
                </div>
                <p class="event-desc">${event.desc}</p>
                <button class="btn-card" onclick="triggerRSVP(${event.id})">RSVP for Event</button>
            </div>
        `;
        eventsContainer.appendChild(cardElement);
    });
}

// Utility Formatting Date Function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Filter Interactive Pipeline
categoryFilterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderEvents(e.target.getAttribute('data-category'));
    });
});

// Modal Display Handlers
openModalBtn.addEventListener('click', () => eventModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => eventModal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if(e.target === eventModal) eventModal.classList.remove('active');
});

// Create and Post New Data Submission
createEventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEvent = {
        id: Date.now(),
        title: document.getElementById('event-title').value,
        date: document.getElementById('event-date').value,
        category: document.getElementById('event-category').value,
        location: document.getElementById('event-location').value,
        desc: document.getElementById('event-desc').value
    };

    eventsData.unshift(newEvent); // Prepends to array view
    renderEvents();

    // Clean, close and notify state UI
    createEventForm.reset();
    eventModal.classList.remove('active');
    triggerToast("Event Published and Live! 🚀");
});

// RSVP Interaction Core Action
function triggerRSVP(id) {
    const target = eventsData.find(e => e.id === id);
    triggerToast(`Registered successfully for: ${target.title}! 🎉`);
}

// Toast Feedback Generator
function triggerToast(message) {
    toastNotification.innerText = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3500);
}

// Bootstrap Platform State Initiation
document.addEventListener('DOMContentLoaded', () => renderEvents());
