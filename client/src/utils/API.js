import axios from "axios";

export default {
    // Gets user
    getUser: function () {
        return axios.get("/account");
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    addNewUserSet: function (newUserSet) {
        return axios.post("/api/users", newUserSet);
    }
};
