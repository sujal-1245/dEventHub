import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaTrophy, FaRocket, FaBook } from "react-icons/fa";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/abstract-programming-code-icon-laptop-screen-light-blue-low-poly-futuristic-style-technology-background_43780-10083.jpg?semt=ais_hybrid&w=740')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg"
          >
            Discover Hackathons, Internships & Opportunities 🚀
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200"
          >
            dEventHub brings all career-boosting events under one roof. Stay
            ahead and build your future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/events"
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105"
            >
              Browse Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-black relative overflow-hidden">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
      Trusted by Top Institutions & Global Communities
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
      dEventHub is backed by the world’s most innovative tech leaders and
      student communities.
    </p>

    {/* Marquee wrapper with extra vertical padding */}
    <div className="overflow-hidden py-10">
      <Marquee gradient={false} speed={45} pauseOnHover={true}>
        <div className="flex gap-16 items-center px-8"> {/* add horizontal padding */}
          {[
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/blob_Jc8jeRa",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://cdn.wccftech.com/wp-content/uploads/2025/02/Meta.jpeg",
  "https://offcampusjobdrives.com/wp-content/uploads/2025/05/IBM.jpg",
  "https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg"
]
.map((logo, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md hover:shadow-2xl transition-transform duration-300 transform hover:scale-110 hover:rotate-1 group"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <img
                src={logo}
                alt="partner logo"
                className="h-14 w-auto drop-shadow-md group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.7)] transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  </div>
</section>

      {/* Stats */}
      <section
        className="py-20 bg-fixed bg-center bg-cover relative text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <FaUsers className="mx-auto text-5xl mb-4" />
            <h3 className="text-4xl font-bold">
              <CountUp
                end={50000}
                duration={3}
                enableScrollSpy
                scrollSpyDelay={200}
              />
              +
            </h3>
            <p>Students Benefitted</p>
          </div>
          <div>
            <FaTrophy className="mx-auto text-5xl mb-4" />
            <h3 className="text-4xl font-bold">
              <CountUp
                end={1200}
                duration={3}
                enableScrollSpy
                scrollSpyDelay={200}
              />
              +
            </h3>
            <p>Hackathons & Internships</p>
          </div>
          <div>
            <FaRocket className="mx-auto text-5xl mb-4" />
            <h3 className="text-4xl font-bold">
              <CountUp
                end={300}
                duration={3}
                enableScrollSpy
                scrollSpyDelay={200}
              />
              +
            </h3>
            <p>Career Success Stories</p>
          </div>
        </div>
      </section>

      {/* How It Works */}

      <section className="py-20 bg-gray-50 dark:bg-black relative overflow-hidden">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
    How dEventHub Works
  </h2>

  {/* Parent motion div with staggered children */}
  <motion.div
    className="container mx-auto grid md:grid-cols-3 gap-12 px-6 relative z-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } }
    }}
  >
    {/* Step 1 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 text-center relative group hover:scale-105"
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-indigo-600 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-md">
        1
      </div>
      <motion.img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
        alt="Sign Up"
        className="rounded-xl mb-6 w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
      />
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Sign Up</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Create a free profile and set your skills & interests.
      </p>
    </motion.div>

    {/* Step 2 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 text-center relative group hover:scale-105"
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-purple-600 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-md">
        2
      </div>
      <motion.img
        src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
        alt="Get Matched"
        className="rounded-xl mb-6 w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
      />
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Matched</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Our AI recommends the best hackathons, internships, and more.
      </p>
    </motion.div>

    {/* Step 3 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 text-center relative group hover:scale-105"
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-pink-600 text-white flex items-center justify-center rounded-full text-lg font-bold shadow-md">
        3
      </div>
      <motion.img
        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
        alt="Succeed"
        className="rounded-xl mb-6 w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
      />
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Succeed</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Apply, participate, and grow your career with global opportunities.
      </p>
    </motion.div>
  </motion.div>

  {/* Decorative Gradient BG */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50 via-transparent to-purple-50 dark:from-black dark:to-zinc-900 -z-10"></div>
</section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-black relative overflow-hidden">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
    Success Stories
  </h2>

  <motion.div
    className="container mx-auto grid md:grid-cols-3 gap-10 px-6"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.2 } },
    }}
  >
    {/* Testimonial 1 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 group text-center"
    >
      <img
        src="https://randomuser.me/api/portraits/women/65.jpg"
        alt="Priya Sharma"
        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-indigo-500 dark:border-indigo-400"
      />
      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
        "dEventHub helped me land my dream internship at Google!"
      </p>
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
        — Priya Sharma
      </h4>
    </motion.div>

    {/* Testimonial 2 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 group text-center"
    >
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Arjun Verma"
        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-500 dark:border-purple-400"
      />
      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
        "The AI recommendations were spot on. I joined 3 hackathons already!"
      </p>
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
        — Arjun Verma
      </h4>
    </motion.div>

    {/* Testimonial 3 */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 group text-center"
    >
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Neha Patel"
        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-pink-500 dark:border-pink-400"
      />
      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
        "A one-stop platform for students. Changed the way I explore opportunities."
      </p>
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
        — Neha Patel
      </h4>
    </motion.div>
  </motion.div>

  {/* Decorative floating gradient */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div className="absolute w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-30 -top-16 -left-16 animate-float"></div>
    <div className="absolute w-72 h-72 bg-pink-200 rounded-full filter blur-3xl opacity-30 -bottom-16 -right-16 animate-float animation-delay-2000"></div>
  </div>
</section>

      {/* Newsletter CTA */}
      <section
        className="py-20 text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-lg">
            Subscribe to our newsletter and never miss an opportunity.
          </p>
          <form className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full rounded-l-xl text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 rounded-r-xl hover:bg-purple-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 bg-cover bg-center relative text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="mb-6 text-lg">
            Join thousands of students and professionals already using
            dEventHub.
          </p>
          <Link
            to="/register"
            className="px-10 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
