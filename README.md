# Rated **‘V’** for Visualization
_Project proposal of Visualization for Data Science (CS 6630) - Fall 2022_ <br/>
**Website: [V for Visualization](https://mdrahmed.github.io/dataVisProject/#)**
## Background and Motivation
Our team shares an interest in social trends and media, and this shared interest was the driver for our exploration of subject-matter. The nascent medium of video games was a natural choice to explore further, given the underdevelopment of the industry and its documentation relative to other industries like music and film. Our project has since expanded in scope, but our original idea was to document the proportion of video games with a given content rating sold within each year—and, in-turn, the trends associated with that proportion over time.
Upon review, we discovered that visualizations of industry-wide sales trends for the United States are available directly from the [Motion Picture Association of America](https://www.motionpictures.org/wp-content/uploads/2022/03/MPA-2021-THEME-Report-FINAL.pdf) (MPAA) and [Recording Industry Association of America](https://www.riaa.com/u-s-sales-database/) (RIAA) for the mediums of film and music respectively, but no similar organization exists for the medium of video games, and no similar visualizations are publicly available. We are motivated to fill this niche ourselves, using independently-sourced data, for the sake of completeness and discovery.

## Project Objectives
Our project aims to illustrate video game sales data in a broad sense, using interactive visualizations to plot industry-wide sales figures on a per-year basis. These visualizations should be easy-to-use, especially for users who are unfamiliar with the industry, and we intend to build our visualization as a flexible tool. Web visualizations have, as an advantage over visualizations constrained to static media, the capacity for extensive interaction, and we intend to leverage this to a high degree: at any given time, the information immediately in-frame should be limited enough to not be overwhelming, and user-driven options to explore related information should be clearly available. Users could later modify the graphic to examine the usage ratio depending on other categories, such as rating and genre. A stacked bar chart with years on the x-axis and sales on the y-axis will initially be shown based on different platforms. To allow users to examine the usage of the games exclusively for that particular category, we will provide options inside each category. The user will be able to assess the popularity of video games using a waffle chart and legends since we will make each and every bar clickable. The description of the selected bar in the waffle chart will be displayed, along with a breakdown of the subcategories' information, such as publisher, developer, worldwide sales, and, shipping etc. Our first plan was to make a pie chart, but we later realized that a waffle chart would be more effective. A waffle chart displays the amount of progress achieved toward a goal or the percentage of completion. A wonderful technique to display data in relation to the whole is via waffle charts. When dealing with sales, pie charts that demonstrate growth toward a specific threshold and are overly diversified by genre, platform, etc. By hovering over the chart's components, you'll be able to see the waffle pattern. Once more, when that waffle chart is clicked, a different graphic will show the breakdown data and components in greater depth. 

We will learn how to create interactive graphics with various charts based on a small subset of data extracted from a large set of data. We will be able to deal with a large dataset. We will discover how to link human thinking with the images, turning this representation into an interactive one.

## Data
The largest data-set for video game sales records that is both publicly-accessible and up-to-date is maintained by the VGChartz Network, which has a web portal for browsing records [here](https://www.vgchartz.com/gamedb/).

## Project Structure
This repository contains all the information about the project including process book, feedback etc. The docs is the working directory. We have the codes, data and figures present in the docs folder. The project file structure looks like this:
    Process Book.pdf
    README.md
    demo.zip
    feedback_exercise.pdf
    docs/
        index.html
    docs/js/
        Categorizer.js
Legend.js
website
NavBar.js
StackedBarChart.js
VisController.js
WaffleChart.js
11 hours ago
script.js


## Contact Information

If the instructor or TA needs to contact one or all team members, contact information is provided below: 

Raihan Ahmed (u1374605)	  	Email: u1374605@utah.edu <br/>
Harrison Fackrell (u1292786)		Email: u1292786@utah.edu <br/>
Andrew Frost (u0899003)		Email: u0899003@utah.edu <br/>

Project repo: [Rated **‘V’** for Visualization](https://github.com/mdrahmed/dataVisProject)
