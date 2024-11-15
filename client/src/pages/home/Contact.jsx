import contactImg from "../../assets/images/contact.svg";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-darkBlue mb-12">
        Contact Us
      </h1>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div>
              <label
                className="block text-lg font-semibold text-darkBlue"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <label
                className="block text-lg font-semibold text-darkBlue"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <label
                className="block text-lg font-semibold text-darkBlue"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all duration-200"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Image Section */}
        <div className="flex justify-center lg:justify-end">
          <img src={contactImg} alt="Contact Us" className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
