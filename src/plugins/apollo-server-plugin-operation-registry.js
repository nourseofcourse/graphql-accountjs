const apolloServerOperationRegistry = {
  serverWillStart() {
    console.info('Server starting.')
  },
  requestDidStart() {
    return {
      parsingDidStart() {
        return (err) => {
          if (err) {
            console.error('Error:', err)
          }
        }
      },
      validationDidStart() {
        return (errs) => {
          if (errs) {
            errs.forEach(err => console.error('Error:', err))
          }
        }
      },
      executionDidStart() {
        return (err) => {
          if (err) {
            console.error('Error:', err)
          }
        }
      }
    }
  }
}