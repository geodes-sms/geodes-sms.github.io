import argparse
import json
import os
import requests
import re
from bs4 import BeautifulSoup
from scapy.all import *
import csv
import html5lib
import urllib.request
import re
import argparse
import time

__author__ = "Istvan David"
__license__ = "GPLv3"
__version__ = "1.0.0"


class AppURLopener(urllib.request.FancyURLopener):
    version = "App/1.7"

class PapyrusScraper():

    baseURL = 'https://papyrus.bib.umontreal.ca'
    advisors = ["Sahraoui Houari", "Syriani Eugene", "Famelis Michalis"]
    theses = []

    def __init__(self):
        self._opener = AppURLopener()
    
    def getURL(self, advisor):
        return '{}/xmlui/browse?rpp=2000&offset=0&etal=-1&sort_by=-1&type=advisor&value={}&order=ASC'.format(self.baseURL, advisor)
        
    def getAdvisorURLSegment(self, advisor):
        lastname, firstname = advisor.split(' ')
        return "{}%2C+{}".format(lastname, firstname)
        
    def run(self):
        for advisor in self.advisors:
            self.getTheses(self.getAdvisorURLSegment(advisor))
            
        self.theses.sort(key = lambda t: t.date, reverse=True)
            
        for thesis in self.theses:
            thesis.printThesis('alumni-phd-msc-papyrus.yml')
        
    def getTheses(self, advisor):
        url = self.getURL(advisor)
        response = self._opener.open(url)

        soup = BeautifulSoup(response.read(), 'html.parser')
        
        artifacts = soup.find_all('div', {'class' : 'artifact-description'})
        for artifact in artifacts:
            thesisURL = '{}{}'.format(self.baseURL, artifact.find('a')['href'])
            self.getThesisData(thesisURL)
            
    def getThesisData(self, thesisURL):
        response = self._opener.open(thesisURL)
        soup = BeautifulSoup(response.read(), 'html.parser')
        
        people = soup.find_all('div', {'class' : 'simple-item-view-authors'})
        author = people[0].find('a').text
        print(author)
        advisors = ' and '.join([p.text for p in people[1].find_all('a')])
        print(advisors)
        
        level = soup.find_all('div', {'class' : 'simple-item-view-degreelevel'})[0].text.replace('Level','').strip()
        level = self.getLevelCode(level)
        print(level)
        
        date = soup.find_all('div', {'class' : 'simple-item-view-date'})[0].text
        date = self.unpackDate(date)
        print(date)
        
        self.theses.append(Thesis(author, level, date, advisors, thesisURL))
        
    levelCodes = {
        "Doctoral" : "PhD",
        "Master's" : "MSc"
    }
            
    def getLevelCode(self, fullLevelName):
        code = self.levelCodes[fullLevelName]
        if not code:
            return "other"
        return code
    
    def unpackDate(self, dateString):
        return dateString.split(': ')[1].split('-')[0].replace(')', '')
        
class Thesis():
    def __init__(self, author, level, date, advisors, thesisURL):
        self.author = author
        self.level = level
        self.date = date
        self.advisors = advisors
        self.thesisURL = thesisURL
    
    def printThesis(self, file):
        f = open(file, 'a', encoding='utf-8')
        f.write('\n')
        f.write('- name: {}\n'.format(self.author))
        f.write('  image:\n')
        f.write('  position: {}\n'.format(self.level))
        f.write('  end: {}\n'.format(self.date))
        f.write('  website:\n')
        f.write('  supervisor: {}\n'.format(self.advisors))
        f.write('  thesis: {}\n'.format(self.thesisURL))
        f.close()

if __name__ == "__main__":
    PapyrusScraper().run()