"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faTimes,
  faBars,
  faPenSquare
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState(0);
  const sections = ["home", "about", "projects", "contact"];
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [darkMode, setDarkMode] = React.useState(false);
  const [language, setLanguage] = React.useState("en");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToSection = (index) => {
    setCurrentSection(index);
    const section = sections[index];
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  const [mapCenter] = React.useState({ lat: 35.6762, lng: 139.6503 });

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setScrollProgress((scrollPosition / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ja" : "en");
  };

  const translations = {
    en: {
      welcome: "Welcome to My Portfolio",
      about: "About Me",
      projects: "WORKS",
      contact: "Get in Touch",
      quickLinks: "Quick Links",
      socialMedia: "Social Media",
      copyright: "© 2024 Toshiki Sakuta. All rights reserved.",
      subscribe: "Subscribe to Newsletter",
      subscribeButton: "Subscribe",
      contactInfo: "Contact Information",
      address: "Osaka, Japan",
      phone: "",
      email: "",
      viewProject: "View Project",
    },
    ja: {
      welcome: "私の世界へようこそ",
      about: "私について",
      projects: "作品",
      contact: "お問い合わせ",
      quickLinks: "クイックリンク",
      socialMedia: "ソーシャルメディア",
      copyright: "© 2024 作田敏希. All rights reserved.",
      subscribe: "ニュースレターを購読する",
      subscribeButton: "購読する",
      contactInfo: "連絡先情報",
      address: "大阪府大阪市",
      phone: "",
      email: "",
      viewProject: "プロジェクトを見る",
    },
  };

  const projects = [
    { title: "Web Development", url: "/web-development" },
    { title: "Cloud Solutions", url: "/cloud-solutions" },
    { title: "Security Analysis", url: "/security-analysis" },
  ];

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      } text-white min-h-screen font-sans`}
    >
      <header className="fixed z-10 w-full px-8 py-6 transition-all duration-300 ease-in-out bg-black bg-opacity-30 backdrop-blur-lg">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 animate-pulse">
          Hello World
          </h1>
          <nav className="items-center hidden space-x-10 md:flex">
            <ul className="flex space-x-10">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#${section}`}
                    className="text-lg tracking-wider uppercase transition-colors duration-300 hover:text-pink-300"
                  >
                    {translations[language][section] || section}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggleDarkMode}
              className="text-2xl transition-transform duration-300 ease-in-out transform focus:outline-none hover:rotate-180"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button
              onClick={toggleLanguage}
              className="text-lg transition-transform duration-300 ease-in-out transform focus:outline-none hover:scale-110"
            >
              {language === "en" ? "日本語" : "English"}
            </button>
          </nav>
          <button
            onClick={toggleMenu}
            className="text-2xl transition-transform duration-300 ease-in-out transform md:hidden focus:outline-none hover:rotate-180"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-6 md:hidden animate-fadeDown">
            <ul className="flex flex-col space-y-4">
              {sections.map((section, index) => (
                <li key={index}>
                  <a
                    href={`#${section}`}
                    className="block px-6 py-3 tracking-wide uppercase transition-colors duration-300 hover:bg-purple-700"
                  >
                    {translations[language][section] || section}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <button
                onClick={toggleDarkMode}
                className="text-2xl transition-transform duration-300 ease-in-out transform focus:outline-none hover:rotate-180"
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </button>
              <button
                onClick={toggleLanguage}
                className="text-lg transition-transform duration-300 ease-in-out transform focus:outline-none hover:scale-110"
              >
                {language === "en" ? "日本語" : "English"}
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="pt-24">
        <section
          id="home"
          className="flex items-center justify-center min-h-screen px-8 parallax"
        >
          <div className="text-center">
            <h2 className="mb-8 font-bold text-7xl md:text-9xl animate-float animate-glow">
              {translations[language].welcome}
            </h2>
            <p className="text-3xl italic md:text-5xl animate-fadeIn animation-delay-300">
              Toshiki Sakuta
            </p>
            <div className="flex justify-center mt-12 space-x-8">
              <a
                href="https://www.linkedin.com/in/toshikisakuta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-5xl text-blue-400 transition-colors duration-300 hover:text-blue-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/KoenigWolf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-5xl text-gray-300 transition-colors duration-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://qiita.com/KoenigWolf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-5xl text-green-400 transition-colors duration-300 hover:text-green-300"
              >
                <FontAwesomeIcon icon={faPenSquare} />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 bg-black bg-opacity-30">
          <div className="container px-8 mx-auto">
            <h2 className="mb-16 text-6xl font-bold text-center text-pink-300 animate-fadeInUp">
              {translations[language].about}
            </h2>
            <div className="max-w-5xl p-12 mx-auto shadow-2xl bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl">
              <p className="mb-8 text-2xl leading-relaxed animate-fadeInUp animation-delay-150">
                An engineer from Hyogo Prefecture, I became fascinated with the
                world of the Web when a friend enjoyed a website I created as a
                hobby in the days before the iPhone was introduced to the world.
                He studied information technology at a technical high school and
                majored in industrial design at university. After graduation, I
                was involved in the design of electronic circuits for
                automobiles, and later moved to the IT industry, attracted by
                the potential of cloud technology.
              </p>
              <p className="text-2xl leading-relaxed animate-fadeInUp animation-delay-300">
                I started my career in technical support and experienced a wide
                range of work from networking to security measures, including
                Azure cloud server construction, security measures, and
                vulnerability diagnosis through log analysis.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32">
          <div className="container px-8 mx-auto">
            <h2 className="mb-16 text-6xl font-bold text-center text-pink-300 animate-fadeInUp">
              {translations[language].projects}
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="p-10 transition-all duration-300 transform shadow-2xl cursor-pointer bg-gradient-to-br from-indigo-800 to-purple-800 rounded-3xl hover:shadow-pink-500/50 hover:scale-105 animate-fadeInUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => (window.location.href = project.url)}
                >
                  <h3 className="mb-6 text-3xl font-bold text-blue-300">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-xl">
                    Innovative solutions in {project.title.toLowerCase()},
                    delivering cutting-edge results for clients worldwide.
                  </p>
                  <button className="px-6 py-3 font-bold text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105">
                    {translations[language].viewProject}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 bg-black bg-opacity-30">
          <div className="container px-8 mx-auto">
            <h2 className="mb-16 text-6xl font-bold text-center text-pink-300 animate-fadeInUp">
              {translations[language].contact}
            </h2>
            <form className="max-w-3xl mx-auto">
              {["name", "email", "message"].map((field, index) => (
                <div
                  key={field}
                  className="mb-10 animate-fadeInUp"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {field === "message" ? (
                    <textarea
                      name={field}
                      placeholder={`Your ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      rows="5"
                      className="w-full p-5 text-xl transition-all duration-300 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    ></textarea>
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={`Your ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      className="w-full p-5 text-xl transition-all duration-300 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-10 py-5 text-2xl font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl hover:from-blue-500 hover:to-pink-500 hover:scale-105 animate-fadeInUp animation-delay-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-black bg-opacity-70">
        <div className="container px-8 mx-auto">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-2xl font-bold text-pink-300">
                {translations[language].quickLinks}
              </h3>
              <ul className="space-y-4">
                {sections.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#${section}`}
                      className="transition-colors duration-300 hover:text-pink-300"
                    >
                      {translations[language][section] || section}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-2xl font-bold text-pink-300">
                {translations[language].socialMedia}
              </h3>
              <div className="flex justify-center space-x-6 md:justify-start">
                <a
                  href="#"
                  className="text-3xl transition-colors duration-300 hover:text-pink-300"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="#"
                  className="text-3xl transition-colors duration-300 hover:text-pink-300"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="#"
                  className="text-3xl transition-colors duration-300 hover:text-pink-300"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-2xl font-bold text-pink-300">
                {translations[language].subscribe}
              </h3>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="p-3 transition-all duration-300 rounded-lg bg-gradient-to-r from-indigo-900 to-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-white transition-all duration-300 bg-pink-600 rounded-lg hover:bg-pink-500"
                >
                  {translations[language].subscribeButton}
                </button>
              </form>
            </div>
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-2xl font-bold text-pink-300">
                {translations[language].contactInfo}
              </h3>
              <p className="mb-2">{translations[language].address}</p>
              <p className="mb-2">{translations[language].phone}</p>
              <p>{translations[language].email}</p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-sm">{translations[language].copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
