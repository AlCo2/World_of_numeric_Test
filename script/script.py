from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import time
from datetime import datetime
import csv
import sys

def insertData():
    database = mongo[database_name]
    print(f"database {database_name} created\n")
    print("inserting products...\n")
    time.sleep(1)
    products = []
    for row in file:
        row['ProductID'] = int(row['ProductID'])
        row['Price'] = float(row['Price'])
        products.append(row)
    products_collection = database["products"]
    products_collection.insert_many(products)
    print("inserting sales...\n")
    sales = []
    for row in file2:
        row['SaleID'] = int(row['SaleID'])
        row['ProductID'] = int(row['ProductID'])
        row['Quantity'] = int(row['Quantity'])
        row['Date'] = datetime.strptime(row['Date'], '%Y-%m-%d')
        row['TotalAmount'] = float(row['TotalAmount'])
        sales.append(row)
    sales_collections = database["sales"]
    sales_collections.insert_many(sales)
    print("Done.")

file = csv.DictReader(open("products.csv"))
file2 = csv.DictReader(open("sales.csv"))

connection_url = input("connexion Info(default:mongodb://localhost:27017/):")

if len(connection_url) == 0:
    connection_url = "mongodb://localhost:27017/"

try:
    mongo = MongoClient(connection_url)
    database_name = input("Database Name:")
    if len(database_name) == 0:
        print("error: no database name provided")
        sys.exit()
    if database_name not in mongo.list_database_names():
        print(f"Database {database_name} Not found\n")
        choice = input(f"do you want to create Database {database_name}? Y/N:")
        if choice.upper() == 'Y':
            insertData()
        else:
            print("Create database and run the script again :)\n")
    else:
        insertData()
except:
    print("Error: Failed to connect to MongoDB");



