import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Task from './Task';
import Base from '../../../Layout/Base';

const TaskLandingPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Base>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="My Tasks" value="1" />
                            <Tab label="Assigned Tasks" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Task type="my" />
                    </TabPanel>
                    <TabPanel value="2">
                        <Task type="assigned" />
                    </TabPanel>
                </TabContext>
            </Box>
        </Base>
    );
}


export default TaskLandingPage