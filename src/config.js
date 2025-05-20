// GitHub Projects Showcase Configuration
export default {
  // Organization & Theme
  organization: "AI4REALNET", // GitHub organization name
  title: "Open Source Software", // Page title
  logo: "/logo.svg", // Path to your logo (place in public folder)
  
  // Theme colors (Tailwind CSS classes or hex values)
  colors: {
    primary: "#C01F5C", // Primary color - dark blue
    secondary: "#3A2A72", // Secondary color - light blue
    accent: "#009DE0", // Accent color - medium blue
    text: "#333333", // Main text color
    background: "#ffffff", // Background color
  },

  // Categories to show (these will appear as tabs)
  categories: [
    { id: "all", label: "All" }
  ],

  // GitHub token environment variable name
  githubTokenEnvName: "GH_TOKEN",
  
  // Data refresh settings
  dataRefreshInterval: 86400, // Time in seconds (default: 24 hours)

  // Projects input data - this is what users would customize
  projects: [
    {
      "project_name": "Flatland",
      "project_topic": "flatland",
      "project_area": "Energy",
      "project_description": "Advanced energy management systems for smart grids and renewable energy integration.",
      "project_url": "https://example.com/energy-management",
      "project_website": "https://energy.inesctec.pt"
    },
    {
      "project_name": "Grid2Op",
      "project_topic": "grid2op",
      "project_area": "Artificial Intelligence",
      "project_description": "Cutting-edge machine learning research and applications for industrial use cases.",
      "project_url": "https://example.com/ml-research",
      "project_website": "https://ai.inesctec.pt"
    },
    {
      "project_name": "BlueSky",
      "project_topic": "bluesky",
      "project_area": "Internet of Things",
      "project_description": "Advanced sensor networks for IoT applications and smart environments.",
      "project_url": "https://example.com/iot-sensors",
      "project_website": "https://ai.inesctec.pt"
    },
    {
      "project_name": "Interactive AI",
      "project_topic": "interactive-ai",
      "project_area": "Robotics",
      "project_description": "Research on autonomous robotic systems for industry and healthcare.",
      "project_url": "https://example.com/robotics",
      "project_website": "https://robotics.inesctec.pt"
    }
  ]
}