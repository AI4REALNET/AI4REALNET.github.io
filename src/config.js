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

}