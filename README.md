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

 In our application prototype, three **states of data** are implemented:
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

---
#### Similar projects
There are another ongoing projects that are years ahead. We want to mention some of them:
 - [nodegoat](https://nodegoat.net/)
 - [openAtlas](http://www.openatlas.eu/website/)
