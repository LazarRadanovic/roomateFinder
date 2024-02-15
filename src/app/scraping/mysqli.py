import mysql.connector
import json

# Poveži se s bazom podataka
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="cimer"
)

cursor = conn.cursor()

# Otvori JSON datoteku
with open('C:/Users/user/Documents/Cimer/cimer.me/src/app/scraping/real-estates-cg.json', 'r') as file:
    data = json.load(file)

# Iteriraj kroz sve zapise u JSON datoteci
for record in data:
    # Provjeri postojanje ključa 'img_no2' i postavi na None ako ne postoji
    img_no2 = record.get('img_no2', None)

    # Pripremi SQL upit
    sql = "INSERT INTO estates (grad, naziv, cijena, description, img_no1, img_no2) VALUES (%s, %s, %s, %s, %s, %s)"

    # Izvrši pripremljeni SQL upit
    cursor.execute(sql, (
        record['grad'],
        record['naziv'],
        record['cijena'],
        record['description'],
        record['img_no1'],
        img_no2
    ))

# Potvrdi promjene
conn.commit()

# Zatvori konekciju
cursor.close()
conn.close()