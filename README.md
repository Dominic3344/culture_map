# The Living Culture Map & Discovery Platform

## 1. Project Overview

The Living Culture Map is a community-driven cultural discovery platform designed to help people explore India's diverse cultural heritage.

The platform brings cultural destinations, traditional art forms, artists, performances, workshops, and local events together in one interactive digital space. Users can explore cultural experiences through an interactive India map, discover district-wise cultural trails, view event stories, and access useful location and organiser information.

The project aims to make India's living traditions more accessible, discoverable, and connected with local communities.

## 2. Problem Statement

India has a rich cultural heritage, but information about traditional art forms, cultural destinations, local artists, and events is often scattered across different websites and social media platforms.

This creates several challenges:

- Difficulty discovering authentic cultural experiences.
- Limited visibility for local artists and traditional art forms.
- Lack of a centralised platform for cultural events and destinations.
- Insufficient information about the history and significance of cultural practices.
- Difficulty accessing event locations, organisers, and original information sources.

**Our Solution:** The Living Culture Map provides a unified, interactive platform where users can discover cultural experiences, learn their stories, find locations, and contribute information about local traditions.

## 3. Key Features

- **Interactive India Map:** Explore cultural destinations through a state-based interactive map.
- **Cultural Trails:** Discover district-wise cultural experiences and destinations.
- **Temple Gateway:** Explore cultural activities, performances, and events through an immersive visual interface.
- **Cultural Directory:** Browse cultural places, artists, art forms, and events.
- **Search and Filters:** Find listings using available categories such as art form, district, and season.
- **Cultural Stories:** Access background information, images, and cultural significance for individual listings.
- **Location Navigation:** Open cultural destinations directly in Google Maps.
- **Community Contributions:** Submit new cultural listings and information.
- **Moderator Hub:** Provide a moderation interface for reviewing community-submitted information.
- **Source Information:** Include links to original event, artist, or organisation information where available.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and animations |
| JavaScript | Interactive functionality and application logic |
| SVG | Interactive India map |
| Google Maps | Location navigation |
| Local Storage | Prototype data and local authentication |
| Git & GitHub | Version control and source code hosting |

## 5. System Architecture

The platform follows a modular frontend architecture.

### Main Components

1. **User Interface Layer**
   - Interactive map
   - Cultural trail
   - Temple gateway
   - Cultural directory
   - Contribution and moderator interfaces

2. **Application Logic Layer**
   - State and district selection
   - Search and filtering
   - Cultural listing rendering
   - Event and story popups
   - Contribution handling
   - Moderation interactions

3. **Data Layer**
   - Cultural listing information
   - Images and descriptions
   - Location information
   - Organiser and source links
   - Verification and moderation status

### Basic User Flow

`Explore Map → Select Destination → Discover Cultural Trail → Explore Activities → View Stories → Find Locations`

### Community Contribution Flow

`Submit Listing → Moderator Review → Verification Decision → Public Directory`

*Note: The current prototype uses local frontend storage for certain features. A production backend and persistent database can be introduced in future development.*

## 6. Installation & Setup Instructions

### Prerequisites

- A modern web browser.
- Git.
- Visual Studio Code or another code editor.

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/Dominic3344/culture_map.git
```

**2. Open the project folder**

```bash
cd living-culture-map
```

**3. Open the project**

Open the folder in Visual Studio Code.

**4. Run the website**

 Open `index.html` using Live Server or a local web server.

Alternatively, use:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## 7. Environment Variables

The current frontend prototype does not require mandatory environment variables.


Do not commit API keys, passwords, webhook URLs, or other secrets to GitHub.

## 8. Usage Instructions

1. Open the platform in a web browser.
2. Select a cultural destination using the interactive India map.
3. Explore the cultural trail for the selected destination.
4. Navigate through the Temple Gateway to discover cultural activities.
5. Open an activity to view its image, story, timing, and destination information.
6. Visit the Cultural Directory to search and filter cultural listings.
7. Select a location to open it in Google Maps.
8. Use the contribution interface to submit new cultural information.
9. Open the Moderator Hub from the platform navigation menu.
10. If you are a new moderator, select Create New Account / Sign Up.
11. Register using the existing special moderator email ID and create your own password.
12. After successful registration, log in to the Moderator Hub using your registered email ID and password.
13. Review, approve, reject, or manage submitted cultural information where moderation functionality is enabled.
14. Log out after completing moderation tasks.
Note: Moderator registration requires the designated special email ID. New moderators must create their own password during registration.

## 9. Demonstration Screenshots

Add screenshots of the actual working application below.

### Interactive India Map
<img width="1897" height="966" alt="image" src="https://github.com/user-attachments/assets/e7dc2ab1-fea0-420d-8e43-1fb107e24854" />


### Cultural Trail
<img width="1885" height="958" alt="image" src="https://github.com/user-attachments/assets/d51314fa-d32e-47c1-a314-bdd6e09184c0" />


### Temple Gateway
<img width="1900" height="944" alt="image" src="https://github.com/user-attachments/assets/125e986b-40e1-497b-8bb8-cbf110056985" />
<img width="1899" height="954" alt="image" src="https://github.com/user-attachments/assets/d13fe373-9d87-455e-b58b-35bdb3619538" />


### Cultural Directory
<img width="1880" height="950" alt="image" src="https://github.com/user-attachments/assets/1a886758-82a8-454c-b2bc-6d7eb8579e3e" />


### Contribution Interface
<img width="1872" height="954" alt="image" src="https://github.com/user-attachments/assets/4f6b709c-4c1c-4682-b43d-3e1d65f73301" />


### Moderator Hub
<img width="1889" height="956" alt="image" src="https://github.com/user-attachments/assets/f690f7a8-35b2-463c-8a47-31a44b874eee" />




## 10. Team Members

| Name | 
|---|
| Dominic Tojan | 
| Anna Justin | 



## 11. Limitations & Future Scope

### Current Limitations

- The current prototype primarily focuses on cultural listings from Kerala.
- Some listing information may require additional community or organiser verification.
- Certain features use browser-based local storage rather than a centralised backend.
- The availability and accuracy of event information depend on the supplied sources.
- The platform does not currently provide a complete automated verification system.

### Future Scope

- Expand cultural coverage across all Indian states and union territories.
- Integrate a backend database for persistent cultural listings.
- Implement secure user accounts and role-based authentication.
- Develop a complete moderator approval and rejection workflow.
- Add date-based event discovery and advanced experience filters.
- Introduce verified artist and cultural organisation profiles.
- Enable community feedback and reporting.
- Integrate multilingual support.
- Add AI-powered cultural recommendations and discovery.

## 12. License & Attribution

This project was developed as part of **ART//CODE 2026**.

All third-party images, icons, fonts, maps, and other resources should be credited to their respective creators and sources.


This project is licensed under the MIT License.

Refer to the `LICENSE` file in this repository for licensing details.
