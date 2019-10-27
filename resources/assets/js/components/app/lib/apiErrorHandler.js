// handleError.js - Common Error Handler Function
export default (error) => {
    const status = error.response.status
    const message = error.response.data.message

    switch (status) {
      case 401:
        
        // do something when you're unauthenticated
        alert('Not authenticated request')
        break;   
        
      case 403:
        // do something when you're unauthorized to access a resource
        alert('Not authorisded to access resource')
        break;

      case 500:
        // do something when your server exploded
        alert('Server returned 500 error')
        break;

      case 405:
        alert('Method not allowed')
        break;

      default:
        // handle normal errors with some alert or whatever
        alert('default error handler')
    }
    return message; // I like to get my error message back
  }