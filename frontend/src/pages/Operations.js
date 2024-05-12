import { ref, push, update, remove } from 'firebase/database';
import { db } from "../config/firebase"; // Import your Firebase configuration file


// Function to add a book to a user's booklist
export async function addBookToBooklist(userId, bookData) {
  const userBooklistRef = ref(db, `users/${userId}/booklist`);

  try {
    // Generate a unique key for the new book entry
    const newBookRef = push(userBooklistRef);

    // Set the book data
    const bookEntry = {
      bookName: bookData.bookName,
      bookType: bookData.bookType,
      bookDescription: bookData.bookDescription,
      author: bookData.author,
      comments: [] // Initialize comments list as empty
    };

    // Update the user's booklist with the new book entry
    await update(newBookRef, bookEntry);

    console.log("Book added to user's booklist successfully");
  } catch (error) {
    console.error("Error adding book to user's booklist:", error);
  }
};

// Function to remove a book from a user's booklist
export const removeBookFromBooklist = async (userId, bookId) => {
  const userBookRef = ref(db, `users/${userId}/booklist/${bookId}`);

  try {
    // Remove the specific book entry from the user's booklist
    await remove(userBookRef);

    console.log("Book removed from user's booklist successfully");
  } catch (error) {
    console.error("Error removing book from user's booklist:", error);
  }
};


export const exchangeBooks = async(offererId, offeredPersonId, offererBookId, offeredBookId) =>{
  try {
      // Retrieve the books of the offerer and the offered person
      const offererBooksSnapshot = await db.ref(`users/${offererId}/books`).once('value');
      const offeredPersonBooksSnapshot = await db.ref(`users/${offeredPersonId}/books`).once('value');

      // Get the book details
      const offererBooks = offererBooksSnapshot.val();
      const offeredPersonBooks = offeredPersonBooksSnapshot.val();

      // Retrieve the books to be exchanged
      const offererBook = offererBooks[offererBookId];
      const offeredBook = offeredPersonBooks[offeredBookId];

      // Swap books between users
      delete offererBooks[offererBookId];
      delete offeredPersonBooks[offeredBookId];

      offererBooks[offeredBookId] = offeredBook;
      offeredPersonBooks[offererBookId] = offererBook;

      // Update the books for each user in the database
      await db.ref(`users/${offererId}/books`).set(offererBooks);
      await db.ref(`users/${offeredPersonId}/books`).set(offeredPersonBooks);

      console.log("Books exchanged successfully!");
  } catch (error) {
      console.error("Error exchanging books:", error.message);
  }
};

export const offerBook = async(offererId, offeredPersonId, offererBookId, offeredBookId) =>{
  try {
      // Retrieve the books of the offerer and the offered person
      const offererBooksSnapshot = await db.ref(`users/${offererId}/books`).once('value');
      const offeredPersonBooksSnapshot = await db.ref(`users/${offeredPersonId}/books`).once('value');

      // Get the book details
      const offererBooks = offererBooksSnapshot.val();
      const offeredPersonBooks = offeredPersonBooksSnapshot.val();

      // Retrieve the books to be exchanged
      const offererBook = offererBooks[offererBookId];
      const offeredBook = offeredPersonBooks[offeredBookId];

      // Swap books between users
      delete offererBooks[offererBookId];
      delete offeredPersonBooks[offeredBookId];

      offererBooks[offeredBookId] = offeredBook;
      offeredPersonBooks[offererBookId] = offererBook;

      // Update the books for each user in the database
      await db.ref(`users/${offererId}/books`).set(offererBooks);
      await db.ref(`users/${offeredPersonId}/books`).set(offeredPersonBooks);

      console.log("Books exchanged successfully!");
  } catch (error) {
      console.error("Error exchanging books:", error.message);
  }
};

