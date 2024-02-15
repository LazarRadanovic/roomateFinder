import time
from bs4 import BeautifulSoup as bs
import requests
import json

niz_stanova_renta = []
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

gradovi_cg = ["Cetinje","Ulcinj","Herceg-Novi","Podgorica","Kotor","Bar",
              "Tivat","Niksic","Budva","Mojkovac","Danilovgrad","Zabljak",
              "Kolasin","Bijelo-Polje",
              ]
j = 0
while j<len(gradovi_cg):
  print('dovlace se podaci za grad: ' + gradovi_cg[j])
  pretraga = gradovi_cg[j];
  url_stanova_renta = "https://estitor.com/me/nekretnine/namjena-izdavanje/tip-stan/grad-"+pretraga
  url_response = requests.get(url_stanova_renta,headers=headers);
  soup = bs(url_response.text,'lxml')
  element =soup.find_all('li', class_=['flex items-center'])
  if len(element)>=2:
    print('postoji vise od jedne strane')
    no_page =element[-2].text.strip()
    print(no_page)
  else:
    no_page = 1
    print(no_page)
  #uzimanje podataka sa prve stranice
  all_articles = soup.find_all('article')
  for article in all_articles:
    naziv_element = article.select('h3')[0].text.replace("Izdavanje,","").strip()
    znakovi_za_zamjenu = str.maketrans('', '', '€,')
    cijena_element = article.find("span",class_="font-bold sm:text-xl whitespace-nowrap text-dark-green-1").text.translate(znakovi_za_zamjenu).strip()
    if not cijena_element == "Na upit":
      cijena_element_f = float(cijena_element)
    href_element = article.find('a').get('href')
    temp_url ="https://estitor.com"+href_element
    temp_url_res = requests.get(temp_url,headers=headers)
    temp_soup = bs(temp_url_res.text,'lxml')
    estate_description = temp_soup.find('div',class_='estate-description').text.strip()
    imgs_div = temp_soup.find_all('img',class_='rounded-lg')
      # img_url = img.get('src')
    if len(imgs_div)>=2:
      niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src'),"img_no2":imgs_div[1].get('src')})
    else:
      niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src')})
  i = 2
  if int(no_page)>1:
    if int(no_page)<5:
      while i<=int(no_page):
        time.sleep(5)
        print('broj stranica za grad: ' + gradovi_cg[j] + ' je: ' +no_page + ' dovlace se podaci sa strane:' + str(i) )
        url_loop = "https://estitor.com/me/nekretnine/namjena-izdavanje/tip-stan/grad-"+pretraga+"/strana-"+str(i)
        url_response = requests.get(url_loop,headers=headers);
        soup = bs(url_response.text,'lxml')
        all_articles = soup.find_all('article')
        for article in all_articles:
          naziv_element = article.select('h3')[0].text.replace("Izdavanje,","").strip()
          znakovi_za_zamjenu = str.maketrans('', '', '€,')
          cijena_element = article.find("span",class_="font-bold sm:text-xl whitespace-nowrap text-dark-green-1").text.translate(znakovi_za_zamjenu).strip()
          if not cijena_element == "Na upit":
            cijena_element_f = float(cijena_element)
          href_element = article.find('a').get('href')
          temp_url ="https://estitor.com"+href_element
          temp_url_res = requests.get(temp_url,headers=headers)
          temp_soup = bs(temp_url_res.text,'lxml')
          estate_description = temp_soup.find('div',class_='estate-description').text.strip()
          estate_imgs_urls = []
          imgs_div = temp_soup.find_all('img',class_='rounded-lg')
          if len(imgs_div)>=2:
            niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src'),"img_no2":imgs_div[1].get('src')})
          else:
            niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src')})
        i+=1
    else:
      while i<=3:
        time.sleep(5)
        print('broj stranica za grad: ' + gradovi_cg[j] + ' je: ' +no_page +' dovlace se podaci sa strane:' + str(i) )
        url_loop = "https://estitor.com/me/nekretnine/namjena-izdavanje/tip-stan/grad-"+pretraga+"/strana-"+str(i)
        url_response = requests.get(url_loop,headers=headers);
        soup = bs(url_response.text,'lxml')
        all_articles = soup.find_all('article')
        for article in all_articles:
          naziv_element = article.select('h3')[0].text.replace("Izdavanje,","").strip()
          znakovi_za_zamjenu = str.maketrans('', '', '€,')
          cijena_element = article.find("span",class_="font-bold sm:text-xl whitespace-nowrap text-dark-green-1").text.translate(znakovi_za_zamjenu).strip()
          if not cijena_element == "Na upit":
            cijena_element_f = float(cijena_element)
          href_element = article.find('a').get('href')
          temp_url ="https://estitor.com"+href_element
          temp_url_res = requests.get(temp_url,headers=headers)
          temp_soup = bs(temp_url_res.text,'lxml')
          estate_description = temp_soup.find('div',class_='estate-description').text.strip()
          estate_imgs_urls = []
          imgs_div = temp_soup.find_all('img',class_='rounded-lg')
          if len(imgs_div)>=2:
            niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src'),"img_no2":imgs_div[1].get('src')})
          else:
            niz_stanova_renta.append({"grad":pretraga,"naziv":naziv_element,"cijena":cijena_element_f,"description":estate_description,"img_no1":imgs_div[0].get('src')})
        i+=1
  else:
    pass
  j+=1

print(len(niz_stanova_renta))
try:
    # ... your existing code ...

    # Write data to JSON file
    with open("C:/Users/user/Documents/Cimer/cimer.me/src/app/scraping/real-estates-cg.json", "w", encoding='utf-8') as json_file:
        json.dump(niz_stanova_renta, json_file, indent=4)

    print("Data written to real-estates-cg.json successfully.")

except Exception as e:
    print(f"Error: {e}")

