# Development

### Link to Deployed Website
https://wartywalrus666.github.io/development/

### Goal and Value of the Application
browse and filter through palette colours

### Usability Principles Considered
visual emphasis on functional buttons, visual changes on user interaction (button clicks, product ordering)

### Organization of Components 
filtering, sorting, reset buttons at top of window header, saved dashboard below header, items at the bottom of the page

### How Data is Passed Down Through Components
item name, colour, saturation level, and associated filters passed through props to Card object

### How the User Triggers State Changes
#### filter buttons
filter red, filter blue, filter yellow, and filter green (buttons at the top of the page) allow the user to choose particular colour groups to appear on screen. each colour card can belong to more than one filter group, and multiple filter groups can be selected at once. if no filter group is selected (button is dark when selected and light when not selected), all colour cards are shown.
#### sort button
the sort by saturation button (also at top of page) sort the colour cards from the least saturated to the most saturated. this button is reset when the user toggles between filters
#### reset button
the reset button removes all filters, sorting, and liked colours.
#### like button
each colour card has a like button that can be clicked to add the colour to the saved list below the buttons. the colour can be unliked (the like button turns into an unlike button if the card is currently liked) to remove it from the saved list.

### Known bugs
- if liking a colour while sort by saturation is on, the colour is correctly added to saved list but sorting is turned off—the items list reverts to unsorted order


