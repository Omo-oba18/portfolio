// controller.js

const technologies = [
  "Java",
  "MongoDB",
  "HTML",
  "JavaScript",
  "CSS",
  "React",
  "Node.js",
  "Python",
  "C++",
  "Ruby",
  "Stripe API Integration",
  "Material Design",
  "Ant Design",
  "Angular",
  "Vue.js",
  "SQL",
  "PHP",
  "TypeScript",
  "Bootstrap",
  "Swift",
  "Rust",
  "Go",
  "Perl",
  "Kotlin",
  "Dart",
  "Shell Scripting",
  "Scala",
  "TensorFlow",
  "AWS",
  "Firebase",
  "Docker",
  "Blockchain",
  "Kubernetes",
  "Flutter",
  "Spring",
  "Express.js",
  "Laravel",
  "C#",
  "ASP.NET",
  "VueX",
  "Ember.js",
  "Svelte",
  "Jenkins",
  "Git",
  "Subversion",
  "RESTful API",
  "GraphQL",
  "RxJS",
  "Redux",
  "Vuex",
  "Flask",
  "jQuery",
  "Meteor",
  "Redux Saga",
  "Django",
  "Ruby on Rails",
  "Unity",
  "Elixir",
  "Bash Scripting",
  "Hadoop",
  "Apache Spark",
  "Gatsby",
  "Nuxt.js",
  "F#",
  "Objective-C",
  "Scheme",
  "Clojure",
  "Erlang",
  "Groovy",
  "Haskell",
  "R",
  "COBOL",
  "Ada",
  "Fortran",
  "Lua",
  "Assembly",
  "Verilog",
  "VHDL",
  "Scratch",
  "Racket",
  "Pascal",
  "Lisp",
  "Prolog",
  "Elm",
  "Joomla",
  "Drupal",
  "Magento",
  "OpenCart",
  "Shopify",
  "PrestaShop",
  "Symfony",
  "CakePHP",
  "CodeIgniter",
  "Zend Framework",
  "Phalcon",
  "Slim",
  "CherryPy",
  "Tornado",
  "FastAPI",
  "Hug",
  "Sanic",
];

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const getAllTechnologies = (req, res) => {
  return res.json({ technologies });
};

const searchTechnology = async (req, res) => {
  const { search } = req.query;

  // Simulate an asynchronous delay using async/await
  await delay(1000); // Simulating a delay of 1 second (1000 milliseconds)

  if (search) {
    const filteredTech = technologies.filter((tech) =>
      tech.toLowerCase().includes(search.toLowerCase())
    );
    return res.json({ data: filteredTech });
  }

  return res.json({ data: technologies });
};

module.exports = {
  getAllTechnologies,
  searchTechnology,
};
