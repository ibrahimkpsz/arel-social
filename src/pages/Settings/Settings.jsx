import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import React from 'react'
import EditProfile from './components/EditProfile/EditProfile'
import Security from './components/Security/Security'
import Statistics from './components/Statistics/Statistics'
import About from './components/About/About'
import Licence from './components/Licence/Licence'

function Settings() {
    return (
        <div>
            <TabGroup>
                <TabList className="mb-5">
                    <Tab>Edit Profile</Tab>
                    <Tab>Security</Tab>
                    <Tab>Statistics</Tab>
                    <Tab>About</Tab>
                    <Tab>Licence</Tab>
                </TabList>
                <TabPanels>
                    <EditProfile />
                    <Security />
                    <Statistics />
                    <About />
                    <Licence />
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default Settings