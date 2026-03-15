from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import ollama
import webbrowser
from grammar import check_grammar

app = Flask(__name__, template_folder="../templates", static_folder="../static")

CORS(app)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()
    text = data.get("text")

    grammar_feedback = check_grammar(text)

    response = ollama.chat(
        model="tinyllama",
        messages=[
            {"role": "system", "content": "You are an English communication coach."},
            {"role": "user", "content": text}
        ]
    )

    ai_reply = response["message"]["content"]

    return jsonify({
        "grammar": grammar_feedback,
        "reply": ai_reply
    })


if __name__ == "__main__":
    webbrowser.open("http://127.0.0.1:5000")
    app.run(debug=True)