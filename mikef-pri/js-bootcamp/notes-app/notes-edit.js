'use strict'

const titleElement = document.querySelector('#note-title');
const lastEditedElement = document.querySelector('#last-edited');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign('index.html');
}

titleElement.value = note.title;
lastEditedElement.textContent = generateLastEdited(note.updatedAt);
bodyElement.value = note.body;

titleElement.addEventListener('input', (e) => {
  note.updatedAt = moment().valueOf();
  lastEditedElement.textContent = generateLastEdited(note.updatedAt);
  note.title = e.target.value;
  saveNotes(notes);
});

bodyElement.addEventListener('input', (e) => {
  note.updatedAt = moment().valueOf();
  lastEditedElement.textContent = generateLastEdited(note.updatedAt);
  note.body = e.target.value;
  saveNotes(notes);
});

removeElement.addEventListener('click', () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign('index.html');
    }

    titleElement.value = note.title;
    lastEditedElement.innerHTML = `Last edited ${moment(
      note.updatedAt
    ).fromNow()}`;
    bodyElement.value = note.body;
  }
});
