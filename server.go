package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"path"
	"regexp"
	"strconv"
	"time"

	_ "github.com/lib/pq"
)

// Quote object
type Quote struct {
	ID         int       `json:"id"`
	Quote      string    `json:"quote"`
	Author     string    `json:"author"`
	Category   string    `json:"category"`
	CreatedAt  time.Time `json:"date"`
	AuthorID   int       `json:"author_id"`
	CategoryID int       `json:"category_id"`
}

// Author of content
type Author struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
}

// Category of quotes
type Category struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

var quote *Quote
var author *Author
var category *Category

// Db instance
var Db *sql.DB

func init() {
	log.Println("Connection database")
	var err error
	Db, err = sql.Open("postgres", "user=postgres dbname=postgres password=asdfgh sslmode=disable")
	if err != nil {
		log.Println("error from db")
		panic(err)
	}
}

// GetByCategory ...
func GetByCategory(category int) (quotes []*Quote, err error) {
	rows, err := Db.Query("select * from quotes where category_id = $1", category)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		quote := &Quote{}
		err = rows.Scan(&quote.ID, &quote.Quote, &quote.Author, &quote.Category, &quote.CategoryID, &quote.AuthorID, &quote.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
		quotes = append(quotes, quote)
	}
	return

}

// GetByAuthor ...
func GetByAuthor(author int) (quotes []*Quote, err error) {
	rows, err := Db.Query("select * from quotes where author_id = $1", author)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		quote := &Quote{}
		err = rows.Scan(&quote.ID, &quote.Quote, &quote.Author, &quote.Category, &quote.CategoryID, &quote.AuthorID, &quote.CreatedAt)
		if err != nil {
			log.Fatal(err)
		}
		quotes = append(quotes, quote)
	}
	return
}

// GetQuoteByID ...
func GetQuoteByID(id int) (quote *Quote, err error) {
	log.Println("get by id")
	quote = &Quote{}
	err = Db.QueryRow("select id, quote, author, category, category_id, author_id from quotes where id = $1",
		id).Scan(&quote.ID, &quote.Quote, &quote.Author, &quote.Category, &quote.CategoryID, &quote.AuthorID)
	if err != nil {
		log.Println(err)
	}
	log.Println(quote.Quote)
	return quote, nil
}

// GetAllQuotes ...
func GetAllQuotes() (quotes []*Quote, err error) {
	rows, err := Db.Query("select id, quote, author, category, category_id, author_id from quotes")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		quote := &Quote{}
		err = rows.Scan(&quote.ID, &quote.Quote, &quote.Author, &quote.Category, &quote.CategoryID, &quote.AuthorID)
		if err != nil {
			log.Fatal(err)
		}
		quotes = append(quotes, quote)
	}
	return
}

// GetAllAuthors ...
func GetAllAuthors() (authors []*Author, err error) {
	rows, err := Db.Query("SELECT id, fullname FROM author")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		author := &Author{}
		err = rows.Scan(&author.ID, &author.Fullname)
		if err != nil {
			log.Fatal(err)
		}
		authors = append(authors, author)
	}
	return
}

// GetAllCategory ...
func GetAllCategory() (categories []*Category, err error) {
	rows, err := Db.Query("SELECT id, title FROM category")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var category = &Category{}
		err = rows.Scan(&category.ID, &category.Title)
		if err != nil {
			log.Fatal(err)
		}
		categories = append(categories, category)
	}
	return
}

// Create ...
func (quote *Quote) Create() (err error) {
	log.Println(quote.Quote)
	statement := "insert into quotes (quote, author_id, category_id, created_at, category, author) values ($1, $2, $3, $4, $5, $6) returning id"

	stmt, err := Db.Prepare(statement)
	if err != nil {
		return
	}
	defer stmt.Close()
	err = stmt.QueryRow(quote.Quote, quote.AuthorID, quote.CategoryID, quote.CreatedAt, quote.Category, quote.Author).Scan(&quote.ID)
	return
}

