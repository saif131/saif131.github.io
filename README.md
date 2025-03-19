# Data Analyst Portfolio

A modern, responsive portfolio website designed specifically for data analysts to showcase their skills, projects, and professional information.

## Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean and professional design with smooth animations
- **Project Showcase**: Dedicated section to highlight your data analysis projects
- **Skills Display**: Organized presentation of technical and soft skills
- **Contact Form**: Interactive form for potential employers or clients to reach out
- **Social Media Integration**: Easy links to your professional profiles

## Getting Started

### Prerequisites

- A web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)
- A code editor (VS Code, Sublime Text, etc.)

### Installation

1. Clone or download this repository
2. Open the `index.html` file in your web browser to view the portfolio
3. Customize the content to match your personal information and projects

## Customization Guide

### Personal Information

Edit the `index.html` file to update:

- Your name (replace "Your Name" in the header section)
- Your professional title (if different from "Data Analyst")
- About Me section with your personal bio
- Your location and contact information
- Social media links (GitHub, LinkedIn, etc.)

### Profile Picture

1. Replace the placeholder image in the About section:
   ```html
   <img src="https://via.placeholder.com/300" alt="Profile Picture">
   ```
   Replace with your own image path:
   ```html
   <img src="path/to/your/image.jpg" alt="Your Name">
   ```

### Projects

For each project in the Projects section:

1. Update the project title
2. Write a description of the project
3. Update the technologies/tools used (tags)
4. Add links to the project demo or GitHub repository
5. Replace the placeholder images with screenshots of your projects

### Skills

Modify the skills lists in each category to accurately reflect your expertise:

- Data Analysis skills
- Tools & Technologies you're proficient in
- Visualization tools you use
- Relevant soft skills

### Colors and Styling

To change the color scheme, edit the CSS variables in the `styles.css` file:

```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #3a0ca3;
    --accent-color: #4cc9f0;
    /* other color variables */
}
```

### Background Image

To change the header background image, modify this line in `styles.css`:

```css
header {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
    /* other properties */
}
```

Replace the URL with your preferred image.

## Deployment

To make your portfolio live on the web:

1. **GitHub Pages**: Push your code to a GitHub repository and enable GitHub Pages
2. **Netlify**: Connect your GitHub repository to Netlify for automatic deployment
3. **Vercel**: Similar to Netlify, offers free hosting for personal projects
4. **Traditional Hosting**: Upload the files to any web hosting service via FTP

## Additional Customization Ideas

- Add a blog section to share your data analysis insights
- Include a resume download button
- Add a testimonials section
- Implement a dark/light mode toggle
- Add more interactive data visualizations to showcase your skills

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Font Awesome for the icons
- Unsplash for the background image
- Google Fonts for the typography

---

Feel free to reach out if you have any questions or need assistance customizing your portfolio! 