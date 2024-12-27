module.exports = {
  apps: [
    {
      name: "GROCERY-FRONTEND",
      cwd: "./",
      script: "node_modules/react-scripts/scripts/start.js",
      args: "start",            
      watch: false,
			env_production: {
				NODE_ENV: "production",
			},
			env_development: {
				NODE_ENV: "development",
			},
			instances: 1,
			exec_mode: "cluster"
    }
  ]
};