### 📦 What is `jackofalltrades`?

`jackofalltrades` is a beginner-friendly machine learning library. It provides a variety of tools to help you:

* Load datasets with one line of code
* Build and train regression, classification, and generative models
* Evaluate model performance with common metrics

---

### 🔧 How to Install

To install from PyPI, run this command in your terminal:

```bash
pip install jackofalltrades
```

---

### 📁 `datasets.py` — Loading Sample Datasets

Each function in this file loads a real-world dataset and returns features `X` and target labels `y`.

#### `get_real_estate()`

```python
from jackofalltrades.datasets import get_real_estate
X, y = get_real_estate()
print(X.head())
print(y.head())
```

#### `get_california_housing()`

```python
from jackofalltrades.datasets import get_california_housing
X, y = get_california_housing()
```

#### `get_bitcoin()`

```python
from jackofalltrades.datasets import get_bitcoin
X, y = get_bitcoin()
```

... *(same pattern for all remaining dataset loaders)* ...

---

### 📁 `Errors.py` — Metrics and Evaluation Tools

Functions and classes for evaluating your model's performance.

#### Function Usage:

```python
from jackofalltrades.Errors import accuracy, f1score
accuracy([1,0,1], [1,0,0])
f1score([1,0,1], [1,0,0])
```

#### `Error` Class:

```python
from jackofalltrades.Errors import Error
err = Error(y_true=[1,2,3], y_predicted=[1.1, 1.9, 3.0])
print(err.MSE())
print(err.RSquared())
```

---

### 📁 `Models` — Core Machine Learning Models

---

### 📄 `LinearRegression`

```python
from jackofalltrades.Models import LinearRegression
model = LinearRegression()
model.fit(X, y)
model.predict(X)
```

---

### 📄 `RidgeRegression`

```python
from jackofalltrades.Models import RidgeRegression
model = RidgeRegression()
model.fit(X, y)
model.predict(X)
```

---

### 📄 `LogisticRegression`

```python
from jackofalltrades.Models import LogisticRegression
model = LogisticRegression()
model.fit(X, y)
model.predict(X)
```

---

### 📄 `AdaptiveRegression`

```python
from jackofalltrades.Models import AdaptiveRegression
model = AdaptiveRegression()
model.fit(X, y)
model.predict(X)
```

---

### 📄 `MLPRegressor`

```python
from jackofalltrades.Models import MLPRegressor
model = MLPRegressor()
model.fit(X, y)
model.predict(X)
```

---

### 📄 `ImageClassification`

```python
from jackofalltrades.Models import ImageClassification
model = ImageClassification(input_shape=(28, 28, 1), num_classes=10)
model.fit(X, y)
model.predict(X)
```

---

### 📁 `Models/GAN` — Generative Adversarial Networks

#### `Generator` & `Discriminator`

```python
from jackofalltrades.Models.GAN import Generator, Discriminator
Generator(input_dim=100, output_channels=1)
Discriminator(input_channels=1, feature_dim=64)
```

#### `GAN`

```python
from jackofalltrades.Models.GAN import GAN
gan = GAN(noise_dim=100, image_channels=1)
gan.train(data_loader, epochs=10)
```

---

### 📁 `Models/VAE` — Variational Autoencoders (with JAX)

#### `EncoderDecoder`

```python
from jackofalltrades.Models.VAE import EncoderDecoder
model = EncoderDecoder()
```

#### Training Helpers

```python
from jackofalltrades.Models.VAE import load_and_preprocess_image, optimizer, update, save_params, load_params
img = load_and_preprocess_image("file.jpg", 28, 28)
save_params(params, state, "vae.npz")
params, state = load_params("vae.npz")
```
