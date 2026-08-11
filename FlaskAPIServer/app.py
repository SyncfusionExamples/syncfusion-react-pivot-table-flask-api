from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), "products_data.json")
PRIMARY_KEY = "ProductID"

# Load products from the JSON file (read-only seed data)
def load_products():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

# In-memory product list loaded from the seed file.
products = load_products()

# GET /products: fetch all products (read-only)
@app.get("/products")
def list_products():
    return jsonify(products)

# POST /products: create a new product
@app.post("/products")
def create_product():
    row = request.get_json(silent=True) or {}
    if not row.get(PRIMARY_KEY):
        max_id = max((r.get(PRIMARY_KEY, 0) for r in products), default=0)
        row[PRIMARY_KEY] = int(max_id) + 1
    products.append(row)
    return jsonify(row), 201

# PUT /products/<int:item_id>: update an existing product
@app.put("/products/<int:item_id>")
def update_product(item_id: int):
    row = request.get_json(silent=True) or {}
    for i, current in enumerate(products):
        if int(current.get(PRIMARY_KEY)) == int(item_id):
            row[PRIMARY_KEY] = item_id
            products[i] = row
            return jsonify(row)
    return jsonify({"message": "not found"}), 404

# DELETE /products/<int:item_id>: delete a product
@app.delete("/products/<int:item_id>")
def delete_product(item_id: int):
    for i, current in enumerate(products):
        if int(current.get(PRIMARY_KEY)) == int(item_id):
            deleted = products.pop(i)
            return jsonify(deleted)
    return jsonify({"message": "not found"}), 404

# Run Flask development server
if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)