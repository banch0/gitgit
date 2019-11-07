// package main

// import (
// 	"database/sql"
// 	"log"

// 	_ "github.com/lib/pq"
// )

// //Db connector
// var Db *sql.DB

// func init() {
// 	log.Println("Connection database")
// 	var err error
// 	Db, err = sql.Open("postgres", "user=postgres dbname=postgres password=asdfgh sslmode=disable")
// 	if err != nil {
// 		log.Println("error from db")
// 		panic(err)
// 	}
// }

// // GetQuoteByID ...
// func GetQuoteByID(id int) (quote *Quote, err error) {
// 	quote = &Quote{}
// 	err = Db.QueryRow("select id, content, author from quotes where id = $1",
// 		id).Scan(&quote.ID, &quote.Quote) //&quote.Author
// 	return
// }

// // GetAllQuotes ...
// func GetAllQuotes() (quote *Quote, err error) {
// 	quote = &Quote{}
// 	err = Db.QueryRow("select id, quote, author, category from quotes").Scan(&quote.ID, &quote.Quote, &quote.Author, &quote.Category)
// 	return
// }

// // GetAllAuthors ...
// func GetAllAuthors() (author *Author, err error) {
// 	author = &Author{}
// 	err = Db.QueryRow("select id, fullname from author").Scan(&author.ID, &author.Name)
// 	return
// }

// // GetAllCategory ...
// func GetAllCategory() (category *Category, err error) {
// 	category = &Category{}
// 	err = Db.QueryRow("select id, title from category").Scan(&category.ID, &category.Content)
// 	return
// }

// // Create ...
// func (quote *Quote) Create() (err error) {
// 	log.Println(quote.Quote)
// 	statement := "insert into quotes (quote, author_id, category_id, created_at, category, author) values ($1, $2, $3, $4, $5, $6) returning id"

// 	stmt, err := Db.Prepare(statement)
// 	if err != nil {
// 		return
// 	}
// 	defer stmt.Close()
// 	err = stmt.QueryRow(quote.Quote, quote.AuthorID, quote.CategoryID, quote.CreatedAt, quote.Category, quote.Author).Scan(&quote.ID)
// 	return
// }

// // Create author
// func (author *Author) Create() (err error) {
// 	log.Println(author.Name)

// 	_, err = Db.Exec("insert into author (fullname) values ($1) returning id", author.Name)
// 	return
// }

// // Create category
// func (category *Category) Create() (err error) {
// 	println(category.Content)
// 	_, err = Db.Exec("insert into category (title) values ($1) returning id", category.Content)
// 	return
// }

// // Update ...
// func (quote *Quote) Update() (err error) {
// 	_, err = Db.Exec("update quotes set content = $2, author = $3 where id = $1", quote.ID, quote.Quote) // quote.Author

// 	return
// }

// // Delete ...
// func (quote *Quote) Delete() (err error) {
// 	_, err = Db.Exec("delete from quotes where id = $1", quote.ID)
// 	return
// }
