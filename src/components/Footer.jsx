import { Brain, Github, Mail, Heart } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Brain size={32} />
              <span>jackofalltrades</span>
            </div>
            <p className="footer-description">
              Making machine learning accessible to everyone. 
              A comprehensive, beginner-friendly ML library.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/models">Models</a></li>
                              <li><a href="/datasets">Datasets</a></li>
                <li><a href="/evaluation">Evaluation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
                              <li><a href="/contact">Contact Us</a></li>
              <li><a href="https://github.com/sanepunk/jackofalltrades" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://pypi.org/project/jackofalltrades/" target="_blank" rel="noopener noreferrer">PyPI</a></li>
              <li><a href="mailto:contact@jackofalltrades.ml">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/sanepunk/jackofalltrades" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href="mailto:contact@jackofalltrades.ml" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            Made with <Heart size={16} className="heart" /> for the machine learning community
          </p>
          <p>&copy; 2024 jackofalltrades. MIT License.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 