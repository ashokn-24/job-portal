import contactImg from "../../assets/images/contact.svg";

const Contact = () => {
  return (
    <div>
      <h1 className="text-title-desktop text-center md:text-title-mobile font-serif text-darkBlue">
        Contact Us
      </h1>
      <div className="grid grid-cols-2">
        <div className="bg- p-8">
          <form className="mt-4">
            <div className="mb-4">
              <label
                className="block text-secondary-desktop md:text-secondary-mobile font-sans text-darkBlue"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full p-2 border border-subgray rounded"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-secondary-desktop md:text-secondary-mobile font-sans text-darkBlue"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border border-subgray rounded"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-secondary-desktop md:text-secondary-mobile font-sans text-darkBlue"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full p-2 border border-subgray rounded"
                id="message"
                name="message"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              className="bg-darkBlue text-lightGray p-2 rounded"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center">
          <img src={contactImg} alt="" width={400} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
