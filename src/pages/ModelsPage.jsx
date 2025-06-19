import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Layers, 
  Image, 
  BarChart3, 
  Zap,
  Target,
  Activity,
  Brain,
  Mail,
  BookOpen
} from 'lucide-react'

const ModelsPage = () => {
  const regressionModels = [
    {
      name: "Linear Regression",
      icon: <TrendingUp />,
      description: "Simple linear relationship modeling with interpretable results",
      useCase: "House price prediction, sales forecasting",
      difficulty: "Beginner",
      code: `from jackofalltrades.Models import LinearRegression

model = LinearRegression()
model.fit(X, y)
predictions = model.predict(X)`
    },
    {
      name: "Ridge Regression",
      icon: <BarChart3 />,
      description: "Linear regression with L2 regularization to prevent overfitting",
      useCase: "High-dimensional data, feature multicollinearity",
      difficulty: "Intermediate",
      code: `from jackofalltrades.Models import RidgeRegression

model = RidgeRegression()
model.fit(X_scaled, y)
predictions = model.predict(X_test)`
    },
    {
      name: "Adaptive Regression",
      icon: <Activity />,
      description: "Advanced regression that adapts to data patterns automatically",
      useCase: "Complex non-linear relationships, financial modeling",
      difficulty: "Advanced",
      code: `from jackofalltrades.Models import AdaptiveRegression

model = AdaptiveRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
    },
    {
      name: "MLP Regressor",
      icon: <Brain />,
      description: "Multi-layer perceptron for complex non-linear regression",
      useCase: "High-dimensional data, complex patterns",
      difficulty: "Advanced",
      code: `from jackofalltrades.Models import MLPRegressor

model = MLPRegressor()
model.fit(X_scaled, y)
predictions = model.predict(X_test_scaled)`
    }
  ]

  const classificationModels = [
    {
      name: "Logistic Regression",
      icon: <Target />,
      description: "Binary and multi-class classification with probability estimates",
      useCase: "Customer churn, spam detection, medical diagnosis",
      difficulty: "Beginner",
      code: `from jackofalltrades.Models import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`
    },
    {
      name: "Image Classification",
      icon: <Image />,
      description: "Deep learning model for classifying images using neural networks",
      useCase: "Computer vision, object recognition, medical imaging",
      difficulty: "Advanced",
      code: `from jackofalltrades.Models import ImageClassification

model = ImageClassification(
    input_shape=(28, 28, 1), 
    num_classes=10
)
model.fit(X_images, y_labels)`
    }
  ]

  const generativeModels = [
    {
      name: "Generative Adversarial Networks (GANs)",
      icon: <Layers />,
      description: "Generate realistic synthetic data, especially images",
      useCase: "Image generation, data augmentation, style transfer",
      difficulty: "Expert",
      code: `from jackofalltrades.Models.GAN import GAN

gan = GAN(noise_dim=100, image_channels=1)
# gan.train(dataloader, epochs=100)
generated_images = gan.generator(noise)`
    },
    {
      name: "Variational Autoencoders (VAEs)",
      icon: <Zap />,
      description: "Learn meaningful representations and generate new data",
      useCase: "Dimensionality reduction, anomaly detection, compression",
      difficulty: "Expert",
      code: `from jackofalltrades.Models.VAE import EncoderDecoder

vae = EncoderDecoder()
# Training and generation workflow
# See documentation for full examples`
    }
  ]

  const ModelCard = ({ model, category }) => (
    <div className="card model-card mobile-center-card">
      <div className="model-header mobile-center-header">
        <div className="model-icon">
          {model.icon}
        </div>
        <div className="mobile-center">
          <h3 className="mobile-center">{model.name}</h3>
          <span className={`difficulty-badge ${model.difficulty.toLowerCase()} mobile-center`}>
            {model.difficulty}
          </span>
        </div>
      </div>
      
      <p className="model-description mobile-center">{model.description}</p>
      
      <div className="model-meta mobile-center">
        <div className="use-case mobile-center">
          <strong>Use Case:</strong> {model.useCase}
        </div>
      </div>
      
      <div className="code-block">
        <pre>{model.code}</pre>
      </div>
      
      <div className="model-actions">
        <Link to="/contact" className="btn btn-primary">
          <Mail size={16} />
          Get Help
        </Link>
        <Link to="/evaluation" className="btn btn-outline">
          View Metrics
        </Link>
      </div>
    </div>
  )

  return (
    <div className="models-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Machine Learning Models</h1>
            <p>
              Comprehensive collection of ML models from simple linear regression to advanced GANs. 
              Each model is designed for ease of use while maintaining powerful capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Model Selection Guide */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Model Selection Guide</h2>
            <div className="selection-grid">
              <div className="selection-item mobile-center">
                <h4 className="mobile-center">📊 Regression Tasks</h4>
                <p className="mobile-center">Predicting continuous values like prices, temperatures, or sales</p>
                <div className="model-tags mobile-center-flex">
                  <span className="tag">Linear Regression</span>
                  <span className="tag">Ridge Regression</span>
                  <span className="tag">MLP Regressor</span>
                </div>
              </div>
              <div className="selection-item mobile-center">
                <h4 className="mobile-center">🎯 Classification Tasks</h4>
                <p className="mobile-center">Categorizing data into discrete classes or categories</p>
                <div className="model-tags mobile-center-flex">
                  <span className="tag">Logistic Regression</span>
                  <span className="tag">Image Classification</span>
                </div>
              </div>
              <div className="selection-item mobile-center">
                <h4 className="mobile-center">🎨 Generative Tasks</h4>
                <p className="mobile-center">Creating new data or learning complex representations</p>
                <div className="model-tags mobile-center-flex">
                  <span className="tag">GANs</span>
                  <span className="tag">VAEs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regression Models */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>📈 Regression Models</h2>
            <p>Perfect for predicting continuous numerical values</p>
          </div>
          <div className="models-grid">
            {regressionModels.map((model, index) => (
              <ModelCard key={index} model={model} category="regression" />
            ))}
          </div>
        </div>
      </section>

      {/* Classification Models */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Classification Models</h2>
            <p>Ideal for categorizing data into discrete classes</p>
          </div>
          <div className="models-grid">
            {classificationModels.map((model, index) => (
              <ModelCard key={index} model={model} category="classification" />
            ))}
          </div>
        </div>
      </section>

      {/* Generative Models */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🎨 Generative Models</h2>
            <p>Advanced models for creating new data and learning representations</p>
          </div>
          <div className="models-grid">
            {generativeModels.map((model, index) => (
              <ModelCard key={index} model={model} category="generative" />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="section">
        <div className="container">
          <div className="card mobile-center-card">
            <h2 className="mobile-center">Model Comparison</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Model Type</th>
                    <th>Data Size</th>
                    <th>Complexity</th>
                    <th>Interpretability</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Linear Regression</td>
                    <td>Small-Medium</td>
                    <td>Low</td>
                    <td>High</td>
                    <td>Simple relationships</td>
                  </tr>
                  <tr>
                    <td>Ridge Regression</td>
                    <td>Medium-Large</td>
                    <td>Medium</td>
                    <td>High</td>
                    <td>Many features</td>
                  </tr>
                  <tr>
                    <td>MLP Regressor</td>
                    <td>Large</td>
                    <td>High</td>
                    <td>Low</td>
                    <td>Complex patterns</td>
                  </tr>
                  <tr>
                    <td>Logistic Regression</td>
                    <td>Any</td>
                    <td>Low</td>
                    <td>High</td>
                    <td>Binary classification</td>
                  </tr>
                  <tr>
                    <td>Image Classification</td>
                    <td>Large</td>
                    <td>High</td>
                    <td>Low</td>
                    <td>Computer vision</td>
                  </tr>
                  <tr>
                    <td>GANs</td>
                    <td>Very Large</td>
                    <td>Very High</td>
                    <td>Low</td>
                    <td>Image generation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2>Ready to Build Your Model?</h2>
            <p>Start with our interactive demo or dive into the documentation</p>
            <div className="flex flex-center gap-4 mt-4">
              <Link to="/contact" className="btn btn-primary">
                <Mail size={20} />
                Get Support
              </Link>
              <Link to="/datasets" className="btn btn-secondary">
                <BarChart3 size={20} />
                Explore Datasets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModelsPage 