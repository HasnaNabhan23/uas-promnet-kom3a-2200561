package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/api/inventory",
		GetGoods).Methods("GET")
	router.HandleFunc("/api/inventory",
		CreateGoods).Methods("POST")
	router.HandleFunc("/api/inventory/{id}",
		ChooseGetGoods).Methods("GET")
	router.HandleFunc("/api/inventory/{id}",
		UpdateGoods).Methods("PUT")
	router.HandleFunc("/api/inventory/{id}",
		DeleteGoods).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all users
func GetGoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var goods []Barang

	result, err := db.Query("SELECT id, nama_barang," +
		"jumlah,harga_satuan,lokasi,deskripsi from inventory_hasnanabhanarasy")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var produk Barang
		err := result.Scan(&produk.ID, &produk.NamaBarang,
			&produk.Jumlah, &produk.HargaSatuan, &produk.Lokasi, &produk.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		goods = append(goods, produk)
	}
	json.NewEncoder(w).Encode(goods)
}

// Create user
func CreateGoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO inventory_hasnanabhanarasy(nama_barang," +
		"jumlah,harga_satuan,lokasi,deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	nama_barang := keyVal["nama_barang"]
	jumlah := keyVal["jumlah"]
	harga_satuan := keyVal["harga_satuan"]
	lokasi := keyVal["lokasi"]
	deskripsi := keyVal["deskripsi"]
	// print jenis_kelamin
	fmt.Println(harga_satuan)
	_, err = stmt.Exec(nama_barang, jumlah, harga_satuan, lokasi, deskripsi)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New user was created")
}

// Get user by ID
func ChooseGetGoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama_barang,"+
		"jumlah,harga_satuan,lokasi,deskripsi from inventory_hasnanabhanarasy WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var produk Barang
	for result.Next() {
		err := result.Scan(&produk.ID, &produk.NamaBarang,
			&produk.Jumlah, &produk.HargaSatuan, &produk.Lokasi, &produk.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(produk)
}

// Update user
func UpdateGoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE inventory_hasnanabhanarasy SET nama_barang = ?," +
		"jumlah= ?, harga_satuan=?, lokasi=?, deskripsi=? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	nama_barang := keyVal["nama_barang"]
	jumlah := keyVal["jumlah"]
	harga_satuan := keyVal["harga_satuan"]
	lokasi := keyVal["lokasi"]
	deskripsi := keyVal["deskripsi"]
	_, err = stmt.Exec(nama_barang, jumlah, harga_satuan, lokasi, deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was updated",
		params["id"])
}

func DeleteGoods(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	fmt.Println(params)
	// stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
	stmt, err := db.Prepare("DELETE FROM inventory_hasnanabhanarasy WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was deleted",
		params["id"])
}

type Barang struct {
	ID          string `json:"id"`
	NamaBarang  string `json:"nama_barang"`
	Jumlah      string `json:"jumlah"`
	HargaSatuan string `json:"harga_satuan"`
	Lokasi      string `json:"lokasi"`
	Deskripsi   string `json:"deskripsi"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2200561_hasnanabhanarasy_uas")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
