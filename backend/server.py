# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
from backend.classify import classify_image

app = Flask(__name__)
CORS(app) # Enable CORS for frontend integration

# Waste information data
decomp_info = {
    "Organic": {
        "biodegradable": "Yes",
        "time": "1 week – 6 months",
        "video": "https://www.youtube.com/watch?v=zs3R1t1Xfdg",
        "worth": "Turn into nutrient-rich compost for your garden. Great for handmade fertilizers!",
        "tips": "Avoid adding oily or dairy products to home compost piles."
    },
    "Plastic": {
        "biodegradable": "No",
        "time": "100 – 1000 years",
        "video": "https://www.youtube.com/watch?v=10phKzs5h1Q",
        "worth": "Create eco-bricks, bird feeders, or vertical planters. High demand for recycled polyester!",
        "tips": "Wash and dry before putting in the recycling bin."
    },
    "Metal": {
        "biodegradable": "Partially",
        "time": "50 – 500 years",
        "video": "https://www.youtube.com/watch?v=9CwRgGbd0bc",
        "worth": "Aluminum can be recycled infinitely. Valuable at scrap dealers. Great for wind chimes!",
        "tips": "Crush cans to save space in your recycling container."
    },
    "Glass": {
        "biodegradable": "No",
        "time": "Millions of years",
        "video": "https://www.youtube.com/watch?v=tYb_6a7ck34",
        "worth": "Upcycle into elegant storage jars, candle holders, or vases. 100% recyclable.",
        "tips": "Remove caps and labels if possible, though modern facilities can handle them."
    },
    "Paper": {
        "biodegradable": "Yes",
        "time": "2 – 6 weeks",
        "video": "https://www.youtube.com/watch?v=WuWb1Rt_rJg",
        "worth": "Make handmade journals, paper mache art, or use as mulch for weed control.",
        "tips": "Keep paper dry; wet paper can often clog industrial recycling machines."
    },
    "E-waste": {
        "biodegradable": "No",
        "time": "Up to 1 million years",
        "video": "https://www.youtube.com/watch?v=sI1P9CaFFdw",
        "worth": "Contains precious metals like gold and silver. Must be handled by certified e-recyclers.",
        "tips": "Wipe all data from devices before donating or recycling."
    }
}

@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read()))
    
    try:
        result = classify_image(img)
        info = decomp_info.get(result, decomp_info["Plastic"]) # Default to Plastic info if error
        return jsonify({
            "category": result,
            "info": info
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
