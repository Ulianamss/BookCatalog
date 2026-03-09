BOOK CATALOG APPLICATION


TASK (https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)

Overview

This project implements a web application for searching books from the Open Library API and managing a list of favorite books.

Application Features

- Search for books by title, author, or keyword
- Display search results as cards with book information
- Add and remove books from favorites
- Save favorites to localStorage for persistent storage
- Filter search results by author
- Toggle between dark and light theme modes
- Perform live search with debounce optimization

Technical Requirements

The application is built with JavaScript ES6+, HTML5, and CSS3 without any frameworks or third-party libraries. The project uses Vite as the build tool to bundle multiple source files into optimized production files.


HOW TO RUN THE APP

Prerequisites

Node.js version 14 or higher
npm (comes with Node.js)

Installation

Navigate to the project directory and run:

    npm install

This installs all dependencies needed to run the application.

Development Mode

Start the development server with:

    npm run dev

The application automatically opens at http://localhost:3000. Changes to files reload instantly without manual browser refresh.

Production Build

Create an optimized production build with:

    npm run build

This creates a dist folder containing bundled HTML, JavaScript, and CSS files ready for deployment. The files are minified and optimized for performance.

Preview Build

Preview the production build locally with:

    npm run preview

This shows what the application looks like in production mode before deploying.

Available Commands

npm install   Install project dependencies
npm run dev   Start development server with hot reload
npm run build Create optimized production build
npm run preview Preview production build locally


PROJECT STRUCTURE


Directory Layout

book-catalog/
    public/
    src/
    index.html
    package.json
    vite.config.js
    README.md

Folder Descriptions

public/
    Purpose: Static assets
    File Types: Images, SVG icons
    Description: Contains static files that are copied to the final build without processing

public/assets/
    Purpose: Application icons and images
    File Types: SVG files
    Description: Stores reusable icons like the heart icon for the favorites button

src/
    Purpose: Source code
    File Types: JavaScript modules, CSS stylesheets
    Description: Contains all application code organized into subdirectories

src/api/
    Purpose: External API communication
    File Types: JavaScript functions
    Description: Handles requests to Open Library API for searching books

src/components/
    Purpose: Reusable UI components
    File Types: JavaScript component factories
    Description: Contains the bookCard component for rendering individual book cards

src/modules/
    Purpose: Core application features
    File Types: JavaScript modules
    Description: Contains separate modules for search, display, favorites, filter, and theme functionality

src/storage/
    Purpose: Data persistence
    File Types: JavaScript functions
    Description: Manages localStorage operations for saving and retrieving favorites and theme settings

src/utils/
    Purpose: Utility functions
    File Types: JavaScript helper functions
    Description: Contains shared helper functions like debounce for search optimization

src/styles/
    Purpose: Application styling
    File Types: CSS stylesheets
    Description: Contains all CSS with support for light and dark themes

dist/
    Purpose: Production build output
    File Types: HTML, JavaScript, CSS (minified and bundled)
    Description: Created by npm run build. Contains the final optimized files for deployment

Configuration Files

index.html
    Main HTML entry point for the application

package.json
    Project metadata, dependencies, and npm script definitions

vite.config.js
    Configuration file for the Vite build tool

.gitignore
    Specifies which files and directories Git should ignore

README.md
    Project documentation
