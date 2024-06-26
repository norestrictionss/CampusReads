import { ref, push, update, remove, get, set } from 'firebase/database';
import { db } from "../config/firebase";


// Function to add a book to a user's booklist
export async function addBookToBooklist(userId, bookData) {
  const userBooklistRef = ref(db, `users/${userId}/booklist`);

  try {

    const newBookRef = push(userBooklistRef);
    const bookEntry = {
      bookSSN: bookData.ssn,
      bookName: bookData.bookname,
      author: bookData.bookauthor,
      bookType: bookData.bookgender,
      bookDescription: bookData.description,
      imageURL: bookData.imageURL,
      comments: []
    };


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
  const isConfirmed = window.confirm("You are deleting this books, are you sure?");
  if (isConfirmed) {
    const userBookRef = ref(db, `users/${userId}/booklist/${bookId}`);
    try {
      await remove(userBookRef);
      console.log("Book removed from user's booklist successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error removing book from user's booklist:", error);
    }
  }

};


export const exchangeBooks = async (senderId, ownerID, book2ID, book1ID, requestID) => {
  try {
    console.log("Request ID for exchange:", requestID)
    const requestRef = ref(db, "requests/" + requestID);
    const ownerRef = ref(db, "users/" + ownerID + "/booklist/" + book1ID);
    const ownerSnapshot = await get(ownerRef);
    if (ownerSnapshot.exists()) {
      const senderRef = ref(db, "users/" + senderId + "/booklist/" + book2ID);
      const senderSnapshot = await get(senderRef);

      if (senderSnapshot.exists()) {
        const senderData = senderSnapshot.val();
        const ownerData = ownerSnapshot.val();

        await set(ownerRef, senderData);
        await set(senderRef, ownerData);

        const userRef = ref(db, `Requests/${requestID}`);
        const updates = {
          requestStatus: "Accepted"
        };

        await update(userRef, updates);
        console.log(requestRef);
        await remove(requestRef);
      }

    } else {
      console.log("No requests found");

    }

  } catch (error) {
    console.error("Error exchanging books:", error.message);
  }
};

export const offerBook = async (offererId, offeredPersonId, offererBookId, offeredBookId) => {

  const userOfferlistRef = ref(db, `users/${offeredPersonId}/offerlist`);
  try {
    try {
      const newOfferRef = push(userOfferlistRef);

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

export const showBookList = async (studentID) => {

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

export const returnUsers = async () => {

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

export const getUserDetails = async (userId) => {
  if (userId) {
    console.log("User data:", userId);

    try {

      const userRef = ref(db, 'users/' + userId);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        return userData;
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    console.log("User object is undefined or null");
    return null;
  }
};

export const sendRequest = async (book1Id, book2ID, ownerId, senderId, senderName, senderSurname, senderEmail, senderPhoneNumber, senderMessage, requestStatus, imgURL, ownerEmail, bookName) => {

  const userRequestRef = ref(db, `Requests/`);
  try {

    // First reference must be created to successfully retrive the data.
    const newRequestRef = push(userRequestRef);


    const requestEntry = {
      ownerID: ownerId,
      book1ID: book1Id,
      book2ID: book2ID,
      senderId: senderId,
      senderName: senderName,
      senderSurname: senderSurname,
      senderEmail: senderEmail,
      senderPhoneNumber: senderPhoneNumber,
      senderMessage: senderMessage,
      requestStatus: requestStatus,
      imageURL: imgURL,
      ownerEmail: ownerEmail,
      bookName: bookName
    };


    await update(newRequestRef, requestEntry);
    const requestId = newRequestRef.key;
    console.log("Book added to user's booklist successfully");
    return requestId;
  } catch (error) {
    console.error("Error adding book to user's booklist:", error);
  }
  return -1;

}


// It returns the requests that belongs to the specific user.
export const getRequests = async () => {

  const userRequestsRef = ref(db, `Requests/`);
  try {
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      const requests = snapshot.val();
      return requests;
    } else {
      console.log("No requests found");
      return [];
    }
  } catch (error) {
    console.error("Error getting requests:", error);
    return [];
  }
};

// It finds the book accordingly with ID.
export const findBookByID = async (userID, bookID) => {
  const bookRef = ref(db, `users/${userID}/booklist/${bookID}`);
  try {
    const snapshot = await get(bookRef);
    if (snapshot.exists()) {
      const book = snapshot.val();
      return book;
    } else {
      console.log("No requests found");
      return null;
    }
  } catch (error) {
    console.error("Error getting requests:", error);
    return null;
  }
};

