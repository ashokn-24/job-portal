const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p>
            <strong>Contact Us:</strong>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:contact@company.com" className="text-blue-400">
              contact@company.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+11234567890" className="text-blue-400">
              +1 (123) 456-7890
            </a>
          </p>
          <p>Address: 123 Company St, City, State, ZIP Code</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us:</h3>
          <div className="flex space-x-4">
            <a href="#">
              <img src="facebook-icon.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src="twitter-icon.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="#">
              <img
                src="instagram-icon.png"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links:</h3>
          <ul>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter:</h3>
          <p>
            Subscribe to our newsletter to stay updated on the latest job
            openings and company news.
          </p>
          <form action="#" method="post" className="mt-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-gray-700 text-white w-full mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© 2024 [Company Name]. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
