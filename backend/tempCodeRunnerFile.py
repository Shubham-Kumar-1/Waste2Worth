def classify_image(img: Image.Image):
    img = img.resize((150, 150))
    img_array = np.array(img) / 255.0
    img_array = img_array.reshape(1, 150, 150, 3)
    pred = model.predict(img_array)
    return labels[np.argmax(pred)]