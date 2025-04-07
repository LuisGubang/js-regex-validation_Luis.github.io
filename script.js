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
