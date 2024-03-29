import LogoutButton from "../../components/login/LogoutButton";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-blue-500 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-2xl">Job Portal</div>
            <ul className="flex">
              <li className="mr-6">
                <a href="#" className="text-white hover:text-gray-300">
                  Home
                </a>
              </li>
              <li className="mr-6">
                <a href="#" className="text-white hover:text-gray-300">
                  Jobs
                </a>
              </li>
              <li className="relative group">
                <details className="dropdown dropdown-end">
                  <summary className="m-1 btn">Profile</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 bg-slate-400">
                    <li>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Login
                      </a>
                    </li>
                    <li>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Signup
                      </a>
                    </li>
                    <li>
                      <LogoutButton />
                    </li>
                  </ul>
                </details>
              </li>

              {/* <li>
                <a
                  href="/login"
                  className="btn btn-primary text-white hover:text-gray-300"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="btn btn-primary text-white hover:text-gray-300"
                >
                  Signup
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-gray-200">
            Explore thousands of job opportunities. Get hired and start your
            career journey today!
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for job listings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Job Title</h3>
              <p className="text-gray-600 mb-4">Company Name</p>
              <p className="text-gray-800">Job Description</p>
            </div>
            {/* Placeholder for more job listings */}
            {/* Add more similar placeholders here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 py-8">
        <div className="container mx-auto px-4 text-center text-gray-100">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
