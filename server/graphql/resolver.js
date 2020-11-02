const bookModel = require("../models/Book");

module.exports = {

    // Get all books
    getAllBooks : async (args, req) => {
        const BooksData =  await bookModel.find();

        if(BooksData){
            return BooksData;
        }else{
            return [];
        }
    },

    // get book data by ID
    getbookById: async (args, req) => {
        const bookDetails = await bookModel.findById(args.id);

        if(bookDetails){
            return bookDetails
        }else{
            throw new Error('Error');
        }
    },

    // Add Book
    addBook: async (args, req) => {

        const AddedBook = await new bookModel({
            title: args.title,
            author: args.author,
            description: args.description,
            published_year: args.published_year,
            publisher: args.publisher,
            updated_date: args.updated_date,
        });

            const newBook = await AddedBook.save();
            if (!newBook) {
              throw new Error('Error');
            }
            return {
                status: true,
                message: "Data is successfully added!"
            }
          
    },

    // Update book
    updateBook: async (args, req) => {
        const updateData = {
            title: args.title, 
            author: args.author, 
            description: args.description, 
            published_year: args.published_year, 
            publisher: args.publisher, 
            updated_date: new Date() 
        }
        const UpdateBook = await bookModel.findByIdAndUpdate(args.id, updateData);

        if(UpdateBook){
            return {
                status: true,
                message: "Data is updated"
            }
        }else{
            return {
                status: false,
                message: "Error while updating data!"
            }
        }
    },

    // Delete Book
    removeBook: async (args, req) => {

        const removeBook = await bookModel.findByIdAndRemove(args.id);

        if(removeBook){
           return{
            status: true,
            message: "Book is deleted"
           }
        }else{
            return{
                status: false,
                message: "Something went wrong!"
               } 
        }
    }
}