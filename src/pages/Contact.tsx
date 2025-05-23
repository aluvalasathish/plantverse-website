import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { scrollToTop } from '../utils/scrollUtils';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <main className="py-28 md:py-32 overflow-y-auto">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h1>
          <p className="text-gray-300 text-lg">
            Have questions, feedback, or need plant advice? We're here to help!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-8 h-full">
              <div>
                <h2 className="text-xl font-semibold mb-6 relative inline-block">
                  <span className="relative z-10">Contact Information</span>
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <FiMail className="text-green-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Email Us</h3>
                    <p className="text-white text-sm">support@plantverse.com</p>
                    <p className="text-white text-sm">sales@plantverse.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <FiPhone className="text-green-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Call Us</h3>
                    <p className="text-white text-sm">+91 1234567890</p>
                    <p className="text-white text-sm">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <FiMapPin className="text-green-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Visit Us</h3>
                    <p className="text-white text-sm">
                      123 Green Avenue, Koramangala<br />
                      Bangalore, Karnataka 560034
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <FiClock className="text-green-400" size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Business Hours</h3>
                    <p className="text-white text-sm">
                      Monday - Saturday: 9am - 6pm<br />
                      Sunday: 10am - 4pm
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-green-500/20 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6 relative inline-block">
                <span className="relative z-10">Send Us a Message</span>
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
              </h2>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <FiCheck className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-gray-300 max-w-md">
                    Thank you for contacting us. We've received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Question about my order</option>
                      <option value="product">Product inquiry</option>
                      <option value="support">Plant care support</option>
                      <option value="wholesale">Wholesale inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                        isSubmitting 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Frequently Asked Questions</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to our most commonly asked questions. Still need help? Contact us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What is your shipping policy?", 
                a: "We offer free shipping on orders above Rs. 999. All plants are carefully packaged to ensure they arrive in perfect condition. Delivery typically takes 3-5 business days depending on your location."
              },
              {
                q: "Do you provide plant care instructions?", 
                a: "Yes! Each plant comes with detailed care instructions. We also offer ongoing support through our website and customer service team if you have any questions about caring for your plants."
              },
              {
                q: "What if my plant arrives damaged?", 
                a: "We guarantee that your plants will arrive in excellent condition. If you're not satisfied with the health of your plant upon arrival, contact us within 48 hours with photos and we'll send a replacement."
              },
              {
                q: "Do you ship live plants internationally?", 
                a: "Currently, we only ship within India due to customs regulations for live plants. We're working on expanding our shipping options in the future."
              },
              {
                q: "How often should I water my new plant?", 
                a: "Each plant has different watering needs. You'll find specific watering instructions for your plant in the care guide that comes with your order. As a general rule, most indoor plants should be watered when the top inch of soil feels dry."
              },
              {
                q: "Do you offer plant subscriptions?", 
                a: "Yes! We offer monthly plant subscription boxes at different price points. Each month, you'll receive a new plant with a decorative pot and care instructions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-3">{faq.q}</h3>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact; 