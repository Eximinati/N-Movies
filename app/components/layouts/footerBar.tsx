import React from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

const Footer = () => {
  return (
    <footer>
      <Card shadow="sm">
        <CardHeader>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </CardHeader>
        <CardBody>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#section3">Services</a>
            </li>
            <li>
              <a href="#section1">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </CardBody>
        <CardBody>
          <h3>Contact Us</h3>
          <form action="{{ route('contact.store') }}" method="POST">
            <input type="text" name="name" className="text-input contact-input" placeholder="Your Name" />
            <input type="email" name="email" className="text-input contact-input" placeholder="Your Email" />
            <textarea rows={4} name="message" className="text-input contact-input" placeholder="Your Message"></textarea>
            <button type="submit" className="btn-primary">Send</button>
          </form>
        </CardBody>
      </Card>
      <CardFooter>
        <p>&copy; 2023 Fiya | Created by Zaidan</p>
      </CardFooter>
    </footer>
  );
};

export default Footer;
