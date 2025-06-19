import { Link } from 'react-router-dom'
import { 
  Brain, 
  Zap, 
  BookOpen, 
  BarChart3, 
  Download,
  Database,
  Target,
  TrendingUp,
  Users,
  Mail
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Zap />,
      title: "One-line Dataset Loading",
      description: "Access popular datasets instantly with simple, intuitive APIs. No complex setup required."
    },
    {
      icon: <Brain />,
      title: "Complete ML Pipeline",
      description: "From data loading to model evaluation, everything you need in one comprehensive package."
    },
    {
      icon: <BookOpen />,
      title: "Educational Focus",
      description: "Perfect for learning and teaching ML concepts with clear documentation and examples."
    },
    {
      icon: <BarChart3 />,
      title: "Built-in Evaluation",
      description: "Comprehensive metrics and error analysis tools to measure your model performance."
    },
    {
      icon: <Database />,
      title: "Rich Dataset Collection",
      description: "Real estate, financial, and synthetic datasets ready for immediate use."
    },
    {
      icon: <Target />,
      title: "Advanced Models",
      description: "GANs, VAEs, and deep learning models for complex machine learning tasks."
    }
  ]

  const stats = [
    { number: "10+", label: "ML Models" },
    { number: "5+", label: "Datasets" },
    { number: "15+", label: "Metrics" },
    { number: "100%", label: "Open Source" }
  ]

  const quickStartCode = `# Install jackofalltrades
pip install jackofalltrades

# Load dataset and train model
from jackofalltrades.datasets import get_real_estate
from jackofalltrades.Models import LinearRegression
from jackofalltrades.Errors import Error

# Load data
X, y = get_real_estate()

# Train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X)

# Evaluate
evaluator = Error(y_true=y, y_predicted=predictions)
print(f"R² Score: {evaluator.RSquared():.3f}")
print(f"RMSE: {evaluator.RMSE():.3f}")`

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1>Machine Learning Made Simple</h1>
            <p>
              A comprehensive, beginner-friendly machine learning library designed to make ML accessible to everyone. 
              From data loading to model evaluation, jackofalltrades has everything you need.
            </p>
            <div className="hero-buttons">
              <Link to="/models" className="btn btn-primary">
                <BookOpen size={20} />
                Get Started
              </Link>
              <a 
                href="https://pypi.org/project/jackofalltrades/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Download size={20} />
                Install Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card fade-in-up">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Why Choose jackofalltrades?</h2>
            <p>Everything you need for machine learning in one simple package</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in-up">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="text-center mb-4">
              <h2>Get Started in Minutes</h2>
              <p>Here's how easy it is to build your first machine learning model</p>
            </div>
            <div className="code-block">
              <pre>{quickStartCode}</pre>
            </div>
            <div className="text-center mt-4">
              <Link to="/models" className="btn btn-outline">
                Explore Our Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>What Can You Build?</h2>
            <p>Explore the possibilities with jackofalltrades</p>
          </div>
          <div className="card-grid">
            <div className="card">
              <h3>🏠 House Price Prediction</h3>
              <p>Build regression models to predict real estate prices using comprehensive property data.</p>
              <Link to="/datasets" className="btn btn-outline">Explore Datasets</Link>
            </div>
            <div className="card">
              <h3>🖼️ Image Classification</h3>
              <p>Create deep learning models for computer vision tasks with built-in neural networks.</p>
              <Link to="/models" className="btn btn-outline">View Models</Link>
            </div>
            <div className="card">
              <h3>💰 Financial Analysis</h3>
              <p>Analyze market trends and predict cryptocurrency prices with time series models.</p>
              <Link to="/evaluation" className="btn btn-outline">Learn Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2>Ready to Start Your ML Journey?</h2>
            <p>Join thousands of developers and researchers using jackofalltrades</p>
            <div className="flex flex-center gap-4 flex-wrap mt-4">
              <Link to="/models" className="btn btn-primary">
                <BookOpen size={20} />
                Explore Models
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <Mail size={20} />
                Get Support
              </Link>
              <a 
                href="https://github.com/sanepunk/jackofalltrades" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <TrendingUp size={20} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 