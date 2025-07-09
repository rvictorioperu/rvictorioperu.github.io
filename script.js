document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para la navegación de la barra lateral ---
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento de anclaje predeterminado

            // Elimina la clase 'active' de todos los enlaces
            sidebarLinks.forEach(item => item.classList.remove('active'));

            // Añade la clase 'active' al enlace clickeado
            this.classList.add('active');

            // Desplázate a la sección correspondiente
            const targetId = this.getAttribute('href').substring(1); // Obtiene el ID sin '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Lógica para el Cuestionario Interactivo ---
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        const questions = [
            {
                name: 'q1',
                correct: 'b',
                article: 'Artículo 4°'
            },
            {
                name: 'q2',
                correct: 'b',
                article: 'Artículo 5°'
            },
            {
                name: 'q3',
                correct: 'b',
                article: 'Artículo 14°'
            },
            {
                name: 'q4',
                correct: 'b',
                article: 'Artículo 20°'
            },
            {
                name: 'q5',
                correct: 'a', // La pregunta es "¿cuál NO es una función?", por lo que la opción incorrecta es la correcta aquí.
                article: 'Artículo 21°'
            },
            {
                name: 'q6',
                correct: 'a',
                article: 'Artículo 71°'
            },
            {
                name: 'q7',
                correct: 'b',
                article: 'Artículo 83°'
            }
        ];

        questions.forEach(qData => {
            const radioButtons = quizSection.querySelectorAll(`input[name="${qData.name}"]`);
            const feedbackParagraph = radioButtons[0].closest('.bg-gray-100').querySelector('p.mt-2');

            // Eliminar el feedback estático del HTML
            if (feedbackParagraph) {
                feedbackParagraph.remove();
            }

            radioButtons.forEach(radio => {
                // Habilitar los radio buttons
                radio.disabled = false;

                radio.addEventListener('change', function() {
                    let currentFeedback = this.closest('.bg-gray-100').querySelector('.quiz-feedback');
                    if (!currentFeedback) {
                        currentFeedback = document.createElement('p');
                        currentFeedback.classList.add('mt-2', 'quiz-feedback');
                        this.closest('.bg-gray-100').appendChild(currentFeedback);
                    }

                    if (this.value === qData.correct) {
                        currentFeedback.classList.remove('text-red-600');
                        currentFeedback.classList.add('text-green-600');
                        currentFeedback.textContent = `¡Correcto! (Ver ${qData.article})`;
                    } else {
                        currentFeedback.classList.remove('text-green-600');
                        currentFeedback.classList.add('text-red-600');
                        currentFeedback.textContent = `Incorrecto. La respuesta correcta es la ${qData.correct}. (Ver ${qData.article})`;
                    }
                });
            });
        });
    }

    // --- Lógica para la Búsqueda en la Ley ---
    const searchSection = document.getElementById('busqueda');
    if (searchSection) {
        const searchInput = searchSection.querySelector('input[type="text"]');
        const searchButton = searchSection.querySelector('button');
        const searchResultsContainer = searchSection.querySelector('.mt-6');
        const staticNote = searchSection.querySelector('p.text-red-600');

        // Eliminar la nota estática y habilitar los elementos de búsqueda
        if (staticNote) {
            staticNote.remove();
        }
        if (searchInput) {
            searchInput.disabled = false;
        }
        if (searchButton) {
            searchButton.disabled = false;
        }

        // Contenido de las secciones para la búsqueda (excluyendo quiz y búsqueda misma)
        const sectionsContent = {
            introduccion: {
                title: 'Introducción y Fundamentos de la Ley General de Educación N° 28044',
                text: `La Ley General de Educación N° 28044 es el marco legal fundamental que rige el sistema educativo peruano. Promulgada en 2003, establece los lineamientos generales, las atribuciones del Estado, y los derechos y responsabilidades de las personas y la sociedad en su función educadora.
                Artículo 1°: Objeto y ámbito de aplicación. Esta ley tiene por objeto establecer los lineamientos generales de la educación y del Sistema Educativo Peruano, las atribuciones y obligaciones del Estado y los derechos y responsabilidades de las personas y la sociedad en su función educadora. Rige todas las actividades educativas realizadas dentro del territorio nacional.
                Artículo 2°: Concepto de la educación. La educación es un proceso de aprendizaje y enseñanza que se desarrolla a lo largo de toda la vida y que contribuye a la formación integral de las personas, al pleno desarrollo de sus potencialidades, a la creación de cultura, y al desarrollo de la familia y de la comunidad nacional, latinoamericana y mundial. Se desarrolla en instituciones educativas y en diferentes ámbitos de la sociedad.
                Artículo 3°: La educación como derecho. La educación es un derecho fundamental de la persona y de la sociedad. El Estado garantiza el ejercicio del derecho a una educación integral y de calidad para todos y la universalización de la Educación Básica.
                Artículo 4°: Gratuidad de la educación. La educación es un servicio público; cuando lo provee el Estado es gratuita en todos sus niveles y modalidades. En Educación Inicial y Primaria se complementa con programas de alimentación, salud y materiales educativos.
                Artículo 5°: Libertad de enseñanza. La libertad de enseñanza es reconocida y garantizada por el Estado. Los padres tienen el deber de educar a sus hijos y el derecho a elegir las instituciones. Toda persona natural o jurídica tiene derecho a constituir y conducir centros educativos.
                Artículo 6°: Formación ética y cívica. La formación ética y cívica es obligatoria en todo proceso educativo, preparando a los educandos para sus obligaciones y derechos ciudadanos. La enseñanza de la Constitución Política y derechos humanos es obligatoria.
                Artículo 7°: Proyecto Educativo Nacional. Es el conjunto de políticas que dan el marco estratégico al desarrollo de la educación, construido y desarrollado en conjunto por el Estado y la sociedad a través del diálogo y consenso.`
            },
            principios_fines: {
                title: 'Principios y Fines de la Educación Peruana',
                text: `La educación peruana se sustenta en principios clave y persigue fines esenciales para el desarrollo integral de las personas y la sociedad.
                Artículo 8°: Principios de la educación. Ética: Promueve valores de paz, solidaridad, justicia, libertad, honestidad, tolerancia, responsabilidad, trabajo, verdad y respeto a las normas. Equidad: Garantiza iguales oportunidades de acceso, permanencia y trato en un sistema educativo de calidad. Inclusión: Incorpora a personas con discapacidad, grupos excluidos y vulnerables. Calidad: Asegura condiciones adecuadas para una educación integral, pertinente, abierta, flexible y permanente. Democracia: Promueve el respeto a los derechos humanos, libertad de conciencia, pensamiento y opinión, y el ejercicio pleno de la ciudadanía. Interculturalidad: Asume la diversidad cultural, étnica y lingüística como riqueza. Conciencia ambiental: Motiva el respeto, cuidado y conservación del entorno natural. Creatividad e innovación: Promueven la producción de nuevos conocimientos.
                Artículo 9°: Fines de la educación peruana. Formar personas capaces de lograr su realización ética, intelectual, artística, cultural, afectiva, física, espiritual y religiosa, promoviendo su identidad y autoestima. Contribuir a formar una sociedad democrática, solidaria, justa, inclusiva, próspera, tolerante y forjadora de una cultura de paz.`
            },
            universalizacion_calidad_equidad: {
                title: 'Universalización, Calidad y Equidad de la Educación',
                text: `La ley busca asegurar que la educación sea accesible para todos, de alta calidad y equitativa, eliminando barreras y promoviendo la igualdad de oportunidades.
                Artículo 10°: Criterios para la universalización, la calidad y la equidad. Se adopta un enfoque intercultural y se realiza una acción descentralizada, intersectorial, preventiva, compensatoria y de recuperación para igualar oportunidades y lograr resultados satisfactorios.
                Artículo 11°: Articulación intersectorial. La articulación intersectorial en el Estado y con el sector privado se da en todos los ámbitos de la gestión descentralizada, con activa participación de la comunidad educativa.
                Artículo 12°: Universalización de la Educación Básica. La educación es obligatoria para los estudiantes de los niveles de inicial, primaria y secundaria. El Estado provee los servicios públicos necesarios para lograr este objetivo.
                Artículo 13°: Calidad de la educación. Es el nivel óptimo de formación que deben alcanzar las personas para enfrentar los retos del desarrollo humano. Factores clave incluyen currículos básicos, inversión mínima por alumno, formación docente, infraestructura adecuada e investigación educativa.
                Artículo 17° y 18°: Equidad en la educación y Medidas de equidad. El Estado toma medidas para compensar las desigualdades derivadas de factores económicos, geográficos o sociales, favoreciendo a segmentos sociales en situación de abandono o riesgo. Esto incluye políticas compensatorias, asignación prioritaria de recursos, programas inclusivos y sistemas de becas.`
            },
            evaluacion_certificacion: {
                title: 'Evaluación y Certificación de la Calidad Educativa',
                text: `El Estado garantiza un sistema de evaluación, acreditación y certificación para asegurar la calidad educativa en todo el país.
                Artículo 14°: Sistema Nacional de Evaluación, Acreditación y Certificación de la Calidad Educativa. El Estado garantiza el funcionamiento de un Sistema Nacional de Evaluación, Acreditación y Certificación de la Calidad Educativa, que abarca todo el territorio nacional y responde con flexibilidad a las características de cada región.
                Artículo 15°: Organismos del Sistema Nacional de Evaluación, Acreditación y Certificación. En Educación Básica, el Instituto Peruano de Evaluación, Acreditación y Certificación Educativa. En Educación Superior, un organismo creado por ley específica.
                Artículo 16°: Funciones de los Órganos del Sistema Nacional de Evaluación, Acreditación y Certificación. Promueven una cultura de calidad. Evalúan la calidad del aprendizaje y procesos pedagógicos. Acreditan periódicamente las instituciones educativas. Certifican y recertifican competencias profesionales. Difunden resultados y desarrollan programas de formación especializada.`
            },
            educacion_intercultural_bilingue: {
                title: 'Educación Intercultural Bilingüe',
                text: `La ley reconoce y garantiza el derecho de los pueblos indígenas a una educación en condiciones de igualdad, promoviendo la diversidad cultural y lingüística.
                Artículo 19°: Educación de los pueblos indígenas. El Estado reconoce y garantiza el derecho de los pueblos indígenas a una educación en condiciones de igualdad, estableciendo programas especiales que garanticen igualdad de oportunidades y equidad de género.
                Artículo 20°: Educación Bilingüe Intercultural. Promueve la valoración y enriquecimiento de la propia cultura, respeto a la diversidad cultural y diálogo intercultural. Garantiza el aprendizaje en la lengua materna de los educandos y del castellano como segunda lengua. Determina la obligación de los docentes de dominar la lengua originaria y el castellano.`
            },
            roles_estado_sociedad: {
                title: 'Roles del Estado y la Sociedad en la Educación',
                text: `La educación es una responsabilidad compartida entre el Estado y la sociedad, cada uno con funciones específicas para asegurar su calidad y equidad.
                Artículo 21°: Función del Estado. Ejercer un rol normativo, promotor, compensador, concertador, articulador, garante, planificador, regulador y financiador. Proveer y administrar servicios educativos públicos gratuitos y de calidad. Promover el desarrollo científico y tecnológico, reconocer la innovación e investigación.
                Artículo 22°: Función de la sociedad. Tiene el derecho y el deber de contribuir a la calidad y equidad de la educación, participando en la definición de políticas educativas y colaborando en la prestación del servicio.
                Artículo 23°: Medios de comunicación. Deben contribuir a la formación ética, cívica, cultural y democrática de la población, difundiendo contenidos que respeten a la persona humana y su dignidad.
                Artículo 24°: Empresas. Contribuyen al desarrollo de la educación nacional, participando en el diseño de políticas, promoviendo alianzas estratégicas con instituciones educativas y brindando facilidades a su personal para la educación.`
            },
            estructura_sistema: {
                title: 'Estructura General del Sistema Educativo Peruano',
                text: `El Sistema Educativo Peruano es integrador y flexible, organizado en etapas, niveles, modalidades, ciclos y programas para atender las diversas necesidades de aprendizaje.
                Artículo 25°: Características del Sistema Educativo. Es integrador y flexible, abarcando y articulando todos sus elementos y permitiendo a los usuarios organizar su trayectoria educativa. Se adecua a las necesidades y exigencias de la diversidad del país.
                Artículo 26°: Articulación y coordinación del Sistema Educativo. Articula sus componentes para que toda persona tenga oportunidad de alcanzar un mayor nivel de aprendizaje, manteniendo relaciones funcionales con entidades del Estado, sociedad, empresa y medios de comunicación.
                Artículo 27°: La Educación a Distancia. Modalidad caracterizada por la interacción simultánea o diferida entre actores educativos, facilitada por medios tecnológicos que propician el aprendizaje autónomo. Aplicable a todas las etapas.
                Artículo 28°: Las Etapas, Niveles, Modalidades, Ciclos y Programas. Define cómo se organiza el sistema educativo: Etapas (periodos progresivos), Niveles (periodos graduales), Modalidad (alternativas de atención según características), Ciclos (procesos educativos por logros), Programas (conjuntos de acciones educativas).
                Artículo 29°: Etapas del Sistema Educativo. Educación Básica: Destinada a favorecer el desarrollo integral del estudiante, el despliegue de sus potencialidades y el desarrollo de capacidades, conocimientos, actitudes y valores fundamentales. Educación Superior: Destinada a la investigación, creación y difusión de conocimientos; a la proyección a la comunidad; al logro de competencias profesionales de alto nivel.
                Artículo 30°: Evaluación del alumno. Es un proceso permanente de comunicación y reflexión sobre los procesos y resultados del aprendizaje. Es formativa e integral, orientada a mejorar esos procesos y ajustarse a las necesidades de los estudiantes.`
            },
            niveles_modalidades_basica: {
                title: 'Niveles y Modalidades de la Educación Básica',
                text: `La Educación Básica es obligatoria y se organiza en diferentes modalidades para satisfacer las necesidades de aprendizaje de niños, jóvenes y adultos.
                Artículo 31°: Objetivos de la Educación Básica. Formar integralmente al educando en aspectos físico, afectivo y cognitivo para su identidad personal y social. Desarrollar capacidades, valores y actitudes para el aprendizaje a lo largo de toda la vida. Desarrollar aprendizajes en ciencias, humanidades, técnica, cultura, arte, educación física y nuevas tecnologías.
                Artículo 32°: Organización de la Educación Básica. Se organiza en Educación Básica Regular, Educación Básica Alternativa y Educación Básica Especial.
                Artículo 33° y 34°: Currículo de la Educación Básica y sus Características. Es abierto, flexible, integrador y diversificado, sustentado en los principios y fines de la educación peruana. El Ministerio de Educación diseña los currículos básicos nacionales, que se diversifican regional y localmente.
                Artículo 35°: Culminación de la Educación Básica. Da derecho al diploma de egresado con mención en un área técnica, habilitando para el mercado laboral y acceso a nivel superior.
                Artículo 36°: Educación Básica Regular. Abarca Educación Inicial (0-5 años), Primaria (6 años) y Secundaria (5 años), dirigida a niños y adolescentes según su evolución física, afectiva y cognitiva.
                Artículo 37° y 38°: Educación Básica Alternativa y Alfabetización. Dirigida a jóvenes y adultos que no accedieron o no culminaron la educación regular, o que necesitan compatibilizar estudio y trabajo. La alfabetización está comprendida en esta modalidad.
                Artículo 39°: Educación Básica Especial. Con enfoque inclusivo, atiende a personas con necesidades educativas especiales (discapacidad o superdotados) buscando su integración en aulas regulares.`
            },
            educacion_tecnico_comunitaria_superior: {
                title: 'Educación Técnico-Productiva, Comunitaria y Superior',
                text: `Más allá de la educación básica, el sistema peruano ofrece modalidades especializadas para el desarrollo laboral, comunitario y profesional.
                Artículo 40°: Definición y finalidad de la Educación Técnico-Productiva. Orientada a la adquisición de competencias laborales y empresariales, contribuyendo a un mejor desempeño laboral y desarrollo personal.
                Artículo 41° al 45°: Objetivos, Organización, Políticas y Centros de la ETP. Busca desarrollar competencias para el trabajo dependiente o independiente, motivar la aplicación de conocimientos y actualizar a trabajadores. Se organiza en ciclos (Básico y Medio) y los Centros de ETP ofrecen servicios educativos y capacitación.
                Artículo 46° al 48°: Educación Comunitaria. Se desarrolla desde las organizaciones de la sociedad, orientada al enriquecimiento de capacidades personales y promoción del desarrollo humano. Sus aprendizajes pueden ser convalidados en otros niveles.
                Artículo 49° al 51°: Educación Superior. Es la segunda etapa del Sistema Educativo, consolida la formación integral, produce conocimiento, desarrolla investigación y forma profesionales de alto nivel. Requiere haber concluido la Educación Básica y se imparte en instituciones universitarias, institutos y escuelas superiores.`
            },
            comunidad_educativa: {
                title: 'Actores de la Comunidad Educativa: Roles y Responsabilidades',
                text: `La comunidad educativa es un pilar fundamental del sistema, con roles y responsabilidades definidos para cada uno de sus miembros.
                Artículo 52°: Conformación y participación. La comunidad educativa está conformada por estudiantes, padres de familia, profesores, directivos, administrativos, ex alumnos y miembros de la comunidad local. Participan en la formulación y ejecución del Proyecto Educativo Institucional.
                Artículo 53°: El estudiante. Es el centro del proceso educativo. Tiene derecho a un sistema eficiente, buen trato y orientación, y la responsabilidad de asumir su aprendizaje, practicar la tolerancia y participar en la institución.
                Artículo 54°: La familia. Núcleo fundamental de la sociedad, responsable de la educación integral de los hijos. Deben educar con respeto, informarse sobre la calidad del servicio educativo, participar y colaborar en el proceso.
                Artículo 55°: El Director. Máxima autoridad y el representante legal de la Institución Educativa. Responsable de la gestión en los ámbitos pedagógico, institucional y administrativo.
                Artículo 56° al 61°: El Profesor y la Carrera Pública Magisterial. Agente fundamental del proceso educativo, con misión de contribuir eficazmente en la formación de los estudiantes. La carrera pública docente se rige por criterios de formación, idoneidad, desempeño y méritos. Se requiere título pedagógico para la docencia en Educación Básica.
                Artículo 62°: Personal administrativo. Coopera para la creación de un ambiente favorable para el aprendizaje, desempeñándose en funciones de apoyo a la gestión educativa.`
            },
            gestion_sistema: {
                title: 'Gestión Descentralizada del Sistema Educativo',
                text: `La gestión del sistema educativo nacional es descentralizada, simplificada, participativa y flexible, buscando la autonomía pedagógica y de gestión.
                Artículo 63°: Definición de la gestión. La gestión del sistema educativo nacional es descentralizada, simplificada, participativa y flexible. Se ejecuta en un marco de respeto a la autonomía pedagógica y de gestión que favorezca la acción educativa.
                Artículo 64°: Objetivos de la gestión. Contribuir a desarrollar la Institución Educativa como comunidad de aprendizaje, fortalecer su capacidad de decisión, asegurar la coherencia administrativa, lograr manejo eficaz, desarrollar liderazgos democráticos, etc.
                Artículo 65°: Instancias de gestión. La Institución Educativa. La Unidad de Gestión Educativa Local (UGEL). La Dirección Regional de Educación (DRE). El Ministerio de Educación (MINEDU).`
            },
            instancias_gestion: {
                title: 'Instancias de Gestión Educativa: IE, UGEL, DRE, MINEDU y CNE',
                text: `El sistema educativo peruano se organiza a través de diversas instancias de gestión, cada una con roles y funciones específicas para asegurar la implementación de la política educativa.
                Artículo 66° al 72°: La Institución Educativa (IE). Es la primera y principal instancia de gestión, donde tiene lugar la prestación del servicio. Elabora su Proyecto Educativo Institucional, organiza su gestión, diversifica el currículo y rinde cuentas. Puede ser pública (gestión directa o privada por convenio) o privada.
                Artículo 73° al 75°: La Unidad de Gestión Educativa Local (UGEL). Instancia de ejecución descentralizada del Gobierno Regional. Fortalece capacidades de gestión de las IE, impulsa la cohesión social, diseña y evalúa el Proyecto Educativo Local, y conduce procesos de personal docente y administrativo.
                Artículo 76° al 78°: La Dirección Regional de Educación (DRE). Órgano especializado del Gobierno Regional. Promueve educación, cultura, deporte, ciencia y tecnología. Autoriza el funcionamiento de IE, formula el presupuesto educativo regional y gestiona financiamiento.
                Artículo 79° y 80°: El Ministerio de Educación (MINEDU). Órgano del Gobierno Nacional que define, dirige y articula la política de educación, cultura, recreación y deporte. Elabora diseños curriculares básicos, dirige programas nacionales y lidera el incremento de la inversión educativa.
                Artículo 81°: El Consejo Nacional de Educación (CNE). Órgano especializado, consultivo y autónomo del Ministerio de Educación. Participa en la formulación, concertación, seguimiento y evaluación del Proyecto Educativo Nacional y políticas educativas de mediano y largo plazo.
                Artículo 82°: Coordinación con los Gobiernos Locales. El MINEDU, DRE y UGEL coordinan con las municipalidades para apoyar la prestación de servicios de las IE y contribuir al desarrollo educativo en su jurisdicción.`
            },
            financiamiento: {
                title: 'Financiamiento de la Educación Pública',
                text: `El financiamiento es crucial para garantizar la calidad y equidad de la educación pública en el Perú.
                Artículo 83°: Financiamiento de la educación. El financiamiento de la educación comprende los recursos financieros destinados a satisfacer las necesidades educativas de la población. Anualmente, el Estado destina no menos del 6% del Producto Bruto Interno a la educación estatal.
                Artículo 84°: Fuentes de financiamiento. Tesoro Público, recursos directamente recaudados, donaciones, excedentes por actividades productivas, endeudamiento interno y externo.
                Artículo 85° al 90°: Asignación, Ingresos Propios, Transferencia, Regulación Tributaria y Eficiencia del Gasto. La asignación se basa en objetivos y metas, incluyendo estudios de costos por alumno. Los ingresos propios de las IE se destinan a proyectos de inversión. Las donaciones gozan de exoneración tributaria. La evaluación del gasto busca transparencia y eficiencia.
                Artículo 91°: El Fondo Nacional de Desarrollo de la Educación Peruana (FONDEP). Apoya el financiamiento de proyectos de inversión, innovación y desarrollo educativo.
                Artículo 92°: Convenios con asociaciones sin fines de lucro. El Estado puede establecer convenios con asociaciones sin fines de lucro que conducen instituciones de educación pública para apoyar a la población desfavorecida.`
            },
            disposiciones_complementarias_finales: {
                title: 'Disposiciones Complementarias y Finales',
                text: `Estas disposiciones establecen la implementación gradual de la ley, la derogación de normativas anteriores y otros aspectos transitorios.
                Disposición Primera (Complementaria): Aplicación gradual. La aplicación de la Ley General de Educación será gradual y progresiva, de acuerdo con el plan general de conversión del sistema educativo que formulará el Ministerio de Educación.
                Disposición Tercera (Complementaria): Incremento presupuestal. El incremento del presupuesto destinado a educación, de conformidad con el artículo 83°, se realizará progresivamente. El financiamiento será considerado inversión intangible.
                Disposición Séptima (Complementaria): Creación del Instituto Peruano de Evaluación. El Poder Ejecutivo presentará el proyecto de ley de creación del Instituto Peruano de Evaluación, Acreditación y Certificación Educativa para la Educación Básica.
                Disposición Octava (Complementaria): Creación del FONDEP. Créase el Fondo Nacional de Desarrollo de la Educación Peruana (FONDEP) como Programa Presupuestal del Ministerio de Educación, constituido por recursos asignados, ingresos propios, donaciones, etc.
                Disposición Primera (Final): Derogación de la Ley N° 23384. Derógase la Ley N° 23384, Ley General de Educación, y sus modificatorias y complementarias; así como los demás dispositivos que se opongan a la presente Ley.
                Disposición Segunda (Final): Reglamentación. El Ministerio de Educación reglamentará la presente ley en un plazo de ciento veinte días.`
            }
        };

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            searchResultsContainer.innerHTML = ''; // Limpiar resultados anteriores

            if (!searchTerm) {
                searchResultsContainer.innerHTML = '<p class="mt-4 text-gray-600">Por favor, introduce un término de búsqueda.</p>';
                return;
            }

            let foundResults = [];

            for (const key in sectionsContent) {
                const section = sectionsContent[key];
                const sectionTitle = section.title;
                const sectionText = section.text.toLowerCase();

                // Buscar en el título de la sección
                if (sectionTitle.toLowerCase().includes(searchTerm)) {
                    foundResults.push({
                        sectionTitle: sectionTitle,
                        snippet: `El término se encuentra en el título de la sección.`
                    });
                }

                // Buscar en el contenido de la sección
                let startIndex = sectionText.indexOf(searchTerm);
                while (startIndex !== -1) {
                    const start = Math.max(0, startIndex - 50);
                    const end = Math.min(sectionText.length, startIndex + searchTerm.length + 50);
                    let snippet = section.text.substring(start, end); // Usar el texto original para el snippet
                    snippet = snippet.replace(new RegExp(searchTerm, 'gi'), (match) => `<mark>${match}</mark>`);
                    foundResults.push({
                        sectionTitle: sectionTitle,
                        snippet: `...${snippet}...`
                    });
                    startIndex = sectionText.indexOf(searchTerm, startIndex + 1);
                }
            }

            if (foundResults.length > 0) {
                const resultsList = document.createElement('ul');
                resultsList.classList.add('list-disc', 'list-inside', 'space-y-2');
                foundResults.forEach(result => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('bg-gray-50', 'p-3', 'rounded-lg', 'shadow-sm');
                    listItem.innerHTML = `<span class="font-medium text-blue-700">${result.sectionTitle}:</span> ${result.snippet}`;
                    resultsList.appendChild(listItem);
                });
                searchResultsContainer.appendChild(document.createElement('h3')).outerHTML = '<h3 class="font-semibold text-xl mb-3">Resultados de la búsqueda:</h3>';
                searchResultsContainer.appendChild(resultsList);
            } else {
                searchResultsContainer.innerHTML = `<p class="mt-4 text-gray-600">No se encontraron resultados para "${searchInput.value}".</p>`;
            }
        });
    }
});

