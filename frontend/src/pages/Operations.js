import { ref, push, update, remove, get } from 'firebase/database';
import { db } from "../config/firebase"; // Import your Firebase configuration file


// Function to add a book to a user's booklist
export async function addBookToBooklist(userId, bookData) {
  const userBooklistRef = ref(db, `users/${userId}/booklist`);

  try {
    // Generate a unique key for the new book entry
    const newBookRef = push(userBooklistRef);

    // Set the book data
    const bookEntry = {
      bookSSN: bookData.ssn,
      bookName: bookData.bookname,
      author: bookData.bookauthor,
      bookType: bookData.bookgender,
      bookDescription: bookData.description,
      comments: [] // Initialize comments list as empty
    };

    // Update the user's booklist with the new book entry
    await update(newBookRef, bookEntry);
    const bookId = newBookRef.key; 
    console.log("Book added to user's booklist successfully");
    return bookId;
  } catch (error) {
    console.error("Error adding book to user's booklist:", error);
  }
  return -1;
};

// Function to remove a book from a user's booklist
export const removeBookFromBooklist = async (userId, bookId) => {
  const userBookRef = ref(db, `users/${userId}/booklist/${bookId}`);

  try {
    // Remove the specific book entry from the user's booklist
    await remove(userBookRef);

    console.log("Book removed from user's booklist successfully");
    window.location.reload();

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

  const userOfferlistRef = ref(db, `users/${offeredPersonId}/offerlist`);
  try {
      
      try {
     
        const newOfferRef = push(userOfferlistRef);
    
        // Set the book data
        const offerEntry = {
          offerrerId: offererBookId,
          offeredBookId: offeredBookId,
        };
    
      
        await update(newOfferRef, offerEntry);
    
        console.log("Offer added to user's offerlist successfully");
      } catch (error) {
        console.error("Error adding book to user's offerlist:", error);
      }

      console.log("Offer process successfully completed!");
  } catch (error) {
      console.error("Error to sending offer:", error.message);
  }
};

export const showBookList = async(studentID) =>{

  try {
    const booklist = ref(db, `users/${studentID}/booklist`);
    const snapshot = await get(booklist); // It fetches the booklist through the reference.
    if (snapshot.exists()) {
      const bookList = snapshot.val();
      console.log("Book list fetched successfully:", bookList);

      return bookList;
    } else {
      console.log("No book list found for this student.");
      return [];
    }

  } catch (error) {
      console.error("Error to fetching the books:", error.message);
  }
};

export const returnUsers = async()=>{

  try {
    const userlist = ref(db, `users/`);
    const snapshot = await get(userlist); // It fetches the booklist through the reference.
    if (snapshot.exists()) {
      const userList = snapshot.val();
      console.log("User list fetched successfully:", userList);

      return userList;
    } else {
      console.log("There are no users in the system");
      return [];
    }

  } catch (error) {
      console.error("Error to fetching the books:", error.message);
  }

}
