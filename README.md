# Historical Data Exploration Tool


#### About

**Authors**:
 - Adam Mertel (phd candidate at the Department of Geography, Masaryk University, Brno) - coding
 - Ján Škvrňák (phd candidate at the Department of History, Masaryk University, Brno) - data

Application is currently hosted by our university and could be found [here](hde.geogr.muni.cz). It is only an experimental version of application. It's purpose is to present the idea of **linking forms of display for exploratory analysis of historical data**. Application is presented at the [dh2016 conference](http://dh2016.adho.org/), pdf of that particular poster [here](https://www.academia.edu/26925717/Linking_Graph_with_Map_for_the_Purpose_of_Historical_Research._Analysis_of_Moravian_Dowries_1348-1420_Case_Study).


---
#### Motivation
It is not possible to fully explore spatiotemporal data with historical context only with one form of display - for example in a map we can see spatial patterns, in graph it is possible to study relations, but there is not a visualization method that could display the wider context of whole dataset.  

---
#### Basic idea
In the theory of data exploration there are various **techniques** that are successfully tested and are proved to be very useful for the process of data exploration:
 - linking forms
 - filtering/brushing
 - grouping, sorting
 - highlighting
 - ..


Application prototype has implemented three **states of data**:
 - default state
 - over state - mouse is over particular element in map/graph/timeline
 - selected state - brushed subset of data

Presence of particular element in each group could be recognized by defined rules of graphical variables (linking, highlighting implementation). The possibility of creating selected subsets is an implemented brushing theory (user can make selection rectangle on map/graph/table...).


There is a number of **forms of display** that could be useful as a way to explore historical data:
 - map
 - graph
 - timeline
 - table
 - various charts (line chart, pie chart, parallel coordinates, ...)
 - statistical outputs
 - ...

All these forms have to be customizable, replicable and mainly sufficiently linked.


There are still lot of features that should be implemented in the future:
 - better data management
 - user defined styling
 - management of selected elements
 - possibility to import own data
 - new forms of display
 - ...

#### Test data - Case Study of Moravian dowries in (1348 - 1420)
Dowries and dowers of high nobility in  Moravia before the Hussite revolution  (15th c.) are a good example of historical  dataset that combines persons, time and place, while individuals and the places may have more connections among themselves. Time range depends on the state of sources - Charters for 13th and 14th centuries are preserved only very fragmentary. Qualitative change brought the year of 1348, when Land tables (and real estates registry) were reformed. Suddenly, we can explore the world of minor trades and speculations of the high and lower nobility that had been selling fields and part of villages (courts, mills, taverns and ponds).
Some of the entries is related to a controversial property or unlawful occupancy of villages or their parts, which shows us how much uncertain the property law was. However, accusations about bandit behavior (siege of castles and strongholds, conquering villages, robbery and capturing of subjects) are very rare. Number of these social links compared to previous era grew exponentially. On the other hand, the Hussite revolution is a milestone in the research of social, economic and cultural relations.

---

#### Similar projects
There are another ongoing projects that are years ahead. We want to mention some of them:
 - [nodegoat](https://nodegoat.net/)
 - [openAtlas](http://www.openatlas.eu/website/)
