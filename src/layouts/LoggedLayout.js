import { Grid } from 'semantic-ui-react'

import MenuLeft from './components/MenuLeft'
import TopBar from './components/TopBar'
import OpenOrClose from './components/OpenOrClose'
// import SongAlarm from '../components/SongAlarm'

const LoggedLayout = ({ children }) => {
  return (
    <Grid className='logged-layout'>
      <Grid.Row>
        <Grid.Column width={3}>
          <MenuLeft />
        </Grid.Column>
        <Grid.Column className='content' width={13}>
          <TopBar />
          {children}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <OpenOrClose />
          {/* <SongAlarm /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default LoggedLayout
