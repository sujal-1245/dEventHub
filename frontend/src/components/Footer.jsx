import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t dark:border-gray-800 ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10 text-gray-700 dark:text-gray-300">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              About dEventHub
            </h3>
            <p className="text-sm">
              Discover hackathons, internships, and opportunities tailored for
              your skills. Stay ahead and build your future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/events"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Browse Events
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Connect with us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-indigo-600 text-white p-3 rounded-full hover:scale-110 hover:shadow-lg transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-blue-400 text-white p-3 rounded-full hover:scale-110 hover:shadow-lg transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="bg-blue-700 text-white p-3 rounded-full hover:scale-110 hover:shadow-lg transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="bg-pink-500 text-white p-3 rounded-full hover:scale-110 hover:shadow-lg transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>© {new Date().getFullYear()} dEventHub — All rights reserved.</div>
          <div className="mt-2 md:mt-0">Built with ❤️ by the dEventHub Team</div>
        </div>
      </div>
    </footer>
  );
}
