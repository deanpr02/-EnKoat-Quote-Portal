Enkoat Internship Full-Stack Application
By: Dean Prach

===About the Project===
This project stores contracting quotes that includes information such as: contractor name, company name, roof size, roof type, city, state, and date. The project starts off with its database filled with 1000 randomly generated quotes to properly show off some of the dashboard's visual elements. The application uses a Flask API to store new quotes when submitted, fetch the quote data from the database, and retrieve data from a couple different datasets which are used in various components. There are several visual elements, one being a bar graph displaying how many quotes there are for each state, a pie chart visualizing the amount of quotes for each roof type, and a line chart that shows the traffic of quotes per month. Additionally, the application includes a map functionality which displays the location of each city in a state by getting its relative location within the canvas by using the city's lat/long values and the bounding box long/lat values of the state. When hovering over one of the states's cities, you can see its quote information relating such as the number of quotes in the database referring to that city.



===Tools used===
The frontend of the application is built using React with JavaScript. The backend API uses Flask along with a SQLite database. A couple datasets are used to gather real city information for each state to avoid using invalid data.

===Install/Run Guide===
1. run the command 'npm install'
2. run the command 'pip install -r'
3. run the command 'python ./src/api/app.py' to run the backend
3. run the command 'npm run dev' to run the frontend


===Mock Data===
The database is preloaded with random quotes using randomly generated contractor and company names using the Faker python library. The cities are randomly selected from a list of 15 cities from each state in the United States. Each random quote is given a randomized U.S state and then a random city from that state's allotted city list. The city dataset contains the longitude and latitude of that city's location which is used for locating the city on the map component in the project. Lastly, a dataset is used to gather the bounding boxes for each state's (east-most,west-most,north-most,south-most) lat/long values.

Acknowledgements:
Dataset used for U.S. cities -> https://simplemaps.com/data/us-cities
Dataset used for State bounding boxes -> https://gist.github.com/a8dx/2340f9527af64f8ef8439366de981168


===Improvements===
1. In the map component, Alaska's cities are not properly mapped to the state's image. If I had more time I would try to figure out the issue with the invalid coordinate mapping. It may be due to Alaska being close to the Earth's northern pole so using normal latitude/longitude is incorrect.