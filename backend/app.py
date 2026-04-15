# app.py — Legacy Streamlit entry point (DEPRECATED)
# This file has been replaced by server.py (Flask API) + the React frontend.
# It is kept here for reference only. Do NOT run this file.
#
# To start the backend, run from the `backend/` folder:
#   python server.py

from PIL import Image
from classify import classify_image

decomp_info = {
    "Organic":  ("Yes",         "1 week – 6 months",    "https://www.youtube.com/watch?v=zs3R1t1Xfdg"),
    "Plastic":  ("No",          "100 – 1000 years",      "https://www.youtube.com/watch?v=10phKzs5h1Q"),
    "Metal":    ("Partially",   "50 – 500 years",        "https://www.youtube.com/watch?v=9CwRgGbd0bc"),
    "Glass":    ("No",          "Millions of years",     "https://www.youtube.com/watch?v=tYb_6a7ck34"),
    "Paper":    ("Yes",         "2 – 6 weeks",           "https://www.youtube.com/watch?v=WuWb1Rt_rJg"),
    "E-waste":  ("No",          "Up to 1 million years", "https://www.youtube.com/watch?v=sI1P9CaFFdw"),
}
