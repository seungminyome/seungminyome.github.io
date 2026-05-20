// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Two manuscripts in preparation — proppant embedment mechanics (Computers and Geotechnics) and hydroelastic wave dispersion (Journal of Fluids and Structures).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "FSI research across scales — from proppant grains in shale to elastic films on water to ship hull vortex dynamics.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "M.S. student in Energy &amp; Petroleum Engineering at the University of Wyoming. Research in computational mechanics, OpenFOAM/solids4Foam simulations, and subsurface energy systems.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-openfoam-as-a-physics-engine-a-research-agenda-for-neural-operator-accelerated-solid-fluid-simulation",
        
          title: "OpenFOAM as a Physics Engine: A Research Agenda for Neural Operator–Accelerated Solid–Fluid Simulation...",
        
        description: "A forward-looking research agenda connecting my solids4Foam simulation work to neural operators, physics-informed learning, and data-driven constitutive modeling — and why this is the right next problem to solve.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/openfoam-ml-research-agenda/";
          
        },
      },{id: "post-literature-review-uw-2-the-prescribed-permeability-problem-four-papers-one-bottleneck",
        
          title: "[Literature Review · UW #2] The Prescribed-Permeability Problem: Four Papers, One Bottleneck",
        
        description: "A review of four recent papers on coupled flow–deformation in porous media — Dai et al. (2026), Wang et al. (2022), Ou et al. (2025), and Hilliard et al. (2024). Each paper attacks the same bottleneck from a different scale.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/deformable-porous-media-review/";
          
        },
      },{id: "post-research-portfolio-six-projects-one-question",
        
          title: "Research Portfolio: Six Projects, One Question",
        
        description: "A visual summary of six projects across naval architecture, fluid mechanics, and petroleum engineering — five research projects and one CFD validation benchmark that taught me how to read a simulation.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/research-portfolio/";
          
        },
      },{id: "post-literature-review-uw-1-from-biot-to-openfoam-a-genealogy-of-consolidation-induced-solute-transport",
        
          title: "[Literature Review · UW #1] From Biot to OpenFOAM: A Genealogy of Consolidation-Induced...",
        
        description: "A paper review tracing how 80 years of porous media theory — from Biot (1941) to Wang &amp; Jeng (2024) — was assembled into a 3D OpenFOAM solver. Includes a synthesis table, parametric findings, and my own extension ideas.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/consolidation-solute-transport-review/";
          
        },
      },{id: "post-literature-review-kaist-2-vorticity-at-deforming-interfaces-free-surfaces-two-fluid-flows-and-froude-number-effects",
        
          title: "[Literature Review · KAIST #2] Vorticity at Deforming Interfaces: Free Surfaces, Two-Fluid Flows,...",
        
        description: "A review of vorticity generation at moving and deforming interfaces — two-fluid Couette and Taylor-Couette flows, free surface vs. viscous interface comparison, Lamb vortex pairs, and Froude number control of the vorticity distribution. Prepared for the KAIST Waves &amp; Fluid Mechanics Lab meeting.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/vorticity-deforming-interfaces-review/";
          
        },
      },{id: "post-literature-review-kaist-1-vorticity-generation-and-conservation-at-two-dimensional-boundaries",
        
          title: "[Literature Review · KAIST #1] Vorticity Generation and Conservation at Two-Dimensional Boundaries",
        
        description: "A review of vorticity dynamics at rigid walls — how Stokes&#39; theorem, boundary conditions, and Poiseuille/rotating-cylinder flows build the physical intuition for vorticity generation and diffusion. Prepared for the KAIST Waves &amp; Fluid Mechanics Lab meeting.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/vorticity-boundaries-review/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-proppant-embedment-and-fracture-conductivity",
          title: 'Proppant Embedment and Fracture Conductivity',
          description: "Coupled solid–fluid simulation of proppant-rock contact mechanics using solids4Foam (UW, current)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_proppant/";
            },},{id: "projects-gravity-capillary-waves-on-an-elastic-film",
          title: 'Gravity–Capillary Waves on an Elastic Film',
          description: "Dispersion relation for a 3-phase gas–solid–liquid interface under air-jet loading (KAIST)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_elastic_film/";
            },},{id: "projects-2d-ventilated-supercavitation-near-a-free-surface",
          title: '2D Ventilated Supercavitation Near a Free Surface',
          description: "Analytical cavity model with wake-theory correction for free-surface asymmetry (KAIST)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_supercavitation/";
            },},{id: "projects-vortex-wave-interaction-near-a-free-surface",
          title: 'Vortex–Wave Interaction Near a Free Surface',
          description: "CFD analysis of vortex–wave interaction and free-surface-induced asymmetry for a cylinder (KAIST)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_vortex_wave/";
            },},{id: "projects-ship-structural-defect-detection-via-lstm-autoencoder",
          title: 'Ship Structural Defect Detection via LSTM Autoencoder',
          description: "99.49% accuracy anomaly detection from vibration/acoustic sensor data (PNU + Samsung HI)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_ship_defect/";
            },},{id: "projects-kcs-hull-resistance-and-wave-pattern-analysis",
          title: 'KCS Hull Resistance and Wave Pattern Analysis',
          description: "RANS CFD validation against the 2010 Gothenburg Workshop benchmark — 1.16% error in total resistance (PNU, undergraduate)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_kcs_resistance/";
            },},{id: "projects-mau-propeller-design-for-a-container-ship",
          title: 'MAU Propeller Design for a Container Ship',
          description: "Full propeller design pipeline — Bp-δ chart, MOPTI optimization, KPA4 detailed design, tip unloading, KR strength evaluation (PNU, undergraduate)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_propeller/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%79%6F%6D%65@%75%77%79%6F.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/seungminyome", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
