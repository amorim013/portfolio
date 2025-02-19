import React from 'react';
import { Github, Linkedin, Mail, Book, Server, Code2, Terminal, ExternalLink } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero Section with Animated Background */}
      <header className="relative bg-black border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>
        <div className="container mx-auto px-6 py-32 relative">
          <div className="animate-fade-in">
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text">
              Vitor Amorim
            </h1>
            <h2 className="text-3xl mb-8 text-gray-400 font-light">
              Desenvolvedor Full Stack | Especialista em Back-End e Sistemas Escaláveis
            </h2>
            <div className="flex gap-6">
              <a href="https://github.com/amorim013" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-gray-400 hover:text-white transition-all hover:translate-y-[-2px]">
                <Github size={20} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/vitoramorimtartari" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-gray-400 hover:text-white transition-all hover:translate-y-[-2px]">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="mailto:vitoramorim756@gmail.com"
                 className="flex items-center gap-2 text-gray-400 hover:text-white transition-all hover:translate-y-[-2px]">
                <Mail size={20} />
                Email
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-white">Sobre Mim</h2>
          <p className="text-gray-400 max-w-3xl leading-relaxed text-lg">
            Sou um Desenvolvedor Full Stack com foco em Back-End, especializado no desenvolvimento de sistemas escaláveis, 
            de alta performance e segurança robusta. Minha experiência inclui arquitetura de APIs REST e GraphQL, modelagem 
            e otimização de bancos de dados SQL e NoSQL, implementação de microsserviços e integração de sistemas complexos.
          </p>
          <p className="text-gray-400 max-w-3xl leading-relaxed text-lg mt-4">
            Tenho profundo conhecimento em engenharia de software, design de sistemas e segurança da informação, garantindo 
            aplicações eficientes, bem estruturadas e alinhadas com as melhores práticas do mercado. Busco sempre inovação 
            e otimização contínua, combinando tecnologia e estratégia para entregar soluções de alto impacto.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-white">Habilidades Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <Book className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={36} />
              <h3 className="font-semibold mb-4 text-xl text-white">Linguagens Base</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="group-hover:text-gray-300 transition-colors">C</li>
                <li className="group-hover:text-gray-300 transition-colors">Python</li>
                <li className="group-hover:text-gray-300 transition-colors">Java</li>
              </ul>
            </div>
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <Server className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={36} />
              <h3 className="font-semibold mb-4 text-xl text-white">Web Development</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="group-hover:text-gray-300 transition-colors">HTML</li>
                <li className="group-hover:text-gray-300 transition-colors">CSS</li>
                <li className="group-hover:text-gray-300 transition-colors">JavaScript</li>
              </ul>
            </div>
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <Code2 className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={36} />
              <h3 className="font-semibold mb-4 text-xl text-white">Fundamentos</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="group-hover:text-gray-300 transition-colors">Algoritmos</li>
                <li className="group-hover:text-gray-300 transition-colors">Estruturas de Dados</li>
                <li className="group-hover:text-gray-300 transition-colors">Lógica de Programação</li>
              </ul>
            </div>
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <Terminal className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={36} />
              <h3 className="font-semibold mb-4 text-xl text-white">Segurança</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="group-hover:text-gray-300 transition-colors">Segurança da Informação</li>
                <li className="group-hover:text-gray-300 transition-colors">Criptografia</li>
                <li className="group-hover:text-gray-300 transition-colors">Proteção de Dados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-white">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} 
                   className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 
                            hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 text-lg group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} 
                          className="bg-blue-900/30 text-blue-300 text-sm px-3 py-1 rounded-full
                                   group-hover:bg-blue-900/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.url}
                     target="_blank"
                     rel="noopener noreferrer" 
                     className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors
                             group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <Github size={16} className="mr-2" />
                    Código Fonte
                  </a>
                  {project.demo && (
                    <a href={project.demo}
                       target="_blank"
                       rel="noopener noreferrer" 
                       className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors
                               group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-6">© 2024 Vitor Amorim. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-8">
            <a href="https://github.com/amorim013" 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-white transition-colors hover:transform hover:scale-110 transition-all duration-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/vitoramorimtartari" 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-white transition-colors hover:transform hover:scale-110 transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:vitoramorim756@gmail.com"
               className="hover:text-white transition-colors hover:transform hover:scale-110 transition-all duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const projects = [
  {
    title: 'Tarimfy',
    description: 'Plataforma de venda de cursos online com sistema de pagamentos integrado, gestão de conteúdo e análise de métricas.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    url: 'https://github.com/amorim013/tarimfy',
    demo: 'https://tarimfy.vercel.app'
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

export default App;