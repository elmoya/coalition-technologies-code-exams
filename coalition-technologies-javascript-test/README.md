# JSONPlaceholder API Integration with React

## Fetch API vs. Traditional AJAX

For this project, I implemented API calls using the modern Fetch API rather than traditional AJAX (XMLHttpRequest). While the exam mentioned AJAX, the Fetch API represents the contemporary approach for making asynchronous HTTP requests.

## The Fetch API offers these advantages

- Promise-based interface that works naturally with async/await
- Cleaner, more readable syntax than XMLHttpRequest
- Native browser support without additional libraries

## In a production React application

I would typically choose Axios over both options as it provides:

- More consistent error handling
- Automatic JSON transformation
- Request cancellation capabilities
- Wider browser compatibility