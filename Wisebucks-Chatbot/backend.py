
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import openai
from flask import send_from_directory
import os
from flask import render_template

app = Flask(__name__)

HEADERS = ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    'Accept-Language': 'en-US, en;q=0.5'
})

openai.api_key = "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"

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/ask', methods=['POST'])
def ask():
    question = request.json['question']
   # reviews = request.json['reviews']
    
    
    messages = [{"role": "system", "content": "You are a helpful assistant that has knowledge on financial related information"}]
    messages.append({"role": "user", "content": question})
    

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    answer = response['choices'][0]['message']['content']
    return jsonify(answer=answer)


if __name__ == '__main__':
    app.run()





