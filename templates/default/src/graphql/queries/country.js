import gql from 'graphql-tag'

export default gql`
  query Country($code: String!) {
    country(code: $code) {
      name
      code
      native
      phone
      continent {
        code
      }
      currency
      languages {
        native
      }
      emoji
    }
  }
`
