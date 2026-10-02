import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaSnapchatGhost, FaTiktok, FaWhatsapp, FaPhone,FaEnvelope } from 'react-icons/fa';


/* ✏️ Put your real contact details here */
const CONTACT = {
  phone: '+966 54 450 7066',
  email: 'info@dareenlifestyle.com',
  instagram: 'https://www.instagram.com/dareenlifestyle?igsh=MWg5MHlodmdvZzJiMg%3D%3D&utm_source=qr',
  whatsapp: 'https://wa.me/966544507066',
  tiktok: "https://www.tiktok.com/@dareenlifestyle_event?is_from_webapp=1&sender_device=pc",
  snapchat: "https://snapchat.com/t/XU7PvaN7"
};

const LOGO = `${process.env.PUBLIC_URL}/assets/dareenlifestylelogo1.png`;

const EVENT_LINKS = [
  { id: 'graduation', label: 'Graduation' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'corporate', label: 'National Day' },
  { id: 'FoundingDay', label: 'Founding Day' },
  { id: 'TableSettingDesigns', label: 'Table Settings' },
  { id: 'Camp&TripEvents', label: 'Camp & Trip' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={LOGO} alt="DAREEN Lifestyle" />
          <p>Celebrating Moments with Elegance, Creativity &amp; Joy</p>
        </div>

        <div className="footer-col">
          <h4>Pages</h4>
          <Link to="/">Home</Link>
          <Link to="/AboutUs">About Us</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Our Events</h4>
          {EVENT_LINKS.map((link) => (
            <Link key={link.id} to={`/#${link.id}`}>{link.label}</Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <a href={`tel: ${CONTACT.phone.replace(/\s/g, '')}`}> <FaPhone /> {CONTACT.phone} </a>
          <a href={`mailto:${CONTACT.email}`}> <FaEnvelope/> {CONTACT.email}   </a>
           <a href= {CONTACT.snapchat}  target="_blank"  rel="noopener noreferrer"> <FaSnapchatGhost /> SnapChat </a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"> <FaInstagram/> Instagram </a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"> <FaWhatsapp /> WhatsApp 
          </a>
           <a href= {CONTACT.tiktok} target="_blank" rel="noopener noreferrer">
                      <FaTiktok /> Tiktok
                    </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} DAREEN Lifestyle. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;