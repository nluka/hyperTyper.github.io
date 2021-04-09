import requests
from bs4 import BeautifulSoup

data = requests.get('https://www.tutorialspoint.com/html5/html5_tags.htm')

soup = BeautifulSoup(data.text, 'html.parser')

table = soup.find("table")

cells = table.findAll("td")

openingTags = []
for index, td in enumerate(cells):
    if index % 2 == 0:
        openingTags.append(td.text)

with open("../js/practice/expression-resources/html-css/html5-tags-list.js", "w") as outfile:
    outfile.write("const html5TagsCollection = [\n")
    for openingTag in openingTags:
        closingTag = "</" + openingTag.split("<")[1]
        outfile.write(f'  "{openingTag}","{closingTag}",\n')
    outfile.write("];")
