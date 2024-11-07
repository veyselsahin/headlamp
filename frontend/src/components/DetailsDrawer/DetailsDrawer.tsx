import { Box, Button, Drawer } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedResource } from '../../redux/drawerModeSlice';
import { useTypedSelector } from '../../redux/reducers/reducers';
import { KubeObjectDetails } from '../resourceMap/details/KubeNodeDetails';

export default function DetailsDrawer() {
  const selectedResource = useTypedSelector(state => state.drawerMode.selectedResource);

  const dispatch = useDispatch();

  function closeDrawer() {
    dispatch(setSelectedResource(undefined));
  }

  console.log({ selectedResource });

  return (
    <>
      {selectedResource && (
        <Drawer variant="persistent" anchor="right" open onClose={() => closeDrawer()}>
          <Box width={800}>
            <Box style={{ marginTop: '5rem', marginBottom: '2rem' }}>
              <Button variant="outlined" color="primary" onClick={() => closeDrawer()}>
                Close
              </Button>
            </Box>
            <Box>
              <KubeObjectDetails resource={selectedResource.jsonData} />
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}
