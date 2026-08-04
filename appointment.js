const form = document.getElementById('appointmentForm');
const messageBox = document.getElementById('message');
const bookingsList = document.getElementById('bookingsList');
const bookingCount = document.getElementById('bookingCount');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

const storageKey = 'elegance-bookings';

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

function loadBookings() {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
}

function saveBookings(bookings) {
  localStorage.setItem(storageKey, JSON.stringify(bookings));
}

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function renderBookings() {
  const bookings = loadBookings().sort((a, b) => {
    const first = new Date(`${a.date}T${a.time}`);
    const second = new Date(`${b.date}T${b.time}`);
    return first - second;
  });

  bookingCount.textContent = `${bookings.length} ${bookings.length === 1 ? 'appointment' : 'appointments'}`;

  if (!bookings.length) {
    bookingsList.innerHTML = '<p class="empty-state">No appointments yet. Your next booking will appear here.</p>';
    return;
  }

  bookingsList.innerHTML = '';

  bookings.forEach((booking, index) => {
    const item = document.createElement('article');
    item.className = 'booking-item';

    item.innerHTML = `
      <h4>${booking.service}</h4>
      <p class="booking-meta">${formatDate(booking.date)} • ${booking.time}</p>
      <p class="booking-meta">${booking.name}</p>
      <button class="delete-btn" data-index="${index}">Remove</button>
    `;

    bookingsList.appendChild(item);
  });
}

function showMessage(message, type = 'success') {
  messageBox.textContent = message;
  messageBox.className = `message ${type}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const booking = Object.fromEntries(formData.entries());

  const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'];
  const missing = requiredFields.filter((field) => !booking[field]);

  if (missing.length) {
    showMessage('Please fill in all required fields before booking.', 'error');
    return;
  }

  const bookings = loadBookings();
  bookings.push(booking);
  saveBookings(bookings);
  renderBookings();
  form.reset();
  timeInput.value = '';
  showMessage('Appointment booked successfully! We will contact you shortly.', 'success');
});

bookingsList.addEventListener('click', (event) => {
  const button = event.target.closest('.delete-btn');
  if (!button) return;

  const index = Number(button.dataset.index);
  const bookings = loadBookings();
  bookings.splice(index, 1);
  saveBookings(bookings);
  renderBookings();
  showMessage('Appointment removed.', 'success');
});

setMinDate();
renderBookings();
