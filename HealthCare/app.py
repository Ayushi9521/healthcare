from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/submit", methods=["POST"])
def submit_form():
    try:
        # Extract form data
        name = request.form.get("Name")
        age = request.form.get("age")
        uploaded_file = request.files.get("file")

        # Validate inputs
        if not name:
            return jsonify({"error": "Name is required"}), 400
        if not age:
            return jsonify({"error": "Age is required"}), 400
        if not uploaded_file:
            return jsonify({"error": "File upload is required"}), 400

        # Additional validation: check if age is numeric
        if not age.isdigit():
            return jsonify({"error": "Age must be a numeric value"}), 400

        # Save the uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
        uploaded_file.save(file_path)

        # Process the data (dummy processing for demonstration)
        processed_message = f"Hello, {name}. Your age is {age}. The file '{uploaded_file.filename}' has been successfully uploaded."

        # Return detailed response
        response = {
            "success": True,
            "message": processed_message,
            "data": {
                "name": name,
                "age": age,
                "file": uploaded_file.filename,
                "file_path": file_path
            }
        }
        return jsonify(response), 200

    except Exception as e:
        # Handle exceptions and return a meaningful error message
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
