// Dynamic Greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    document.getElementById('greeting').textContent = greeting;
}
setGreeting();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Projects Filter
const projects = [
    { title: 'Project 1', category: 'web' },
    { title: 'Project 2', category: 'data' }
];

function renderProjects(category = 'all') {
    const filtered = category === 'all' ? projects : projects.filter(p => p.category === category);
    const html = filtered.map(p => `<article>${p.title}</article>`).join('');
    document.querySelector('.project-grid').innerHTML = html;
}

document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.addEventListener('click', () => renderProjects(button.dataset.category));
});

// Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add validation logic
});

// Advanced Features: Modal and Progress Bars
// Implement modal logic here
// Modal Example
document.querySelectorAll('.project-grid article').forEach(project => {
    project.addEventListener('click', () => {
        // Show modal with project details
    });
});

// Progress Bars
const skills = [{ name: 'HTML', level: 90 }, { name: 'CSS', level: 85 }];
skills.forEach(skill => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.style.width = '0';
    setTimeout(() => bar.style.width = `${skill.level}%`, 100);
    document.body.appendChild(bar);
});