// Create author
func (author *Author) Create() (err error) {
	_, err = Db.Exec("insert into author (fullname) values ($1) returning id", author.Fullname)
	return
}

// Create category
func (category *Category) Create() (err error) {
	_, err = Db.Exec("insert into category (title) values ($1) returning id", category.Title)
	return
}

// Update ...
func (quote *Quote) Update() (err error) {
	_, err = Db.Exec("update quotes set content = $2, author = $3, author_id = $4, category = $5, category_id = $6, where id = $1", quote.ID, quote.Quote, quote.Author, quote.AuthorID, quote.Category, quote.CategoryID)
	return
}

// Delete ...
func (quote *Quote) Delete() (err error) {
	log.Println(quote.ID)
	_, err = Db.Exec("delete from quotes where id = $1", quote.ID)
	return
}

type regexpResolver struct {
	handlers map[string]http.HandlerFunc
	cache    map[string]*regexp.Regexp
	api      string
}

//newPathResolver constructor
func newPathResolver() *regexpResolver {
	return &regexpResolver{
		handlers: make(map[string]http.HandlerFunc),
		cache:    make(map[string]*regexp.Regexp),
	}
}

//Add create routes
func (r *regexpResolver) Add(regex string, handler http.HandlerFunc) {
	r.handlers[regex] = handler
	cache, _ := regexp.Compile(regex)
	r.cache[regex] = cache
}

func (r *regexpResolver) Set(api string) {
	r.api = api
	log.Println(api)
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Access-Control-Request-Method, Access-Control-Request-Headers, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func (r *regexpResolver) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	check := req.Method + " " + req.URL.Path
	for pattern, handlerFunc := range r.handlers {
		log.Println(pattern)
		if r.cache[pattern].MatchString(check) == true {
			handlerFunc(res, req)
			return
		}
	}
	http.NotFound(res, req)
}

func handlePut(w http.ResponseWriter, r *http.Request) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	if err != nil {
		return
	}
	post, err := GetQuoteByID(id)
	if err != nil {
		return
	}
	len := r.ContentLength
	body := make([]byte, len)
	r.Body.Read(body)
	json.Unmarshal(body, &post)
	err = post.Update()
	if err != nil {
		return
	}
	return
}

func handleDelete(w http.ResponseWriter, r *http.Request) (err error) {
	id, err := strconv.Atoi(path.Base(r.URL.Path))
	log.Println(id)
	if err != nil {
		return
	}
	post, err := GetQuoteByID(id)
	log.Println(post.ID)
	if err != nil {
		log.Println(err)
		return
	}
	err = post.Delete()
	if err != nil {
		log.Println(err)
		return
	}
	return
}

func main() {
	router := newPathResolver()
	router.Set("api")
	router.Add("(GET|POST|PUT|DELETE|OPTIONS) /quote(/?[0-9]*)?", handleRequest)
	router.Add("(GET|POST|OPTIONS) /author(/?[A-Za-z]*)?", handleRequestAuthor)
	router.Add("(GET|POST|OPTIONS) /category(/?[A-Za-z]*)?", handleRequestCategory)
	router.Add("(GET|OPTIONS) /getbyauthor(/?[0-9]*)?", byAuthorReq)
	router.Add("(GET|OPTIONS) /getbycategory(/?[0-9]*)?", byCategoryReq)
	http.ListenAndServe(":8081", router)
}

