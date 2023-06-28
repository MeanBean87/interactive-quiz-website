const questions = [
    {
      type: "API",
      question: "What does API stand for?",
      options: [
        { letter: "A", text: "Application Programming Interface", isCorrect: true },
        { letter: "B", text: "Application Program Interface", isCorrect: false },
        { letter: "C", text: "Automated Programming Interface", isCorrect: false },
        { letter: "D", text: "Automated Program Interface", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "Which HTTP method is used to retrieve data from a server?",
      options: [
        { letter: "A", text: "GET", isCorrect: true },
        { letter: "B", text: "POST", isCorrect: false },
        { letter: "C", text: "PUT", isCorrect: false },
        { letter: "D", text: "DELETE", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is the status code for a successful HTTP request?",
      options: [
        { letter: "A", text: "200", isCorrect: true },
        { letter: "B", text: "400", isCorrect: false },
        { letter: "C", text: "500", isCorrect: false },
        { letter: "D", text: "600", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is the purpose of an API key?",
      options: [
        { letter: "A", text: "To authenticate and track API requests", isCorrect: true },
        { letter: "B", text: "To encrypt data sent over an API", isCorrect: false },
        { letter: "C", text: "To limit the number of API requests", isCorrect: false },
        { letter: "D", text: "To define the API endpoint", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "Which format is commonly used for API responses?",
      options: [
        { letter: "A", text: "JSON", isCorrect: true },
        { letter: "B", text: "XML", isCorrect: false },
        { letter: "C", text: "CSV", isCorrect: false },
        { letter: "D", text: "HTML", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is the difference between SOAP and REST APIs?",
      options: [
        { letter: "A", text: "SOAP is a protocol, while REST is an architectural style", isCorrect: true },
        { letter: "B", text: "SOAP uses JSON for data interchange, while REST uses XML", isCorrect: false },
        { letter: "C", text: "SOAP is stateless, while REST is stateful", isCorrect: false },
        { letter: "D", text: "SOAP is more lightweight than REST", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "Which authentication method is commonly used for APIs?",
      options: [
        { letter: "A", text: "OAuth", isCorrect: true },
        { letter: "B", text: "JWT", isCorrect: false },
        { letter: "C", text: "Basic Auth", isCorrect: false },
        { letter: "D", text: "Digest Auth", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is rate limiting in the context of APIs?",
      options: [
        { letter: "A", text: "Restricting the number of API requests per time interval", isCorrect: true },
        { letter: "B", text: "Encrypting API request data", isCorrect: false },
        { letter: "C", text: "Validating API response data", isCorrect: false },
        { letter: "D", text: "Monitoring API performance", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is CORS?",
      options: [
        { letter: "A", text: "Cross-Origin Resource Sharing", isCorrect: true },
        { letter: "B", text: "Cross-Origin Request Security", isCorrect: false },
        { letter: "C", text: "Cross-Origin Response Standards", isCorrect: false },
        { letter: "D", text: "Cross-Origin Request Sharing", isCorrect: false }
      ]
    },
    {
      type: "API",
      question: "What is an API endpoint?",
      options: [
        { letter: "A", text: "The URL where API requests are sent", isCorrect: true },
        { letter: "B", text: "The programming language used to build an API", isCorrect: false },
        { letter: "C", text: "The format used for API responses", isCorrect: false },
        { letter: "D", text: "The database used to store API data", isCorrect: false }
      ]
    },
    // Add more API questions...
  
    {
      type: "JavaScript",
      question: "What is JavaScript primarily used for?",
      options: [
        { letter: "A", text: "Adding interactivity to web pages", isCorrect: true },
        { letter: "B", text: "Styling web pages", isCorrect: false },
        { letter: "C", text: "Defining the structure of web pages", isCorrect: false },
        { letter: "D", text: "Managing server-side operations", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "Which keyword is used to declare variables in JavaScript?",
      options: [
        { letter: "A", text: "var", isCorrect: true },
        { letter: "B", text: "let", isCorrect: false },
        { letter: "C", text: "const", isCorrect: false },
        { letter: "D", text: "variable", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What is the result of the following expression: 2 + '2'?",
      options: [
        { letter: "A", text: "22", isCorrect: true },
        { letter: "B", text: "4", isCorrect: false },
        { letter: "C", text: "22", isCorrect: false },
        { letter: "D", text: "NaN", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "Which built-in method is used to convert a string to uppercase?",
      options: [
        { letter: "A", text: "toUpperCase()", isCorrect: true },
        { letter: "B", text: "toLowerCase()", isCorrect: false },
        { letter: "C", text: "charAt()", isCorrect: false },
        { letter: "D", text: "slice()", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What is the purpose of the 'typeof' operator in JavaScript?",
      options: [
        { letter: "A", text: "To determine the data type of a value", isCorrect: true },
        { letter: "B", text: "To compare two values for equality", isCorrect: false },
        { letter: "C", text: "To declare a variable", isCorrect: false },
        { letter: "D", text: "To concatenate two strings", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What does the acronym DOM stand for in web development?",
      options: [
        { letter: "A", text: "Document Object Model", isCorrect: true },
        { letter: "B", text: "Data Object Model", isCorrect: false },
        { letter: "C", text: "Digital Output Mode", isCorrect: false },
        { letter: "D", text: "Dynamic Operation Mode", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        { letter: "A", text: "The object that owns the current code", isCorrect: true },
        { letter: "B", text: "The global window object", isCorrect: false },
        { letter: "C", text: "The previous function call", isCorrect: false },
        { letter: "D", text: "The current date and time", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What is the purpose of the 'addEventListener' method in JavaScript?",
      options: [
        { letter: "A", text: "To attach an event handler to an element", isCorrect: true },
        { letter: "B", text: "To create a new DOM element", isCorrect: false },
        { letter: "C", text: "To add a CSS class to an element", isCorrect: false },
        { letter: "D", text: "To perform an asynchronous HTTP request", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What is the result of the following expression: typeof null?",
      options: [
        { letter: "A", text: "object", isCorrect: true },
        { letter: "B", text: "null", isCorrect: false },
        { letter: "C", text: "undefined", isCorrect: false },
        { letter: "D", text: "string", isCorrect: false }
      ]
    },
    {
      type: "JavaScript",
      question: "What is the purpose of the 'NaN' value in JavaScript?",
      options: [
        { letter: "A", text: "To represent a value that is not a number", isCorrect: true },
        { letter: "B", text: "To indicate a syntax error", isCorrect: false },
        { letter: "C", text: "To terminate a loop", isCorrect: false },
        { letter: "D", text: "To concatenate strings", isCorrect: false }
      ]
    },
    // Add more JavaScript questions...
  
    {
      type: "CSS",
      question: "What does CSS stand for?",
      options: [
        { letter: "A", text: "Cascading Style Sheets", isCorrect: true },
        { letter: "B", text: "Cascaded Style Selection", isCorrect: false },
        { letter: "C", text: "Cascaded Styling System", isCorrect: false },
        { letter: "D", text: "Cascading Style Selection", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS property is used to change the text color of an element?",
      options: [
        { letter: "A", text: "color", isCorrect: true },
        { letter: "B", text: "background-color", isCorrect: false },
        { letter: "C", text: "font-size", isCorrect: false },
        { letter: "D", text: "text-align", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS property is used to add spacing between HTML elements?",
      options: [
        { letter: "A", text: "margin", isCorrect: true },
        { letter: "B", text: "padding", isCorrect: false },
        { letter: "C", text: "border", isCorrect: false },
        { letter: "D", text: "display", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS property is used to control the order of overlapping elements?",
      options: [
        { letter: "A", text: "z-index", isCorrect: true },
        { letter: "B", text: "position", isCorrect: false },
        { letter: "C", text: "float", isCorrect: false },
        { letter: "D", text: "overflow", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "What is the purpose of the 'box-sizing' property in CSS?",
      options: [
        { letter: "A", text: "To control how the total width and height of an element is calculated", isCorrect: true },
        { letter: "B", text: "To apply a border around an element", isCorrect: false },
        { letter: "C", text: "To change the display order of an element", isCorrect: false },
        { letter: "D", text: "To set the background color of an element", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS selector is used to select elements with a specific class?",
      options: [
        { letter: "A", text: ".class-name", isCorrect: true },
        { letter: "B", text: "#id-name", isCorrect: false },
        { letter: "C", text: "element-name", isCorrect: false },
        { letter: "D", text: ":hover", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS property is used to change the font style of an element?",
      options: [
        { letter: "A", text: "font-style", isCorrect: true },
        { letter: "B", text: "font-size", isCorrect: false },
        { letter: "C", text: "font-weight", isCorrect: false },
        { letter: "D", text: "font-family", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "Which CSS property is used to control the spacing between lines of text?",
      options: [
        { letter: "A", text: "line-height", isCorrect: true },
        { letter: "B", text: "letter-spacing", isCorrect: false },
        { letter: "C", text: "text-indent", isCorrect: false },
        { letter: "D", text: "word-spacing", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "What is the purpose of the 'float' property in CSS?",
      options: [
        { letter: "A", text: "To control the alignment and positioning of elements", isCorrect: true },
        { letter: "B", text: "To apply a shadow to an element", isCorrect: false },
        { letter: "C", text: "To change the display order of elements", isCorrect: false },
        { letter: "D", text: "To create responsive layouts", isCorrect: false }
      ]
    },
    {
      type: "CSS",
      question: "What is the purpose of the 'transition' property in CSS?",
      options: [
        { letter: "A", text: "To add smooth transitions to CSS properties", isCorrect: true },
        { letter: "B", text: "To apply 3D transformations to elements", isCorrect: false },
        { letter: "C", text: "To define the shape of an element", isCorrect: false },
        { letter: "D", text: "To create animations using keyframes", isCorrect: false }
      ]
    },
    // Add more CSS questions...
  
    {
      type: "HTML",
      question: "What does HTML stand for?",
      options: [
        { letter: "A", text: "Hypertext Markup Language", isCorrect: true },
        { letter: "B", text: "Hypertext Modeling Language", isCorrect: false },
        { letter: "C", text: "Hyperlink Markup Language", isCorrect: false },
        { letter: "D", text: "Hypermedia Modeling Language", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to define a hyperlink?",
      options: [
        { letter: "A", text: "<a>", isCorrect: true },
        { letter: "B", text: "<p>", isCorrect: false },
        { letter: "C", text: "<h1>", isCorrect: false },
        { letter: "D", text: "<div>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "What is the purpose of the 'alt' attribute in an HTML <img> tag?",
      options: [
        { letter: "A", text: "To provide alternative text for screen readers and search engines", isCorrect: true },
        { letter: "B", text: "To specify the alignment of the image", isCorrect: false },
        { letter: "C", text: "To define the source URL of the image", isCorrect: false },
        { letter: "D", text: "To set the border width of the image", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to create a numbered list?",
      options: [
        { letter: "A", text: "<ol>", isCorrect: true },
        { letter: "B", text: "<ul>", isCorrect: false },
        { letter: "C", text: "<li>", isCorrect: false },
        { letter: "D", text: "<dl>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to define a table row?",
      options: [
        { letter: "A", text: "<tr>", isCorrect: true },
        { letter: "B", text: "<td>", isCorrect: false },
        { letter: "C", text: "<th>", isCorrect: false },
        { letter: "D", text: "<table>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to define a section of a web page?",
      options: [
        { letter: "A", text: "<section>", isCorrect: true },
        { letter: "B", text: "<div>", isCorrect: false },
        { letter: "C", text: "<article>", isCorrect: false },
        { letter: "D", text: "<span>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "What is the purpose of the 'DOCTYPE' declaration in HTML?",
      options: [
        { letter: "A", text: "To specify the version of HTML used in the document", isCorrect: true },
        { letter: "B", text: "To define the document title", isCorrect: false },
        { letter: "C", text: "To include external CSS stylesheets", isCorrect: false },
        { letter: "D", text: "To create a link to an external JavaScript file", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to define the main heading of a web page?",
      options: [
        { letter: "A", text: "<h1>", isCorrect: true },
        { letter: "B", text: "<header>", isCorrect: false },
        { letter: "C", text: "<title>", isCorrect: false },
        { letter: "D", text: "<body>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "Which HTML tag is used to create a horizontal line?",
      options: [
        { letter: "A", text: "<hr>", isCorrect: true },
        { letter: "B", text: "<br>", isCorrect: false },
        { letter: "C", text: "<p>", isCorrect: false },
        { letter: "D", text: "<line>", isCorrect: false }
      ]
    },
    {
      type: "HTML",
      question: "What is the purpose of the 'form' element in HTML?",
      options: [
        { letter: "A", text: "To create a container for user input", isCorrect: true },
        { letter: "B", text: "To define the document title", isCorrect: false },
        { letter: "C", text: "To include external JavaScript files", isCorrect: false },
        { letter: "D", text: "To specify the character encoding of the document", isCorrect: false }
      ]
    }
    // Add more HTML questions...
  ];
  