import { Link } from 'react-router-dom'
import { 
  Home, 
  DollarSign, 
  Bitcoin, 
  BarChart3,
  Download,
  Play,
  Users,
  TrendingUp
} from 'lucide-react'

const DatasetsPage = () => {
  const datasets = [
    {
      name: "Real Estate Dataset",
      icon: <Home />,
      category: "Real Estate",
      description: "Property pricing data with location, size, and amenity features",
      samples: "Medium",
      features: "Mixed",
      target: "Property Price",
      difficulty: "Beginner",
      useCases: [
        "House price prediction",
        "Real estate market analysis", 
        "Feature importance in property valuation",
        "Regression model training"
      ],
      code: "from jackofalltrades.datasets import get_real_estate\n\n# Load the dataset\nX, y = get_real_estate()\n\nprint(f\"Dataset shape: {X.shape}\")\nprint(f\"Features: {X.columns.tolist()}\")\nprint(f\"Target statistics:\")\nprint(f\"  Mean price: ${y.mean():,.2f}\")",
      stats: {
        samples: "1000+",
        features: "10+",
        target: "Continuous"
      }
    },
    {
      name: "California Housing Dataset", 
      icon: <Home />,
      category: "Real Estate",
      description: "Housing data from California census with geographic and demographic features",
      samples: "Large",
      features: "Numeric",
      target: "Housing Price",
      difficulty: "Intermediate",
      useCases: [
        "Regional price analysis",
        "Geographic modeling",
        "Feature engineering practice",
        "Regression benchmarking"
      ],
      code: "from jackofalltrades.datasets import get_california_housing\n\n# Load dataset\nX, y = get_california_housing()\n\nprint(f\"Dataset shape: {X.shape}\")\nprint(f\"Features: {X.columns.tolist()}\")",
      stats: {
        samples: "20,000+",
        features: "8",
        target: "Continuous"
      }
    },
    {
      name: "Bitcoin Dataset",
      icon: <Bitcoin />,
      category: "Financial",
      description: "Bitcoin price and trading data with technical indicators",
      samples: "Large",
      features: "Time Series",
      target: "Bitcoin Price",
      difficulty: "Advanced",
      useCases: [
        "Cryptocurrency price prediction",
        "Time series forecasting",
        "Financial trend analysis",
        "Volatility modeling"
      ],
      code: "from jackofalltrades.datasets import get_bitcoin\n\n# Load Bitcoin dataset\nX, y = get_bitcoin()\n\nprint(f\"Dataset shape: {X.shape}\")\nprint(f\"Features: {X.columns.tolist()}\")\nprint(f\"Price range: ${y.min():,.2f} - ${y.max():,.2f}\")",
      stats: {
        samples: "Variable",
        features: "Time-based",
        target: "Continuous"
      }
    }
  ]

  const DatasetCard = ({ dataset }) => (
    <div className="card dataset-card">
      <div className="dataset-header">
        <div className="dataset-icon">
          {dataset.icon}
        </div>
        <div>
          <h3>{dataset.name}</h3>
          <div className="dataset-badges">
            <span className="category-badge">{dataset.category}</span>
            <span className={`difficulty-badge ${dataset.difficulty.toLowerCase()}`}>
              {dataset.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <p className="dataset-description">{dataset.description}</p>
      
      <div className="dataset-stats">
        <div className="stat">
          <strong>Samples:</strong> {dataset.stats.samples}
        </div>
        <div className="stat">
          <strong>Features:</strong> {dataset.stats.features}
        </div>
        <div className="stat">
          <strong>Target:</strong> {dataset.stats.target}
        </div>
      </div>
      
      <div className="use-cases">
        <strong>Use Cases:</strong>
        <ul>
          {dataset.useCases.map((useCase, index) => (
            <li key={index}>{useCase}</li>
          ))}
        </ul>
      </div>
      
      <div className="code-block">
        <pre>{dataset.code}</pre>
      </div>
      
      <div className="dataset-actions">
        <Link to="/models" className="btn btn-primary">
          Explore Models
        </Link>
        <Link to="/contact" className="btn btn-outline">
          Get Help
        </Link>
      </div>
    </div>
  )

  return (
    <div className="datasets-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Ready-to-Use Datasets</h1>
            <p>
              Carefully curated datasets for machine learning experiments, learning, and prototyping. 
              Each dataset follows a simple, consistent API for immediate use.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Simple & Consistent API</h2>
            <p>All datasets in jackofalltrades follow the same easy-to-use pattern:</p>
            <div className="code-block">
              <pre>{`from jackofalltrades.datasets import get_dataset_name

# Load dataset
X, y = get_dataset_name()

# X contains the features (input variables)  
# y contains the target variable (what we want to predict)

print(f"Features shape: {X.shape}")
print(f"Target shape: {y.shape}")
print(f"Feature names: {X.columns.tolist()}")`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Dataset Categories</h2>
            <p>Choose datasets based on your learning goals and project needs</p>
          </div>
          
          <div className="category-grid">
            <div className="category-card">
              <div className="category-icon">
                <Home size={32} />
              </div>
              <h3>🏠 Real Estate</h3>
              <p>Perfect for learning regression and understanding real-world prediction problems</p>
              <div className="category-stats">
                <span>2 Datasets</span>
                <span>Regression Tasks</span>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <DollarSign size={32} />
              </div>
              <h3>💰 Financial</h3>
              <p>Essential for financial modeling and time series analysis</p>
              <div className="category-stats">
                <span>1 Dataset</span>
                <span>Time Series</span>
              </div>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <BarChart3 size={32} />
              </div>
              <h3>📊 General ML</h3>
              <p>Coming soon: More datasets for various ML tasks</p>
              <div className="category-stats">
                <span>More Coming</span>
                <span>Various Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Datasets */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Available Datasets</h2>
            <p>Each dataset is ready for immediate use with comprehensive examples</p>
          </div>
          <div className="datasets-grid">
            {datasets.map((dataset, index) => (
              <DatasetCard key={index} dataset={dataset} />
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Selection Guide */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Dataset Selection Guide</h2>
            <div className="selection-guide">
              <div className="guide-section">
                <h4>For Beginners 🌱</h4>
                <p>Start with Real Estate dataset - clean and interpretable</p>
                <div className="recommended-dataset">
                  <strong>Recommended:</strong> Real Estate Dataset
                  <br />
                  <em>Clean data, interpretable features, good for learning basics</em>
                </div>
              </div>
              
              <div className="guide-section">
                <h4>For Intermediate Users 📈</h4>
                <p>Try California Housing for more complexity and geographic data</p>
                <div className="recommended-dataset">
                  <strong>Recommended:</strong> California Housing Dataset
                  <br />
                  <em>More features, geographic data, good for feature engineering</em>
                </div>
              </div>
              
              <div className="guide-section">
                <h4>For Advanced Users 🚀</h4>
                <p>Bitcoin dataset for time series and financial modeling</p>
                <div className="recommended-dataset">
                  <strong>Recommended:</strong> Bitcoin Dataset
                  <br />
                  <em>Time series, financial data, volatility modeling</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2>Ready to Explore Data?</h2>
            <p>Start building your machine learning models with our datasets</p>
            <div className="flex flex-center gap-4 mt-4">
              <Link to="/models" className="btn btn-primary">
                <BarChart3 size={20} />
                Explore Models
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <TrendingUp size={20} />
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DatasetsPage 