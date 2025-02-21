import React from "react";

const MyInformation = () => {
  const projects = [
    {
      title: "ShelfSpace",
      description:
        "ShelfSpace is a book library platform that allows users to borrow, return, donate, and manage books seamlessly.",
      image: "https://i.ibb.co.com/JyNYSF4/Screenshot-2025-01-09-115144.png",
      github: "https://github.com/Nur-Araf/ShelfSpace",
      live: "https://assingment-11-9703f.web.app/",
    },
    {
      title: "Zentry Clone",
      description:
        "Welcome to the Zentry Clone project! This project is a replica of the popular Zentry platform",
      image: "https://i.ibb.co.com/z6C9ZPD/Screenshot-2025-01-21-131231.png",
      github: "https://github.com/Nur-Araf/Zentry-Clone-gsap",
      live: "https://zentry-clone-gsap.vercel.app/",
    },
  ];

  return (
    <div className="flex flex-col items-center mt-4 md:mt-12 p-6 bg-gray-100 dark:bg-gradient-to-tr dark:from-gray-400 dark:to-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Nur Araf Shishir
      </h1>
      <p className="text-lg text-gray-700 dark:text-white mb-8 text-center">
        A passionate MERN stack developer who loves creating web applications.
      </p>

      <div className="flex justify-center gap-4 mb-8">
        <a
          href="https://github.com/Nur-Araf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://portfolio-with-3-d-animations.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/nur-araf-shishir-4798a4308/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          LinkedIn
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full h-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="flex gap-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Live
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInformation;
