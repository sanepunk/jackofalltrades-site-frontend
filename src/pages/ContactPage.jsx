import { useState } from 'react'
import axios from 'axios'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Send data to FastAPI backend
      const response = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      })

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success')
        setStatusMessage('Thank you for your message! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        })
      }
    } catch (error) {
      setSubmitStatus('error')
      if (error.response) {
        setStatusMessage(`Error: ${error.response.data.detail || 'Failed to send message'}`)
      } else if (error.request) {
        setStatusMessage('Error: Unable to connect to server. Please try again later.')
      } else {
        setStatusMessage('Error: Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'contact@jackofalltrades.ml',
      link: 'mailto:contact@jackofalltrades.ml'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'Global Remote Team',
      link: null
    }
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>
              Have questions about jackofalltrades? Need help getting started? 
              We'd love to hear from you and help you succeed with machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="card">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                
                {submitStatus && (
                  <div className={`status-message ${submitStatus}`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <User size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <Mail size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">
                      <MessageSquare size={16} />
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="general">General Question</option>
                      <option value="technical">Technical Support</option>
                      <option value="documentation">Documentation</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Brief description of your inquiry"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us more about your question or how we can help..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="card">
                <h3>Get in Touch</h3>
                <p>Choose the best way to reach us:</p>
                
                <div className="contact-methods">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-method">
                      <div className="contact-icon">
                        {info.icon}
                      </div>
                      <div className="contact-details">
                        <h4>{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="contact-link">
                            {info.content}
                          </a>
                        ) : (
                          <span>{info.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="card">
                <h3>Quick Answers</h3>
                <div className="faq-list">
                  <div className="faq-item">
                    <h4>How do I install jackofalltrades?</h4>
                    <p>Simply run: <code>pip install jackofalltrades</code></p>
                  </div>
                  <div className="faq-item">
                    <h4>Is jackofalltrades free to use?</h4>
                    <p>Yes! It's completely free and open source under MIT license.</p>
                  </div>
                  <div className="faq-item">
                    <h4>How can I contribute?</h4>
                    <p>Check out our GitHub repository for contribution guidelines.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Do you offer commercial support?</h4>
                    <p>Contact us to discuss enterprise support options.</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="card">
                <h3>Response Time</h3>
                <div className="response-times">
                  <div className="response-item">
                    <strong>General Questions:</strong>
                    <span>24-48 hours</span>
                  </div>
                  <div className="response-item">
                    <strong>Technical Support:</strong>
                    <span>1-2 business days</span>
                  </div>
                  <div className="response-item">
                    <strong>Bug Reports:</strong>
                    <span>Priority handling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage 