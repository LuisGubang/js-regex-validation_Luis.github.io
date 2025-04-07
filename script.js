/**
 * Portfolio JavaScript Module
 * Manages the projects section of the portfolio website
 * Handles project display, filtering, and interactive features
 */

// Project Data - Array of project objects with their details
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React and Node.js',
    category: 'web', // Category used for filtering
    image: 'assets/images/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#', // Link to project or demo
  },
  {
    id: 2,
    title: 'Mobile Weather App',
    description: 'Real-time weather tracking application for iOS and Android',
    category: 'app',
    image: 'assets/images/project2.jpg',
    technologies: ['React Native', 'OpenWeather API'],
    link: '#',
  },
  {
    id: 3,
    title: 'Brand Identity Design',
    description: 'Complete brand identity design for a tech startup',
    category: 'design',
    image: 'assets/images/project3.jpg',
    technologies: ['Figma', 'Adobe Illustrator'],
    link: '#',
  },
];

// DOM Elements - Cache frequently accessed elements
const projectsGrid = document.querySelector('.projects-grid'); // Container for project cards
const filterButtons = document.querySelectorAll('.filter-btn'); // Category filter buttons
const lightbox = document.getElementById('lightbox'); // Lightbox modal
const lightboxImg = document.getElementById('lightbox-img'); // Image displayed in lightbox
const closeLightbox = document.querySelector('.close-lightbox'); // Lightbox close button

/**
 * Create Project Card - Generates HTML for a project card
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - The created project card element
 */
const createProjectCard = project => {
  // Create article element for the card
  const card = document.createElement('article');
  card.className = 'project-card fade-in';
  card.dataset.category = project.category; // Set category for filtering

  // Populate card with project information
  card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay">
                <!-- Image expand button for lightbox -->
                <button class="view-project" data-image="${project.image}">
                    <i class="fas fa-expand"></i>
                </button>
                <!-- External link to project -->
                <a href="${project.link}" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <!-- Technology tags -->
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
    `;

  // Add lightbox functionality to view button
  const viewButton = card.querySelector('.view-project');
  viewButton.addEventListener('click', () => {
    lightboxImg.src = project.image; // Set image source
    lightbox.classList.add('active'); // Show lightbox
  });

  return card;
};

/**
 * Filter Projects - Shows/hides projects based on selected category
 * @param {string} category - Category to filter by ('all' or a specific category)
 */
const filterProjects = category => {
  const projectCards = document.querySelectorAll('.project-card');

  // Loop through all project cards
  projectCards.forEach(card => {
    // Show card if it matches the selected category or if 'all' is selected
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      // Add staggered animation for visual interest
      setTimeout(() => {
        card.classList.add('visible');
      }, 100 * Array.from(projectCards).indexOf(card)); // Delay based on card index
    } else {
      // Hide cards that don't match the selected category
      card.style.display = 'none';
      card.classList.remove('visible');
    }
  });

  // Update active state on filter buttons
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
};

/**
 * Initialize Portfolio - Sets up the portfolio section
 * Creates project cards, sets up event listeners, and initializes filtering
 */
const initPortfolio = () => {
  // Create and append project cards from data
  projects.forEach(project => {
    const card = createProjectCard(project);
    projectsGrid.appendChild(card);
  });

  // Set up filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterProjects(category);
    });
  });

  // Set up lightbox close functionality
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Close lightbox with escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  // Initialize with 'all' filter active
  filterProjects('all');
};

// Initialize portfolio section when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

/**
 * Dynamic CSS for Project Cards
 * Injects CSS for project cards into document head
 * This approach keeps the styling with the related JavaScript functionality
 */
const style = document.createElement('style');
style.textContent = `
    /* Project Card Container */
    .project-card {
        background: var(--card-bg);          /* Use theme color variables */
        border-radius: 10px;                 /* Rounded corners */
        overflow: hidden;                    /* Contain child elements */
        box-shadow: 0 4px 12px var(--shadow-color);
        transition: transform 0.3s, box-shadow 0.3s;  /* Smooth hover effects */
        opacity: 0;                          /* Start invisible for animation */
        transform: translateY(20px);         /* Start below final position */
    }

    /* Visible state for animation */
    .project-card.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hover effect - subtle lift */
    .project-card:hover {
        transform: translateY(-5px);         /* Lift card slightly */
        box-shadow: 0 8px 24px var(--shadow-color);  /* Enhanced shadow */
    }

    /* Image container */
    .project-image {
        position: relative;                  /* For absolute positioning of overlay */
        overflow: hidden;                    /* Contain scaled image */
        aspect-ratio: 16/9;                  /* Maintain consistent image proportions */
    }

    /* Project image */
    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;                   /* Maintain aspect ratio */
        transition: transform 0.3s;          /* Smooth zoom effect */
    }

    /* Image zoom effect on hover */
    .project-card:hover .project-image img {
        transform: scale(1.05);              /* Subtle zoom */
    }

    /* Overlay with buttons */
    .project-overlay {
        position: absolute;                  /* Cover the entire image */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);      /* Semi-transparent overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        opacity: 0;                          /* Hidden by default */
        transition: opacity 0.3s;            /* Fade in effect */
    }

    /* Show overlay on hover */
    .project-card:hover .project-overlay {
        opacity: 1;
    }

    /* Buttons in overlay */
    .project-overlay button,
    .project-overlay a {
        background: var(--primary-color);    /* Theme color */
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;                  /* Circular buttons */
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.3s, background-color 0.3s;
    }

    /* Button hover effect */
    .project-overlay button:hover,
    .project-overlay a:hover {
        transform: scale(1.1);               /* Enlarge slightly */
        background-color: var(--secondary-color);  /* Color change */
    }

    /* Project text content */
    .project-content {
        padding: 1.5rem;                     /* Spacing around content */
    }

    /* Project title */
    .project-content h3 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;                  /* Slightly larger than body text */
    }

    /* Project description */
    .project-content p {
        color: var(--text-color);
        margin-bottom: 1rem;
        opacity: 0.8;                        /* Slightly muted text */
    }

    /* Technology tags container */
    .project-technologies {
        display: flex;
        flex-wrap: wrap;                     /* Allow tags to wrap */
        gap: 0.5rem;                         /* Space between tags */
    }

    /* Technology tag styling */
    .project-technologies span {
        background: var(--primary-color);    /* Theme color */
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;                 /* Pill shape */
        font-size: 0.875rem;                 /* Slightly smaller text */
        opacity: 0.9;                        /* Slightly transparent */
    }
`;

// Add the dynamic styles to the document
document.head.appendChild(style);
/**
 * Main JavaScript file for personal portfolio website
 * Handles core functionality including theme management, navigation, animations,
 * scroll effects, and form validation
 */

// DOM Elements - Cache frequently accessed DOM elements for better performance
const themeToggle = document.getElementById('theme-toggle'); // Theme toggle button
const mobileMenu = document.querySelector('.mobile-menu'); // Mobile menu hamburger button
const navLinks = document.querySelector('.nav-links'); // Navigation links container
const navItems = document.querySelectorAll('.nav-links a'); // Individual navigation links
const sections = document.querySelectorAll('.section'); // Page sections for scroll effects
const skillLevels = document.querySelectorAll('.skill-level'); // Skill bar progress indicators
const contactForm = document.getElementById('contact-form'); // Contact form element
const currentYear = document.getElementById('current-year'); // Element to display current year in footer

/**
 * Theme Management - Handles user preference for light/dark mode
 * Persists theme selection in localStorage to remember user preferences
 */
const initTheme = () => {
  // Retrieve saved theme from localStorage or default to light theme
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Apply theme to document body using data attribute
  document.body.dataset.theme = savedTheme;

  // Update theme toggle button icon based on current theme
  themeToggle.innerHTML = `<i class="fas fa-${savedTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
};

// Theme toggle button click handler
themeToggle.addEventListener('click', () => {
  // Get current theme and determine new theme
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Apply new theme to body
  document.body.dataset.theme = newTheme;

  // Save preference to localStorage for persistence
  localStorage.setItem('theme', newTheme);

  // Update button icon to reflect new state (sun for dark mode, moon for light mode)
  themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
});

/**
 * Mobile Menu Functionality - Handles toggling the mobile navigation menu
 */
// Toggle mobile menu when hamburger button is clicked
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside the menu or navigation
document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

/**
 * Dynamic Greeting - Shows personalized greeting based on time of day
 * Updates greeting text in the hero section
 */
const setGreeting = () => {
  const greeting = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText;

  // Set greeting based on time of day
  if (hour >= 5 && hour < 12) {
    greetingText = 'Good Morning!';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Good Afternoon!';
  } else {
    greetingText = 'Good Evening!';
  }

  // Update greeting text in the DOM
  greeting.innerText = greetingText;
};

/**
 * Scroll Spy - Highlights active navigation link based on visible section
 * Also triggers fade-in animations when sections come into view
 * Uses Intersection Observer API for performance
 */
const observeSection = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger fade-in animation
        entry.target.classList.add('visible');

        // Update active navigation link
        const activeId = entry.target.getAttribute('id');
        navItems.forEach(item => {
          // Toggle 'active' class based on whether this link points to the visible section
          item.classList.toggle('active', item.getAttribute('href') === `#${activeId}`);
        });
      }
    });
  },
  {
    threshold: 0.3, // Trigger when 30% of the section is visible
  }
);

// Add fade-in class to all sections and observe them for scrolling
sections.forEach(section => {
  section.classList.add('fade-in');
  observeSection.observe(section);
});

/**
 * Smooth Scroll Navigation - Enables smooth scrolling to sections when clicking nav links
 * Prevents default link behavior and implements custom scrolling
 */
navItems.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // Prevent default anchor link behavior
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Close mobile menu if open
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');

    // Smooth scroll to target section
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

/**
 * Skill Bar Animations - Animates skill progress bars when they come into view
 * Uses Intersection Observer for performance and triggers width animation
 */
const observeSkills = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Set width of skill bar to the percentage specified in data-level attribute
        const level = entry.target.dataset.level;
        entry.target.style.width = `${level}%`;
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the skill bar is visible
  }
);

// Observe all skill level elements
skillLevels.forEach(skill => observeSkills.observe(skill));

/**
 * Form Validation - Handles contact form validation and submission
 * Performs client-side validation with helpful error messages
 */
const validateForm = e => {
  e.preventDefault(); // Prevent default form submission
  let isValid = true;
  const formData = new FormData(contactForm);

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(msg => {
    msg.style.display = 'none';
  });

  // Validate Name (minimum 2 characters)
  const name = formData.get('name');
  if (!name || name.length < 2) {
    showError('name', 'Please enter a valid name (minimum 2 characters)');
    isValid = false;
  }

  // Validate Email (using regex pattern)
  const email = formData.get('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Message (minimum 10 characters)
  const message = formData.get('message');
  if (!message || message.length < 10) {
    showError('message', 'Please enter a message (minimum 10 characters)');
    isValid = false;
  }

  // Handle form submission if valid
  if (isValid) {
    // In a real application, you would send the form data to a server here using fetch or AJAX
    alert('Message sent successfully!');
    contactForm.reset(); // Clear the form
  }
};

/**
 * Show Error Message - Helper function to display validation errors
 * @param {string} fieldName - The name of the field with an error
 * @param {string} message - The error message to display
 */
const showError = (fieldName, message) => {
  // Find error message element associated with the field
  const errorElement = document.querySelector(`#${fieldName} + .error-message`);
  errorElement.textContent = message;
  errorElement.style.display = 'block'; // Make error message visible
};

// Real-time form validation - Clear error messages as user types
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('input', () => {
    // Find and hide the error message associated with this input
    const errorElement = input.nextElementSibling;
    errorElement.style.display = 'none';
  });
});

/**
 * Initialization - Set up the page when the DOM is fully loaded
 * Initializes theme, greeting, event listeners, and sets copyright year
 */
const init = () => {
  initTheme(); // Initialize theme based on saved preference
  setGreeting(); // Set initial greeting based on time of day
  contactForm.addEventListener('submit', validateForm); // Set up form validation
  currentYear.textContent = new Date().getFullYear(); // Set current year in copyright notice

  // Update greeting text every minute to keep it current
  setInterval(setGreeting, 60000);
};

// Initialize when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', init);
/**
 * Blog JavaScript Module
 * Manages the blog section of the portfolio website
 * Handles post display, search functionality, and individual post viewing
 */

// Blog Posts Data - Array of blog post objects with their details
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Web Development',
    date: '2025-03-15', // ISO date format (YYYY-MM-DD)
    excerpt: 'A comprehensive guide for beginners looking to start their web development journey.',
    content:
      'Web development can seem overwhelming at first, but with the right approach and resources...',
    tags: ['Web Development', 'Beginners', 'Tutorial'],
    readTime: '5 min read', // Estimated reading time
  },
  {
    id: 2,
    title: 'Modern JavaScript Features You Should Know',
    date: '2025-03-10',
    excerpt: 'Exploring the latest JavaScript features that will make your code more efficient.',
    content:
      'JavaScript has evolved significantly over the years, introducing powerful features...',
    tags: ['JavaScript', 'Programming', 'ES6+'],
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Responsive Design Best Practices',
    date: '2025-03-05',
    excerpt: 'Learn how to create websites that look great on any device.',
    content: "In today's mobile-first world, responsive design is more important than ever...",
    tags: ['CSS', 'Responsive Design', 'Web Development'],
    readTime: '6 min read',
  },
];

// DOM Elements - Cache frequently accessed elements
const blogGrid = document.querySelector('.blog-grid'); // Container for blog post cards
const searchInput = document.getElementById('blog-search-input'); // Search input field

/**
 * Create Blog Post Card - Generates HTML for a blog post card
 * @param {Object} post - Blog post data object
 * @returns {HTMLElement} - The created blog post card element
 */
const createBlogCard = post => {
  // Create article element for the card
  const card = document.createElement('article');
  card.className = 'blog-card fade-in';

  // Format the date for better readability
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Populate card with blog post information
  card.innerHTML = `
        <div class="blog-card-content">
            <!-- Post metadata - date and reading time -->
            <div class="blog-meta">
                <span class="blog-date">${date}</span>
                <span class="blog-read-time">${post.readTime}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <!-- Tags for post categorization -->
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <!-- Read more button with post ID for reference -->
            <button class="read-more" data-post-id="${post.id}">Read More</button>
        </div>
    `;

  // Add event listener to read more button
  const readMoreBtn = card.querySelector('.read-more');
  readMoreBtn.addEventListener('click', () => showFullPost(post));

  return card;
};

/**
 * Show Full Blog Post - Displays a modal with the complete blog post content
 * @param {Object} post - Blog post data object to display
 */
const showFullPost = post => {
  // Create modal container
  const modal = document.createElement('div');
  modal.className = 'blog-modal';

  // Format the date for better readability
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Populate modal with full post content
  modal.innerHTML = `
        <div class="blog-modal-content">
            <!-- Close button (X) -->
            <button class="close-modal">&times;</button>
            <article class="full-post">
                <!-- Post header with metadata -->
                <div class="post-header">
                    <div class="post-meta">
                        <span class="post-date">${date}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                    <h2>${post.title}</h2>
                    <!-- Tags for post categorization -->
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <!-- Full post content -->
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
            </article>
        </div>
    `;

  // Add modal to DOM and prevent scrolling of background content
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open

  // Set up close button functionality
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });

  // Close modal when clicking outside content area
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      document.body.style.overflow = 'auto';
    }
  });
};

/**
 * Search Blog Posts - Filters posts based on search query
 * Searches through titles, content, and tags
 * @param {string} query - User's search term
 */
const searchPosts = query => {
  // Normalize query for case-insensitive search
  const normalizedQuery = query.toLowerCase();

  // Filter posts that match the query in title, content, or tags
  const filteredPosts = blogPosts.filter(post => {
    return (
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.content.toLowerCase().includes(normalizedQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  });

  // Clear current posts from grid
  blogGrid.innerHTML = '';

  // Display "no results" message or filtered posts
  if (filteredPosts.length === 0) {
    // Create and append "no results" message
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No blog posts found matching your search.';
    blogGrid.appendChild(noResults);
  } else {
    // Render filtered posts with staggered animation
    filteredPosts.forEach(post => {
      const card = createBlogCard(post);
      blogGrid.appendChild(card);
      setTimeout(() => card.classList.add('visible'), 100); // Slight delay for animation
    });
  }
};

/**
 * Initialize Blog - Sets up the blog section
 * Creates blog post cards and sets up search functionality
 */
const initBlog = () => {
  // Set up search input with debounced event handler to prevent excessive searching
  searchInput.addEventListener(
    'input',
    debounce(e => {
      searchPosts(e.target.value);
    }, 300)
  ); // 300ms debounce delay

  // Create and append initial blog post cards with staggered animation
  blogPosts.forEach(post => {
    const card = createBlogCard(post);
    blogGrid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100); // Slight delay for animation
  });
};

/**
 * Debounce Function - Limits the rate at which a function can fire
 * Used to prevent excessive execution of search function while typing
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    // Create a new timeout each time the function is called
    const later = () => {
      clearTimeout(timeout);
      func(...args); // Execute the function with arguments
    };
    clearTimeout(timeout); // Clear previous timeout
    timeout = setTimeout(later, wait); // Set new timeout
  };
};

/**
 * Dynamic CSS for Blog Components
 * Injects CSS for blog cards, modals, and related elements
 * This approach keeps the styling with the related JavaScript functionality
 */
const style = document.createElement('style');
style.textContent = `
    /* Blog Card Styling */
    .blog-card {
        background: var(--card-bg);          /* Use theme color variables */
        border-radius: 10px;                 /* Rounded corners */
        padding: 1.5rem;                     /* Inner spacing */
        box-shadow: 0 4px 12px var(--shadow-color); /* Subtle shadow */
        transition: transform 0.3s, box-shadow 0.3s; /* Smooth hover effects */
        opacity: 0;                          /* Start invisible for animation */
        transform: translateY(20px);         /* Start below final position */
    }

    /* Visible state for animation */
    .blog-card.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hover effect - subtle lift */
    .blog-card:hover {
        transform: translateY(-5px);         /* Lift card slightly */
        box-shadow: 0 8px 24px var(--shadow-color); /* Enhanced shadow */
    }

    /* Blog metadata row (date and read time) */
    .blog-meta {
        display: flex;
        justify-content: space-between;
        color: var(--secondary-color);       /* Slightly muted text color */
        font-size: 0.875rem;                 /* Smaller text size */
        margin-bottom: 0.5rem;
    }

    /* Blog post title */
    .blog-card h3 {
        margin-bottom: 1rem;
        font-size: 1.25rem;
        color: var(--text-color);
    }

    /* Tag container */
    .blog-tags {
        display: flex;
        flex-wrap: wrap;                     /* Allow tags to wrap */
        gap: 0.5rem;                         /* Space between tags */
        margin: 1rem 0;
    }

    /* Individual tag styling */
    .tag {
        background: var(--primary-color);    /* Theme accent color */
        color: white;                        /* White text for contrast */
        padding: 0.25rem 0.75rem;
        border-radius: 15px;                 /* Pill shape */
        font-size: 0.875rem;                 /* Smaller text size */
        opacity: 0.9;                        /* Slight transparency */
    }

    /* Read more button styling */
    .read-more {
        background: none;                    /* No background */
        border: none;
        color: var(--primary-color);         /* Theme accent color */
        font-weight: 500;                    /* Medium weight */
        cursor: pointer;
        padding: 0;
        font-size: 1rem;                     /* Same as body text */
        transition: color 0.3s;              /* Smooth color change on hover */
    }

    .read-more:hover {
        color: var(--secondary-color);       /* Color change on hover */
    }

    /* Modal overlay for full posts */
    .blog-modal {
        position: fixed;                     /* Cover entire viewport */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);      /* Semi-transparent dark background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;                       /* Above other content */
    }

    /* Modal content container */
    .blog-modal-content {
        background: var(--card-bg);          /* Theme background color */
        width: 90%;
        max-width: 800px;                    /* Limit width on larger screens */
        max-height: 90vh;                    /* Limit height to 90% of viewport */
        overflow-y: auto;                    /* Scrollable if content is too long */
        border-radius: 10px;                 /* Rounded corners */
        padding: 2rem;
        position: relative;                  /* For positioning close button */
    }

    /* Close button for modal */
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;                   /* Larger text for better clickability */
        color: var(--text-color);
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;                      /* Center the × symbol */
    }

    /* Post header section */
    .post-header {
        margin-bottom: 2rem;                 /* Space before content */
    }

    /* Post metadata in full post view */
    .post-meta {
        color: var(--secondary-color);       /* Slightly muted text color */
        margin-bottom: 1rem;
    }

    /* Post content styling */
    .post-content {
        line-height: 1.8;                    /* Increased line height for readability */
    }

    /* No results message styling */
    .no-results {
        text-align: center;
        padding: 2rem;
        color: var(--text-color);
        grid-column: 1 / -1;                 /* Span all columns in grid */
    }
`;

// Add the dynamic styles to the document
document.head.appendChild(style);

// Initialize blog section when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBlog);

