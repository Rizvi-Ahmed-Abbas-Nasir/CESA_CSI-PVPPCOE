export default function Steps() {
  return (
    <div className="min-h-screen mt-12 bg-blue-400 p-10 flex justify-center items-center">
      <div className="w-[76%] flex justify-start items-start gap-6">
        <div className="w-full max-w-5xl py-12 sticky top-0">
          <h1 className="text-[3.4rem] font-bold text-blue-900">
            Get Started In Just <br />
            <span className="text-[3rem] font-extrabold text-white">3 simple Steps.</span>
          </h1>
          <div className="w-[80%]">
            <p className="text-[1.5rem] text-blue-800 mt-2">
              Follow these three simple steps to access the benefits of AlinMuni and enhance your educational experience.
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="w-full max-w-5xl mt-10">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row bg-blue-50 rounded-[3rem] p-6 mb-6 h-[47vh] w-[45rem] shadow-lg">
            <div className="mb-4 md:mb-0">
              <span className="inline-block bg-blue-300 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                Step 1
              </span>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Create Your Student Account</h2>
              <p className="text-gray-700">
                Register for an AlinMuni account to access a wealth of educational resources and tools tailored specifically for students.
              </p>
              <p className="text-gray-700 mt-2">
                Once registered, verify your account through the confirmation email sent to you, and gain full access to all features.
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Get Started
              </button>
            </div>
            <div className="flex justify-center items-center md:ml-auto">
            
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row bg-blue-50 rounded-[3rem] p-6 mb-6 h-[47vh] w-[45rem] shadow-lg">
            <div className="mb-4 md:mb-0">
              <span className="inline-block bg-blue-300 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                Step 2
              </span>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Connect with Your Peers and Faculty</h2>
              <p className="text-gray-700">
                Link your AlinMuni account to your college community to collaborate easily with peers and communicate with faculty members.
              </p>
              <p className="text-gray-700 mt-2">
                Engage in discussions, join study groups, and stay updated on important announcements through our platform.
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Connect Now
              </button>
            </div>
            <div className="flex justify-center items-center md:ml-auto">
              
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row bg-blue-50 rounded-[3rem] p-6 mb-6 h-[47vh] w-[45rem] shadow-lg">
            <div className="mb-4 md:mb-0">
              <span className="inline-block bg-blue-300 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                Step 3
              </span>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Access Personalized Learning Resources</h2>
              <p className="text-gray-700">
                Experience a tailored educational journey with resources that align with your academic goals, including study materials, course updates, and mentorship opportunities.
              </p>
              <p className="text-gray-700 mt-2">
                Get ready to leverage tools designed specifically for your success as a student, ensuring you make the most of your educational experience.
              </p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Access Resources
              </button>
            </div>
            <div className="flex justify-center items-center md:ml-auto">
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
