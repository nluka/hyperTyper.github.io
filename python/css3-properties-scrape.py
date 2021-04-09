import requests
from bs4 import BeautifulSoup

data = requests.get("https://www.w3schools.com/cssref/")

soup = BeautifulSoup(data.text, 'html.parser')

div = soup.find("div", {"id": "cssproperties"})

with open("../js/practice/expression-resources/html-css/css3-properties-list.js", "w") as outfile:
    outfile.write("const css3PropertiesCollection = [\n")
    for a in div.findAll("a"):
        outfile.write(f'  "{a.text}",\n')
    outfile.write("];")
