// Keeps the footer year current.
var year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Only load the booking iframe once [BOOKING_LINK] has been replaced with a real https URL;
// until then, show a short note and rely on the "Book here" button.
var frame = document.querySelector('.booking-frame');
if (frame) {
  var url = frame.getAttribute('data-src') || '';
  if (/^https:\/\//.test(url)) {
    frame.setAttribute('src', url);
  } else {
    var note = document.querySelector('.booking-empty');
    if (note) note.hidden = false;
  }
}
