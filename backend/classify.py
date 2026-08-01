# classify.py
from PIL import Image
import os

classifier = None


def _load_classifier():
    global classifier

    if classifier is not None:
        return classifier

    if os.getenv("ENABLE_TRANSFORMERS_MODEL", "0") != "1":
        return None

    try:
        from transformers import pipeline

        classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
        print("Transformers classifier loaded successfully.")
    except Exception as e:
        print(f"Error loading Transformers: {e}")
        classifier = None

    return classifier

labels = ['Organic', 'Plastic', 'Metal', 'Glass', 'Paper', 'E-waste']

# Mapping ImageNet categories to our Waste types
# This mapping covers common trash items
IMAGENET_TO_WASTE = {
    'banana': 'Organic', 'apple': 'Organic', 'orange': 'Organic', 'lemon': 'Organic', 'pomegranate': 'Organic',
    'water_bottle': 'Plastic', 'shampoo_bottle': 'Plastic', 'plastic_bag': 'Plastic', 'pill_bottle': 'Plastic',
    'soda_can': 'Metal', 'tin_can': 'Metal', 'pot': 'Metal', 'hammer': 'Metal',
    'beaker': 'Glass', 'wine_bottle': 'Glass', 'beer_bottle': 'Glass', 'bottle_cap': 'Plastic',
    'envelope': 'Paper', 'notebook': 'Paper', 'paper_towel': 'Paper', 'carton': 'Paper',
    'desktop': 'E-waste', 'laptop': 'E-waste', 'mouse': 'E-waste', 'keyboard': 'E-waste', 'telephone': 'E_waste'
}

def classify_image(img: Image.Image):
    active_classifier = _load_classifier()

    if not active_classifier:
        return "Plastic"

    try:
        # Get top predictions
        results = active_classifier(img)
        
        # Check if any of the top predictions match our mapping
        for res in results:
            label_name = res['label'].lower()
            # Check for partial matches in our mapping keys
            for key in IMAGENET_TO_WASTE:
                if key in label_name:
                    return IMAGENET_TO_WASTE[key]
        
        # If no specific match, try a generic classification based on common keywords
        top_label = results[0]['label'].lower()
        if 'food' in top_label or 'fruit' in top_label: return 'Organic'
        if 'metal' in top_label: return 'Metal'
        if 'paper' in top_label: return 'Paper'
        if 'glass' in top_label: return 'Glass'
        
        return "Plastic" # Default fallback
    except Exception as e:
        print(f"Classification error: {e}")
        return "Plastic"