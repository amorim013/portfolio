// Initialize Lucide icons
lucide.createIcons();

// Project data
const projects = [
  {
    title: 'Tarimfy',
    description: 'Plataforma de venda de cursos online com sistema de pagamentos integrado, gestão de conteúdo e análise de métricas.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    url: 'https://github.com/amorim013/tarimfy',
    demo: 'https://gregarious-tarsier-35d029.netlify.app/#cursos'
  },
  {
    title: 'Sistema de Gestão para Pizzaria',
    description: 'Sistema completo para gestão de pizzaria, incluindo pedidos online, controle de estoque e integração com delivery.',
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis'],
    url: 'https://github.com/amorim013/pizzaria-system',
    demo: 'https://pizzaria-system.vercel.app'
  },
  {
    title: 'Dashboard de Monitoramento',
    description: 'Sistema de monitoramento de servidores e infraestrutura com alertas em tempo real e análise de métricas.',
    technologies: ['FastAPI', 'Grafana', 'MongoDB', 'Docker', 'Prometheus'],
    url: 'https://github.com/amorim013/monitoring-dashboard',
    demo: 'https://monitoring-dashboard.vercel.app'
  }
];

// Render projects
function renderProjects() {
  const projectsContainer = document.getElementById('projects');
  
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card';
    
    projectElement.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 text-white">
        ${project.title}
      </h3>
      <p class="text-gray-400 mb-6 text-lg">
        ${project.description}
      </p>
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.technologies.map(tech => `
          <span class="tech-tag">${tech}</span>
        `).join('')}
      </div>
      <div class="flex gap-4">
        <a href="${project.url}"
           target="_blank"
           rel="noopener noreferrer" 
           class="project-link">
          <i data-lucide="github"></i>
          Código Fonte
        </a>
        ${project.demo ? `
          <a href="${project.demo}"
             target="_blank"
             rel="noopener noreferrer" 
             class="project-link" style="color: #34d399">
            <i data-lucide="external-link"></i>
            Ver Demo
          </a>
        ` : ''}
      </div>
    `;
    
    projectsContainer.appendChild(projectElement);
  });
  
  // Reinitialize icons for dynamically added content
  lucide.createIcons();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});