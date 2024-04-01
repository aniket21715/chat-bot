from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import ChatCompletion
import openai

app = Flask(__name__)
CORS(app)  # Allow all origins for CORS

openai.api_key = "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"  # Set the OpenAI API key

chat_completion = ChatCompletion()

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    try:
        ai_response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=user_message,
            max_tokens=50
        )
        return jsonify({'message': ai_response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
