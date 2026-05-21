// .eleventy.js - Adding date filter, pathPrefix, and markdownify filter

const { DateTime } = require("luxon"); // <<< ADD THIS LINE to import Luxon
const markdownIt = require("markdown-it");

// Single export for the entire configuration
module.exports = function(eleventyConfig) {

    // --- Markdown Filter Setup ---
    const md = new markdownIt({
        html: true,
        breaks: true,
        linkify: true
    });

    // CORRECTED/ADDED MarkdowNIFY filter:
    // Changed name from "markdown" to "markdownify" to match your template
    // Changed md.renderInline(content) to md.render(content) for block-level markdown
    eleventyConfig.addNunjucksFilter("markdownify", function(content) {
        if (content === null || typeof content === "undefined") {
            return ""; // Handle null or undefined content
        }
        return md.render(String(content)); // Ensure content is a string and use render()
    });

    // === ADD THIS DATE FILTER ===
    eleventyConfig.addNunjucksFilter("date", (dateObj, format = "LLL dd, yyyy") => {
        // Default format example: Sep 04, 1986
        // Your template uses 'MMMM d, yyyy' e.g., September 4, 1986

        // Try to create a DateTime object from various possible input types
        let dt;
        if (dateObj instanceof Date) {
            dt = DateTime.fromJSDate(dateObj, { zone: 'utc' });
        } else if (typeof dateObj === 'string') {
            dt = DateTime.fromISO(dateObj, { zone: 'utc' }); // Try ISO format first
            if (!dt.isValid) {
                // Try common "Month Day, Year" format if ISO fails
                dt = DateTime.fromFormat(dateObj, "MMMM d, yyyy", { zone: 'utc' });
            }
            if (!dt.isValid) {
                // Add other common formats to try if necessary
                // For example, if you have dates like "YYYY-MM-DD"
                dt = DateTime.fromFormat(dateObj, "yyyy-MM-dd", { zone: 'utc' });
            }
        } else if (typeof dateObj === 'number') { // Assuming a timestamp
            dt = DateTime.fromMillis(dateObj, { zone: 'utc' });
        }


        if (dt && dt.isValid) {
            return dt.toFormat(format);
        }
        // If parsing fails or dateObj is not recognized, return original or a placeholder
        // console.warn(`Could not parse date: ${dateObj}`); // Optional: for debugging
        return dateObj; // Or return "N/A", or an empty string ""
    });
        
    eleventyConfig.addNunjucksFilter("jsonify", function (value) {
        return JSON.stringify(value);
    });
    // === END OF DATE FILTER ===

    // --- Passthrough Copy for Static Assets ---
    // Assumes assets are in /public/ folder copied to root of _site
    eleventyConfig.addPassthroughCopy({ "public/": "/" });
    // Add passthrough for the 'js' folder (assuming it's in the root of your project)
    eleventyConfig.addPassthroughCopy("js"); // <<< THIS IS THE NEW LINE

    eleventyConfig.addPassthroughCopy("src/css"); // Adjust path to your source CSS
    eleventyConfig.addPassthroughCopy("_includes\css");
    // --- Watch Targets for Development Server ---
    // Watch CSS inside public folder
    eleventyConfig.addWatchTarget("./public/css/");
    // eleventyConfig.addWatchTarget("./public/img/"); // Optional
    eleventyConfig.addWatchTarget("./js/"); // <<< ADD THIS TO WATCH YOUR JS FOLDER FOR CHANGES

    eleventyConfig.addWatchTarget("./src/css/");

    // --- Define pathPrefix based on environment ---
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    // ▼▼▼ ENSURE THIS IS YOUR CORRECT PRODUCTION SUBDIRECTORY ▼▼▼
    const pathPrefix = isProduction ? "/aualliso/qpt5/" : "/";
    // ▲▲▲ ENSURE THIS IS YOUR CORRECT PRODUCTION SUBDIRECTORY ▲▲▲

    // --- Return Configuration Object ---
    return {
        // --- Add pathPrefix here ---
        pathPrefix: pathPrefix,

        // Keep existing dir and other settings:
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
        // dataTemplateEngine: "njk", // Consider adding this if you use Nunjucks in .11tydata.js or .json.njk files
    };
}; // End module.exports