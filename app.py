from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# ----------------------------
# MySQL Database Connection
# ----------------------------
try:
    db = mysql.connector.connect(
        host="localhost",
        user="ai_user",        # your MySQL username
        password="ai_password",# your MySQL password
        database="ai_study_buddy"
    )
    cursor = db.cursor(dictionary=True)
    print("Connected to MySQL database successfully!")
except mysql.connector.Error as err:
    print(f"Error connecting to MySQL database: {err}")

# ----------------------------
# Endpoint: Generate Flashcards (Mock AI)
# ----------------------------
@app.route('/api/generate', methods=['POST'])
def generate_flashcards():
    data = request.json
    notes = data.get('notes', '').strip()

    if not notes:
        return jsonify({'error': 'No notes provided'}), 400

    # --- Mock AI Flashcards Generation ---
    sentences = [s.strip() for s in notes.replace('\n', '.').split('.') if s.strip() != '']
    flashcards = []

    for i, sentence in enumerate(sentences[:5]):  # generate up to 5 flashcards
        card = {
            'question': f'Q{i+1}: What is the key idea here?',
            'answer': sentence
        }
        flashcards.append(card)

        # Save flashcard to database
        sql = "INSERT INTO flashcards (question, answer) VALUES (%s, %s)"
        cursor.execute(sql, (card['question'], card['answer']))
        db.commit()

    return jsonify({'flashcards': flashcards})

# ----------------------------
# Optional: Fetch all saved flashcards
# ----------------------------
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    cursor.execute("SELECT * FROM flashcards ORDER BY created_at DESC")
    results = cursor.fetchall()
    return jsonify(results)

# ----------------------------
if __name__ == '__main__':
    app.run(debug=True)