func handleRequest(res http.ResponseWriter, req *http.Request) {
	setupResponse(&res, req)
	if req.Method == "OPTIONS" {
		res.WriteHeader(200)
		return
	}
	var err error
	switch req.Method {
	case "GET":
		err = handleGet(res, req)
	case "POST":
		err = handlePost(res, req)
	case "DELETE":
		err = handleDelete(res, req)
	case "PUT":
		err = handlePut(res, req)
	}
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleRequestAuthor(res http.ResponseWriter, req *http.Request) {
	setupResponse(&res, req)
	if req.Method == "OPTIONS" {
		res.WriteHeader(200)
		return
	}
	var err error
	switch req.Method {
	case "GET":
		err = getAuthor(res, req)
	case "POST":
		err = createAuthor(res, req)
	}
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handleRequestCategory(res http.ResponseWriter, req *http.Request) {
	setupResponse(&res, req)
	if req.Method == "OPTIONS" {
		res.WriteHeader(200)
		return
	}
	var err error
	switch req.Method {
	case "GET":
		err = getCategory(res, req)
	case "POST":
		err = createCategory(res, req)
	}
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
}

func handlePost(res http.ResponseWriter, req *http.Request) (err error) {
	var quote Quote
	quote.CreatedAt = time.Now()
	len := req.ContentLength
	body := make([]byte, len)
	req.Body.Read(body)
	json.Unmarshal(body, &quote)
	log.Println(quote)
	err = quote.Create()
	if err != nil {
		println("err: ", err)
		return
	}
	return
}

func createAuthor(res http.ResponseWriter, req *http.Request) (err error) {
	var author Author
	len := req.ContentLength
	body := make([]byte, len)
	req.Body.Read(body)
	err = json.Unmarshal(body, &author)
	if err != nil {
		println("err: ", err.Error())
		return
	}
	err = author.Create()
	if err != nil {
		println("err: ", err.Error())
		return
	}
	return
}

func createCategory(res http.ResponseWriter, req *http.Request) (err error) {
	len := req.ContentLength
	body := make([]byte, len)
	req.Body.Read(body)
	err = json.Unmarshal(body, &category)
	if err != nil {
		println("err: ", err.Error())
		return
	}
	err = category.Create()
	if err != nil {
		return
	}
	return
}

func getAuthor(res http.ResponseWriter, req *http.Request) (err error) {
	var authors []*Author
	authors, err = GetAllAuthors()
	if err != nil {
		panic(err)
	}
	json.NewEncoder(res).Encode(authors)
	return
}

func getCategory(res http.ResponseWriter, req *http.Request) (err error) {
	var allcat []*Category
	allcat, err = GetAllCategory()
	log.Println(category)
	json.NewEncoder(res).Encode(allcat)
	if err != nil {
		panic(err)
	}
	return
}

func handleGet(res http.ResponseWriter, req *http.Request) (err error) {
	quote, err := GetAllQuotes()
	if err != nil {
		return
	}
	json.NewEncoder(res).Encode(quote)
	if err != nil {
		panic(err)
	}
	return
}

func getOnebyId(res http.ResponseWriter, req *http.Request) (err error) {
	id, err := strconv.Atoi(path.Base(req.URL.Path))
	if err != nil {
		return
	}
	_, err = GetQuoteByID(id)
	if err != nil {
		log.Fatal(err)
	}
	return
}

func byCategoryReq(res http.ResponseWriter, req *http.Request) {
	setupResponse(&res, req)
	if req.Method == "OPTIONS" {
		res.WriteHeader(200)
		return
	}
	id, err := strconv.Atoi(path.Base(req.URL.Path))
	if err != nil {
		log.Println(err)
		return
	}
	switch req.Method {
	case "GET":
		log.Println(id)
		post, err := GetByCategory(id)
		if err != nil {
			log.Println(err)
		}
		log.Println(post)
		json.NewEncoder(res).Encode(post)
		if err != nil {
			panic(err)
		}
	}
	return
}

func byAuthorReq(res http.ResponseWriter, req *http.Request) {
	setupResponse(&res, req)
	if req.Method == "OPTIONS" {
		res.WriteHeader(200)
		return
	}
	id, err := strconv.Atoi(path.Base(req.URL.Path))
	if err != nil {
		log.Println(err)
		return
	}
	switch req.Method {
	case "GET":
		log.Println(id)
		post, err := GetByAuthor(id)
		if err != nil {
			log.Println(err)
		}
		log.Println(post)
		json.NewEncoder(res).Encode(post)
		if err != nil {
			panic(err)
		}
	}
	return
}
