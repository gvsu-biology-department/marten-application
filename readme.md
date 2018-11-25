# Marten Application
### Background
Given recent research into the American marten, there was a need for a web application that is able to document marten sightings. Graduate research has produced a model that predicts habitat suitability for the northern Lower Peninsula, but a lack of anything besides anecdotal evidence makes testing the model difficult. This application allows for "citizen science". This is the outsourcing of research efforts to the public. This would allow people to log marten sightings for research purposes. The project is a public web application and certain groups including hunters, hunting club members, wildlife managers and state park personnel will be targeted for citizen science. This application will hopefully help bolster research efforts for the American marten.

The application allows for users to post marten sightings. They can attach photos and make comments on said photos using Disqus. They also can include the location where the sighting occurred and rank their confidence in the sighting. This is all stored in Google Firebase. We additionally utilize Google Maps, which allows for users to see where marten sightings have occurred. A trail-cam quiz with multiple difficulty settings incentivizes participation in the application. There is also information concerning martens and photo galleries with pictures of them built using the Flamelink CMS.

### URL

[Marten Tracker](https://marten-tracker.netlify.com/ "Click here to see the application in action.")

### Features
* Ability to log marten sightings.
* Metadata on marten sighting posts.
* A map per sighting post for location of marten sighting.
* State-wide map for all marten sighting posts.
* Disqus threads on marten sighting posts.
* Quiz game for learning more about martens.
* Information section on martens.
* Photo galleries of martens.

### Technologies
* ReactJS
* Firebase
* Material-UI
* Google API
* Netlify
* Flamelink CMS
* EmailJS
