# Weather Forecasts App

## Project Description
This project involves creating a simple, single-page user interface (UI) component to view and interact with real-time weather forecasts for various cities around the world. The application consumes a local REST API to fetch weather data and presents it in a clean, user-friendly, and responsive manner.  

The primary goal is to demonstrate strong foundational development skills, attention to detail, and best practices in component design and state management.

---

## Core Features
The application is required to implement the following functionalities:

1. **Latest Forecast List**: Display the weather data for all available cities, showing the forecast for the latest day available in the dataset.  
2. **City Search**: Allow users to search and filter the weather information for a specific city using a search bar.  
3. **Date Filtering**: Allow users to search and filter the data to view the forecast for a specific day across all cities using a date picker or similar mechanism.  
4. **Temperature Unit Toggle**: Provide a toggle switch to allow the user to instantly switch the displayed temperature unit between Celsius (°C) and Fahrenheit (°F).  

---

## Local API Setup
A local Node.js REST API is provided in the `./src` directory to serve the required weather data.

### Requirements
The API was created using Node.js v10.6.0. While other versions may work, this version is officially supported.

### Installation (API)
Navigate to the API source directory and install the dependencies:

```bash
cd ./src
npm ci
