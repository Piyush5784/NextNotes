import React from "react";
import axios from "axios";

const AllNotes = async () => {
  const email = "piyushjha5668@gmail.com";

  // const email = user.data?.user?.email;

  if (!email) {
    return <p>No user Found</p>;
  }
  try {
    const notes = await axios.get(
      `http://localhost:3000/api/notes/getAllNotes?email=${email}`
    );

    if (notes) {
      return <>{JSON.stringify(notes)}</>;
    }
  } catch (error) {
    return <p>Error {JSON.stringify(error)}</p>;
  }
};

export default AllNotes;
