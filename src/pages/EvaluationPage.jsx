import { Link } from 'react-router-dom'
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Mail
} from 'lucide-react'

const EvaluationPage = () => {
  const regressionMetrics = [
    {
      name: "Mean Squared Error (MSE)",
      icon: <BarChart3 />,
      description: "Average of squared differences between actual and predicted values",
      formula: "MSE = (1/n) * Σ(y_true - y_pred)²",
      range: "0 to ∞ (lower is better)",
      bestFor: "Penalizing large errors more than small ones",
      code: `evaluator = Error(y_true=y_test, y_predicted=predictions)
mse = evaluator.MSE()
print(f"MSE: {mse:.4f}")`
    },
    {
      name: "Root Mean Squared Error (RMSE)",
      icon: <TrendingUp />,
      description: "Square root of MSE, in the same units as the target variable",
      formula: "RMSE = √MSE",
      range: "0 to ∞ (lower is better)",
      bestFor: "Interpretable error metric in original units",
      code: `evaluator = Error(y_true=y_test, y_predicted=predictions)
rmse = evaluator.RMSE()
print(f"RMSE: {rmse:.4f}")`
    },
    {
      name: "Mean Absolute Error (MAE)",
      icon: <Target />,
      description: "Average of absolute differences between actual and predicted values",
      formula: "MAE = (1/n) * Σ|y_true - y_pred|",
      range: "0 to ∞ (lower is better)",
      bestFor: "Robust to outliers, easy to interpret",
      code: `evaluator = Error(y_true=y_test, y_predicted=predictions)
mae = evaluator.MAE()
print(f"MAE: {mae:.4f}")`
    },
    {
      name: "R-squared (R²)",
      icon: <CheckCircle />,
      description: "Proportion of variance in target variable explained by the model",
      formula: "R² = 1 - (SS_res / SS_tot)",
      range: "-∞ to 1 (higher is better, 1 is perfect)",
      bestFor: "Understanding how well the model explains the data",
      code: `evaluator = Error(y_true=y_test, y_predicted=predictions)
r2 = evaluator.RSquared()
print(f"R²: {r2:.4f}")`
    }
  ]

  const classificationMetrics = [
    {
      name: "Accuracy Score",
      icon: <CheckCircle />,
      description: "Percentage of correct predictions",
      formula: "(Correct Predictions) / (Total Predictions)",
      range: "0 to 1 (higher is better)",
      bestFor: "Balanced datasets with equal class importance",
      code: `from jackofalltrades.Errors import accuracy

acc = accuracy(y_true, y_pred)
print(f"Accuracy: {acc:.3f}")`
    },
    {
      name: "F1 Score",
      icon: <Target />,
      description: "Harmonic mean of precision and recall",
      formula: "2 * (Precision * Recall) / (Precision + Recall)",
      range: "0 to 1 (higher is better)",
      bestFor: "Imbalanced datasets where you care about both precision and recall",
      code: `from jackofalltrades.Errors import f1score

f1 = f1score(y_true, y_pred)
print(f"F1 Score: {f1:.3f}")`
    }
  ]

  const usageExamples = [
    {
      title: "Function-Based Metrics",
      description: "Quick, one-line metric calculations",
      code: `from jackofalltrades.Errors import accuracy, f1score

# Function-based (classification)
acc = accuracy([1, 0, 1, 1], [1, 0, 0, 1])
f1 = f1score([1, 0, 1, 1], [1, 0, 0, 1])

print(f"Accuracy: {acc:.3f}")
print(f"F1 Score: {f1:.3f}")`
    },
    {
      title: "Class-Based Metrics",
      description: "Comprehensive error analysis with multiple metrics",
      code: `from jackofalltrades.Errors import Error

# Class-based (regression)
evaluator = Error(y_true=[1, 2, 3, 4], y_predicted=[1.1, 1.9, 3.2, 3.8])

mse = evaluator.MSE()
rmse = evaluator.RMSE()
mae = evaluator.MAE()
r2 = evaluator.RSquared()

print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R²: {r2:.4f}")`
    }
  ]

  const MetricCard = ({ metric, type }) => (
    <div className="card metric-card">
      <div className="metric-header">
        <div className="metric-icon">
          {metric.icon}
        </div>
        <div>
          <h3>{metric.name}</h3>
          <span className="metric-type">{type}</span>
        </div>
      </div>
      
      <p className="metric-description">{metric.description}</p>
      
      <div className="metric-details">
        <div className="detail">
          <strong>Formula:</strong> <code>{metric.formula}</code>
        </div>
        <div className="detail">
          <strong>Range:</strong> {metric.range}
        </div>
        <div className="detail">
          <strong>Best For:</strong> {metric.bestFor}
        </div>
      </div>
      
      <div className="code-block">
        <pre>{metric.code}</pre>
      </div>
    </div>
  )

  return (
    <div className="evaluation-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Evaluation Metrics & Error Analysis</h1>
            <p>
              Comprehensive evaluation tools to measure and understand your machine learning model performance. 
              From simple accuracy to advanced regression metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Two Approaches */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Two Ways to Evaluate Models</h2>
            <div className="approaches-grid">
              <div className="approach">
                <div className="approach-icon">
                  <Target size={32} />
                </div>
                <h3>Function-Based</h3>
                <p>Quick, one-line metric calculations for immediate results</p>
                <div className="approach-example">
                  <code>accuracy(y_true, y_pred)</code>
                </div>
              </div>
              <div className="approach">
                <div className="approach-icon">
                  <BarChart3 size={32} />
                </div>
                <h3>Class-Based</h3>
                <p>Comprehensive error analysis with multiple metrics at once</p>
                <div className="approach-example">
                  <code>Error(y_true, y_pred).RSquared()</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regression Metrics */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>📈 Regression Metrics</h2>
            <p>Evaluate models that predict continuous numerical values</p>
          </div>
          <div className="metrics-grid">
            {regressionMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} type="Regression" />
            ))}
          </div>
        </div>
      </section>

      {/* Classification Metrics */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🎯 Classification Metrics</h2>
            <p>Evaluate models that predict discrete categories or classes</p>
          </div>
          <div className="metrics-grid">
            {classificationMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} type="Classification" />
            ))}
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Usage Examples</h2>
            <p>See how to use evaluation metrics in practice</p>
          </div>
          <div className="examples-grid">
            {usageExamples.map((example, index) => (
              <div key={index} className="card example-card">
                <h3>{example.title}</h3>
                <p>{example.description}</p>
                <div className="code-block">
                  <pre>{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metric Selection Guide */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Metric Selection Guide</h2>
            <div className="guide-grid">
              <div className="guide-section">
                <h4>📊 Regression Tasks</h4>
                <ul>
                  <li><strong>MSE:</strong> When large errors are particularly bad</li>
                  <li><strong>RMSE:</strong> When you want interpretable units</li>
                  <li><strong>MAE:</strong> When outliers shouldn't dominate</li>
                  <li><strong>R²:</strong> To understand explained variance</li>
                </ul>
              </div>
              
              <div className="guide-section">
                <h4>🎯 Classification Tasks</h4>
                <ul>
                  <li><strong>Accuracy:</strong> For balanced datasets</li>
                  <li><strong>F1 Score:</strong> For imbalanced datasets</li>
                  <li><strong>Precision:</strong> When false positives are costly</li>
                  <li><strong>Recall:</strong> When false negatives are costly</li>
                </ul>
              </div>
              
              <div className="guide-section">
                <h4>🏥 Common Scenarios</h4>
                <ul>
                  <li><strong>Medical diagnosis:</strong> High recall (don't miss diseases)</li>
                  <li><strong>Spam detection:</strong> High precision (don't flag important emails)</li>
                  <li><strong>House prices:</strong> RMSE (interpretable dollar amounts)</li>
                  <li><strong>Model comparison:</strong> R² (easy to compare explained variance)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="section">
        <div className="container">
          <div className="card">
            <h2>Best Practices</h2>
            <div className="practices-grid">
              <div className="practice">
                <AlertCircle className="practice-icon" />
                <h4>Choose the Right Metric</h4>
                <p>Select metrics that align with your business objectives and data characteristics</p>
              </div>
              <div className="practice">
                <CheckCircle className="practice-icon" />
                <h4>Use Multiple Metrics</h4>
                <p>Don't rely on a single metric - get a complete picture of model performance</p>
              </div>
              <div className="practice">
                <Target className="practice-icon" />
                <h4>Validate Properly</h4>
                <p>Use appropriate train/test splits and cross-validation for robust evaluation</p>
              </div>
              <div className="practice">
                <TrendingUp className="practice-icon" />
                <h4>Monitor Over Time</h4>
                <p>Track metrics over time to detect model drift and performance degradation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card text-center">
            <h2>Ready to Evaluate Your Models?</h2>
            <p>Start measuring your model performance with our comprehensive evaluation tools</p>
            <div className="flex flex-center gap-4 mt-4">
              <Link to="/contact" className="btn btn-primary">
                <Mail size={20} />
                Get Support
              </Link>
              <Link to="/models" className="btn btn-secondary">
                <BookOpen size={20} />
                Explore Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EvaluationPage 