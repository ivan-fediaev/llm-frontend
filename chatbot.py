import os
import json
from langchain.llms.bedrock import Bedrock
import pdfplumber

PDF_FILE = 'notes.pdf'

def extract_text_from_pdf(pdf_file_path):
    text = ''
    with pdfplumber.open(pdf_file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

#
llm = Bedrock(
    region_name='us-west-2',
    credentials_profile_name='default',
    model_id='ai21.j2-ultra-v1'
    )

prompt = 'Generate practice questions and answers based off the pdf: %s' % extract_text_from_pdf(PDF_FILE)

response_text = llm.predict(prompt)

print(response_text)
