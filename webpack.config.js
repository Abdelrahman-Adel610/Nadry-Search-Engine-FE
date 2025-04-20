const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map '@' to the 'src' directory
    },
    extensions: [".js", ".ts", ".tsx", ".json"], // Ensure file extensions are resolved
  },
};
