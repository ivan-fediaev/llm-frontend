import os
import json
import boto3
from flask import Flask, flash, request, redirect, url_for
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#
session = boto3.Session() #sets the profile name to use for AWS credentials


AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
UPLOAD_FOLDER = "./data"
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
context = ""

# AWS_ACCESS_KEY_ID = "rHGojXd5axr5t1VzTQChE2VyqqZ32UVoI/Vt5SDS"
# AWS_SECRET_ACCESS_KEY = "rHGojXd5axr5t1VzTQChE2VyqqZ32UVoI/Vt5SDS"

bedrock = session.client(
    service_name='bedrock-runtime', #creates a Bedrock client
    region_name="us-west-2",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
) 

#
bedrock_model_id = "ai21.j2-ultra-v1" #set the foundation model

prompt = "What is the largest city in New Hampshire?" #the prompt to send to the model

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file'
    
    # Save the file to a location on the server
    file.save('./data/' + file.filename)
    
    with open(f"./data/{file.filename}", encoding='utf-8') as file:
        context = file.read()
        print(context)
        print("working")
        body = json.dumps({
            "prompt": f"Please tell me the keywords of these notes and return them as single words answers in a comma delimited list without any numbers and absolutely no other information from the model, just the list: {context}", #AI21
            "maxTokens": 8191, 
            "temperature": 0, 
            "topP": 0.5, 
            "stopSequences": [], 
            "countPenalty": {"scale": 0 }, 
            "presencePenalty": {"scale": 0 }, 
            "frequencyPenalty": {"scale": 0 }
        }) #build the request payload

        #
        response = bedrock.invoke_model(body=body, modelId=bedrock_model_id, accept='application/json', contentType='application/json') #send the payload to Bedrock

        #
        response_body = json.loads(response.get('body').read()) # read the response

        response_text = response_body.get("completions")[0].get("data").get("text")
        res_list = response_text.split(",")
        return res_list



    return 'File uploaded successfully'

@app.route("/hello")
def hello_world():
    return "Hello, World!"

@app.route('/test',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      print("Post!")
      return "Post!"

@app.route('/prompt',methods = ['POST'])
def prompt():
   if request.method == 'POST':
      prompt = request.get_json()["prompt"]
    
      body = json.dumps({
            "prompt": prompt, #AI21
            "maxTokens": 1024, 
            "temperature": 0, 
            "topP": 0.5, 
            "stopSequences": [], 
            "countPenalty": {"scale": 0 }, 
            "presencePenalty": {"scale": 0 }, 
            "frequencyPenalty": {"scale": 0 }
      }) #build the request payload

        #
      response = bedrock.invoke_model(body=body, modelId=bedrock_model_id, accept='application/json', contentType='application/json') #send the payload to Bedrock

        #
      response_body = json.loads(response.get('body').read()) # read the response

      response_text = response_body.get("completions")[0].get("data").get("text") #extract the text from the JSON response
      return response_text  


@app.route('/setup',methods = ['POST'])
def setup():
    if request.method == "POST":
        difficulty = request.get_json()["difficulty"]
        num_questions = request.get_json()["num_questions"]


if __name__ == '__main__':
    app.run(host="localhost", port=8080)