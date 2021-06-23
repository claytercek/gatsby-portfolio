import {graphql} from 'gatsby'

const WorkTemplate = ({data}) => (
  <div>
    work
  </div>
)

export default WorkTemplate;

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: {eq: $slug}) {
      title
    }
  }
`
