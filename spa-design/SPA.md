# SPA Overview
Source: [Single page apps in depth](http://singlepageappbook.com/goal.html)
Source: [What Is A Single Page Application?](https://www.youtube.com/watch?v=xfGciVdbktI)
Source: [What is A Single Page Application ? Why SPAs might Become Much More Frequent?](https://www.youtube.com/watch?v=MQl9Zs3QqGM)
Source: [What is a Single Page Application (SPA) and How Does it Work](https://www.youtube.com/watch?v=wlVmmsMD28w)
Source: [Single Page Applications: A Powerful Design Pattern for Modern Web Apps](https://medium.com/a-lady-dev/single-page-applications-a-powerful-design-pattern-for-modern-web-apps-ec3590bb7e7a)
Source: [The 4 Layers of Single Page Applications You Need to Know](https://hackernoon.com/architecting-single-page-applications-b842ea633c2e)

### Origins of SPA
- The opposite of a single page application is an application that requires multiple requests to the server to fetch HTML pages as the user maneuvers throughout the site.
- If a full page has to be requested from the server, this creates a lag from the user.
- In multi-page applications (MPA), the user has to endure the fetching and loading of full pages.
- In multi-page apps, every time you need to display new data from the sever or submit data to the server, a new page must be loaded.
- MPAs are okay for small applications, but they don't scale well as the applications becomes richer and richer.
- MPSs used to be better for SEO due to search engine's ability to crawl them, but that has changed in modern times.

### SPA to the Rescue
- With single page application architectures, one HTML page is fetched from the server.
- As the user maneuvers throughout the page, data is requested when needed.
- That data is then used to render whatever new content needs to be displayed to the user.
- HTML is rendered and manipulated client-side.
- The size of the payload is decreased because the server only returns JSON (instead of a full HTML page).
- Frameworks that use SPA: React, Vue, Angular, Meteor and others.
- SPA relies on AJAX (Asynchronous JavaScript and XML -- used for async web apps)

![alt text](https://miro.medium.com/max/640/0*kDBQ4srXkqALU6Vw.png "Traditional lifecycle vs SPA lifecycle")

### SPA Pros
- They hella fast (compared to MPAs)
- Backend and Front-end are decoupled, so you can theoretically re-write either implementation without deeply affecting the other.
- Easy to deploy (1 HTML file, a CSS bundle and a JS bundle)
- Easy transition to mobile (due to FE and BE decoupling, it's easier to develop a mobile interface from SPA)

### SPA Cons
- SEO Implications -- seach engines historically have a hard time crawling SPAs (althought that is changing)
- An isomorphic (server and client side rendering) implementation may be needed to mitigate SEO implications
- There can potentially be long initial wait times
- There is still a wait time to fetch data

### SPA Layers
![alt text](https://hackernoon.com/hn-images/1*6wpX8u_mM8Z1xdZVMFj67w.png "Four SPA layers")

#### Domain Layer
- Describes the state and holds business logic
- Core of app -- agnostic to view
- Domain should be usable accross frameworks

#### Store Layer
- Holds state data
- Data publisher
- Notifies subscribers about state changes

#### View Layer
- Presentational and container components
- Container components supply state to presentational components
