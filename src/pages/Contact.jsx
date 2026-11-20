import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { StrokeText, TearTicket } from '../components/PortfolioEffects';

export default function Contact() {
  return (
    <section id="contact" className="portfolio-page contact-page" aria-labelledby="contact-title">
      <div className="page-ornament page-ornament--contact" aria-hidden="true" />
      <div className="page-shell">
        <div className="section-heading reveal">
          <div><span className="section-index">05 / CONTACT</span><StrokeText text="LET'S CONNECT" /></div>
          <span className="section-side-note">QUESTIONS / COLLABORATION / OPPORTUNITIES</span>
        </div>
        <div className="contact-layout">
          <div className="contact-copy reveal">
            <h2 id="contact-title">Have a problem<br />worth <span>solving?</span></h2>
            <p>I'm interested in opportunities where data, machine learning and thoughtful software can make a practical difference.</p>
            <div className="contact-details">
              <a href="mailto:kesavdeepak007@gmail.com" className="contact-detail cursor-target"><span><Mail size={17} /></span><div><small>EMAIL</small><strong>kesavdeepak007@gmail.com</strong></div><ArrowUpRight size={16} /></a>
              <a href="tel:+918925708809" className="contact-detail cursor-target"><span><Phone size={17} /></span><div><small>PHONE</small><strong>+91 89257 08809</strong></div><ArrowUpRight size={16} /></a>
              <div className="contact-detail"><span><MapPin size={17} /></span><div><small>LOCATION</small><strong>Chengalpattu, Tamil Nadu, India</strong></div></div>
            </div>
          </div>
          <div className="contact-ticket reveal"><TearTicket /></div>
        </div>
        <div className="contact-footer reveal"><span>THANK YOU FOR STOPPING BY.</span><a href="#home">BACK TO TOP <ArrowUpRight size={14} /></a></div>
      </div>
    </section>
  );
}
