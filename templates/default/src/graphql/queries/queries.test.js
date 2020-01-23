import COUNTRY_QUERY from './country'
import COUNTRIES_QUERY from './countries'

describe('graphql queries - gql object snapshots', () => {
  it('matches country query', () => {
    expect(COUNTRY_QUERY).toMatchSnapshot()
  })
  it('matches countries query', () => {
    expect(COUNTRIES_QUERY).toMatchSnapshot()
  })
})
